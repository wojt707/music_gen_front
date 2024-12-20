import { Button } from '@/components'

const About: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center">
      <div>
        <Button variant="link">
          <a href="https://www.linkedin.com/in/wdolibog/" target="_blank">
            LinkedIn
          </a>
        </Button>
        <Button variant="link">
          <a href="https://github.com/wojt707" target="_blank">
            GitHub
          </a>
        </Button>
      </div>
      <div>© Wojciech Dolibóg 2024</div>
    </div>
  )
}

export { About }
