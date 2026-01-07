# Task List: Stage 3 - Polish & Config Enhancement

Generated from: `prd-stage-3-polish-and-config.md`  
Date: 2026-01-07  
Status: Parent tasks defined, awaiting sub-task generation

---

## Relevant Files

### Bug Fixes
- `src/utils/i18n.js` - Translation loading system (needs fix for production builds)
- `src/systems/SettingsManager.js` - Language persistence (needs initialization fix)
- `src/scenes/ConfigScene.js` - Duplicate entity creation bug
- `src/ui/ResourcePanel.js` - Alignment issues with resource display
- `src/styles/components.css` - CSS for resource panel grid layout

### Visual Enhancements
- `src/scenes/MapScene.js` - Structure tier indicators on hex tiles
- `src/scenes/CraftingScene.js` - Live resource updates
- `src/scenes/DronesScene.js` - Live resource updates
- `src/ui/ResourcePanel.js` - Live resource updates in resource panel
- `src/config/structures.js` - Add tier and type fields to structures
- `src/styles/components.css` - Drone capacity indicator colors

### Config System
- `src/config/resources.js` - New file for resource definitions
- `src/config/tiles.js` - New file for tile type definitions
- `src/config/dev/resources.json` - Dev storage for custom resources
- `src/config/dev/tiles.json` - Dev storage for custom tiles
- `src/config/dev/structures.json` - Dev storage for custom structures
- `src/config/dev/drones.json` - Dev storage for custom drones
- `src/scenes/ConfigScene.js` - Major overhaul for form-based UI
- `src/systems/ConfigManager.js` - New file for config validation and relationships
- `src/utils/configStorage.js` - New file for secure config storage

### Testing
- `src/utils/i18n.test.js` - Update tests for translation loading
- `src/systems/ConfigManager.test.js` - New test file for config validation
- `src/scenes/ConfigScene.test.js` - New test file for config editor

### Notes

- Unit tests should be co-located with source files
- Use `npm run test` to run all tests via Vitest
- Target 80%+ test coverage for new features
- Follow Stage 2 patterns (JSDoc, modular CSS, i18n)

---

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

### PHASE 0: SETUP

- [x] 0.0 Create feature branch
  - [x] 0.0.1 Create and checkout new branch: `git checkout -b phase/phase3`
  - [x] 0.0.2 Verify you're on phase/phase3 branch: `git branch`

---

### PHASE 1: CRITICAL BUG FIXES

