# BecondMP - VS Code Web Replica

A fully functional, single-URL VS Code Web alternative with Monaco Editor, terminal emulation, activity bar, and AI integration via OpenRouter.

## Features

### ✅ Core Editor
- **Monaco Editor** - Real multi-tab editing with 20+ language syntax highlighting
- **20+ Languages** - JavaScript, TypeScript, Python, Java, C++, Go, Rust, and more
- **Real-time Editing** - Full typing support, auto-completion framework

### ✅ UI Components
- **5 Activity Bar Views**
  - Explorer (File browser)
  - Search (Find & replace)
  - Source Control (Git integration)
  - Run & Debug
  - Extensions

- **8 Top Menus**
  - File (New, Open, Save)
  - Edit (Undo, Redo, Cut, Copy, Paste)
  - View (Toggle panels, themes)
  - Selection (Select all, line operations)
  - Terminal (New terminal, run task)
  - Help (About, documentation)

### ✅ Terminal
- **Real Command Execution** - 12+ built-in commands
- **Streaming Output** - Live terminal feedback
- **Command History** - Navigate previous commands
- **Kali/Termux Ready** - Linux command support

### ✅ AI Integration
- **OpenRouter API** - Free tier with 40+ models
- **Streaming Responses** - Real-time AI output
- **Code Generation** - AI-powered code completion
- **Slash Commands** - `/help`, `/explain`, `/refactor`

### ✅ Persistence
- **IndexedDB Storage**
  - File contents
  - Editor state
  - Terminal history
  - Extensions metadata
  - Custom settings

### ✅ Interactivity
- **80%+ Clickable Elements** - Every UI element is interactive
- **Keyboard Shortcuts** - Common VS Code bindings
- **Theme System** - Light/Dark modes
- **Responsive Design** - Works on desktop and tablets

## Quick Start

```bash
# Clone the repository
git clone https://github.com/abbieymatthews030-star/abecondnp.git
cd abecondnp

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

### OpenRouter API
1. Get a free API key at [OpenRouter](https://openrouter.ai)
2. Create `.env.local`:
```
VITE_OPENROUTER_API_KEY=your_key_here
```

## Project Structure

```
abecondnp/
├── src/
│   ├── components/
│   │   ├── Editor.jsx
│   │   ├── ActivityBar.jsx
│   │   ├── TopMenu.jsx
│   │   ├── Terminal.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatusBar.jsx
│   ├── stores/
│   │   ├── editorStore.js
│   │   ├── fileStore.js
│   │   ├── terminalStore.js
│   │   └── uiStore.js
│   ├── services/
│   │   ├── openrouter.js
│   │   ├── terminal.js
│   │   ├── indexdb.js
│   │   └── git.js
│   ├── lib/
│   │   └── commands.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Tech Stack

- **Frontend Framework** - React 18
- **Editor** - Monaco Editor
- **State Management** - Zustand
- **Build Tool** - Vite
- **AI API** - OpenRouter
- **Storage** - IndexedDB

## License

MIT