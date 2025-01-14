import { ParallaxLayer } from '@react-spring/parallax'

type PageWrapperProps = {
  pianoWidth: number
  offset: number
  children: React.ReactNode
}
const PageWrapper: React.FC<PageWrapperProps> = ({
  pianoWidth,
  offset,
  children,
}) => {
  return (
    <ParallaxLayer
      offset={offset}
      speed={window.innerHeight > 700 ? 0.5 : 1}
      style={{
        marginLeft: `${pianoWidth}px`,
        width: `calc(100%-${pianoWidth}px)`,
      }}
    >
      <div className="h-screen flex flex-col justify-end">
        <div className="h-[calc(100vh-80px)]">{children}</div>
      </div>
    </ParallaxLayer>
  )
}

export { PageWrapper }
