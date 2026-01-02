# MidiForge


AI-powered MIDI music generation application. Generate unique compositions by specifying parameters and genre preferences.

### Checkout working demo on [Midi Forge](https://midiforge.onrender.com)!

## Features

- AI-powered MIDI generation with customizable parameters and genre selection
- Interactive piano roll visualization
- Real-time music playback with piano samples

## Tech Stack

- React 18.3 + TypeScript 5.6
- Vite 5.4 with HMR
- Tailwind CSS + Shadcn/ui
- Tone.js for audio playback
- Axios for API communication

## Quick Start

### Prerequisites

Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/wojt707/music_gen_front.git
cd music_gen_front
npm install
```

### Configuration

Update `.env` with your backend URL just like in `.env.example`:

```env
VITE_BACKEND_URL=<your_backend_url>
```

### Development

```bash
npm run dev
```

Available at `http://localhost:5173`

### Build

```bash
npm run build
```

## API Endpoints

- `POST /generate` - Generate MIDI
- `GET /genres` - Fetch available genres
- `GET /samples/{note}` - Get piano samples

## License

See [LICENSE](LICENSE) file.
