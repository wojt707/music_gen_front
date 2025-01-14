import { Button } from '@/components'

const About: React.FC = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-full w-full gap-2 min-[330px]:gap-10 p-4 text-center">
      <div className="flex flex-col justify-center items-center h-full w-full gap-2 min-[330px]:gap-10 ">
        <h2 className="text-2xl">How it works?</h2>
        <div className="flex flex-col gap-4 min-[370px]:gap-10 max-w-[701px] min-[430px]:px-8 text-justify text-xs">
          <div>
            MidiForge is an AI-powered music generation tool designed not to
            replace artists, but to assist them. By using advanced deep learning
            techniques trained on a diverse dataset, MidiForge combines
            creativity with the distinctive styles of various musical genres.
          </div>
          <div>
            The name reflects the idea of forging - shaping and crafting unique
            compositions from scratch. Simply select your desired genre, tempo,
            and other parameters, and let the system compose MIDI pieces for
            you. Whether you're a musician, producer, or hobbyist, explore the
            limitless potential of AI-driven music composition with ease!
          </div>
          <div>
            Keep in mind, though, that while MidiForge tries to create
            harmonious and creative compositions, AI isn’t perfect. Some
            generated pieces might not meet expectations and could sound
            experimental or even like "musical trash". But don’t let that stop
            you - embrace the process, experiment with different settings, and,
            most importantly, have fun!
          </div>
        </div>
      </div>
      <div>
        <div>
          <Button variant="link" className="animate-pulse hover:animate-none">
            <a href="https://www.linkedin.com/in/wdolibog/" target="_blank">
              LinkedIn
            </a>
          </Button>
          <Button variant="link" className="animate-pulse hover:animate-none">
            <a href="https://github.com/wojt707" target="_blank">
              GitHub
            </a>
          </Button>
        </div>
        <div>© Wojciech Dolibóg 2025</div>
      </div>
    </div>
  )
}

export { About }