- [ ] 1.0 Fix Critical Bugs (REQ-BUG-001 through REQ-BUG-005)
  - [x] 1.1 Fix translation loading in production (REQ-BUG-001)
    - [x] 1.1.1 Read `src/utils/i18n.js` and identify fetch() calls
    - [x] 1.1.2 Replace fetch with direct JSON imports
    - [x] 1.1.3 Import en.json: `import enTranslations from '../locales/en.json'`
    - [x] 1.1.4 Import de.json: `import deTranslations from '../locales/de.json'`
    - [x] 1.1.5 Update loadTranslations() to use imported objects instead of fetch
    - [x] 1.1.6 Remove async/await if no longer needed
    - [x] 1.1.7 Test in dev mode: translations should still work
    - [x] 1.1.8 Build production: `npm run build`
    - [x] 1.1.9 Test production build: translations should resolve correctly
    - [x] 1.1.10 Update i18n.test.js to test new import approach
  - [x] 1.2 Fix language persistence on reload (REQ-BUG-002)
    - [x] 1.2.1 Read `src/systems/SettingsManager.js` constructor
    - [x] 1.2.2 Verify loadSettings() is called in constructor
    - [x] 1.2.3 Read `src/utils/i18n.js` initialization code
    - [x] 1.2.4 Check if setLanguage() is called on initialization
    - [x] 1.2.5 Update i18n.js to load language from SettingsManager on init
    - [x] 1.2.6 Test: Change language in settings, reload page
    - [x] 1.2.7 Verify language persists and UI loads in selected language
    - [x] 1.2.8 Test with localStorage empty (default to English)
  - [x] 1.3 Fix duplicate entity creation (REQ-BUG-003)
    - [x] 1.3.1 Read `src/scenes/ConfigScene.js` createEntity() method
    - [x] 1.3.2 Check for double event listeners or double function calls
    - [x] 1.3.3 Add console.log to trace entity creation flow
    - [x] 1.3.4 Identify why 2 entities are created instead of 1
    - [x] 1.3.5 Fix the duplicate creation bug
    - [x] 1.3.6 Test: Create new structure, verify only 1 is added
    - [x] 1.3.7 Test: Create new drone, verify only 1 is added
    - [x] 1.3.8 Test: Delete entity, verify only the selected one is removed
    - [x] 1.3.9 Remove console.log debug statements
  - [x] 1.4 Fix resource panel alignment (REQ-BUG-004)
    - [x] 1.4.1 Read `src/ui/ResourcePanel.js` createPanelContent()
    - [x] 1.4.2 Identify current layout structure (divs with spaces)
    - [x] 1.4.3 Open `src/styles/components.css`
    - [x] 1.4.4 Create `.resource-grid` class with CSS Grid
    - [x] 1.4.5 Define grid columns: name (auto), amount (80px), rate (100px)
    - [x] 1.4.6 Update ResourcePanel to use grid layout
    - [x] 1.4.7 Wrap each resource in grid row with proper classes
    - [x] 1.4.8 Test: Resources should align in perfect columns
    - [x] 1.4.9 Test on different viewport sizes
    - [x] 1.4.10 Verify debug buttons still work correctly
  - [x] 1.5 Fix config editor button layout (REQ-BUG-005)
    - [x] 1.5.1 Read `src/scenes/ConfigScene.js` buildUI() method
    - [x] 1.5.2 Identify where action buttons are currently placed
    - [x] 1.5.3 Create separate toolbar div outside editor panel
    - [x] 1.5.4 Move Save, Reset, Export, Import buttons to toolbar
    - [x] 1.5.5 Update CSS for fixed/sticky toolbar positioning
    - [x] 1.5.6 Ensure toolbar doesn't overlap with scrollable content
    - [x] 1.5.7 Test: Scroll editor panel, buttons should stay visible
    - [x] 1.5.8 Test all button functionality still works
  - [x] 1.6 Commit bug fixes
    - [x] 1.6.1 Run all tests: `npm run test:run`
    - [x] 1.6.2 Verify all tests pass
    - [x] 1.6.3 Git add changes: `git add .`
    - [x] 1.6.4 Commit: `git commit -m "fix: resolve Stage 3 critical bugs (translations, language, duplicates, alignment, layout)"`

---

### PHASE 2: VISUAL ENHANCEMENTS

