# Product Requirements Document: PoC - Map, Drones & Crafting System

**Feature Name:** Core PoC - Hexagonal Map with Resource Tiles, Drone Management, and Basic Crafting  
**Version:** 1.0  
**Created:** January 5, 2026  
**Target Audience:** Junior Developer  
**Priority:** High (Foundation for entire game)

---

## 1. Introduction/Overview

This PRD defines the Proof of Concept (PoC) for Panix Incremental, focusing on the three core mechanics that will form the foundation of the game: a hexagonal tile-based map, resource collection through drone deployment, and a component-based crafting system.

**Problem:** We need to validate the core gameplay loop before building additional features. The PoC will prove that the map-resource-drone-crafting cycle is engaging and technically feasible.

**Goal:** Create a playable browser-based prototype where players can:
- View a hexagonal map with resource tiles
- Manually collect resources from their starting position
- Craft basic components
- Build drones from components
- Deploy drones to resource tiles to automate collection

---

## 2. Goals

1. **Validate Core Loop:** Prove the map → resource → craft → drone → automate cycle is fun and functional
2. **Establish Technical Foundation:** Set up Phaser.js architecture that can scale to full game
3. **Create Reusable Systems:** Build map, crafting, and drone systems that can be extended later
4. **Configurable Design:** Make map size, resources, and recipes easily adjustable via config files
5. **Mobile-Ready Architecture:** Structure code for future mobile/desktop ports

---

## 3. User Stories

**As a player, I want to:**

1. See a hexagonal map so I can visualize the game world and plan my expansion
2. Click on tiles to view their details (resource type, drone count, coordinates) so I know what's available
3. Automatically collect resources from my starting tile so I can begin crafting immediately
4. Craft basic components from raw resources so I can build more complex items
5. Assemble drones from components so I can automate resource collection
6. Deploy drones to resource tiles so they automatically gather resources for me
7. See my drone count on each tile (e.g., "2/10") so I know my deployment capacity
8. Watch my resources increase in real-time as drones work so I feel progression
9. Access all game features from a clean, organized UI so I'm not overwhelmed

---

## 4. Functional Requirements

### 4.1 Map System

**REQ-MAP-001:** The game must display a 10×10 hexagonal grid map
- Grid layout: Flat-top hexagons arranged in offset rows (even-q or odd-r)
- Configurable grid size via config file for future scaling

**REQ-MAP-002:** Each hex tile must have the following properties:
- Coordinates (q, r using axial coordinates or similar hex coordinate system)
- Resource type (Iron, Silicon, Energy, or Empty)
- Drone count (current/maximum, initially 0/10)
- Visual representation (color-coded by resource type)

**REQ-MAP-003:** The starting tile must be clearly highlighted
- Positioned at center of map (coordinate 5,5 or equivalent)
- Visually distinct (border, glow, or unique color)
- Automatically generates 1 basic resource per second (Iron)

**REQ-MAP-004:** Players must be able to click any tile to select it
- Selected tile shows visual feedback (highlight border)
- Clicking empty space or same tile deselects

**REQ-MAP-005:** Map must be rendered using Phaser.js game engine
- Utilize Phaser's scene system
- Implement camera controls (future: pan/zoom, PoC: fixed view)

### 4.2 Tile Information Panel

**REQ-INFO-001:** A dedicated panel must display details of the selected tile
- Panel location: Right side of screen (300px width)
- Panel appears only when tile is selected
- Panel hides when no tile is selected

**REQ-INFO-002:** The panel must show:
- Tile coordinates (e.g., "Tile: Q5, R3")
- Resource type (e.g., "Resource: Iron Deposit")
- Current drone count / Maximum (e.g., "Drones: 2/10")
- Resource generation rate (e.g., "+5 Iron/sec")
- "Deploy Drone" button (if player has available drones and tile has capacity)

**REQ-INFO-003:** If tile is the starting position, panel must show:
- "Starting Base" label
- Auto-collection rate (e.g., "Auto-collecting: +1 Iron/sec")

**REQ-INFO-004:** If tile is empty (no resources), panel must show:
- "Empty Tile" message
- "No resources available" text
- No deploy button

### 4.3 Resource System

**REQ-RES-001:** The game must track three basic resources:
- Iron (starting resource)
- Silicon
- Energy

