import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useRef } from 'react'
import { Navbar } from './components'
import { Content } from './pages'

const App: React.FC = () => {
  const numberOfPages = 5
  const numberOfNotes = 200
  const pianoWidth = 245 // Piano keyboard width in pixels

  const notes = Array.from({ length: numberOfNotes }, (_, i) => ({
    id: i,
    src: `src/assets/note${Math.floor(Math.random() * 14)}.png`, // note0.png to note13.png
    offset: Math.random() * numberOfPages, // Random offset within pages
    speed: Math.random() * 3 - 1.5, // Random speed between -1.5 and 1.5
    opacity: Math.random() * 0.5 + 0.5, // Random opacity between 0.5 and 1
    width: Math.random() * 80 + 20, // Random width between 20px and 100px
    leftMargin: Math.random() * 90 + 5, // Random left margin between 5% and 95%
  }))

  const parallaxRef = useRef<IParallax>(null!)

  const scrollTo = (page: number) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(page)
    }
  }

  return (
    <div className="text-white">
      <Parallax pages={numberOfPages} ref={parallaxRef}>
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={numberOfPages}
          style={{
            backgroundImage: 'url(src/assets/back2.png)',
            backgroundRepeat: 'repeat',
          }}
        />
        <ParallaxLayer
          offset={-0.5}
          speed={-0.3}
          factor={numberOfPages}
          style={{
            backgroundImage: 'url(src/assets/piano-pixel.png)',
            backgroundRepeat: 'repeat-y',
          }}
        />
        <ParallaxLayer
          sticky={{ start: 0, end: numberOfPages }}
          style={{ pointerEvents: 'none' }}
        >
          <Navbar scrollTo={scrollTo} />
        </ParallaxLayer>
        {notes.map((note) => (
          <ParallaxLayer
            key={note.id}
            offset={note.offset}
            speed={note.speed}
            style={{ opacity: note.opacity }}
          >
            <img
              src={note.src}
              style={{
                width: `${note.width}px`,
                marginLeft: `calc((100% - ${pianoWidth}px)*${note.leftMargin}/100 + ${pianoWidth}px)`,
              }}
            />
          </ParallaxLayer>
        ))}
        <Content pianoWidth={pianoWidth} onScrollTo={scrollTo} />
      </Parallax>
    </div>
  )
}

export { App }
