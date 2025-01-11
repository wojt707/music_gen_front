import { Button } from '@/components/Button'
import { Skeleton, Slider } from '@/components/ui'
import { cn } from '@/lib/utils'
import { getGenres } from '@/services'
import { BackendError, GenerateMidiParams, Genre } from '@/types'
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
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [tempoBpm, setTempoBpm] = useState<number>(120) // Tempo in bpm
  const [length, setLength] = useState<number>(200) // Number of words (tokens) in the piece
  const [randomness, setRandomness] = useState<number>(0) // Randomness of the song
  const [isServerLoading, setIsServerLoading] = useState<boolean>(false)

  const handleSelect = (genre: Genre) => {
    setSelectedGenre(genre.code)
    setTempoBpm(genre.bpm)
  }

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
    setTimeout(() => {
      if (isServerLoading) {
        toast.info(
          'Be patient, server is waking up... It can take couple of seconds.'
        )
      }
    }, 5000)
  }, [isServerLoading])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 p-4">
      <h2 className="text-2xl text-center">Set song parameters.</h2>
      <div className="flex flex-col gap-10">
        {genres.length ? (
          <div className="grid grid-cols-1 min-[370px]:grid-cols-2 md:grid-cols-4 mx-auto gap-4">
            {genres.map((genre) => (
              <Button
                variant="default"
                key={genre.code}
                className={cn(
                  selectedGenre === genre.code ? 'bg-blue hover:bg-blue/80' : ''
                )}
                onClick={() => handleSelect(genre)}
              >
                {genre.name}
              </Button>
            ))}
          </div>
        ) : isServerLoading ? (
          <div className="grid grid-cols-1 min-[370px]:grid-cols-2 md:grid-cols-4 mx-auto gap-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <Skeleton key={i} className="w-[160px] h-[40px] bg-gray" />
            ))}
          </div>
        ) : (
          <div className="text-center">No genres found.</div>
        )}
        {window.innerWidth > 500 ? (
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <div className="flex flex-col items-start justify-center gap-4 h-full min-w-fit">
              <div>Tempo (BPM)</div>
              <div>Length (tokens)</div>
              <div>Randomness (%)</div>
            </div>
            <div className="flex flex-col items-center justify-around min-w-40 w-full h-full gap-4">
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
                min={-100}
                max={100}
                step={1}
              />
            </div>
            <div className="flex flex-col items-end justify-center h-full min-w-12 gap-4">
              <div>{tempoBpm}</div>
              <div>{length}</div>
              <div>{randomness}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <div>Tempo (BPM)</div>
            <div className="flex flex-row items-center w-full gap-4">
              <Slider
                className="w-full bg-blue"
                defaultValue={[tempoBpm]}
                value={[tempoBpm]}
                onValueChange={(e) => setTempoBpm(e[0])}
                min={50}
                max={200}
                step={1}
              />
              <div className="min-w-12">{tempoBpm}</div>
            </div>
            <div>Length (tokens)</div>
            <div className="flex flex-row items-center w-full gap-4">
              <Slider
                className="w-full bg-blue"
                defaultValue={[length]}
                value={[length]}
                onValueChange={(e) => setLength(e[0])}
                min={10}
                max={500}
                step={1}
              />
              <div className="min-w-12">{length}</div>
            </div>
            <div>Randomness (%)</div>
            <div className="flex flex-row items-center w-full gap-4">
              <Slider
                className="w-full bg-blue"
                defaultValue={[randomness]}
                value={[randomness]}
                onValueChange={(e) => setRandomness(e[0])}
                min={-100}
                max={100}
                step={1}
              />
              <div className="text-center">{randomness}</div>
            </div>
          </div>
        )}
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
