# Task List: PoC - Map, Drones & Crafting System

**Feature:** Core PoC - Hexagonal Map with Resource Tiles, Drone Management, and Basic Crafting  
**Based on:** PRD v1.0 (prd-poc-map-drones-crafting.md)  
**Created:** January 5, 2026

---

## Relevant Files

- `src/main.js` - Entry point for Phaser game
- `src/config/gameConfig.js` - Phaser game configuration
- `src/config/mapConfig.js` - Map layout, tile types, and starting position
- `src/config/recipes.js` - Crafting recipes for components and drones
- `src/config/balance.js` - Game balance values (rates, capacities, etc.)
- `src/scenes/MapScene.js` - Main map view scene
- `src/scenes/CraftingScene.js` - Crafting interface scene
- `src/scenes/DronesScene.js` - Drone building interface scene
- `src/systems/HexGrid.js` - Hex map logic and rendering
- `src/systems/ResourceManager.js` - Resource tracking and generation
- `src/systems/CraftingManager.js` - Crafting logic and component inventory
- `src/systems/DroneManager.js` - Drone deployment and tracking
- `src/ui/ResourcePanel.js` - Resource display component
- `src/ui/TileInfoPanel.js` - Tile details panel component
- `src/ui/TabNavigation.js` - Tab system for scene switching
- `src/utils/hexMath.js` - Hex coordinate conversion utilities
- `src/utils/saveLoad.js` - localStorage save/load handling
- `index.html` - Main HTML file
- `style.css` - Global styles for DOM UI elements
- `package.json` - Project dependencies

### Notes

- Phaser 3 will handle most rendering; DOM elements will overlay for UI panels
- Use Vite for development server and build process
- Save/load will use localStorage with JSON serialization
- All configuration should be externalized to config files for easy balancing

---

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature: `git checkout -b feature/poc-map-drones-crafting`

- [x] 1.0 Project setup and dependencies
  - [x] 1.1 Initialize Vite project: `npm create vite@latest . -- --template vanilla`
  - [x] 1.2 Install Phaser 3: `npm install phaser`
  - [x] 1.3 Create folder structure: `src/`, `src/scenes/`, `src/systems/`, `src/config/`, `src/ui/`, `src/utils/`
  - [x] 1.4 Update `index.html` to include game container div and load main.js
  - [x] 1.5 Create basic `style.css` with color scheme from PRD (REQ-UI-005)
  - [x] 1.6 Test that Vite dev server runs: `npm run dev`

- [x] 2.0 Configuration files and game constants
  - [x] 2.1 Create `src/config/gameConfig.js` with Phaser configuration (REQ-STATE-001)
  - [x] 2.2 Create `src/config/balance.js` with resource generation rates and max drones per tile (REQ-CONFIG-003)
  - [x] 2.3 Create `src/config/mapConfig.js` with 10×10 map layout and resource distribution (REQ-CONFIG-001, Appendix B)
  - [x] 2.4 Create `src/config/recipes.js` with component and drone recipes (REQ-CONFIG-002, Appendix A)
  - [x] 2.5 Verify all configs export properly and can be imported

- [x] 3.0 Hex grid system and map rendering
  - [x] 3.1 Create `src/utils/hexMath.js` with axial coordinate conversion functions (Section 7.3)
  - [x] 3.2 Implement hex-to-pixel conversion for flat-top hexagons
  - [x] 3.3 Implement pixel-to-hex conversion for click detection
  - [x] 3.4 Create `src/systems/HexGrid.js` class to manage tile data structure (REQ-MAP-002)
  - [x] 3.5 Initialize 10×10 grid with tiles from mapConfig (REQ-MAP-001)
  - [x] 3.6 Create `src/scenes/MapScene.js` as main Phaser scene (REQ-MAP-005)
  - [x] 3.7 Render hexagonal tiles using Phaser Graphics with color coding (REQ-UI-006)
  - [x] 3.8 Highlight starting tile with distinct border/glow (REQ-MAP-003)
  - [x] 3.9 Implement tile click detection and selection (REQ-MAP-004)
  - [x] 3.10 Add hover effect on tiles (Section 6.1)
  - [x] 3.11 Test that all tiles are clickable and show correct coordinates

- [x] 4.0 Resource system and UI panels
  - [x] 4.1 Create `src/systems/ResourceManager.js` to track Iron, Silicon, Energy (REQ-RES-001)
  - [x] 4.2 Implement resource generation update function with delta time (REQ-STATE-005, Section 10)
  - [x] 4.3 Add starting tile auto-generation logic (+1 Iron/sec) (REQ-RES-003)
  - [x] 4.4 Add drone-based resource generation logic (+0.5/sec per drone) (REQ-RES-004)
  - [x] 4.5 Create `src/ui/ResourcePanel.js` as DOM element overlay (REQ-RES-002)
  - [x] 4.6 Position ResourcePanel in top-left corner with proper styling
  - [x] 4.7 Update ResourcePanel display every frame with formatted numbers
  - [x] 4.8 Create `src/ui/TileInfoPanel.js` for selected tile details (REQ-INFO-001)
  - [x] 4.9 Position TileInfoPanel on right side (300px width)
  - [x] 4.10 Show/hide TileInfoPanel based on tile selection (REQ-INFO-001)
  - [x] 4.11 Display tile coordinates, resource type, drone count in panel (REQ-INFO-002)
  - [x] 4.12 Show "Starting Base" label for starting tile (REQ-INFO-003)
  - [x] 4.13 Show "Empty Tile" message for empty tiles (REQ-INFO-004)
  - [x] 4.14 Add "Deploy Drone" button to panel (conditionally visible) (REQ-INFO-002)
  - [x] 4.15 Test resource generation works correctly for starting tile

