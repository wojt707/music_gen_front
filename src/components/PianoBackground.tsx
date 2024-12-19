import { ParallaxLayer } from '@react-spring/parallax'
import pianoImg from '@/assets/piano-pixel.png'

type PianoBackgroundProps = {
  screenWidth: number
  numberOfPages: number
}

const PianoBackground: React.FC<PianoBackgroundProps> = ({
  screenWidth,
  numberOfPages,
}) => {
  if (screenWidth <= 1200) return null
  return (
    <ParallaxLayer
      offset={-0.5}
      speed={-0.3}
      factor={numberOfPages}
      style={{
        backgroundImage: `url(${pianoImg})`,
        backgroundRepeat: 'repeat-y',
      }}
    />
  )
}
export { PianoBackground }
