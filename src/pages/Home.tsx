import { Button } from '@/components/Button'

type HomeProps = {
  onScrollTo: (page: number) => void
}
const Home: React.FC<HomeProps> = ({ onScrollTo }) => {
  return (
    <div
      className={`flex flex-col items-end justify-center gap-4 h-full mr-[15%]`}
    >
      <div className="text-8xl">MidiForge</div>
      <div className="text-lg">Everyone is a musician.</div>
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
