# Task List: Stage 2 - Core Systems Enhancement

Generated from: `prd-stage-2-enhancements.md`  
Date: 2026-01-06  
Status: Parent tasks defined, awaiting sub-task generation

---

## Relevant Files

### Bugfixes
- `style.css` - Fix panel scrolling and resource panel sizing
- `src/scenes/DronesScene.js` - Fix scrolling issues
- `src/scenes/CraftingScene.js` - Fix scrolling issues
- `src/ui/ResourcePanel.js` - Fix hard reset button, resize panel
- `src/systems/DroneManager.js` - Fix deployment functionality
- `src/systems/HexGrid.js` - Resolve starting base confusion
- `src/config/mapConfig.js` - Update starting base configuration
- `src/scenes/MapScene.js` - Fix drone deployment event handling

### UI/UX System
- `src/styles/base.css` - New file for CSS variables and resets
- `src/styles/components.css` - New file for reusable components
- `src/styles/pages.css` - New file for page-specific styles
- `src/styles/utilities.css` - New file for utility classes
- `style.css` - Refactor into modular structure

### Settings System
- `src/systems/SettingsManager.js` - New manager for settings
- `src/scenes/SettingsScene.js` - New settings page
- `src/utils/formatNumber.js` - Number formatting utility
- `src/utils/i18n.js` - Localization utility
- `src/locales/en.json` - English translations
- `src/locales/de.json` - German translations

### Structures System
- `src/systems/StructureManager.js` - New manager for structures
- `src/systems/StructureManager.test.js` - Unit tests
- `src/scenes/StructuresScene.js` - New structures page
- `src/config/structures.js` - Structure definitions
- `src/ui/StructureBuildPanel.js` - Structure building UI
- `src/ui/TileInfoPanel.js` - Update for structure building

### Config System
- `src/scenes/ConfigScene.js` - New config editor page
- `src/utils/devMode.js` - Dev mode detection utility
- `config/dev/drones.json` - Dev config for drones (gitignored)
- `config/dev/structures.json` - Dev config for structures (gitignored)
- `config/dev/research.json` - Dev config for research (gitignored)
- `.gitignore` - Add config/dev/ folder

### Navigation & Locked Pages
- `src/ui/TabNavigation.js` - Update navigation menu
- `src/scenes/ResearchScene.js` - New research page (locked)
- `src/scenes/GalaxyScene.js` - New galaxy page (locked)
- `src/ui/LockedPageOverlay.js` - Lock overlay component

### Testing
- `vitest.config.js` - Vitest configuration
- `src/systems/ResourceManager.test.js` - Unit tests
- `src/systems/CraftingManager.test.js` - Unit tests
- `src/systems/DroneManager.test.js` - Unit tests
- `src/utils/hexMath.test.js` - Unit tests
- `src/utils/saveLoad.test.js` - Unit tests
- `src/utils/formatNumber.test.js` - Unit tests
- `src/utils/i18n.test.js` - Unit tests
- `.github/workflows/test.yml` - CI/CD pipeline

### Documentation
- `README.md` - Update with new features
- `CHANGELOG.md` - Document Stage 2 changes

### Notes

- Tasks must be completed sequentially - Phase 1 (bugfixes) is PRIORITY and must be 100% complete before Phase 2
- Unit tests should be co-located with source files
- Use `npm run test` to run all tests via Vitest
- Target 70%+ test coverage overall, 90%+ for critical paths
- All text must be translatable - use t() function everywhere
- Config editor only visible in dev mode (import.meta.env.DEV)
- Old saves (v1.0) will require hard reset - no automatic migration

---

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

### ⚠️ PHASE 1: CRITICAL BUGFIXES (MUST COMPLETE 100% BEFORE PHASE 2)

