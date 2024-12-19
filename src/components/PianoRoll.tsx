import React, { useEffect, useRef, useState } from 'react'
import { Midi } from '@tonejs/midi'
import { cn } from '@/lib/utils'

type Note = {
  midi: number
  time: number
  duration: number
}

type PianoRollProps = {
  midi: Midi | null
  isPlaying: boolean
}

const PianoRoll: React.FC<PianoRollProps> = ({ midi, isPlaying }) => {
  const [notes, setNotes] = useState<Note[]>([])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null) // Keep track of animation frame ID

  const pitchRange = 128
  const noteHeight = 20 // Height of each note tile
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

  // Draw the piano roll
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const startTime = performance.now()
    drawLines(ctx, canvas.width)
    const draw = (currentTime: number) => {
      if (!ctx || !isPlaying) return

      const elapsed = (currentTime - startTime) / 1000
      const offset = elapsed * rollSpeed

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal lines
      drawLines(ctx, canvas.width)

      // Draw notes
      notes.forEach((note) => {
        const x = note.time * rollSpeed - offset
        const y = (pitchRange - note.midi - 1) * noteHeight
        const width = note.duration * rollSpeed
        ctx.fillStyle = '#0c7e45'
        ctx.fillRect(x, y, width, noteHeight)
      })

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(draw) // Start animation
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current) // Stop animation
      animationRef.current = null
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current) // Clean up animation
        animationRef.current = null
      }
    }
  }, [notes, isPlaying])

  return (
    <div className="h-[32rem] overflow-auto border flex flex-row">
      <div
        className={`h-[${
          noteHeight * pitchRange
        }px] w-[100px] border-r-2 border-gray`}
      >
        {Array.from({ length: pitchRange }, (_, k) => k)
          .reverse()
          .map((pitch) => {
            const note = pitch % 12
            const isWhite = isWhiteKey[note]
            return (
              <div
                key={pitch}
                className={cn(
                  `h-[${noteHeight}px] w-full bg-white hover:${
                    isWhite ? 'bg-green' : 'bg-white'
                  } border-y border-light-gray`
                )}
              >
                {isWhite ? null : (
                  <div className="h-full w-3/5 bg-gray hover:bg-green"></div>
                )}
                {note == 0 ? (
                  <span className="h-full w-full flex justify-end items-center text-sm text-gray">
                    C{pitch / 12 - 1}
                  </span>
                ) : null}
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
