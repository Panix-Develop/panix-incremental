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
- **Config Editor**: (Dev mode only) Edit resources, tiles, drones, and structures in-browser
- **Live Preview**: Real-time visual feedback when editing configs
- **Config Relationships**: Automatic dropdown updates when adding new entities
- **Import/Export**: Share or backup custom configurations as JSON
- **Debug Panel**: Add resources, view rates, and test features
- **Unit Tests**: 333 tests with 79% coverage using Vitest
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
│   │   ├── resources.js # Resource definitions
│   │   ├── structures.js # Structure definitions
│   │   └── tiles.js     # Tile type definitions
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
│   │   ├── ConfigManager.js # Config validation and relationships
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
│   │   ├── devMode.js   # Dev mode detection
│   │   └── configStorage.js # Secure config storage
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

Enable dev mode to access the Config Editor and customize game content:

### Accessing Dev Mode

1. Run the development server (`npm run dev`)
2. The Config Editor tab will appear in navigation
3. Access is restricted to development builds only

### Config Editor Features

#### Resource Management
- **Create custom resources** with unique icons and base rates
- **Edit existing resources** (iron, silicon, energy)
- **Delete unused resources** (dependencies are checked)
- **Live preview** shows resource icon and usage count

#### Tile Type Management
- **Create tile types** that produce specific resources
- **Configure base production rates** for each tile
- **Set allowed drone types** for tile restrictions
- **Live preview** shows hex tile with resource info

#### Structure Editor (Form-Based UI)
- **Basic Info**: ID, name, description (with i18n keys)
- **Tier & Type**: Unlimited tiers, categorized as energy/production/mining/research/storage
- **Costs**: Add multiple resource costs with dynamic dropdowns
- **Production**: Configure which resource is produced and at what rate
- **Tile Restrictions**: Multi-select which tile types allow this structure
- **Live Preview**: See structure on hex tile with tier indicators

#### Drone Editor (Form-Based UI)
- **Basic Info**: ID, name, description (with i18n keys)
- **Costs**: Add multiple resource costs for building the drone
- **Components**: Select required components (chassis, circuit, powerCore)
- **Gathering**: Configure gathering capacity/rate
- **Tile Restrictions**: Choose which tile types this drone can work on
- **Live Preview**: See drone stat card with costs and capabilities

### Config Relationships

The config system automatically handles entity relationships:

- **Auto-updating dropdowns**: When you create a new resource, it immediately appears in structure cost dropdowns
- **Dependency checking**: Cannot delete a resource if structures or drones use it
- **Validation**: All entities are validated before saving (unique IDs, required fields, etc.)
- **Event system**: Changes propagate instantly without page reload

### Import/Export Configurations

**Export**: Save your custom configs to a JSON file
```
Click [Export All] → Downloads "panix-config-YYYY-MM-DD.json"
```

**Import**: Load configs from a JSON file
```
Click [Import] → Select JSON file → Review summary → Confirm
```

**Config Format**:
```json
{
  "version": "2.0",
  "timestamp": "2026-01-08T12:00:00.000Z",
  "resources": { ... },
  "tiles": { ... },
  "structures": { ... },
  "drones": { ... }
}
```

### Config Storage

- **Dev Mode**: Configs save to localStorage with `dev_` prefix
- **Production**: Configs are bundled into minified JS (secure, not editable)
- **Security**: Config editor is completely disabled in production builds
- Changes in dev mode are preserved across browser sessions

**Note**: Dev mode is only available when running `npm run dev`, not in production builds.

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
- 333 tests across 10 test files
- 79% code coverage (core systems at 97-100%)
- Tests for all core systems (Resource, Crafting, Drone, Structure, Config managers)
- Utility function tests (hex math, formatting, i18n, save/load, config storage)

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

### Completed (v2.1 - Stage 3)
- ✅ Core resource gathering and generation
- ✅ Component crafting system
- ✅ Drone building and deployment
- ✅ Structure building (solar panels, mining facilities)
- ✅ Settings system with localization
- ✅ Full English and German translations
- ✅ Comprehensive testing framework
- ✅ Auto-save and manual save/load
- ✅ Production build translation loading
- ✅ Structure tier indicators on map
- ✅ Live resource updates in all scenes
- ✅ Drone capacity color indicators
- ✅ Form-based config editor for all entity types
- ✅ Config validation and relationship management
- ✅ Live preview system for configs
- ✅ Secure config storage (dev-only editing)
- ✅ Config import/export functionality

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