**REQ-RES-002:** Resources must be displayed in a resource panel
- Panel location: Top-left corner or left sidebar
- Shows current amount for each resource
- Format: "Iron: 50" or with icon + number
- Updates in real-time

**REQ-RES-003:** Starting tile auto-generates Iron:
- Rate: +1 Iron per second
- No drone required
- Begins immediately when game starts

**REQ-RES-004:** Resource tiles must generate resources when drones are deployed:
- Each drone generates: +0.5 resources per second
- Multiple drones on same tile stack additively
- Example: 3 drones on Iron tile = +1.5 Iron/sec

**REQ-RES-005:** Resources must have no storage limit in PoC
- Future: add storage caps
- Display resources as whole numbers (round down)

### 4.4 Crafting System

**REQ-CRAFT-001:** Players must be able to craft components from raw resources
- Components are intermediate items, not directly usable
- Crafting is instant in PoC (future: add crafting time)

**REQ-CRAFT-002:** The game must include these basic components:

| Component | Resources Required | Used For |
|-----------|-------------------|----------|
| Drone Chassis | 50 Iron | All drones |
| Basic Circuit | 30 Silicon + 10 Iron | All drones |
| Power Core | 20 Energy + 20 Silicon | All drones |

**REQ-CRAFT-003:** Crafting interface must be in a dedicated tab/panel
- Location: Main content area, accessible via "Crafting" tab
- Shows all available component recipes
- Displays resource costs and current stock
- "Craft" button (grayed out if resources insufficient)

**REQ-CRAFT-004:** Component inventory must be tracked and displayed
- Show current quantity of each component
- Format: "Drone Chassis: 3"
- Located in crafting panel or separate inventory section

**REQ-CRAFT-005:** When crafting a component:
- Resources must be deducted immediately
- Component count must increase by 1
- Visual feedback (button flash, success message)

### 4.5 Drone Building & Assembly

**REQ-DRONE-001:** Players must be able to build "Basic Gathering Drone"
- Requires: 1 Drone Chassis + 1 Basic Circuit + 1 Power Core
- Assembly is instant in PoC

**REQ-DRONE-002:** Drone building interface must be accessible via "Drones" tab
- Shows drone type ("Basic Gathering Drone")
- Displays component requirements
- Shows current component inventory
- "Build Drone" button (grayed if components missing)

**REQ-DRONE-003:** When building a drone:
- Required components must be deducted
- Available drone count must increase by 1
- Visual feedback (success message)

**REQ-DRONE-004:** Available drones must be tracked and displayed
- Format: "Available Drones: 5"
- Location: Top of drones panel or resource bar

**REQ-DRONE-005:** Total built drones must be tracked separately from deployed
- Total built: all drones ever created
- Available: built minus deployed
- Deployed: drones on tiles

### 4.6 Drone Deployment

**REQ-DEPLOY-001:** Players must be able to deploy drones to resource tiles
- Click tile → select tile → click "Deploy Drone" button
- Can only deploy to tiles with resources (not empty tiles)
- Cannot deploy to tiles at max capacity (10/10)

**REQ-DEPLOY-002:** When deploying a drone:
- Available drone count must decrease by 1
- Tile's drone count must increase by 1
- Tile's resource generation must update
- Tile info panel must refresh

**REQ-DEPLOY-003:** Deployed drones must be permanent (PoC limitation)
- Future: add recall/reassign functionality
- For now: drones stay on tile forever

**REQ-DEPLOY-004:** Starting tile cannot have drones deployed
- It auto-generates resources
- Deploy button disabled for starting tile

### 4.7 User Interface Layout

**REQ-UI-001:** The UI must use a tabbed navigation system
- Tabs: Map, Crafting, Drones
- Default tab: Map
- Tab switching preserves game state

**REQ-UI-002:** Map tab must show:
- Hexagonal map (center, fills most of screen)
- Resource panel (top-left)
- Tile info panel (right side, conditional)

**REQ-UI-003:** Crafting tab must show:
- List of all component recipes
- Current component inventory
- Resource costs
- Craft buttons

**REQ-UI-004:** Drones tab must show:
- Available drone count
- Drone build interface
- Component requirements
- Build button