- [x] 1.0 Fix Critical Bugs
  - [x] 1.1 Fix scrolling issues in Crafting and Drones pages
    - [x] 1.1.1 Read `src/scenes/CraftingScene.js` and check updateUI() method
    - [x] 1.1.2 Read `src/scenes/DronesScene.js` and check updateUI() method
    - [x] 1.1.3 Read `style.css` and check #crafting-panel and #drones-panel rules
    - [x] 1.1.4 Verify panels have `height: 100%` and proper box-sizing
    - [x] 1.1.5 Ensure panels are NOT wrapped in extra divs that prevent scrolling
    - [x] 1.1.6 Test scrolling in both pages with enough content
    - [x] 1.1.7 Add webkit-scrollbar styling if not present
  - [x] 1.2 Fix drone deployment functionality
    - [x] 1.2.1 Read `src/ui/TileInfoPanel.js` and verify deployDrone event is dispatched
    - [x] 1.2.2 Read `src/scenes/MapScene.js` and check deployDrone event listener
    - [x] 1.2.3 Read `src/systems/DroneManager.js` and verify deployDrone() logic
    - [x] 1.2.4 Add console.log statements to trace event flow
    - [x] 1.2.5 Verify hexGrid reference is valid in DroneManager
    - [x] 1.2.6 Check that available drones > 0 before deployment
    - [x] 1.2.7 Test deployment: build drone, select tile, click deploy
    - [x] 1.2.8 Verify tile visual updates immediately after deployment
    - [x] 1.2.9 Test remove drone functionality as well
    - [x] 1.2.10 Remove debug console.log statements
  - [x] 1.3 Fix hard reset button
    - [x] 1.3.1 Read `src/ui/ResourcePanel.js` and find hard reset button code
    - [x] 1.3.2 Verify event listener is attached in createPanelContent()
    - [x] 1.3.3 Check onDebugHardReset() method dispatches event correctly
    - [x] 1.3.4 Read `src/main.js` and verify debugHardReset event listener exists
    - [x] 1.3.5 Ensure localStorage.clear() is called in event handler
    - [x] 1.3.6 Add 1 second delay before window.location.reload()
    - [x] 1.3.7 Test hard reset button with confirmation dialog
    - [x] 1.3.8 Verify all localStorage is cleared and game reloads fresh
  - [x] 1.4 Resolve starting base confusion
    - [x] 1.4.1 Read `src/config/mapConfig.js` layout array
    - [x] 1.4.2 Verify only ONE 'start' tile exists in layout
    - [x] 1.4.3 Read `src/systems/HexGrid.js` initializeTiles() method
    - [x] 1.4.4 Ensure start tile type converts to 'iron' for generation
    - [x] 1.4.5 Verify isStarting flag is set correctly
    - [x] 1.4.6 Read `src/scenes/MapScene.js` and check start tile rendering
    - [x] 1.4.7 Ensure starting tile has red border (COLORS.start)
    - [x] 1.4.8 Verify starting base generates 1 iron/sec
    - [x] 1.4.9 Test that drones cannot be deployed to starting base
    - [x] 1.4.10 Update all comments to use "Starting Base" terminology
  - [x] 1.5 Resize resource panel
    - [x] 1.5.1 Read `style.css` and find #resource-panel rules
    - [x] 1.5.2 Change width from 250px to 180px
    - [x] 1.5.3 Reduce padding from 1rem to 0.75rem
    - [x] 1.5.4 Reduce font sizes slightly (test readability)
    - [x] 1.5.5 Ensure all resources still visible
    - [x] 1.5.6 Ensure generation rates still visible
    - [x] 1.5.7 Ensure debug buttons still functional
    - [x] 1.5.8 Test on Chrome, Firefox, Safari

---

### PHASE 2: UI/UX CONSISTENCY

- [x] 2.0 Establish UI/UX Consistency System
  - [x] 2.1 Create modular CSS architecture
    - [x] 2.1.1 Create `src/styles/` directory
    - [x] 2.1.2 Create `src/styles/base.css` with CSS variables and resets
    - [x] 2.1.3 Create `src/styles/components.css` with button, card, panel styles
    - [x] 2.1.4 Create `src/styles/pages.css` with page-specific styles
    - [x] 2.1.5 Create `src/styles/utilities.css` with helper classes
    - [x] 2.1.6 Extract existing styles from `style.css` into new files
    - [x] 2.1.7 Import all style files in `src/main.js` in correct order
  - [x] 2.2 Apply consistent page layout to all pages
    - [x] 2.2.1 Create `.page-panel` base class with standard properties
    - [x] 2.2.2 Update CraftingScene to use standard layout
    - [x] 2.2.3 Update DronesScene to use standard layout
    - [x] 2.2.4 Verify all pages have 2rem padding, overflow-y auto
    - [x] 2.2.5 Ensure consistent heading styles (H1, H3)
    - [x] 2.2.6 Test responsive behavior on different viewport sizes
  - [x] 2.3 Standardize card components
    - [x] 2.3.1 Create `.info-card` base class
    - [x] 2.3.2 Update crafting cards to use standard class
    - [x] 2.3.3 Update drone cards to use standard class
    - [x] 2.3.4 Ensure consistent border, border-radius, padding
  - [x] 2.4 Verify button consistency
    - [x] 2.4.1 Check all `.btn` elements have consistent styling
    - [x] 2.4.2 Verify hover states work correctly
    - [x] 2.4.3 Verify disabled states are clear
    - [x] 2.4.4 Test button interactions across all pages

---

### PHASE 3: SETTINGS SYSTEM

