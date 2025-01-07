import React, { useEffect, useRef, useState } from 'react'
import { Midi } from '@tonejs/midi'
import { Piano } from '@tonejs/piano'
import * as Tone from 'tone'
import { cn } from '@/lib/utils'

type Note = {
  midi: number
  time: number
  duration: number
}

type PianoRollProps = {
  midi: Midi | null
  piano: Piano | null
  playbackState: Tone.PlaybackState
}

const PianoRoll: React.FC<PianoRollProps> = ({
  midi,
  piano,
  playbackState,
}) => {
  const [notes, setNotes] = useState<Note[]>([])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const lastOffsetRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  const pitchRange = 128
  const noteHeight = 10 // Height of each note tile
  const rollSpeed = 200 // Pixels per second
  const isWhiteKey = [
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
  ]

  const playKey = async (midiPitch: number) => {
    if (playbackState == 'started') return

    if (Tone.getContext().state !== 'running') {
      console.log(`Tone context is ${Tone.getContext().state}`)
      await Tone.start()
    }
    piano?.keyDown({ midi: midiPitch })
  }

  const releaseKey = async (midiPitch: number) => {
    if (playbackState == 'started') return

    if (Tone.getContext().state !== 'running') {
      console.log(`Tone context is ${Tone.getContext().state}`)
      await Tone.start()
    }

    piano?.keyUp({ midi: midiPitch })
  }

  useEffect(() => {
    const loadMidi = async () => {
      const extractedNotes: Note[] = []
      midi?.tracks.forEach((track) => {
        track.notes.forEach((note) => {
          extractedNotes.push({
            midi: note.midi,
            time: note.time,
            duration: note.duration,
          })
        })
      })
      setNotes(extractedNotes)
    }
    loadMidi()
  }, [midi])

  useEffect(() => {
    const drawLines = (ctx: CanvasRenderingContext2D, width: number) => {
      ctx.strokeStyle = '#5e606e'
      ctx.lineWidth = 1
      for (let i = 0; i < pitchRange; i++) {
        const y = i * noteHeight
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const drawNotes = (ctx: CanvasRenderingContext2D, offset: number) => {
      notes.forEach((note) => {
        const x = note.time * rollSpeed - offset + 25
        const y = (pitchRange - note.midi - 1) * noteHeight
        const width = note.duration * rollSpeed
        ctx.fillStyle = '#0c7e45'
        ctx.fillRect(x, y, width, noteHeight)
      })
    }

    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime
      const elapsed = (currentTime - startTimeRef.current) / 1000
      const offset = lastOffsetRef.current + elapsed * rollSpeed

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawLines(ctx, canvas.width)
      drawNotes(ctx, offset)

      animationRef.current = requestAnimationFrame(draw)
    }

    if (playbackState === 'started') {
      startTimeRef.current = performance.now()
      animationRef.current = requestAnimationFrame(draw)
      return
    }
    if (playbackState === 'paused') {
      // Capture the last offset when paused
      lastOffsetRef.current +=
        ((performance.now() - (startTimeRef.current || 0)) / 1000) * rollSpeed
    } else {
      lastOffsetRef.current = 0
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawLines(ctx, canvas.width)
      drawNotes(ctx, 0)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    return () => {
      if (animationRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [notes, playbackState])

  return (
    <div className="h-[32rem] overflow-auto border flex flex-row">
      <div
        className={`h-[${
          noteHeight * pitchRange
        }px] w-[100px] border-r-2 border-gray bg-white`}
      >
        {Array.from({ length: pitchRange }, (_, k) => k)
          .reverse()
          .map((midiPitch) => {
            const note = midiPitch % 12
            const isWhite = isWhiteKey[note]
            return isWhite ? (
              <div
                key={midiPitch}
                className={cn(
                  `h-[10px] w-full hover:cursor-pointer bg-white hover:bg-green active:bg-green/80 border-y border-light-gray`
                )}
                onMouseDown={() => playKey(midiPitch)}
                onMouseUp={() => releaseKey(midiPitch)}
              >
                {note === 0 ? (
                  <span className="h-full w-full flex justify-end items-center text-xs text-gray">
                    {Tone.Midi(midiPitch).toNote()}
                  </span>
                ) : null}
              </div>
            ) : (
              <div
                key={midiPitch}
                className={cn(
                  `h-[10px] w-full bg-white border-y border-light-gray`
                )}
              >
                <div
                  className="h-full w-3/5 hover:cursor-pointer bg-gray hover:bg-green active:bg-green/80"
                  onMouseDown={() => playKey(midiPitch)}
                  onMouseUp={() => releaseKey(midiPitch)}
                ></div>
              </div>
            )
          })}
      </div>
      <div>
        <canvas
          className="backdrop-blur-sm"
          ref={canvasRef}
          width={800}
          height={pitchRange * noteHeight}
        />
      </div>
    </div>
  )
}

export { PianoRoll }
