import { Button, MidiPlayer, PianoRoll } from '@/components'
import { getPianoSamples } from '@/services'
import { BackendError } from '@/types'
import { Midi } from '@tonejs/midi'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import * as Tone from 'tone'

type PreviewProps = {
  downloadUrl: string | null
  midi: Midi | null
  playbackState: Tone.PlaybackState
  onSetPlaybackState: (playbackState: Tone.PlaybackState) => void
}

const Preview: React.FC<PreviewProps> = ({
  downloadUrl,
  midi,
  playbackState,
  onSetPlaybackState: setPlaybackState,
}) => {
  const sampler = useRef<Tone.Sampler | null>(null)
  const [isPianoLoaded, setIsPianoLoaded] = useState(false)

  const handleDownload = () => {
    if (downloadUrl) {
      const anchor = document.createElement('a')
      anchor.href = downloadUrl
      anchor.download = 'generated-midi.mid'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    } else {
      toast.error(`No file available for download.`)
    }
  }

  useEffect(() => {
    const fetchPianoSamples = async () => {
      try {
        const sampleUrls = await getPianoSamples()

        sampler.current = new Tone.Sampler(sampleUrls, () => {
          setIsPianoLoaded(true)
        }).toDestination()
      } catch (error) {
        console.error('Error fetching piano samples:', error)
        if (error instanceof BackendError) {
          toast.error(`Error fetching piano samples: ${error.message}`)
        } else {
          toast.error(`Unknown error fetching piano samples.`)
        }
      }
    }
    fetchPianoSamples()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full p-4">
      {!isPianoLoaded ? (
        <div>Loading piano samples...</div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <PianoRoll
              midi={midi}
              sampler={sampler.current}
              playbackState={playbackState}
            />
            <MidiPlayer
              midi={midi}
              sampler={sampler.current}
              playbackState={playbackState}
              onSetPlaybackState={setPlaybackState}
            />
          </div>
          <Button
            variant="outline"
            className="bg-green"
            onClick={handleDownload}
            disabled={!downloadUrl}
          >
            Download MIDI File
          </Button>
        </>
      )}
    </div>
  )
}

export { Preview }
