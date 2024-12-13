import { Button } from '@/components/ui/button'

type PreviewProps = {
  downloadUrl: string | null
}
const Preview: React.FC<PreviewProps> = ({ downloadUrl }) => {
  const handleDownload = () => {
    if (downloadUrl) {
      const anchor = document.createElement('a')
      anchor.href = downloadUrl
      anchor.download = 'generated-midi.mid'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    } else {
      alert('No file available for download.')
    }
  }
  return (
    <div className={`flex flex-col items-center justify-center gap-4 h-full`}>
      <div>Preview your generated music here (e.g., Piano Roll)</div>
      <Button
        className="bg-green hover:opacity-80"
        onClick={handleDownload}
        disabled={!downloadUrl}
      >
        Download MIDI File
      </Button>
    </div>
  )
}

export { Preview }
