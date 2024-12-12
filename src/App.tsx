import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useRef } from 'react'

const App: React.FC = () => {
  const numberOfPages = 6
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
    <div>
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
          <div
            className="w-full h-20 bg-black text-white flex  flex-row justify-between items-center text-xl px-16"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="cursor-pointer" onClick={() => scrollTo(0)}>
              MidiForge
            </div>
            <div className="h-full flex flex-row items-center justify-end gap-16">
              <div
                className="h-1/2 flex items-center cursor-pointer hover:opacity-80"
                onClick={() => scrollTo(0)}
              >
                Home
              </div>
              <div
                className="h-1/2 flex items-center cursor-pointer hover:opacity-80"
                onClick={() => scrollTo(1)}
              >
                Generator
              </div>
              <div
                className="h-1/2 flex items-center cursor-pointer hover:opacity-80"
                onClick={() => scrollTo(5)}
              >
                About
              </div>
            </div>
          </div>
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
        <ParallaxLayer offset={0} speed={0.5}>
          <div
            className={`flex flex-col items-end justify-center gap-4 h-full ml-[${pianoWidth}px] mr-[20%] text-white`}
          >
            <div className="text-8xl">MidiForge</div>
            <div className="text-lg">Everyone is a musician.</div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <div
            className={`flex flex-col items-center justify-center h-full ml-[${pianoWidth}px] text-lg text-white`}
          >
            <p>Set the Parameters:</p>
            <label className="mt-2">
              Tempo:
              <input
                type="number"
                placeholder="Enter tempo"
                className="ml-2 px-2 py-1 bg-gray-700 text-white border border-gray-500"
              />
            </label>
            <label className="mt-2">
              Duration:
              <input
                type="number"
                placeholder="Enter duration in seconds"
                className="ml-2 px-2 py-1 bg-gray-700 text-white border border-gray-500"
              />
            </label>
            <label className="mt-2">
              Genre:
              <select className="ml-2 px-2 py-1 bg-gray-700 text-white border border-gray-500">
                <option>Classical</option>
                <option>Jazz</option>
                <option>Pop</option>
                <option>Rock</option>
              </select>
            </label>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.5}>
          <div
            className={`flex items-center justify-center h-full ml-[${pianoWidth}px] text-2xl text-white`}
          >
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Generate Music
            </button>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.5}>
          <div
            className={`flex items-center justify-center h-full ml-[${pianoWidth}px] text-2xl text-white`}
          >
            <p>Preview your generated music here (e.g., Piano Roll)</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0.5}>
          <div
            className={`flex items-center justify-center h-full ml-[${pianoWidth}px] text-2xl text-white`}
          >
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              onClick={() => console.log(123)}
            >
              Download MIDI
            </button>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={0.5}>
          <div
            className={`flex items-center justify-center h-full ml-[${pianoWidth}px] text-2xl text-white`}
          >
            About
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

export { App }
