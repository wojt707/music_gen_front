import { ParallaxLayer } from '@react-spring/parallax'
import { About, Generate, Home, Parameters, Preview } from '.'
import { useState } from 'react'
import { generateMidi } from '@/services'

type ContentProps = {
  pianoWidth: number
  onScrollTo: (page: number) => void
}

const Content: React.FC<ContentProps> = ({ pianoWidth, onScrollTo }) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    try {
      const midiBlob = await generateMidi({ genre: 'rock' })
      const url = URL.createObjectURL(midiBlob)
      setDownloadUrl(url)
    } catch (error) {
      // TODO handling errors
      alert('Failed to generate MIDI. Error: ' + error)
    }
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
        <Parameters />
      </ParallaxLayer>
      <ParallaxLayer
        offset={2}
        speed={0.5}
        style={{
          marginLeft: `${pianoWidth}px`,
          width: `calc(100%-${pianoWidth}px)`,
        }}
      >
        <Generate onGenerate={handleGenerate} />
      </ParallaxLayer>
      <ParallaxLayer
        offset={3}
        speed={0.5}
        style={{
          marginLeft: `${pianoWidth}px`,
          width: `calc(100%-${pianoWidth}px)`,
        }}
      >
        <Preview downloadUrl={downloadUrl} />
      </ParallaxLayer>
      <ParallaxLayer
        offset={4}
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