- [ ] 2.0 Implement Visual Enhancements (REQ-VIS-001 through REQ-VIS-004)
  - [ ] 2.1 Add structure tier indicators (REQ-VIS-001)
    - [ ] 2.1.1 Read `src/config/structures.js`
    - [ ] 2.1.2 Add `tier` field (number) to all structures
    - [ ] 2.1.3 Add `type` field (string: 'energy', 'production', 'mining') to all structures
    - [ ] 2.1.4 Set solarPanel: tier=1, type='energy'
    - [ ] 2.1.5 Set miningFacility: tier=1, type='mining'
    - [ ] 2.1.6 Read `src/scenes/MapScene.js` drawTile() method
    - [ ] 2.1.7 Check if tile has structure: `structureManager.getStructure(q, r)`
    - [ ] 2.1.8 Create getStructureIcon() function with emoji mapping
    - [ ] 2.1.9 Energy type: ⚡, Production: 🏭, Mining: ⛏️
    - [ ] 2.1.10 Generate tier bars: '|'.repeat(tier)
    - [ ] 2.1.11 Draw icon + bars in top-right corner of hex
    - [ ] 2.1.12 Use small font size (10-12px) to not obscure tile
    - [ ] 2.1.13 Test: Build solar panel, should show ⚡|
    - [ ] 2.1.14 Test: Create structure with tier 3, should show correct bars
    - [ ] 2.1.15 Test: Icon should not cover resource name or drone count
  - [ ] 2.2 Implement live resource updates (REQ-VIS-002)
    - [ ] 2.2.1 Read `src/scenes/CraftingScene.js` create() method
    - [ ] 2.2.2 Add game.events listener for 'step' event
    - [ ] 2.2.3 Implement updateResourceDisplay() method
    - [ ] 2.2.4 Update displayed amounts from resourceManager
    - [ ] 2.2.5 Update button disabled states based on current resources
    - [ ] 2.2.6 Throttle updates to once per second for performance
    - [ ] 2.2.7 Repeat for `src/scenes/DronesScene.js`
    - [ ] 2.2.8 Add step listener and updateResourceDisplay()
    - [ ] 2.2.9 Update `src/ui/ResourcePanel.js` similarly
    - [ ] 2.2.10 Test: Resources should update without clicking anything
    - [ ] 2.2.11 Test: Craft button should enable when resources reach required amount
    - [ ] 2.2.12 Test performance: Ensure 60 FPS maintained
    - [ ] 2.2.13 Use Chrome DevTools to check for lag
  - [ ] 2.3 Add drone capacity color indicators (REQ-VIS-003)
    - [ ] 2.3.1 Read `src/scenes/MapScene.js` drawTile() method
    - [ ] 2.3.2 Find where drone count circle is drawn
    - [ ] 2.3.3 Calculate capacity percentage: (tile.drones / tile.maxDrones) * 100
    - [ ] 2.3.4 Define color logic: >=100% green, 50-99% yellow, <50% gray
    - [ ] 2.3.5 Update circle fill color based on capacity
    - [ ] 2.3.6 Use colors: green=#4ade80, yellow=#fbbf24, gray=#9ca3af
    - [ ] 2.3.7 Test: Deploy drones to see color change
    - [ ] 2.3.8 Test: Fill tile to max (5 drones), should be green
    - [ ] 2.3.9 Test: Partial fill (2-3 drones), should be yellow
    - [ ] 2.3.10 Test: Low fill (1 drone), should be gray
    - [ ] 2.3.11 Verify color contrast is sufficient (accessibility)
  - [ ] 2.4 Remove "custom" labels (REQ-VIS-004)
    - [ ] 2.4.1 Grep search for "custom" in src/ directory
    - [ ] 2.4.2 Read `src/scenes/ConfigScene.js` for "custom" references
    - [ ] 2.4.3 Remove any "Custom" badges or labels from entity list
    - [ ] 2.4.4 Read `src/scenes/StructuresScene.js` for "custom" styling
    - [ ] 2.4.5 Remove special styling for custom entities
    - [ ] 2.4.6 Verify all structures/drones shown equally
    - [ ] 2.4.7 Keep solarPanel and basicGatherer as defaults in hard reset
    - [ ] 2.4.8 Test: All entities should look the same in UI
    - [ ] 2.4.9 Test: Hard reset should keep default entities
  - [ ] 2.5 Commit visual enhancements
    - [ ] 2.5.1 Run all tests: `npm run test:run`
    - [ ] 2.5.2 Verify no errors or warnings
    - [ ] 2.5.3 Git add changes: `git add .`
    - [ ] 2.5.4 Commit: `git commit -m "feat: add structure indicators, live updates, and drone capacity colors"`

---

### PHASE 3: CONFIG SYSTEM FOUNDATION

