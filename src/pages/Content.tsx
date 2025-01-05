import { About, Home, Parameters, Preview } from '.'
import { useState } from 'react'
import { generateMidi } from '@/services'
import { Midi } from '@tonejs/midi'
import { toast } from 'sonner'
import { PageWrapper } from '@/components'
import { BackendError, GenerateMidiParams } from '@/types'
import * as Tone from 'tone'

type ContentProps = {
  pianoWidth: number
  onScrollTo: (page: number) => void
}

const Content: React.FC<ContentProps> = ({ pianoWidth, onScrollTo }) => {
  const [midi, setMidi] = useState<Midi | null>(null)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [playbackState, setPlaybackState] =
    useState<Tone.PlaybackState>('stopped')

  const handleGenerate = async (params: GenerateMidiParams) => {
    setPlaybackState('stopped')
    try {
      setIsGenerating(true)
      const midiBlob = await generateMidi(params)
      const arrayBuffer = await midiBlob.arrayBuffer()
      const midi = new Midi(arrayBuffer)
      setMidi(midi)

      toast.success('MIDI generated successfully.')
      onScrollTo(2)
    } catch (error) {
      if (error instanceof BackendError) {
        toast.error(`Error generating MIDI: ${error.message}`)
      } else {
        toast.error(`Error generating MIDI: ${error}`)
      }
    } finally {
      setIsGenerating(false)
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
        <Parameters onGenerate={handleGenerate} isGenerating={isGenerating} />
      </PageWrapper>
      <PageWrapper pianoWidth={pianoWidth} offset={2}>
        <Preview
          downloadUrl={getDownloadUrl()}
          midi={midi}
          playbackState={playbackState}
          onSetPlaybackState={setPlaybackState}
        />
      </PageWrapper>
      <PageWrapper pianoWidth={pianoWidth} offset={3}>
        <About />
      </PageWrapper>
    </>
  )
}

export { Content }
