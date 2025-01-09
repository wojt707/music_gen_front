import { Button } from '@/components/Button'

type HomeProps = {
  onScrollTo: (page: number) => void
}
const Home: React.FC<HomeProps> = ({ onScrollTo }) => {
  return (
    <div
      className={`flex flex-col items-end justify-center gap-4 h-full w-fit mx-auto lg:ml-auto lg:mr-[15%]`}
    >
      <div className="md:text-8xl sm:text-7xl min-[400px]:text-5xl text-4xl">
        MidiForge
      </div>
      <div className="sm:text-lg min-[400px]:text-base text-sm">
        Everyone is a musician.
      </div>
      <Button
        variant="outline"
        className="animate-pulse hover:animate-none"
        onClick={() => onScrollTo(1)}
      >
        Try it!
      </Button>
    </div>
  )
}

export { Home }
