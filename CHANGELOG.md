# Changelog

All notable changes to Panix Incremental will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-01-08

### 🎉 Stage 3 Release: Polish & Config Enhancement

This release focuses on bug fixes, visual enhancements, and a completely overhauled config system for advanced customization.

### Fixed

#### Critical Bug Fixes (Phase 1)
- **Translation loading in production** - Fixed fetch() calls that failed in production builds by switching to direct JSON imports
- **Language persistence** - Language selection now properly persists across browser reloads
- **Duplicate entity creation** - Fixed bug where creating structures/drones would create 2 entities instead of 1
- **Resource panel alignment** - Implemented CSS Grid layout for perfect column alignment of resources
- **Config editor button layout** - Fixed scrolling issues by moving action buttons to a fixed toolbar

### Added

#### Visual Enhancements (Phase 2)
- **Structure tier indicators** - Structures now display tier badges and type icons (⚡ energy, 🏭 production, ⛏️ mining) on map tiles
- **Live resource updates** - Resource displays in Crafting, Drones, and Structures pages update automatically without clicking
- **Drone capacity color indicators** - Tile drone circles now show:
  - 🟢 Green at 100% capacity
  - 🟡 Yellow at 50-99% capacity
  - ⚪ Gray below 50% capacity
- **Removed "custom" labels** - All entities now appear equal in UI, no special styling for custom content

#### Config System Foundation (Phase 3)
- **Resource management UI**:
  - Create custom resources with icons and base rates
  - Edit existing resources (iron, silicon, energy)
  - Delete unused resources with dependency checking
  - Validation ensures unique IDs and required fields
- **Tile type management UI**:
  - Create tile types that produce specific resources
  - Configure base production rates
  - Set allowed drone types for restrictions
  - Validation ensures resource references exist
- **ConfigManager system**:
  - Centralized validation for all entity types
  - Dependency checking prevents deleting resources in use
  - Event system for config relationships
  - Comprehensive error reporting
- **Config import/export**:
  - Export all configs to timestamped JSON file
  - Import configs with validation and preview
  - Metadata includes version, timestamp, author

#### Config System Advanced (Phase 4)
- **Form-based structure editor**:
  - Replaced raw JSON editing with intuitive form UI
  - Fields: ID, name, description (i18n keys)
  - Tier (unlimited) and type (energy/production/mining/research/storage)
  - Dynamic cost editor with [+ Add Cost] button
  - Production configuration with resource dropdown
  - Tile type restrictions with multi-select
- **Form-based drone editor**:
  - Intuitive form UI matching structure editor
  - Cost editor with dynamic resource dropdowns
  - Component requirements (chassis, circuit, powerCore)
  - Gathering capacity/rate configuration
  - Tile type restrictions
- **Config relationships**:
  - Auto-updating dropdowns when new entities are added
  - Create a resource → immediately available in structure costs
  - Create a tile type → immediately available in placement restrictions
  - No page reload required
- **Live preview system**:
  - 3-column layout: entity list, edit form, preview panel
  - Real-time preview updates as you type (250ms debounce)
  - Structure preview: hex tile with tier indicator and stats
  - Drone preview: stat card with costs and capabilities
  - Resource preview: icon and usage count
  - Tile preview: hex with resource information
- **Secure config storage**:
  - Dev mode: configs save to localStorage with `dev_` prefix
  - Production: configs bundled into minified JS (not editable)
  - Config editor completely disabled in production builds
  - configStorage.js utility for centralized storage management

### Changed

#### Config Editor
- **Complete overhaul** from raw JSON editing to form-based UI
- **Better UX** with validation feedback and error messages
- **Live updates** without page reload
- **Visual previews** for all entity types

#### Testing
- **Updated test count**: 333 tests (was 312)
- **Updated coverage**: 79% overall (core systems 97-100%)
- **New test file**: ConfigManager.test.js with 26 tests
- **Updated i18n tests** for new import approach

#### Documentation
- **README.md** updated with comprehensive config system guide
- **CHANGELOG.md** with detailed Stage 3 changes
- **Task lists** tracked throughout development

### Technical

#### New Files
- `src/config/resources.js` - Resource definitions
- `src/config/tiles.js` - Tile type definitions  
- `src/systems/ConfigManager.js` - Config validation and events
- `src/utils/configStorage.js` - Secure storage utilities
- `src/systems/ConfigManager.test.js` - Validation tests

#### Performance
- Maintained 60 FPS with live updates
- Debounced preview updates (250ms) prevent lag
- Efficient event system for config relationships

#### Code Quality
- Following KISS, YAGNI, DRY, SRP principles
- Comprehensive JSDoc documentation
- Type validation throughout
- Error handling for all user inputs

### Migration Notes

✅ **No breaking changes** - Save data from v2.0 is fully compatible with v2.1.

**Upgrading from v2.0:**
1. Update to v2.1
2. Existing saves will work without modification
3. New config features available in dev mode only
4. Production builds continue to work as before

### Known Issues

- None at this time

### Acknowledgments

Built with:
- Phaser 3 game framework
- Vitest testing framework
- esbuild bundler

---

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