- [x] 5.0 Crafting system implementation
  - [x] 5.1 Create `src/systems/CraftingManager.js` to manage component inventory (REQ-CRAFT-004)
  - [x] 5.2 Initialize components: chassis, circuit, powerCore with 0 quantity
  - [x] 5.3 Implement craftComponent() function (REQ-CRAFT-001, Section 10)
  - [x] 5.4 Add resource cost checking before crafting
  - [x] 5.5 Deduct resources and increment component on successful craft (REQ-CRAFT-005)
  - [x] 5.6 Create `src/scenes/CraftingScene.js` for crafting UI (REQ-CRAFT-003)
  - [x] 5.7 Display all component recipes with costs from recipes.js (REQ-CRAFT-003)
  - [x] 5.8 Show current component inventory in crafting scene
  - [x] 5.9 Add "Craft" button for each component
  - [x] 5.10 Gray out craft button when resources insufficient (REQ-CRAFT-003)
  - [x] 5.11 Add visual feedback on successful craft (button flash/message) (REQ-CRAFT-005)
  - [x] 5.12 Test crafting all three components with sufficient resources
  - [x] 5.13 Test that crafting fails gracefully with insufficient resources

- [x] 6.0 Drone building and deployment system
  - [x] 6.1 Create `src/systems/DroneManager.js` to manage drones (REQ-DRONE-005)
  - [x] 6.2 Initialize drone counters: total built, available, deployments array
  - [x] 6.3 Implement buildDrone() function to assemble from components (REQ-DRONE-001)
  - [x] 6.4 Check component availability before building
  - [x] 6.5 Deduct components and increment available drones (REQ-DRONE-003)
  - [x] 6.6 Create `src/scenes/DronesScene.js` for drone building UI (REQ-DRONE-002)
  - [x] 6.7 Display "Basic Gathering Drone" with component requirements
  - [x] 6.8 Show current component inventory in drones scene
  - [x] 6.9 Display available drone count (REQ-DRONE-004)
  - [x] 6.10 Add "Build Drone" button (grayed if components missing) (REQ-DRONE-002)
  - [x] 6.11 Add visual feedback on successful drone build (REQ-DRONE-003)
  - [x] 6.12 Implement deployDrone() function in DroneManager (REQ-DEPLOY-001)
  - [x] 6.13 Connect "Deploy Drone" button in TileInfoPanel to deployDrone()
  - [x] 6.14 Validate deployment: check tile has resources, not at capacity (REQ-DEPLOY-001)
  - [x] 6.15 Prevent deployment to starting tile (REQ-DEPLOY-004)
  - [x] 6.16 Update tile drone count and available drones on deploy (REQ-DEPLOY-002)
  - [x] 6.17 Update resource generation rate when drone deployed
  - [x] 6.18 Refresh TileInfoPanel after deployment (REQ-DEPLOY-002)
  - [x] 6.19 Display drone count on tiles (visual indicator or text)
  - [x] 6.20 Test full flow: craft components → build drone → deploy to tile → resources generate

- [x] 7.0 Save/load system
  - [x] 7.1 Create `src/utils/saveLoad.js` with save/load functions (REQ-STATE-002)
  - [x] 7.2 Define save data structure (REQ-STATE-003, Section 7.4)
  - [x] 7.3 Implement saveGame() to serialize state to localStorage
  - [x] 7.4 Implement loadGame() to deserialize and restore state (REQ-STATE-004)
  - [x] 7.5 Integrate saveGame() into game loop (auto-save every 10 seconds) (REQ-STATE-002)
  - [x] 7.6 Add manual "Save" button in UI
  - [x] 7.7 Call saveGame() on beforeunload event (REQ-STATE-002)
  - [x] 7.8 Call loadGame() on game startup
  - [x] 7.9 Display "Game loaded" message briefly when loading save (REQ-STATE-004)
  - [x] 7.10 Test save/load preserves: resources, components, drones, deployments
  - [x] 7.11 Test that fresh start works when no save exists

- [ ] 8.0 Polish, testing, and integration
  - [x] 8.1 Create `src/ui/TabNavigation.js` for scene switching (REQ-UI-001)
  - [x] 8.2 Add tabs: Map, Crafting, Drones at top of UI
  - [x] 8.3 Implement tab switching that preserves game state (REQ-UI-001)
  - [x] 8.4 Set Map as default tab on startup (REQ-UI-001)
  - [x] 8.5 Create `src/main.js` as entry point that initializes all systems
  - [x] 8.6 Connect ResourceManager update to Phaser's update loop
  - [x] 8.7 Ensure all DOM panels update in sync with game state
  - [x] 8.8 Add visual polish: hover effects, transitions, colors (REQ-UI-005, REQ-UI-006)
  - [ ] 8.9 Test on Chrome, Firefox, Safari (Section 10 checklist)
  - [ ] 8.10 Test all requirements from Section 8 completion criteria
  - [ ] 8.11 Verify performance: 60 FPS, <2s load time (Section 7.5)
  - [ ] 8.12 Fix any bugs found during testing
  - [ ] 8.13 Update package.json with correct project name and version
  - [ ] 8.14 Update README.md with setup and run instructions
  - [ ] 8.15 Commit all changes and push feature branch
  - [ ] 8.16 Create PR or merge to main branch

---

**All tasks defined. Phase 1 complete. Ready to continue with Phase 2!**