- [ ] 3.0 Build Config System Foundation (REQ-CFG-001, REQ-CFG-002, REQ-CFG-007, REQ-CFG-008)
  - [ ] 3.1 Create base config infrastructure
    - [ ] 3.1.1 Create `src/config/resources.js` with default resources
    - [ ] 3.1.2 Define resource structure: {id, name, icon, baseRate}
    - [ ] 3.1.3 Add iron: {id:'iron', name:'resources.iron', icon:'🔩', baseRate:1}
    - [ ] 3.1.4 Add silicon: {id:'silicon', name:'resources.silicon', icon:'💎', baseRate:1}
    - [ ] 3.1.5 Add energy: {id:'energy', name:'resources.energy', icon:'⚡', baseRate:0}
    - [ ] 3.1.6 Export resources object and getter functions
    - [ ] 3.1.7 Create `src/config/tiles.js` with tile type definitions
    - [ ] 3.1.8 Define tile type structure: {id, name, resourceProduced, baseRate, allowedDrones}
    - [ ] 3.1.9 Add 'iron' tile type
    - [ ] 3.1.10 Add 'silicon' tile type
    - [ ] 3.1.11 Add 'empty' tile type
    - [ ] 3.1.12 Export tile types and getter functions
  - [ ] 3.2 Create ConfigManager system (REQ-CFG-007)
    - [ ] 3.2.1 Create `src/systems/ConfigManager.js`
    - [ ] 3.2.2 Add JSDoc class documentation
    - [ ] 3.2.3 Constructor: Initialize with references to resources, tiles, structures, drones
    - [ ] 3.2.4 Implement validateResource(resourceData) method
    - [ ] 3.2.5 Check required fields: id, name, icon
    - [ ] 3.2.6 Check id is unique (not already in use)
    - [ ] 3.2.7 Check id format: alphanumeric + hyphen/underscore only
    - [ ] 3.2.8 Return {valid: boolean, errors: string[]}
    - [ ] 3.2.9 Implement validateTileType(tileData) method
    - [ ] 3.2.10 Check required fields and uniqueness
    - [ ] 3.2.11 Verify resourceProduced exists in resources
    - [ ] 3.2.12 Implement validateStructure(structureData) method
    - [ ] 3.2.13 Verify all cost resources exist
    - [ ] 3.2.14 Verify production resource exists
    - [ ] 3.2.15 Implement validateDrone(droneData) method
    - [ ] 3.2.16 Verify all cost resources exist
    - [ ] 3.2.17 Verify all required components exist
    - [ ] 3.2.18 Add checkDependencies(entityType, entityId) method
    - [ ] 3.2.19 Return list of entities that depend on this one
    - [ ] 3.2.20 Prevent deletion if dependencies exist
  - [ ] 3.3 Implement resource management UI (REQ-CFG-001)
    - [ ] 3.3.1 Read `src/scenes/ConfigScene.js` current structure
    - [ ] 3.3.2 Add "Resources" tab to config editor
    - [ ] 3.3.3 Create buildResourceListUI() method
    - [ ] 3.3.4 Display list of all resources (iron, silicon, energy + custom)
    - [ ] 3.3.5 Each resource shows: icon, name, id, base rate
    - [ ] 3.3.6 Add [+ New Resource] button
    - [ ] 3.3.7 Create buildResourceEditorUI(resourceId) method
    - [ ] 3.3.8 Form fields: ID (text), Name (i18n key), Icon (text), Base Rate (number)
    - [ ] 3.3.9 Add [Save] and [Delete] buttons
    - [ ] 3.3.10 Implement onSaveResource() handler
    - [ ] 3.3.11 Validate using ConfigManager.validateResource()
    - [ ] 3.3.12 Show error messages if validation fails
    - [ ] 3.3.13 Save to config on success
    - [ ] 3.3.14 Implement onDeleteResource() handler
    - [ ] 3.3.15 Check dependencies before deleting
    - [ ] 3.3.16 Show warning if resource is in use
    - [ ] 3.3.17 Update resource list after save/delete
    - [ ] 3.3.18 Test: Create new resource, verify it appears in list
    - [ ] 3.3.19 Test: Delete unused resource successfully
    - [ ] 3.3.20 Test: Cannot delete resource in use by structure
  - [ ] 3.4 Implement tile type management UI (REQ-CFG-002)
    - [ ] 3.4.1 Add "Tile Types" tab to config editor
    - [ ] 3.4.2 Create buildTileTypeListUI() method
    - [ ] 3.4.3 Display all tile types with resource info
    - [ ] 3.4.4 Add [+ New Tile Type] button
    - [ ] 3.4.5 Create buildTileTypeEditorUI(tileTypeId) method
    - [ ] 3.4.6 Form fields: ID, Name (i18n), Resource Produced (dropdown), Base Rate
    - [ ] 3.4.7 Populate resource dropdown from resources.js
    - [ ] 3.4.8 Add multi-select for allowed drones
    - [ ] 3.4.9 Implement onSaveTileType() handler
    - [ ] 3.4.10 Validate using ConfigManager.validateTileType()
    - [ ] 3.4.11 Save to config on success
    - [ ] 3.4.12 Implement onDeleteTileType() handler
    - [ ] 3.4.13 Check if any map tiles use this type
    - [ ] 3.4.14 Prevent deletion if in use
    - [ ] 3.4.15 Test: Create new tile type with resource
    - [ ] 3.4.16 Test: Change resource dropdown, see live update
    - [ ] 3.4.17 Test: Cannot delete tile type used on map
  - [ ] 3.5 Implement config import/export (REQ-CFG-008)
    - [ ] 3.5.1 Add [Export All] button to toolbar
    - [ ] 3.5.2 Implement exportAllConfigs() method
    - [ ] 3.5.3 Combine resources, tiles, structures, drones into single JSON
    - [ ] 3.5.4 Add metadata: version, timestamp, author
    - [ ] 3.5.5 Create download link with JSON blob
    - [ ] 3.5.6 Trigger download as "panix-config-YYYY-MM-DD.json"
    - [ ] 3.5.7 Add [Import] button to toolbar
    - [ ] 3.5.8 Create file input for JSON upload
    - [ ] 3.5.9 Implement importAllConfigs(jsonData) method
    - [ ] 3.5.10 Parse JSON and validate structure
    - [ ] 3.5.11 Validate each entity using ConfigManager
    - [ ] 3.5.12 Show summary: X resources, Y tiles, Z structures imported
    - [ ] 3.5.13 Show errors if validation fails
    - [ ] 3.5.14 Ask for confirmation before overwriting
    - [ ] 3.5.15 Apply configs and refresh UI
    - [ ] 3.5.16 Test: Export configs, modify, import back
    - [ ] 3.5.17 Test: Import invalid config shows clear errors
  - [ ] 3.6 Commit config foundation
    - [ ] 3.6.1 Run all tests: `npm run test:run`
    - [ ] 3.6.2 Write ConfigManager.test.js with validation tests
    - [ ] 3.6.3 Test resource validation (valid, duplicate ID, missing fields)
    - [ ] 3.6.4 Test tile type validation
    - [ ] 3.6.5 Test dependency checking
    - [ ] 3.6.6 Verify all tests pass
    - [ ] 3.6.7 Git add changes: `git add .`
    - [ ] 3.6.8 Commit: `git commit -m "feat: implement config system foundation (resources, tiles, validation, import/export)"`

