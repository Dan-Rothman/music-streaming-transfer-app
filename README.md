# Music Streaming Transfer Application

A free, client-side web application for transferring songs, playlists, and favorites between different music streaming services.

## UI/UX Development Environment Setup ✅

The UI/UX development environment has been successfully configured!

### Technologies Installed

- **React 18+** - Frontend framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **React Icons** - Icon library
- **Dark Mode** - Pre-configured with Tailwind

### Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (TopBar, ServicePane, etc.)
│   ├── auth/            # Authentication components
│   ├── library/         # Library display components
│   ├── transfer/        # Transfer-related components
│   └── common/          # Reusable UI components
├── adapters/            # Service-specific API adapters
├── services/            # Business logic
├── hooks/               # Custom React hooks (including theme)
├── utils/               # Utility functions
└── styles/              # Global styles
```

### Development Server

The development server is currently running at:
**http://localhost:5173/**

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### What's Already Built

✅ Dual-pane layout with resizable divider
✅ Top navigation bar with app branding
✅ Service selector dropdowns (Spotify, Qobuz)
✅ Connect buttons for authentication
✅ Search/filter bars in each pane
✅ Selection counter display
✅ Center transfer button
✅ Bottom status bar
✅ Dark mode theme (default)
✅ Responsive layout structure

### Next Steps for Development

According to the design document, the next phases are:

1. **Phase 2: Authentication & Security** (Week 3)
   - Implement OAuth flows for Spotify and Qobuz
   - Set up credential storage (localStorage/sessionStorage)
   - Build authentication state management

2. **Phase 3-4: API Integration** (Weeks 4-5)
   - Create service adapters for Spotify and Qobuz
   - Implement library fetching and display
   - Add real data to the UI components

3. **Phase 5: Transfer Engine** (Weeks 6-7)
   - Build song matching algorithm
   - Implement transfer logic and progress tracking
   - Add duplicate detection and missing track resolution

### Design Reference

All UI/UX decisions are based on the `Music_Streaming_Transfer_App_Design_Document.md` file in the parent directory.

### Key Design Features

- **Dual-pane interface** - Familiar file-transfer style layout
- **Dark mode aesthetic** - Professional, modern appearance
- **Keyboard shortcuts** - Full keyboard navigation support
- **Multi-select** - Ctrl+Click, Shift+Click, Ctrl+A selection
- **Progress tracking** - Real-time transfer progress and statistics

---

## License

MIT License (recommended per design document)

## Version

v1.0.0
