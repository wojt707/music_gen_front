import { Button } from '@/components/ui/button'

type GenerateProps = {
  onGenerate: () => void
}
const Generate: React.FC<GenerateProps> = ({ onGenerate }) => {
  return (
    <div className={`flex items-center justify-center h-full`}>
      <Button className="bg-blue hover:opacity-80" onClick={onGenerate}>
        Generate Music
      </Button>
    </div>
  )
}

export { Generate }
