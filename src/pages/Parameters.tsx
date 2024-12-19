import { Button } from '@/components/Button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { getGenres } from '@/services'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

type ParametersProps = {
  onGenerate: (params: {
    genre: string
    tempo: number
    duration: number
  }) => void
}

const Parameters: React.FC<ParametersProps> = ({ onGenerate }) => {
  const [genres, setGenres] = useState<{ code: string; name: string }[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [tempo, setTempo] = useState<number | null>(120) // Default tempo
  const [duration, setDuration] = useState<number | null>(30) // Default duration in seconds

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres()
        setGenres(genresData)
      } catch (error) {
        toast.error('Error fetching genres: ' + error)
      }
    }
    fetchGenres()
  }, [])

  const handleGenerate = () => {
    if (!selectedGenre || !tempo || !duration) {
      toast.error('Please select all parameters.')
      return
    }
    onGenerate({ genre: selectedGenre, tempo, duration })
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 p-4">
      <h2 className="text-2xl">Set Song Parameters</h2>
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
      ) : (
        'No genres found.'
      )}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col items-center gap-4">
          <label className="text-light-gray">Tempo (BPM)</label>
          <Input
            type="number"
            value={tempo || ''}
            onChange={(e) => setTempo(Number(e.target.value))}
            placeholder="Enter tempo"
            className="w-24"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <label className="text-light-gray">Duration (seconds)</label>
          <Input
            type="number"
            value={duration || ''}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
      <Button variant="outline" onClick={handleGenerate} className="bg-blue">
        Generate Music
      </Button>
    </div>
  )
}

export { Parameters }
