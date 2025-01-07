import { Button } from '@/components/Button'
import { Skeleton, Slider } from '@/components/ui'
import { cn } from '@/lib/utils'
import { getGenres } from '@/services'
import { BackendError, GenerateMidiParams } from '@/types'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

type ParametersProps = {
  onGenerate: (params: GenerateMidiParams) => void
  isGenerating: boolean
}

const Parameters: React.FC<ParametersProps> = ({
  onGenerate,
  isGenerating,
}) => {
  const [genres, setGenres] = useState<{ code: string; name: string }[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [tempoBpm, setTempoBpm] = useState<number>(120) // Tempo in bpm
  // const [duration, setDuration] = useState<number | null>(30) // Duration of the song in seconds
  const [length, setLength] = useState<number>(200) // Number of words (tokens) in the piece
  const [randomness, setRandomness] = useState<number>(0) // Randomness of the song
  const [isServerLoading, setIsServerLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsServerLoading(true)
        const genresData = await getGenres()
        setGenres(genresData)
      } catch (error) {
        if (error instanceof BackendError) {
          toast.error(`Error fetching genres: ${error.message}`)
        } else {
          toast.error(`Error fetching genres: ${error}`)
        }
      } finally {
        setIsServerLoading(false)
      }
    }
    fetchGenres()
  }, [])

  useEffect(() => {
    if (isServerLoading) {
      setTimeout(() => {
        toast.info(
          'Be patient, server is waking up... It can take approximately 60 seconds.'
        )
      }, 5000)
    }
  }, [isServerLoading])

  const handleGenerate = () => {
    if (!selectedGenre) {
      toast.info('Please select the genre.')
      return
    } else if (!tempoBpm) {
      toast.info('Please select tempo of the piece.')
      return
    } else if (!length) {
      toast.info('Please select length of the piece.')
      return
    } else if (!randomness && randomness != 0) {
      toast.info('Please select randomness.')
      return
    }
    onGenerate({
      genre: selectedGenre,
      bpm: tempoBpm,
      length: length,
      randomness: randomness,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 p-4">
      <h2 className="text-2xl">Set Song Parameters</h2>
      <div className="flex flex-col gap-10">
        {genres.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {genres.map((genre) => (
              <Button
                variant="default"
                key={genre.code}
                className={cn(
                  selectedGenre === genre.code ? 'bg-blue hover:bg-blue/80' : ''
                )}
                onClick={() => setSelectedGenre(genre.code)}
              >
                {genre.name}
              </Button>
            ))}
          </div>
        ) : isServerLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <Skeleton key={i} className="w-[160px] h-[40px] bg-gray" />
            ))}
          </div>
        ) : (
          <div className="text-center">No genres found.</div>
        )}
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <div className="flex flex-col items-start justify-center gap-4 h-full min-w-fit">
            <div>Tempo (BPM)</div>
            <div>Length (tokens)</div>
            <div>Randomness</div>
          </div>
          <div className="flex flex-col items-center justify-around w-full h-full gap-4">
            <Slider
              className="w-full bg-blue"
              defaultValue={[tempoBpm]}
              value={[tempoBpm]}
              onValueChange={(e) => setTempoBpm(e[0])}
              min={50}
              max={200}
              step={1}
            />
            <Slider
              className="w-full bg-blue"
              defaultValue={[length]}
              value={[length]}
              onValueChange={(e) => setLength(e[0])}
              min={10}
              max={500}
              step={1}
            />
            <Slider
              className="w-full bg-blue"
              defaultValue={[randomness]}
              value={[randomness]}
              onValueChange={(e) => setRandomness(e[0])}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
          <div className="flex flex-col items-end justify-center h-full min-w-12 gap-4">
            <div>{tempoBpm}</div>
            <div>{length}</div>
            <div>{randomness}</div>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        disabled={isGenerating || isServerLoading}
        onClick={handleGenerate}
        className="bg-blue"
      >
        Generate Music
      </Button>
    </div>
  )
}

export { Parameters }
