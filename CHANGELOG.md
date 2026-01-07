# Changelog

All notable changes to Panix Incremental will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-07

### 🎉 Major Release: Stage 2 - Core Systems Enhancement

This is a major update that enhances core systems, adds new features, and improves UI/UX consistency. **Save data from v1.0 is not compatible** - a hard reset is required.

### Added

#### Structures System
- **Solar Panels**: Generate 2 energy/sec per panel
- **Mining Facilities**: Boost iron/silicon generation by 50% on their tile
- Structure building interface in new Structures page
- Visual indicators for structures on map tiles
- Structure placement validation (type restrictions, resource costs)
- Demolish structures to recover 50% of resources

#### Settings System
- **Settings page** with comprehensive customization options
- **Language selection**: Switch between English and German
- **Number format options**: Normal, scientific, or engineering notation
- **Player name** customization
- Settings persist across sessions in localStorage
- Live UI updates when changing language or format

#### Localization (i18n)
- **Full English translations** (165+ keys)
- **Full German translations** (165+ keys)
- Translation system using dot-notation keys (`t('navigation.map')`)
- Parameter replacement in translations (`{amount}`, `{rate}`)
- Fallback to English for missing translations
- Live language switching without page reload
- All UI text, notifications, and messages translated

#### UI/UX Improvements
- **Modular CSS architecture**:
  - `base.css` - CSS variables and resets
  - `components.css` - Reusable button/card/panel styles
  - `pages.css` - Page-specific styles
  - `utilities.css` - Helper classes
- **Consistent page layouts** across all scenes
- **Standardized card components** for crafting and drones
- **Improved button states** (hover, active, disabled)
- **Better scrolling** with custom scrollbar styling
- **Locked page overlays** for Research and Galaxy pages

#### Developer Features
- **Config Editor page** (dev mode only)
  - Edit drones, structures, and research in-browser
  - Real-time JSON editing with validation
  - Export/import configurations
  - Test changes without file modifications
- **Debug panel** improvements
  - Toggle visibility
  - Resource manipulation
  - Generation rate display
  - Hard reset button
- **Dev mode detection** utility

#### Testing Infrastructure
- **Vitest testing framework** integrated
- **312 unit tests** with 85% coverage
- **9 test suites** covering all core systems:
  - ResourceManager (34 tests)
  - CraftingManager (43 tests)
  - DroneManager (57 tests)
  - StructureManager (53 tests)
  - Hex math utilities (26 tests)
  - Number formatting (41 tests)
  - i18n system (21 tests)
  - Save/load (34 tests)
  - Setup (3 tests)
- **CI/CD ready** test configuration
- **Coverage reporting** built-in

#### Documentation
- Comprehensive README.md with setup instructions
- JSDoc comments on all manager classes
- Code organization documentation
- Testing guidelines
- Localization guide
- Dev mode instructions

### Changed

#### Map System
- **Starting base** now completely filled with red color (was just border)
- **Correct starting tile coordinates** - fixed duplicate tile bug
- Starting base clearly distinguished from resource tiles

#### Resource Panel
- **Reduced width** from 250px to 180px for more screen space
- **Compact layout** with optimized padding
- **Debug panel** toggle button
- All resource generation rates visible

#### Navigation
- **Tab-based navigation** system
- **Locked tabs** for Research and Galaxy (with overlays)
- Settings and Config (dev) tabs added
- Visual feedback for active tab

#### Number Formatting
- **Utility function** for consistent formatting
- **User-configurable** format (normal/scientific/engineering)
- **Locale-aware** decimal separators
- Applied throughout entire UI

#### Code Organization
- **Config files** separated from code:
  - `balance.js` - Game balance values
  - `mapConfig.js` - Map layout
  - `recipes.js` - Crafting recipes
  - `structures.js` - Structure definitions
- **Manager pattern** for all core systems
- **Modular structure** for easier maintenance

### Fixed

#### Critical Bugs (Phase 1)
- **Scrolling issues** in Crafting and Drones pages
- **Drone deployment** not working correctly
- **Hard reset button** not functioning
- **Starting base confusion** - duplicate tiles on map
- Panel overflow and layout issues

#### Minor Fixes
- Resource panel sizing and layout
- Button state consistency
- Event listener cleanup
- Border rendering on selected tiles
- Save/load error handling

### Technical

#### Dependencies
- Phaser 3.80.1 - Game framework
- Vitest 4.0.16 - Testing framework
- esbuild 0.24.2 - Fast bundler

#### Performance
- Maintained 60 FPS rendering
- Load time < 2 seconds
- Efficient auto-save (every 30 seconds)
- No memory leaks

#### Browser Support
- Chrome/Edge (Chromium) - Full support
- Firefox - Full support
- Safari (WebKit) - Full support
- Requires ES6+ support

### Migration Notes

⚠️ **Breaking Change**: Save data from v1.0 is not compatible with v2.0.

**To upgrade:**
1. Update to v2.0
2. Open the game
3. Open the Debug Panel
4. Click "Hard Reset" and confirm
5. Game will reload with fresh state

The incompatibility is due to:
- New structure system data
- Settings system additions
- Changed resource generation calculations
- Updated save format structure

### Known Issues

- None at this time

### Acknowledgments

Built with:
- Phaser 3 game framework
- Vitest testing framework
- esbuild bundler

---

## [1.0.0] - Initial Release

### Added
- Basic hex grid map (10×10)
- Resource gathering (iron, silicon, energy)
- Component crafting system
- Drone building and deployment
- Basic UI with map and resource panel
- Save/load system with localStorage
- Auto-save functionality

### Core Features
- Starting base with iron generation
- Manual resource tile activation
- Component crafting (chassis, circuit, power core)
- Basic gathering drones
- Tile-based resource generation
