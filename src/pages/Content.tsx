import { About, Home, Parameters, Preview } from '.'
import { useState } from 'react'
import { generateMidi } from '@/services'
import { Midi } from '@tonejs/midi'
import { toast } from 'sonner'
import { PageWrapper } from '@/components'

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
      <PageWrapper pianoWidth={pianoWidth} offset={0}>
        <Home onScrollTo={onScrollTo} />
      </PageWrapper>
      <PageWrapper pianoWidth={pianoWidth} offset={1}>
        <Parameters onGenerate={handleGenerate} />
      </PageWrapper>
      <PageWrapper pianoWidth={pianoWidth} offset={2}>
        <Preview downloadUrl={getDownloadUrl()} midi={midi} />
      </PageWrapper>
      <PageWrapper pianoWidth={pianoWidth} offset={3}>
        <About />
      </PageWrapper>
    </>
  )
}

export { Content }
