type NavbarProps = {
  scrollTo: (page: number) => void
}
const Navbar: React.FC<NavbarProps> = ({ scrollTo }) => {
  return (
    <div
      className="w-full h-20 bg-black/80 backdrop-blur-sm flex flex-row justify-between items-center text-xl px-16"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className="cursor-pointer hover:text-white/80 active:text-white/60"
        onClick={() => scrollTo(0)}
      >
        MidiForge
      </div>
      <div className="h-full flex flex-row items-center justify-end gap-16">
        <div
          className="h-1/2 flex items-center cursor-pointer hover:text-white/80 active:text-white/60"
          onClick={() => scrollTo(0)}
        >
          Home
        </div>
        <div
          className="h-1/2 flex items-center cursor-pointer hover:text-white/80 active:text-white/60"
          onClick={() => scrollTo(1)}
        >
          Generator
        </div>
        <div
          className="h-1/2 flex items-center cursor-pointer hover:text-white/80 active:text-white/60"
          onClick={() => scrollTo(2)}
        >
          Preview
        </div>
        <div
          className="h-1/2 flex items-center cursor-pointer hover:text-white/80 active:text-white/60"
          onClick={() => scrollTo(3)}
        >
          About
        </div>
      </div>
    </div>
  )
}

export { Navbar }
