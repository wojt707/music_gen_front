import React, { useRef, useState } from 'react'
import { Midi } from '@tonejs/midi'
import * as Tone from 'tone'
import { Button } from '.'
import { Progress } from './ui/progress'
type MidiPlayerProps = {
  midi: Midi | null
}
const MidiPlayer: React.FC<MidiPlayerProps> = ({ midi }) => {
  const [progress, setProgress] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const isPlayingRef = useRef<boolean>(false)
  const synthRefs = useRef<Tone.PolySynth[]>([])
  const playbackInterval = useRef<NodeJS.Timeout | null>(null)

  const playMidi = async () => {
    if (!midi) return
    setIsPlaying(true)
    isPlayingRef.current = true

    await Tone.start()

    synthRefs.current.forEach((synth) => synth.dispose())
    synthRefs.current = []

    const startTime = Tone.now()

    midi.tracks.forEach((track) => {
      if (track.notes.length > 0) {
        const synth = new Tone.PolySynth().toDestination()
        synthRefs.current.push(synth)

        track.notes.forEach((note) => {
          synth.triggerAttackRelease(
            note.name,
            note.duration,
            note.time + startTime,
            note.velocity
          )
        })
      }
    })

    // Interval to update the progress bar
    playbackInterval.current = setInterval(() => {
      if (isPlayingRef && midi.duration) {
        const elapsed = Tone.now() - startTime
        const progressValue = Math.min((elapsed / midi.duration) * 100, 100)
        setProgress(progressValue)
        if (progressValue >= 100) {
          stopPlayback(1000)
        }
      }
    }, 100)
  }

  const stopPlayback = (delayMiliSeconds?: number) => {
    setIsPlaying(false)
    isPlayingRef.current = false
    setProgress(0)

    if (playbackInterval.current) {
      clearInterval(playbackInterval.current)
      playbackInterval.current = null
    }

    setTimeout(() => {
      synthRefs.current.forEach((synth) => synth.dispose())
      synthRefs.current = []
    }, delayMiliSeconds || 0)
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center p-4">
      <div className="w-full flex flex-row justify-center items-center gap-4">
        <span>
          {midi ? formatTime((progress / 100) * midi.duration) : '00:00'}
        </span>
        <Progress value={progress} />
        <span>{midi ? formatTime(midi.duration) : '00:00'}</span>
      </div>
      {isPlaying ? (
        <Button onClick={() => stopPlayback()} disabled={!midi}>
          Stop
        </Button>
      ) : (
        <Button onClick={playMidi} disabled={!midi}>
          Play
        </Button>
      )}
    </div>
  )
}

export { MidiPlayer }