---

### PHASE 4: CONFIG SYSTEM ADVANCED

- [ ] 4.0 Enhance Config System (REQ-CFG-003, REQ-CFG-004, REQ-CFG-005, REQ-CFG-006, REQ-CFG-009)
  - [ ] 4.1 Enhance structure management (REQ-CFG-003)
    - [ ] 4.1.1 Read current structure editor in ConfigScene.js
    - [ ] 4.1.2 Replace JSON textarea with form-based UI
    - [ ] 4.1.3 Form fields: ID, Name (i18n), Description (i18n)
    - [ ] 4.1.4 Add Tier number input (unlimited)
    - [ ] 4.1.5 Add Type dropdown: energy, production, mining, research, storage
    - [ ] 4.1.6 Create costs editor: [+ Add Cost] button
    - [ ] 4.1.7 Each cost: Resource dropdown + Amount input + [Remove] button
    - [ ] 4.1.8 Populate resource dropdown from all defined resources
    - [ ] 4.1.9 Create production editor: Resource dropdown + Amount/sec input
    - [ ] 4.1.10 Add tile type restrictions multi-select
    - [ ] 4.1.11 Implement onSaveStructure() handler
    - [ ] 4.1.12 Validate using ConfigManager.validateStructure()
    - [ ] 4.1.13 Convert form data to structure object
    - [ ] 4.1.14 Save and refresh structure list
    - [ ] 4.1.15 Test: Create structure with multiple costs
    - [ ] 4.1.16 Test: Change resource in dropdown, cost updates
    - [ ] 4.1.17 Test: Add/remove costs dynamically
  - [ ] 4.2 Enhance drone management (REQ-CFG-004)
    - [ ] 4.2.1 Read current drone editor in ConfigScene.js
    - [ ] 4.2.2 Replace JSON textarea with form-based UI
    - [ ] 4.2.3 Form fields: ID, Name (i18n), Description (i18n)
    - [ ] 4.2.4 Create costs editor like structures
    - [ ] 4.2.5 Add components multi-select (chassis, circuit, powerCore)
    - [ ] 4.2.6 Add gathering capacity number input
    - [ ] 4.2.7 Add tile type restrictions multi-select
    - [ ] 4.2.8 Populate all dropdowns from defined entities
    - [ ] 4.2.9 Implement onSaveDrone() handler
    - [ ] 4.2.10 Validate using ConfigManager.validateDrone()
    - [ ] 4.2.11 Convert form data to drone object
    - [ ] 4.2.12 Save and refresh drone list
    - [ ] 4.2.13 Test: Create drone with costs and components
    - [ ] 4.2.14 Test: Tile type restrictions work correctly
  - [ ] 4.3 Implement config relationships (REQ-CFG-005)
    - [ ] 4.3.1 Add event system to ConfigManager
    - [ ] 4.3.2 Emit 'resourceAdded' event when new resource created
    - [ ] 4.3.3 Listen in structure editor to update cost dropdowns
    - [ ] 4.3.4 Listen in drone editor to update cost dropdowns
    - [ ] 4.3.5 Listen in tile editor to update production dropdowns
    - [ ] 4.3.6 Emit 'tileTypeAdded' event when new tile type created
    - [ ] 4.3.7 Listen in structure editor to update placement restrictions
    - [ ] 4.3.8 Listen in drone editor to update deployment restrictions
    - [ ] 4.3.9 Implement refreshDropdowns() method for each editor
    - [ ] 4.3.10 Test: Create new resource, immediately available in structure costs
    - [ ] 4.3.11 Test: Create new tile type, available in structure placement
    - [ ] 4.3.12 Test: Dropdowns update without page reload
  - [ ] 4.4 Add live preview system (REQ-CFG-009)
    - [ ] 4.4.1 Create preview panel in ConfigScene
    - [ ] 4.4.2 Show preview next to edit form
    - [ ] 4.4.3 For structures: Show hex tile with structure indicator
    - [ ] 4.4.4 Display structure icon, tier bars, costs, production
    - [ ] 4.4.5 For drones: Show stat card
    - [ ] 4.4.6 Display costs, components required, capacity
    - [ ] 4.4.7 For resources: Show icon and usage count
    - [ ] 4.4.8 For tile types: Show hex with resource info
    - [ ] 4.4.9 Implement updatePreview() method
    - [ ] 4.4.10 Call on every form field change
    - [ ] 4.4.11 Use debounce to avoid excessive updates (250ms)
    - [ ] 4.4.12 Test: Type in form, preview updates in real-time
    - [ ] 4.4.13 Test: Change tier, structure indicator updates
  - [ ] 4.5 Implement secure config storage (REQ-CFG-006)
    - [ ] 4.5.1 Create `src/utils/configStorage.js`
    - [ ] 4.5.2 Add saveConfigToDev(configType, data) method
    - [ ] 4.5.3 Use localStorage for dev mode storage
    - [ ] 4.5.4 Key format: `panix-dev-config-${configType}`
    - [ ] 4.5.5 Add loadConfigFromDev(configType) method
    - [ ] 4.5.6 Test dev mode storage works
    - [ ] 4.5.7 Build production: `npm run build`
    - [ ] 4.5.8 Check dist/ folder for config files
    - [ ] 4.5.9 Verify configs are bundled into JS (not separate JSON)
    - [ ] 4.5.10 Open production build in browser DevTools
    - [ ] 4.5.11 Check if configs are easily accessible/modifiable
    - [ ] 4.5.12 If configs are accessible, implement fallback:
    - [ ] 4.5.13 Create GitHub Gist API integration
    - [ ] 4.5.14 Add VITE_GIST_TOKEN environment variable
    - [ ] 4.5.15 Implement uploadConfigToGist(configData) method
    - [ ] 4.5.16 Implement loadConfigFromGist(gistId) method
    - [ ] 4.5.17 Update production to load from Gist URL
    - [ ] 4.5.18 Test: Configs not editable in production build
  - [ ] 4.6 Commit config advanced features
    - [ ] 4.6.1 Run all tests: `npm run test:run`
    - [ ] 4.6.2 Write tests for form validation
    - [ ] 4.6.3 Write tests for config relationships
    - [ ] 4.6.4 Verify test coverage >80%
    - [ ] 4.6.5 Git add changes: `git add .`
    - [ ] 4.6.6 Commit: `git commit -m "feat: enhance config system (dropdowns, relationships, preview, secure storage)"`

