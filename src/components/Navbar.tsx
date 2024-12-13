type NavbarProps = {
  scrollTo: (page: number) => void
}
const Navbar: React.FC<NavbarProps> = ({ scrollTo }) => {
  return (
    <div
      className="w-full h-20 bg-black flex  flex-row justify-between items-center text-xl px-16 opacity-80"
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
          onClick={() => scrollTo(4)}
        >
          About
        </div>
      </div>
    </div>
  )
}

export { Navbar }
