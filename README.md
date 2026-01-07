# Panix Incremental

A space-themed incremental/idle game built with Phaser 3. Explore a hex-based star map, gather resources, craft components, build drones, and construct structures to expand your galactic empire.

## Features

### Core Gameplay
- **Hex Grid Map**: 10×10 hex grid with iron and silicon resource tiles
- **Starting Base**: Generates 1 iron/sec automatically
- **Resource Management**: Track iron, silicon, and energy
- **Component Crafting**: Craft drone components (chassis, circuits, power cores)
- **Drone System**: Build gathering drones and deploy them to resource tiles
- **Structure Building**: Build solar panels and mining facilities on tiles
- **Research System**: (Coming soon) Unlock upgrades and new technologies
- **Galaxy Exploration**: (Coming soon) Expand to new star systems

### UI/UX Features
- **Modular CSS**: Organized styles with CSS variables for consistency
- **Tab Navigation**: Switch between Map, Crafting, Drones, Structures, Research, Galaxy, and Settings
- **Locked Pages**: Research and Galaxy pages locked until requirements met
- **Number Formatting**: Choose between normal, scientific, or engineering notation
- **Localization**: Full English and German translations with live language switching
- **Settings Page**: Customize number format, language, and player name
- **Auto-Save**: Game saves every 30 seconds automatically
- **Save/Load System**: Persistent storage using localStorage

### Developer Features
- **Config Editor**: (Dev mode only) Edit drones, structures, and research in-browser
- **Debug Panel**: Add resources, view rates, and test features
- **Unit Tests**: 312 tests with 85% coverage using Vitest
- **Hot Reload**: Development server with instant updates

## Setup

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd panix-incremental

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:3001`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Run all tests
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
panix-incremental/
├── src/
│   ├── config/          # Game configuration and balance
│   │   ├── balance.js   # Resource rates, costs, generation
│   │   ├── mapConfig.js # Map layout and tile distribution
│   │   ├── recipes.js   # Crafting and drone recipes
│   │   └── structures.js # Structure definitions
│   ├── locales/         # Translation files
│   │   ├── en.json      # English translations
│   │   └── de.json      # German translations
│   ├── scenes/          # Phaser scenes (game pages)
│   │   ├── MapScene.js
│   │   ├── CraftingScene.js
│   │   ├── DronesScene.js
│   │   ├── StructuresScene.js
│   │   ├── ResearchScene.js
│   │   ├── GalaxyScene.js
│   │   ├── SettingsScene.js
│   │   └── ConfigScene.js
│   ├── styles/          # Modular CSS
│   │   ├── base.css     # Variables, resets
│   │   ├── components.css # Buttons, cards, panels
│   │   ├── pages.css    # Page-specific styles
│   │   └── utilities.css # Helper classes
│   ├── systems/         # Core game logic managers
│   │   ├── ResourceManager.js
│   │   ├── CraftingManager.js
│   │   ├── DroneManager.js
│   │   ├── StructureManager.js
│   │   ├── SettingsManager.js
│   │   └── HexGrid.js
│   ├── ui/              # UI components
│   │   ├── TabNavigation.js
│   │   ├── ResourcePanel.js
│   │   ├── TileInfoPanel.js
│   │   └── LockedPageOverlay.js
│   ├── utils/           # Utility functions
│   │   ├── saveLoad.js  # Save/load system
│   │   ├── i18n.js      # Internationalization
│   │   ├── formatNumber.js # Number formatting
│   │   ├── hexMath.js   # Hex grid math
│   │   └── devMode.js   # Dev mode detection
│   └── main.js          # Game initialization
├── .tasks/              # Project task lists and PRDs
├── index.html           # Entry point
├── style.css            # Legacy styles (being phased out)
└── vitest.config.js     # Test configuration
```

## Localization

The game supports multiple languages with full UI translation:

- **English (en)**: Default language
- **German (de)**: Complete translation

### Adding a New Language

1. Create a new JSON file in `src/locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json`
3. Translate all values (keep keys in English)
4. Add language option to Settings scene
5. Test language switching

### Using Translations in Code

```javascript
import { t } from './utils/i18n.js';

// Simple translation
const text = t('navigation.map'); // "Map"

// Translation with parameters
const message = t('crafting.cost', { iron: 10, silicon: 5 });
// "Cost: 10 Iron, 5 Silicon"
```

## Dev Mode

Enable dev mode to access the Config Editor:

1. Run the development server (`npm run dev`)
2. The Config Editor tab will appear in navigation
3. Edit drones, structures, and research in real-time
4. Export/import JSON configurations
5. Changes save to localStorage (not persisted to files)

Dev mode is only available when running `npm run dev`, not in production builds.

## Browser Compatibility

Tested and working on:
- Chrome/Edge (Chromium-based) - Primary development browser
- Firefox - Full compatibility
- Safari - Full compatibility (WebKit)

Requires modern browser with ES6+ support.

## Testing

The project uses Vitest for unit testing:

```bash
# Run tests in watch mode
npm run test

# Run once (for CI)
npm run test:run

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- 312 tests across 9 test files
- 85% code coverage
- Tests for all core systems (Resource, Crafting, Drone, Structure managers)
- Utility function tests (hex math, formatting, i18n, save/load)

## Save System

The game automatically saves every 30 seconds to localStorage. Your progress includes:
- Resources (iron, silicon, energy)
- Component inventory (chassis, circuits, power cores)
- Built drones (available and deployed)
- Structure placements and states
- Game settings (language, number format, player name)

### Hard Reset

To clear all save data and start fresh:
1. Open the Debug Panel (toggle button in resource panel)
2. Click "Hard Reset"
3. Confirm the action
4. Game will reload with fresh state

**Note**: Old saves from v1.0 are not compatible with v2.0. A hard reset is required after upgrading.

## Roadmap

### Completed (v2.0)
- ✅ Core resource gathering and generation
- ✅ Component crafting system
- ✅ Drone building and deployment
- ✅ Structure building (solar panels, mining facilities)
- ✅ Settings system with localization
- ✅ Full English and German translations
- ✅ Comprehensive testing framework
- ✅ Auto-save and manual save/load
- ✅ Dev mode config editor

### Planned Features
- 🔲 Research system with tech tree
- 🔲 Galaxy expansion and exploration
- 🔲 More resource types and structures
- 🔲 Achievements and statistics
- 🔲 Prestige/rebirth mechanic
- 🔲 Additional languages (French, Spanish, etc.)

## Contributing

This is a personal project, but feedback and bug reports are welcome via GitHub issues.

## License

[Add your license here]

## Acknowledgments

- Built with [Phaser 3](https://phaser.io/) - Game framework
- Testing with [Vitest](https://vitest.dev/) - Fast unit testing
- Bundled with [esbuild](https://esbuild.github.io/) - Fast bundler