---

### PHASE 5: TESTING AND DOCUMENTATION

- [ ] 5.0 Testing and Documentation
  - [ ] 5.1 Write comprehensive tests
    - [ ] 5.1.1 Create `src/systems/ConfigManager.test.js`
    - [ ] 5.1.2 Test resource validation (valid, invalid, duplicate ID)
    - [ ] 5.1.3 Test tile type validation
    - [ ] 5.1.4 Test structure validation (costs, production)
    - [ ] 5.1.5 Test drone validation (costs, components)
    - [ ] 5.1.6 Test dependency checking
    - [ ] 5.1.7 Update `src/utils/i18n.test.js` for new import approach
    - [ ] 5.1.8 Run full test suite: `npm run test:run`
    - [ ] 5.1.9 Verify all 312+ tests passing
    - [ ] 5.1.10 Generate coverage report: `npm run test:coverage`
    - [ ] 5.1.11 Verify coverage >80%
  - [ ] 5.2 Update documentation
    - [ ] 5.2.1 Read current `README.md`
    - [ ] 5.2.2 Add "Config System" section
    - [ ] 5.2.3 Document how to use config editor in dev mode
    - [ ] 5.2.4 Document resource management
    - [ ] 5.2.5 Document tile type management
    - [ ] 5.2.6 Document structure/drone configuration
    - [ ] 5.2.7 Document import/export functionality
    - [ ] 5.2.8 Add screenshots or examples
    - [ ] 5.2.9 Update `CHANGELOG.md` with Stage 3 changes
    - [ ] 5.2.10 List all bug fixes
    - [ ] 5.2.11 List all new features (indicators, live updates, config system)
    - [ ] 5.2.12 Note any breaking changes
    - [ ] 5.2.13 Add migration notes if needed
  - [ ] 5.3 Verify success metrics
    - [ ] 5.3.1 Test all 5 bugs are fixed
    - [ ] 5.3.2 Verify translations work in production build
    - [ ] 5.3.3 Verify language persists on reload
    - [ ] 5.3.4 Verify no duplicate entity creation
    - [ ] 5.3.5 Verify resource panel is aligned
    - [ ] 5.3.6 Verify config buttons are properly positioned
    - [ ] 5.3.7 Test structure indicators appear on map
    - [ ] 5.3.8 Test live resource updates (no lag)
    - [ ] 5.3.9 Test drone capacity colors
    - [ ] 5.3.10 Test creating new resource in <2 minutes
    - [ ] 5.3.11 Test creating new structure in <2 minutes
    - [ ] 5.3.12 Performance test: FPS stays at 60
    - [ ] 5.3.13 Security test: Configs not easily modifiable in production
  - [ ] 5.4 Prepare for release
    - [ ] 5.4.1 Build production: `npm run build`
    - [ ] 5.4.2 Test production build locally: `npm run preview`
    - [ ] 5.4.3 Test all features work in production
    - [ ] 5.4.4 Clear localStorage and test fresh game
    - [ ] 5.4.5 Test save/load with new config system
    - [ ] 5.4.6 Git add all changes: `git add .`
    - [ ] 5.4.7 Final commit: `git commit -m "chore: Stage 3 complete - polish, visual enhancements, and config system"`
    - [ ] 5.4.8 Merge to main: `git checkout main && git merge phase/phase3 --no-ff`
    - [ ] 5.4.9 Tag release: `git tag v2.1.0 -m "Stage 3: Polish & Config Enhancement"`
    - [ ] 5.4.10 Push to remote: `git push origin main --tags`

---

**Status:** All tasks defined. Ready for implementation!

Begin with Phase 0 to create the feature branch, then proceed systematically through each phase.