**REQ-UI-005:** UI must use color scheme from GDD:
- Dark theme (backgrounds: #1a1a2e, #16213e)
- Accent: #e94560 (red/pink)
- Text: #eaeaea (light gray)

**REQ-UI-006:** Resource colors on map:
- Iron tiles: Gray/silver (#7D7D7D)
- Silicon tiles: Blue/cyan (#4A90E2)
- Energy tiles: Yellow/gold (#F5A623)
- Empty tiles: Dark gray (#2A2A3E)
- Starting tile: Bright highlight (#e94560 border)

### 4.8 Game Loop & State Management

**REQ-STATE-001:** Game must run at 60 FPS (Phaser default)
- Use Phaser's update loop for game logic

**REQ-STATE-002:** Game state must be saved to localStorage
- Save every 10 seconds (auto-save)
- Save on manual "Save" button click
- Save before tab close (beforeunload event)

**REQ-STATE-003:** Saved game state must include:
- Resource amounts (Iron, Silicon, Energy)
- Component inventory
- Total drones built
- Available drones
- Drone deployments (tile coordinates + count)
- Timestamp (for future offline progress)

**REQ-STATE-004:** Game must load saved state on startup
- If no save exists, start fresh
- If save exists, restore all values
- Display "Game loaded" message briefly

**REQ-STATE-005:** Resource generation must update every frame
- Calculate delta time
- Apply generation rates
- Update UI displays

### 4.9 Configuration & Extensibility

**REQ-CONFIG-001:** Map configuration must be in separate config file
- Map size (rows, columns)
- Tile resource distribution
- Starting position coordinates

**REQ-CONFIG-002:** Recipe configuration must be in separate config file
- Component recipes (inputs, outputs)
- Drone recipes
- Easy to add new recipes without code changes

**REQ-CONFIG-003:** Balance values must be configurable:
- Resource generation rates
- Max drones per tile
- Starting tile generation rate

---

## 5. Non-Goals (Out of Scope for PoC)

1. **No enemies or combat** - Focus on resource/drone loop first
2. **No research system** - Will be added in future iteration
3. **No structures** - Only drones for now
4. **No advanced resources** - Just Iron, Silicon, Energy
5. **No drone recall/reassignment** - Deployments are permanent in PoC
6. **No crafting time delays** - Instant crafting for PoC
7. **No zoom or pan on map** - Fixed camera view
8. **No multiple drone types** - Just "Basic Gathering Drone"
9. **No offline progress calculation** - Will be added later
10. **No tutorial or tooltips** - Raw gameplay only
11. **No sound effects or music** - Visual only
12. **No achievements or challenges** - Core loop only

---

## 6. Design Considerations

### 6.1 Visual Design

- **Hexagon rendering:** Use Phaser Graphics or Sprites for hex tiles
- **Tile size:** ~50-60 pixels (point-to-point diameter)
- **Grid layout:** Offset rows for proper hex alignment
- **Hover effects:** Subtle highlight on mouseover
- **Click feedback:** Border animation or color change

### 6.2 UX Flow

1. Player starts game → sees map with highlighted starting tile
2. Starting tile auto-generates Iron → resources increase
3. Player opens Crafting tab → crafts Drone Chassis
4. Player crafts Basic Circuit, then Power Core
5. Player opens Drones tab → builds first drone
6. Player returns to Map tab → clicks Iron tile → deploys drone
7. Drone generates Iron → player crafts more components → builds more drones
8. Cycle repeats with expanding automation

### 6.3 Responsive Design

- Target resolution: 1920×1080 (primary)
- Minimum: 1280×720
- UI panels scale proportionally
- Map zooms to fit viewport (future feature)

---

## 7. Technical Considerations

### 7.1 Technology Stack

**Game Engine:** Phaser 3 (v3.80+)
- Reasons: 
  - Excellent browser performance
  - Mobile-ready (touch support built-in)
  - Can export to Electron (desktop) or Capacitor (mobile)
  - Strong documentation and community
  - TypeScript support

**Hex Grid Library:** 
- Option A: Custom implementation using Phaser Graphics
- Option B: honeycomb-grid library (lightweight hex utilities)
- Recommendation: Custom implementation for learning + control

**Languages:**
- JavaScript (ES6+) or TypeScript (recommended for scaling)
- HTML5, CSS3

**State Management:**
- Simple JavaScript objects for PoC
- Consider Redux or Zustand if game grows complex

**Build Tools:**
- Vite (fast, modern) or Webpack
- Phaser's official Vite template recommended

### 7.2 File Structure

```
panix-incremental/
├── src/
│   ├── main.js                 # Entry point
│   ├── scenes/
│   │   ├── MapScene.js         # Main map view
│   │   ├── CraftingScene.js    # Crafting interface
│   │   └── DronesScene.js      # Drone building interface
│   ├── systems/
│   │   ├── HexGrid.js          # Hex map logic
│   │   ├── ResourceManager.js  # Resource tracking
│   │   ├── CraftingManager.js  # Crafting logic
│   │   └── DroneManager.js     # Drone deployment
│   ├── config/
│   │   ├── mapConfig.js        # Map layout, tile types
│   │   ├── recipes.js          # Crafting recipes
│   │   └── balance.js          # Game balance values
│   ├── ui/
│   │   ├── ResourcePanel.js    # Resource display
│   │   ├── TileInfoPanel.js    # Tile details
│   │   └── TabNavigation.js    # Tab system
│   └── utils/
│       ├── hexMath.js          # Hex coordinate conversion
│       └── saveLoad.js         # localStorage handling
├── assets/
│   └── (none needed for PoC - use colored shapes)
├── index.html
├── style.css
└── package.json
```

### 7.3 Hex Grid Implementation

**Coordinate System:** Axial coordinates (q, r)
- Simpler math than cube coordinates
- Easy conversion to pixel positions

**Formulas Needed:**
```javascript
// Hex to pixel (flat-top)
x = size * (3/2 * q)
y = size * (√3/2 * q + √3 * r)

// Pixel to hex (mouse click detection)
// Use offset-to-axial conversion
```

**Tile Data Structure:**
```javascript
{
  q: 5,           // axial coordinate
  r: 3,
  type: 'iron',   // 'iron', 'silicon', 'energy', 'empty', 'start'
  drones: 0,      // current drones
  maxDrones: 10
}
```

### 7.4 Save Data Format

```json
{
  "version": "0.1.0",
  "timestamp": 1704412800000,
  "resources": {
    "iron": 250,
    "silicon": 100,
    "energy": 50
  },
  "components": {
    "chassis": 3,
    "circuit": 2,
    "powerCore": 1
  },
  "drones": {
    "total": 5,
    "available": 2,
    "deployments": [
      { "q": 6, "r": 3, "count": 2 },
      { "q": 4, "r": 5, "count": 1 }
    ]
  }
}
```

### 7.5 Performance Targets

- 60 FPS constant on modern browsers
- <2 second initial load time
- <100ms save operation
- Map renders in <500ms

---

## 8. Success Metrics

### Completion Criteria

1. ✅ Player can view 10×10 hex map
2. ✅ Starting tile auto-generates Iron at +1/sec
3. ✅ Player can craft all 3 components
4. ✅ Player can build a drone from components
5. ✅ Player can deploy drone to resource tile
6. ✅ Deployed drone generates resources
7. ✅ Game state saves and loads correctly
8. ✅ All UI tabs function correctly

### Quality Metrics

- **Code Quality:** Modular, commented, follows project conventions (see copilot-instructions.md)
- **Bug-Free:** No crashes, no data loss, no UI glitches
- **Extensible:** Easy to add new resources, recipes, drone types
- **Configurable:** Map size and recipes adjustable via config files

### Playtest Goals

- Player should reach "10 drones deployed" within 5-10 minutes
- Core loop should feel satisfying (click → craft → automate)
- UI should be intuitive (no external instructions needed)

---

## 9. Open Questions

1. **Hex orientation:** Should we use flat-top or pointy-top hexagons? (Recommendation: flat-top for horizontal emphasis)
2. **Starting resources:** Should player start with 0 resources or a small amount (e.g., 50 Iron)? (Recommendation: 0 for clarity)
3. **Component display:** Show components in crafting tab only, or in persistent inventory panel?
4. **Multi-deploy:** Should "Deploy Drone" button deploy 1 drone or allow batch deployment? (Recommendation: 1 for PoC, batch later)
5. **Resource distribution:** Should map have random resource placement or fixed pattern? (Recommendation: fixed for PoC, random later)

---

## 10. Implementation Notes for Developer

### Getting Started

1. Install Phaser 3: `npm install phaser`
2. Use Vite template: `npm create vite@latest panix-poc -- --template vanilla`
3. Add Phaser to index.html or import in main.js
4. Create MapScene as primary scene

### Development Order (Suggested)

**Phase 1: Map Foundation (Day 1-2)**
1. Set up Phaser project
2. Render 10×10 hex grid
3. Implement tile click detection
4. Add tile highlighting

**Phase 2: Resources & UI (Day 2-3)**
5. Add resource tracking (Iron, Silicon, Energy)
6. Create resource display panel
7. Implement starting tile auto-generation
8. Create tile info panel

**Phase 3: Crafting (Day 3-4)**
9. Create crafting scene/UI
10. Implement component recipes
11. Add crafting buttons and logic
12. Track component inventory

**Phase 4: Drones (Day 4-5)**
13. Create drone building UI
14. Implement drone assembly from components
15. Add deployment logic
16. Update resource generation for deployed drones

**Phase 5: Polish (Day 5-6)**
17. Add save/load system
18. Add tab navigation
19. Visual polish (colors, hover effects)
20. Testing and bug fixes

### Key Algorithms

**Resource Generation Update (called every frame):**
```javascript
function updateResources(deltaTime) {
  // Starting tile
  resources.iron += 1 * (deltaTime / 1000);
  
  // Deployed drones
  for (let deployment of droneDeployments) {
    let tile = getTile(deployment.q, deployment.r);
    let rate = 0.5 * deployment.count * (deltaTime / 1000);
    resources[tile.type] += rate;
  }
}
```

**Crafting Component:**
```javascript
function craftComponent(componentType) {
  let recipe = recipes[componentType];
  
  // Check if player has enough resources
  if (!canAfford(recipe.cost)) {
    showError("Not enough resources");
    return false;
  }
  
  // Deduct resources
  for (let [resource, amount] of Object.entries(recipe.cost)) {
    resources[resource] -= amount;
  }
  
  // Add component
  components[componentType] += 1;
  
  return true;
}
```

### Testing Checklist

- [ ] Map renders correctly on all screen sizes
- [ ] All tiles clickable and display correct info
- [ ] Resources increment smoothly
- [ ] Crafting deducts correct amounts
- [ ] Can't craft with insufficient resources
- [ ] Drones deploy correctly
- [ ] Can't deploy beyond 10 drones per tile
- [ ] Save/load preserves all state
- [ ] No memory leaks (check with DevTools)
- [ ] Works in Chrome, Firefox, Safari

---

## Appendix A: Resource & Recipe Reference

### Starting Resources
- Iron: 0
- Silicon: 0
- Energy: 0

### Component Recipes
| Component | Iron | Silicon | Energy |
|-----------|------|---------|--------|
| Drone Chassis | 50 | 0 | 0 |
| Basic Circuit | 10 | 30 | 0 |
| Power Core | 0 | 20 | 20 |

### Drone Recipe
| Drone Type | Chassis | Circuit | Power Core |
|------------|---------|---------|------------|
| Basic Gathering Drone | 1 | 1 | 1 |

### Resource Generation Rates
- Starting tile: +1 Iron/sec
- Deployed drone: +0.5 [resource type]/sec
- Max drones per tile: 10
- Max generation per tile: +5/sec (10 drones × 0.5)

---

## Appendix B: Map Layout Example

```
Suggested 10×10 map resource distribution:

S = Starting tile (Iron auto-gen)
I = Iron deposit
Si = Silicon deposit
E = Energy deposit
. = Empty tile

  0 1 2 3 4 5 6 7 8 9
0 . . I . . E . . Si .
1 . I . . Si . E . . .
2 I . . Si . . . I . E
3 . . E . . S . . Si .
4 . Si . . I . I . . .
5 E . . I . . . E . Si
6 . . Si . . E . . I .
7 . I . . Si . . . . E
8 Si . E . . I . . . .
9 . . . I . . Si . E .

Starting position: (5, 3)
Resource counts:
- Iron: ~10 tiles
- Silicon: ~10 tiles  
- Energy: ~10 tiles
- Empty: ~19 tiles
```

---

**END OF PRD**

---

## Next Steps After PRD Approval

1. Review PRD with team/stakeholder
2. Address open questions
3. Developer begins Phase 1 implementation
4. Daily standups to track progress
5. Playtest after Phase 5 completion
6. Iterate based on feedback
