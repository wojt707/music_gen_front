import { Button, MidiPlayer, PianoRoll } from '@/components'
import { Midi } from '@tonejs/midi'
import { useState } from 'react'
import * as Tone from 'tone'

type PreviewProps = {
  downloadUrl: string | null
  midi: Midi | null
}
const Preview: React.FC<PreviewProps> = ({ downloadUrl, midi }) => {
  const [playbackState, setPlaybackState] =
    useState<Tone.PlaybackState>('stopped')

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

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <PianoRoll midi={midi} playbackState={playbackState} />
        <MidiPlayer
          midi={midi}
          playbackState={playbackState}
          setPlaybackState={setPlaybackState}
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
    </div>
  )
}

export { Preview }
