import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Midi } from '@tonejs/midi'
import * as Tone from 'tone'
import { Button } from '.'
import { Progress } from './ui'
import { Pause, Play, RotateCcw } from 'lucide-react'

type MidiPlayerProps = {
  midi: Midi | null
  playbackState: Tone.PlaybackState
  setPlaybackState: (playbackState: Tone.PlaybackState) => void
}

const MidiPlayer: React.FC<MidiPlayerProps> = ({
  midi,
  playbackState,
  setPlaybackState,
}) => {
  const [progress, setProgress] = useState<number>(0)
  const stoppedAt = useRef<number>(0)

  const playMidi = async () => {
    if (!midi || playbackState == 'started') return
    if (playbackState == 'paused') {
      Tone.getTransport().start(Tone.now(), stoppedAt.current)
      setPlaybackState(Tone.getTransport().state)
      return
    }

    await Tone.start()

    Tone.getTransport().seconds = 0

    midi.tracks.forEach((track) => {
      if (track.notes.length > 0) {
        const synth = new Tone.PolySynth().toDestination()

        track.notes.forEach((note) => {
          Tone.getTransport().schedule((time) => {
            synth.triggerAttackRelease(
              note.name,
              note.duration,
              time,
              note.velocity
            )
          }, note.time)
        })
      }
    })

    Tone.getTransport().start()
    setPlaybackState(Tone.getTransport().state)
  }

  const resetPlayback = useCallback(() => {
    setProgress(0)
    Tone.getTransport().stop()
    Tone.getTransport().cancel()
    setPlaybackState(Tone.getTransport().state)
  }, [setPlaybackState])

  const pausePlayback = () => {
    Tone.getTransport().pause()
    setPlaybackState(Tone.getTransport().state)
    stoppedAt.current = Tone.getTransport().seconds
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  useEffect(() => {
    const updateProgress = () => {
      if (!midi) return
      const currentTime = Tone.getTransport().seconds
      const percentage = (currentTime / midi.duration) * 100
      if (percentage > 100) {
        resetPlayback()
        return
      }
      setProgress(percentage)
    }

    if (playbackState == 'started') {
      const interval = setInterval(updateProgress, 100)
      return () => clearInterval(interval)
    }
  }, [playbackState, midi, resetPlayback])

  return (
    <div className="w-full flex flex-row justify-center items-center gap-4">
      <Button onClick={playMidi} disabled={!midi} size="icon" variant="ghost">
        <Play />
      </Button>
      <Button
        onClick={pausePlayback}
        disabled={!midi}
        size="icon"
        variant="ghost"
      >
        <Pause />
      </Button>
      <Button
        onClick={resetPlayback}
        disabled={!midi}
        size="icon"
        variant="ghost"
      >
        <RotateCcw />
      </Button>
      <span>
        {midi ? formatTime((progress / 100) * midi.duration) : '00:00'}
      </span>
      <Progress value={progress} />
      <span>{midi ? formatTime(midi.duration) : '00:00'}</span>
    </div>
  )
}

export { MidiPlayer }