- [ ] 3.0 Implement Settings System with Localization
  - [x] 3.1 Create SettingsManager
    - [x] 3.1.1 Create `src/systems/SettingsManager.js`
    - [x] 3.1.2 Add constructor with default settings object
    - [x] 3.1.3 Implement loadSettings() from localStorage
    - [x] 3.1.4 Implement saveSettings() to localStorage
    - [x] 3.1.5 Add getSetting(key) method
    - [x] 3.1.6 Add setSetting(key, value) method
    - [x] 3.1.7 Add getNumberFormat() method
    - [x] 3.1.8 Add setNumberFormat(format) method
    - [x] 3.1.9 Add getLanguage() method
    - [x] 3.1.10 Add setLanguage(lang) method
    - [x] 3.1.11 Add getPlayerName() method
    - [x] 3.1.12 Add setPlayerName(name) method
  - [x] 3.2 Create number formatting utility
    - [x] 3.2.1 Create `src/utils/formatNumber.js`
    - [x] 3.2.2 Implement formatNormal(num) - suffix notation (K, M, B, T)
    - [x] 3.2.3 Implement formatScientific(num) - 1e9, 1e10, 1e11 format
    - [x] 3.2.4 Implement formatEngineering(num) - 1e9, 10e9, 100e9, 1e12 format
    - [x] 3.2.5 Add formatNumber(num, format) as main function
    - [x] 3.2.6 Handle edge cases (0, negative, very large numbers)
    - [x] 3.2.7 Add tests for all three formats
  - [ ] 3.3 Create localization system
    - [ ] 3.3.1 Create `src/locales/` directory
    - [ ] 3.3.2 Create `src/locales/en.json` with English translations
    - [ ] 3.3.3 Create `src/locales/de.json` with German translations (AI-generated)
    - [ ] 3.3.4 Create `src/utils/i18n.js` utility
    - [ ] 3.3.5 Implement loadTranslations(lang) to fetch JSON
    - [ ] 3.3.6 Implement t(key, params) function for translation lookup
    - [ ] 3.3.7 Add dot-notation key support (e.g., 'navigation.map')
    - [ ] 3.3.8 Add parameter replacement (e.g., {amount})
    - [ ] 3.3.9 Implement fallback to English for missing keys
    - [ ] 3.3.10 Add currentLanguage variable
    - [ ] 3.3.11 Add setLanguage(lang) to switch language
  - [ ] 3.4 Build Settings page
    - [ ] 3.4.1 Create `src/scenes/SettingsScene.js`
    - [ ] 3.4.2 Add create() method to initialize UI
    - [ ] 3.4.3 Create settings panel with standard layout
    - [ ] 3.4.4 Add "Display Settings" section
    - [ ] 3.4.5 Add number format dropdown (Normal, Scientific, Engineering)
    - [ ] 3.4.6 Add language dropdown (English, German)
    - [ ] 3.4.7 Add "Player Settings" section
    - [ ] 3.4.8 Add rename input field with validation
    - [ ] 3.4.9 Add "Update Name" button
    - [ ] 3.4.10 Add "About" section with version info
    - [ ] 3.4.11 Connect number format changes to SettingsManager
    - [ ] 3.4.12 Connect language changes to i18n system
    - [ ] 3.4.13 Connect rename to SettingsManager
    - [ ] 3.4.14 Emit 'settingsUpdated' event on changes
    - [ ] 3.4.15 Test settings persistence across page reloads
  - [ ] 3.5 Integrate settings into main game
    - [ ] 3.5.1 Update `src/main.js` to initialize SettingsManager
    - [ ] 3.5.2 Load settings on game start
    - [ ] 3.5.3 Pass SettingsManager to SettingsScene
    - [ ] 3.5.4 Update ResourcePanel to use formatNumber()
    - [ ] 3.5.5 Listen for 'languageChanged' event to update UI
    - [ ] 3.5.6 Update sidebar header to show player name
    - [ ] 3.5.7 Test number format switching updates all numbers
    - [ ] 3.5.8 Test language switching updates all text

---

### PHASE 4: STRUCTURES SYSTEM

