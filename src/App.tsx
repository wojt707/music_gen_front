import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { memo, useRef } from 'react'
import { Navbar, PianoBackground } from './components'
import { Content } from './pages'
import backgroundImg from '@/assets/back1.png'

type BackgroundNote = {
  id: number
  src: string
  offset: number
  speed: number
  opacity: number
  width: number
  leftMargin: number
}

const App: React.FC = () => {
  const numberOfPages = 3.5
  const numberOfNotes = 100
  const pianoWidth = window.innerWidth > 1200 ? 245 : 0 // Background piano keyboard width in pixels

  const notes: BackgroundNote[] = Array.from(
    { length: numberOfNotes },
    (_, i) => ({
      id: i,
      src: `src/assets/note${Math.floor(Math.random() * 14)}.png`, // note0.png to note13.png
      offset: Math.random() * numberOfPages, // Random offset within pages
      speed: Math.random() * 3 - 1.5, // Random speed between -1.5 and 1.5
      opacity: Math.random() * 0.5 + 0.5, // Random opacity between 0.5 and 1
      width: Math.random() * 80 + 20, // Random width between 20px and 100px
      leftMargin: Math.random() * 90 + 5, // Random left margin between 5% and 95%
    })
  )

  const parallaxRef = useRef<IParallax | null>(null)

  const scrollTo = (page: number) => {
    parallaxRef.current?.scrollTo(page)
  }

  const Note = memo(({ note }: { note: BackgroundNote }) => (
    <ParallaxLayer
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
  ))

  return (
    <div className="text-white font-dogicapixel">
      <Parallax pages={numberOfPages} ref={parallaxRef}>
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={numberOfPages}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: 'repeat',
          }}
        />
        <PianoBackground
          screenWidth={window.innerWidth}
          numberOfPages={numberOfNotes}
        />
        <ParallaxLayer
          sticky={{ start: 0, end: numberOfPages }}
          style={{ pointerEvents: 'none' }}
        >
          <Navbar scrollTo={scrollTo} />
        </ParallaxLayer>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
        <Content pianoWidth={pianoWidth} onScrollTo={scrollTo} />
      </Parallax>
    </div>
  )
}

export { App }
