import React, { useEffect, useRef, useState } from 'react'
import { Midi } from '@tonejs/midi'
import * as Tone from 'tone'
import { Button } from '.'
import { Progress } from './ui'
import { Pause, Play, RotateCcw } from 'lucide-react'

type MidiPlayerProps = {
  midi: Midi | null
  playbackState: Tone.PlaybackState
  onSetPlaybackState: (playbackState: Tone.PlaybackState) => void
}

const MidiPlayer: React.FC<MidiPlayerProps> = ({
  midi,
  playbackState,
  onSetPlaybackState: setPlaybackState,
}) => {
  const [progress, setProgress] = useState<number>(0)
  const stoppedAt = useRef<number>(0)
  const prevPlayback = useRef<Tone.PlaybackState>('stopped')

  const startPlayback = () => {
    setPlaybackState('started')
  }

  const resetPlayback = () => {
    setPlaybackState('stopped')
  }

  const pausePlayback = () => {
    setPlaybackState('paused')
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  useEffect(() => {
    const prevPlaybackTemp = prevPlayback.current
    prevPlayback.current = playbackState

    const play = async () => {
      await Tone.start()

      Tone.getTransport().seconds = 0

      midi?.tracks.forEach((track) => {
        if (track.notes.length > 0) {
          const synth = new Tone.PolySynth(Tone.FMSynth).toDestination()

          track.notes.forEach((note) => {
            Tone.getTransport().schedule((time) => {
              synth.triggerAttackRelease(note.name, note.duration, time)
            }, note.time)
          })
        }
      })

      Tone.getTransport().start()
    }

    if (playbackState == 'started') {
      if (!midi || prevPlaybackTemp == 'started') return
      if (prevPlaybackTemp == 'paused') {
        Tone.getTransport().start(Tone.now(), stoppedAt.current)
        return
      }

      play()
    } else if (playbackState == 'paused') {
      Tone.getTransport().pause()
      stoppedAt.current = Tone.getTransport().seconds
    } else {
      setProgress(0)
      Tone.getTransport().stop()
      Tone.getTransport().cancel()
    }
  }, [midi, playbackState])

  useEffect(() => {
    const updateProgress = () => {
      if (!midi) return
      const currentTime = Tone.getTransport().seconds
      const percentage = (currentTime / midi.duration) * 100
      if (percentage > 100) {
        setPlaybackState('stopped')
        return
      }
      setProgress(percentage)
    }

    if (playbackState == 'started') {
      const interval = setInterval(updateProgress, 100)
      return () => clearInterval(interval)
    }
  }, [midi, playbackState, setPlaybackState])

  return (
    <div className="w-full flex flex-row justify-center items-center gap-4">
      {playbackState === 'started' ? (
        <Button
          onClick={pausePlayback}
          disabled={!midi}
          size="icon"
          variant="ghost"
        >
          <Pause />
        </Button>
      ) : (
        <Button
          onClick={startPlayback}
          disabled={!midi}
          size="icon"
          variant="ghost"
        >
          <Play />
        </Button>
      )}
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
