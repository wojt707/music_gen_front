import { Button, MidiPlayer, PianoRoll } from '@/components'
import { Midi } from '@tonejs/midi'
import { Piano } from '@tonejs/piano'
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
  const piano = useRef<Piano | null>(null)
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
      alert('No file available for download.')
    }
  }

  useEffect(() => {
    const fetchPianoSamples = async () => {
      piano.current = new Piano({
        velocities: 1,
        pedal: false,
      }).toDestination()

      piano.current
        .load()
        .then(() => setIsPianoLoaded(true))
        .catch((error) => {
          console.error(error)
          toast.error(`Error fetching genres: ${error}`)
        })
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
              piano={piano.current}
              playbackState={playbackState}
            />
            <MidiPlayer
              midi={midi}
              piano={piano.current}
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
