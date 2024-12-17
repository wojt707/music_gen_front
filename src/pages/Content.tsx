import { ParallaxLayer } from '@react-spring/parallax'
import { About, Home, Parameters, Preview } from '.'
import { useState } from 'react'
import { generateMidi } from '@/services'
import { Midi } from '@tonejs/midi'
import { toast } from 'sonner'

type ContentProps = {
  pianoWidth: number
  onScrollTo: (page: number) => void
}

const Content: React.FC<ContentProps> = ({ pianoWidth, onScrollTo }) => {
  const [midi, setMidi] = useState<Midi | null>(null)

  const handleGenerate = async (params: {
    genre: string
    tempo: number
    duration: number
  }) => {
    try {
      const midiBlob = await generateMidi(params)
      const arrayBuffer = await midiBlob.arrayBuffer()
      const midi = new Midi(arrayBuffer)
      setMidi(midi)

      toast.success('MIDI generated successfully')
      onScrollTo(2)
    } catch (error) {
      toast.error('Error generating MIDI: ' + error)
    }
  }

  const getDownloadUrl = (): string | null => {
    if (!midi) return null
    const midiBlob = new Blob([midi.toArray()], { type: 'audio/midi' })
    return URL.createObjectURL(midiBlob)
  }

  return (
    <>
      <ParallaxLayer
        offset={0}
        speed={0.5}
        style={{
          marginLeft: `${pianoWidth}px`,
          width: `calc(100%-${pianoWidth}px)`,
        }}
      >
        <Home onScrollTo={onScrollTo} />
      </ParallaxLayer>
      <ParallaxLayer
        offset={1}
        speed={0.5}
        style={{
          marginLeft: `${pianoWidth}px`,
          width: `calc(100%-${pianoWidth}px)`,
        }}
      >
        <Parameters onGenerate={handleGenerate} />
      </ParallaxLayer>
      <ParallaxLayer
        offset={2}
        speed={0.5}
        style={{
          marginLeft: `${pianoWidth}px`,
          width: `calc(100%-${pianoWidth}px)`,
        }}
      >
        <Preview downloadUrl={getDownloadUrl()} midi={midi} />
      </ParallaxLayer>
      <ParallaxLayer
        offset={3}
        speed={0.5}
        style={{
          marginLeft: `${pianoWidth}px`,
          width: `calc(100%-${pianoWidth}px)`,
        }}
      >
        <About />
      </ParallaxLayer>
    </>
  )
}

export { Content }