- [ ] 4.0 Build Structures System with Solar Panel
  - [ ] 4.1 Remove energy tiles from map
    - [ ] 4.1.1 Read `src/config/mapConfig.js` layout array
    - [ ] 4.1.2 Replace all 'energy' tiles with 'empty' tiles
    - [ ] 4.1.3 Update HexGrid to not recognize 'energy' type
    - [ ] 4.1.4 Remove energy tile color from MapScene COLORS
    - [ ] 4.1.5 Test that no energy tiles appear on map
  - [ ] 4.2 Create structure configuration
    - [ ] 4.2.1 Create `src/config/structures.js`
    - [ ] 4.2.2 Define structures object with solarPanel
    - [ ] 4.2.3 Add solarPanel id, name, description
    - [ ] 4.2.4 Add costs: iron 10, silicon 5
    - [ ] 4.2.5 Add stats: energyGeneration 1.0
    - [ ] 4.2.6 Add buildableOn: ['empty']
    - [ ] 4.2.7 Add isVisible() and isUnlocked() functions
    - [ ] 4.2.8 Export structures and getStructure() helper
  - [ ] 4.3 Create StructureManager
    - [ ] 4.3.1 Create `src/systems/StructureManager.js`
    - [ ] 4.3.2 Add constructor with resourceManager, hexGrid params
    - [ ] 4.3.3 Initialize structures Map (key: "q,r", value: structure)
    - [ ] 4.3.4 Implement canBuildStructure(q, r, structureType)
    - [ ] 4.3.5 Check tile is empty, check resource costs
    - [ ] 4.3.6 Implement buildStructure(q, r, structureType)
    - [ ] 4.3.7 Deduct resource costs via resourceManager
    - [ ] 4.3.8 Add structure to structures Map
    - [ ] 4.3.9 Update tile in hexGrid (mark as has structure)
    - [ ] 4.3.10 Implement getStructureAt(q, r)
    - [ ] 4.3.11 Implement getAllStructures()
    - [ ] 4.3.12 Implement getTotalEnergyGeneration()
    - [ ] 4.3.13 Implement update(deltaTime) for energy generation
    - [ ] 4.3.14 Add getSaveData() method
    - [ ] 4.3.15 Add loadSaveData(data) method
  - [ ] 4.4 Update ResourceManager for energy generation
    - [ ] 4.4.1 Read `src/systems/ResourceManager.js`
    - [ ] 4.4.2 Add structureManager reference (passed in update)
    - [ ] 4.4.3 In update(), call structureManager.getTotalEnergyGeneration()
    - [ ] 4.4.4 Add energy to resources based on structure generation
    - [ ] 4.4.5 Update generationRates.energy accordingly
    - [ ] 4.4.6 Test energy increments from solar panels
  - [ ] 4.5 Update TileInfoPanel for structure building
    - [ ] 4.5.1 Read `src/ui/TileInfoPanel.js`
    - [ ] 4.5.2 In show(), detect if tile is empty
    - [ ] 4.5.3 Add "Build Structure" section for empty tiles
    - [ ] 4.5.4 Get available structures from structures.js
    - [ ] 4.5.5 Filter by isVisible() and isUnlocked()
    - [ ] 4.5.6 Render structure cards with name, description, costs, stats
    - [ ] 4.5.7 Color code costs (red if can't afford, green if can)
    - [ ] 4.5.8 Add "Build" button for each structure
    - [ ] 4.5.9 Disable button if can't afford
    - [ ] 4.5.10 Add click handler to dispatch 'buildStructure' event
    - [ ] 4.5.11 Show existing structure info if tile has structure
  - [ ] 4.6 Update MapScene for structure building
    - [ ] 4.6.1 Read `src/scenes/MapScene.js`
    - [ ] 4.6.2 Add structureManager reference
    - [ ] 4.6.3 Add event listener for 'buildStructure' event
    - [ ] 4.6.4 Call structureManager.buildStructure() on event
    - [ ] 4.6.5 Update tile visual to show structure icon/indicator
    - [ ] 4.6.6 Refresh TileInfoPanel after building
    - [ ] 4.6.7 Test building solar panel on empty tile
    - [ ] 4.6.8 Verify energy generation starts
  - [ ] 4.7 Create Structures page
    - [ ] 4.7.1 Create `src/scenes/StructuresScene.js`
    - [ ] 4.7.2 Add init(data) to receive structureManager
    - [ ] 4.7.3 Create structures panel with standard layout
    - [ ] 4.7.4 Add "Statistics" section
    - [ ] 4.7.5 Show total structures built
    - [ ] 4.7.6 Show total energy generation
    - [ ] 4.7.7 Show structures by type breakdown
    - [ ] 4.7.8 Add "Structures List" section
    - [ ] 4.7.9 Group structures by type (Energy, Production, etc.)
    - [ ] 4.7.10 Show each structure location (Q, R)
    - [ ] 4.7.11 Show current stats for each structure
    - [ ] 4.7.12 Add update() method to refresh stats
    - [ ] 4.7.13 Test page shows all built structures
  - [ ] 4.8 Integrate structures into main game
    - [ ] 4.8.1 Update `src/main.js` to import StructureManager
    - [ ] 4.8.2 Initialize StructureManager after ResourceManager
    - [ ] 4.8.3 Pass to MapScene for building
    - [ ] 4.8.4 Initialize StructuresScene with structureManager
    - [ ] 4.8.5 Add to managers object for save/load
    - [ ] 4.8.6 Update saveLoad.js to handle structures data
    - [ ] 4.8.7 Test full cycle: build, save, reload, verify persists

---

### PHASE 5: CONFIG SYSTEM

- [ ] 5.0 Create Configuration Editor (Dev Mode)
  - [ ] 5.1 Set up dev mode detection
    - [ ] 5.1.1 Create `src/utils/devMode.js`
    - [ ] 5.1.2 Add isDevMode() function checking import.meta.env.DEV
    - [ ] 5.1.3 Add URL parameter check for ?dev=true
    - [ ] 5.1.4 Add localStorage check for dev_mode flag
    - [ ] 5.1.5 Export isDevMode() for use across app
  - [ ] 5.2 Create dev config folder structure
    - [ ] 5.2.1 Create `config/dev/` directory
    - [ ] 5.2.2 Export current drones recipe to `config/dev/drones.json`
    - [ ] 5.2.3 Export structures config to `config/dev/structures.json`
    - [ ] 5.2.4 Create placeholder `config/dev/research.json`
    - [ ] 5.2.5 Add `config/dev/` to `.gitignore`
    - [ ] 5.2.6 Verify files are not tracked by git
  - [ ] 5.3 Build config editor UI
    - [ ] 5.3.1 Create `src/scenes/ConfigScene.js`
    - [ ] 5.3.2 Add create() method with dev mode check
    - [ ] 5.3.3 Create config panel with standard layout
    - [ ] 5.3.4 Add entity type selector (Drones, Structures, Research)
    - [ ] 5.3.5 Add entity list display (shows all entities of selected type)
    - [ ] 5.3.6 Add "Add New" button
    - [ ] 5.3.7 Add edit form with all entity fields
    - [ ] 5.3.8 Add field validation (required, data types, ranges)
    - [ ] 5.3.9 Add "Save" button to write changes
    - [ ] 5.3.10 Add "Delete" button with confirmation
    - [ ] 5.3.11 Add "Export JSON" button
    - [ ] 5.3.12 Add "Import JSON" file input
    - [ ] 5.3.13 Display validation errors clearly
  - [ ] 5.4 Implement config loading
    - [ ] 5.4.1 Update `src/config/recipes.js` to check dev mode
    - [ ] 5.4.2 Load from JSON files if in dev mode
    - [ ] 5.4.3 Fallback to hardcoded if production or file missing
    - [ ] 5.4.4 Update `src/config/structures.js` similarly
    - [ ] 5.4.5 Test config loading in both dev and prod modes
  - [ ] 5.5 Implement config saving (dev mode only)
    - [ ] 5.5.1 Add saveConfig(type, data) function in ConfigScene
    - [ ] 5.5.2 Since browser can't write files, use download approach
    - [ ] 5.5.3 Create JSON blob and trigger download
    - [ ] 5.5.4 Instruct user to replace file in config/dev/
    - [ ] 5.5.5 Add instructions in UI for manual file replacement
    - [ ] 5.5.6 Test full edit → save → reload cycle
  - [ ] 5.6 Add config to navigation (dev mode only)
    - [ ] 5.6.1 Update `src/ui/TabNavigation.js`
    - [ ] 5.6.2 Add config nav button only if isDevMode()
    - [ ] 5.6.3 Add 🛠️ Config icon
    - [ ] 5.6.4 Test config page only visible in dev mode

---

### PHASE 6: NAVIGATION UPDATES

- [ ] 6.0 Update Navigation Menu with Locked Pages
  - [ ] 6.1 Create locked page overlay component
    - [ ] 6.1.1 Create `src/ui/LockedPageOverlay.js`
    - [ ] 6.1.2 Add constructor with message, hint params
    - [ ] 6.1.3 Create overlay div with lock icon 🔒
    - [ ] 6.1.4 Add semi-transparent background
    - [ ] 6.1.5 Add centered message and hint text
    - [ ] 6.1.6 Add show() and hide() methods
    - [ ] 6.1.7 Style with CSS (semi-transparent, centered, z-index)
  - [ ] 6.2 Create Research page placeholder
    - [ ] 6.2.1 Create `src/scenes/ResearchScene.js`
    - [ ] 6.2.2 Add create() method
    - [ ] 6.2.3 Create research panel with standard layout
    - [ ] 6.2.4 Add placeholder research tree structure
    - [ ] 6.2.5 Add category nodes: Resource Gen, Drone Efficiency, Structures, Map, Automation
    - [ ] 6.2.6 Dim/grey out the tree with CSS
    - [ ] 6.2.7 Create LockedPageOverlay instance
    - [ ] 6.2.8 Show overlay with message "Research Lab not yet constructed"
    - [ ] 6.2.9 Add hint "Complete initial objectives to unlock research"
  - [ ] 6.3 Create Galaxy page placeholder
    - [ ] 6.3.1 Create `src/scenes/GalaxyScene.js`
    - [ ] 6.3.2 Add create() method
    - [ ] 6.3.3 Create galaxy panel with standard layout
    - [ ] 6.3.4 Add 3-5 placeholder planets with simple visuals
    - [ ] 6.3.5 Use CSS circles with different colors for planets
    - [ ] 6.3.6 Optional: Add simple rotation animations
    - [ ] 6.3.7 Dim/grey out with CSS
    - [ ] 6.3.8 Create LockedPageOverlay instance
    - [ ] 6.3.9 Show overlay with message "Deep Space Scanner offline"
    - [ ] 6.3.10 Add hint "Upgrade your base infrastructure to unlock"
  - [ ] 6.4 Update navigation menu
    - [ ] 6.4.1 Read `src/ui/TabNavigation.js`
    - [ ] 6.4.2 Update navigation order: Map, Galaxy, Crafting, Drones, Structures, Research, Settings, Config
    - [ ] 6.4.3 Add Galaxy nav button with 🌌 icon
    - [ ] 6.4.4 Add Structures nav button with 🏗️ icon
    - [ ] 6.4.5 Add Research nav button with 🔬 icon
    - [ ] 6.4.6 Add Settings nav button with ⚙️ icon
    - [ ] 6.4.7 Mark Galaxy and Research buttons as locked
    - [ ] 6.4.8 Add .locked CSS class to locked buttons
    - [ ] 6.4.9 Add lock icon 🔒 after label for locked pages
    - [ ] 6.4.10 Add opacity: 0.5 and cursor: not-allowed for locked
    - [ ] 6.4.11 Add hover tooltip showing unlock condition
    - [ ] 6.4.12 Test all navigation buttons work correctly
  - [ ] 6.5 Initialize new scenes in main.js
    - [ ] 6.5.1 Update `src/main.js` to import new scenes
    - [ ] 6.5.2 Add ResearchScene, GalaxyScene, SettingsScene, StructuresScene to gameConfig
    - [ ] 6.5.3 Initialize StructuresScene with managers
    - [ ] 6.5.4 Initialize SettingsScene with SettingsManager
    - [ ] 6.5.5 Initialize ResearchScene (locked, no data needed)
    - [ ] 6.5.6 Initialize GalaxyScene (locked, no data needed)
    - [ ] 6.5.7 Initialize ConfigScene only if dev mode
    - [ ] 6.5.8 Test all pages accessible via navigation

---

### PHASE 7: TESTING FRAMEWORK

- [ ] 7.0 Implement Testing Framework and Tests
  - [ ] 7.1 Set up Vitest
    - [ ] 7.1.1 Install Vitest: `npm install -D vitest`
    - [ ] 7.1.2 Install @vitest/ui: `npm install -D @vitest/ui`
    - [ ] 7.1.3 Install coverage tool: `npm install -D @vitest/coverage-v8`
    - [ ] 7.1.4 Create `vitest.config.js` with configuration
    - [ ] 7.1.5 Add test scripts to package.json
    - [ ] 7.1.6 Configure coverage thresholds (70% minimum)
    - [ ] 7.1.7 Test basic setup: `npm run test`
  - [ ] 7.2 Write ResourceManager tests
    - [ ] 7.2.1 Create `src/systems/ResourceManager.test.js`
    - [ ] 7.2.2 Test addResource() method
    - [ ] 7.2.3 Test consumeResource() method
    - [ ] 7.2.4 Test hasResources() method
    - [ ] 7.2.5 Test update() method with hexGrid
    - [ ] 7.2.6 Test generation rates calculation
    - [ ] 7.2.7 Test getSaveData() and loadSaveData()
    - [ ] 7.2.8 Run tests: `npm run test ResourceManager`
  - [ ] 7.3 Write CraftingManager tests
    - [ ] 7.3.1 Create `src/systems/CraftingManager.test.js`
    - [ ] 7.3.2 Test craftComponent() method
    - [ ] 7.3.3 Test hasComponents() method
    - [ ] 7.3.4 Test consumeComponents() method
    - [ ] 7.3.5 Test canCraft() validation
    - [ ] 7.3.6 Test getSaveData() and loadSaveData()
    - [ ] 7.3.7 Run tests: `npm run test CraftingManager`
  - [ ] 7.4 Write DroneManager tests
    - [ ] 7.4.1 Create `src/systems/DroneManager.test.js`
    - [ ] 7.4.2 Test buildDrone() method
    - [ ] 7.4.3 Test deployDrone() method
    - [ ] 7.4.4 Test removeDrone() method
    - [ ] 7.4.5 Test availability tracking
    - [ ] 7.4.6 Test canBuildDrone() validation
    - [ ] 7.4.7 Test getSaveData() and loadSaveData()
    - [ ] 7.4.8 Run tests: `npm run test DroneManager`
  - [ ] 7.5 Write StructureManager tests
    - [ ] 7.5.1 Create `src/systems/StructureManager.test.js`
    - [ ] 7.5.2 Test buildStructure() method
    - [ ] 7.5.3 Test canBuildStructure() validation
    - [ ] 7.5.4 Test energy generation calculation
    - [ ] 7.5.5 Test structure placement restrictions
    - [ ] 7.5.6 Test getSaveData() and loadSaveData()
    - [ ] 7.5.7 Run tests: `npm run test StructureManager`
  - [ ] 7.6 Write utility tests
    - [ ] 7.6.1 Create `src/utils/hexMath.test.js`
    - [ ] 7.6.2 Test coordinate conversion functions
    - [ ] 7.6.3 Test distance calculations
    - [ ] 7.6.4 Create `src/utils/formatNumber.test.js`
    - [ ] 7.6.5 Test all three number formats with edge cases
    - [ ] 7.6.6 Create `src/utils/i18n.test.js`
    - [ ] 7.6.7 Test translation lookup and fallback
    - [ ] 7.6.8 Test parameter replacement
    - [ ] 7.6.9 Create `src/utils/saveLoad.test.js`
    - [ ] 7.6.10 Test save data integrity
    - [ ] 7.6.11 Test load with missing data
    - [ ] 7.6.12 Run all utility tests
  - [ ] 7.7 Set up CI/CD pipeline
    - [ ] 7.7.1 Create `.github/workflows/test.yml`
    - [ ] 7.7.2 Configure to run on push and pull requests
    - [ ] 7.7.3 Add steps: checkout, setup node, install deps, run tests
    - [ ] 7.7.4 Add coverage report generation
    - [ ] 7.7.5 Configure to block merge if tests fail
    - [ ] 7.7.6 Test pipeline runs successfully
  - [ ] 7.8 Verify coverage meets requirements
    - [ ] 7.8.1 Run coverage report: `npm run test:coverage`
    - [ ] 7.8.2 Check overall coverage ≥70%
    - [ ] 7.8.3 Check critical paths ≥90% (save/load, resource generation)
    - [ ] 7.8.4 Add more tests if coverage insufficient
    - [ ] 7.8.5 Generate HTML coverage report
    - [ ] 7.8.6 Review uncovered lines and add tests

---

### PHASE 8: LOCALIZATION

- [ ] 8.0 Add Full Localization Support
  - [ ] 8.1 Audit all text in codebase
    - [ ] 8.1.1 Search all .js files for hardcoded strings
    - [ ] 8.1.2 List all navigation labels
    - [ ] 8.1.3 List all button labels
    - [ ] 8.1.4 List all page titles and headers
    - [ ] 8.1.5 List all descriptions and tooltips
    - [ ] 8.1.6 List all notification messages
    - [ ] 8.1.7 List all error messages
    - [ ] 8.1.8 Create comprehensive list (~120-150 keys)
  - [ ] 8.2 Create English translation file
    - [ ] 8.2.1 Structure en.json with categories
    - [ ] 8.2.2 Add navigation translations
    - [ ] 8.2.3 Add resource translations
    - [ ] 8.2.4 Add component translations
    - [ ] 8.2.5 Add structure translations
    - [ ] 8.2.6 Add drone translations
    - [ ] 8.2.7 Add UI label translations
    - [ ] 8.2.8 Add message translations
    - [ ] 8.2.9 Add tooltip translations
    - [ ] 8.2.10 Add error message translations
    - [ ] 8.2.11 Verify all keys present
  - [ ] 8.3 Generate German translations
    - [ ] 8.3.1 Use AI to translate all keys to German
    - [ ] 8.3.2 Review translations for accuracy
    - [ ] 8.3.3 Adjust technical terms as needed
    - [ ] 8.3.4 Verify grammar and context
    - [ ] 8.3.5 Test with German-speaking user if possible
  - [ ] 8.4 Update all scenes to use t()
    - [ ] 8.4.1 Update TabNavigation.js to use t() for labels
    - [ ] 8.4.2 Update MapScene.js for any displayed text
    - [ ] 8.4.3 Update CraftingScene.js to use t() throughout
    - [ ] 8.4.4 Update DronesScene.js to use t() throughout
    - [ ] 8.4.5 Update StructuresScene.js to use t() throughout
    - [ ] 8.4.6 Update ResearchScene.js placeholder text
    - [ ] 8.4.7 Update GalaxyScene.js placeholder text
    - [ ] 8.4.8 Update SettingsScene.js to use t() for labels
    - [ ] 8.4.9 Update ConfigScene.js to use t() for labels
  - [ ] 8.5 Update all UI components to use t()
    - [ ] 8.5.1 Update ResourcePanel.js
    - [ ] 8.5.2 Update TileInfoPanel.js
    - [ ] 8.5.3 Update LockedPageOverlay.js
    - [ ] 8.5.4 Update StructureBuildPanel.js if created
  - [ ] 8.6 Update all managers to use t() for messages
    - [ ] 8.6.1 Update ResourceManager error messages
    - [ ] 8.6.2 Update CraftingManager messages
    - [ ] 8.6.3 Update DroneManager messages
    - [ ] 8.6.4 Update StructureManager messages
  - [ ] 8.7 Update main.js notifications
    - [ ] 8.7.1 Replace all showNotification() strings with t() calls
    - [ ] 8.7.2 Test all notifications display correctly
  - [ ] 8.8 Test language switching
    - [ ] 8.8.1 Start game in English
    - [ ] 8.8.2 Navigate to all pages
    - [ ] 8.8.3 Switch to German in settings
    - [ ] 8.8.4 Verify all text updates immediately
    - [ ] 8.8.5 Check for any untranslated text
    - [ ] 8.8.6 Test number formatting respects locale
    - [ ] 8.8.7 Reload game and verify language persists

---

### PHASE 9: POLISH AND DOCUMENTATION

- [ ] 9.0 Polish and Documentation
  - [ ] 9.1 Code review and cleanup
    - [ ] 9.1.1 Remove all console.log debug statements
    - [ ] 9.1.2 Remove commented-out code
    - [ ] 9.1.3 Check all functions have proper JSDoc comments
    - [ ] 9.1.4 Verify consistent code style
    - [ ] 9.1.5 Run linter if configured
    - [ ] 9.1.6 Fix any linting errors
  - [ ] 9.2 Browser compatibility testing
    - [ ] 9.2.1 Test full game flow in Chrome
    - [ ] 9.2.2 Test full game flow in Firefox
    - [ ] 9.2.3 Test full game flow in Safari
    - [ ] 9.2.4 Document any browser-specific issues
    - [ ] 9.2.5 Fix critical compatibility issues
  - [ ] 9.3 Performance profiling
    - [ ] 9.3.1 Use Chrome DevTools Performance tab
    - [ ] 9.3.2 Check FPS stays at 60
    - [ ] 9.3.3 Check load time <2 seconds
    - [ ] 9.3.4 Check memory usage is reasonable
    - [ ] 9.3.5 Optimize if any performance issues found
  - [ ] 9.4 Update README.md
    - [ ] 9.4.1 Add project description
    - [ ] 9.4.2 Add feature list for Stage 2
    - [ ] 9.4.3 Add setup instructions
    - [ ] 9.4.4 Add development commands
    - [ ] 9.4.5 Add testing instructions
    - [ ] 9.4.6 Add localization notes
    - [ ] 9.4.7 Add dev mode instructions
    - [ ] 9.4.8 Add browser compatibility section
  - [ ] 9.5 Write CHANGELOG.md
    - [ ] 9.5.1 Document all bugfixes
    - [ ] 9.5.2 Document all new features
    - [ ] 9.5.3 Document breaking changes (save reset required)
    - [ ] 9.5.4 Document known issues if any
    - [ ] 9.5.5 Add migration notes for users
  - [ ] 9.6 Final testing
    - [ ] 9.6.1 Fresh install: delete node_modules, npm install
    - [ ] 9.6.2 Clear localStorage and test fresh game
    - [ ] 9.6.3 Play through all features end-to-end
    - [ ] 9.6.4 Test save/load multiple times
    - [ ] 9.6.5 Test hard reset
    - [ ] 9.6.6 Test language switching
    - [ ] 9.6.7 Test number format switching
    - [ ] 9.6.8 Build production: `npm run build`
    - [ ] 9.6.9 Test production build works
  - [ ] 9.7 Prepare for merge
    - [ ] 9.7.1 Commit all changes
    - [ ] 9.7.2 Push feature branch to remote
    - [ ] 9.7.3 Verify all tests pass in CI
    - [ ] 9.7.4 Create pull request or merge to main
    - [ ] 9.7.5 Tag release as v2.0

---

**Status:** All tasks defined. Ready for implementation!

**Estimated Time:** 13-21 days based on PRD
**Priority:** Phase 1 must be completed before proceeding to Phase 2

Begin with Task 0.0 to create the feature branch, then proceed with Phase 1 bugfixes.
