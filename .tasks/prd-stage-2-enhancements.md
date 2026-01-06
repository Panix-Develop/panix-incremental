# Product Requirements Document: Stage 2 - Core Systems Enhancement

**Project:** Panix Incremental  
**Version:** Stage 2  
**Status:** Draft  
**Created:** 2026-01-06  
**Author:** AI Assistant  

---

## 1. Executive Summary

Stage 2 focuses on fixing critical bugs from PoC, establishing consistent UI/UX patterns, and introducing foundational systems for structures, research, and galaxy exploration. This stage transforms the game from a basic proof of concept into a scalable foundation for future incremental mechanics.

**Key Objectives:**
- Fix all critical bugs (scrolling, drone deployment, hard reset)
- Establish consistent styling system across all pages
- Introduce structures system with solar panel implementation
- Add settings and configuration management
- Prepare UI for research and galaxy systems (locked initially)
- Implement comprehensive testing framework

---

## 2. Critical Bugfixes

### 2.1 Scrolling Issues (Priority: Critical)
**Problem:** Pages not scrolling despite overflow-y: auto  
**Solution:**
- Audit all panel CSS for height constraints
- Ensure panels have explicit height: 100% and overflow-y: auto
- Test on Chrome, Firefox, Safari
- Add webkit-scrollbar styling for consistency

**Acceptance Criteria:**
- All pages (Crafting, Drones, Structures, Research, Settings) scroll smoothly
- Scrollbar visible when content exceeds viewport
- No horizontal scrolling unless intended

### 2.2 Drone Deployment Not Working (Priority: Critical)
**Problem:** Deploy button not functional  
**Root Cause Analysis Required:**
- Check event listeners attached properly
- Verify DroneManager.deployDrone() is called
- Check hexGrid reference is valid
- Verify available drones > 0

**Solution:**
- Debug and fix deployment event flow
- Add console logging for deployment attempts
- Add visual feedback on successful/failed deployment
- Update tile visuals immediately after deployment

**Acceptance Criteria:**
- Deploy button functional when drones available
- Tile visual updates show drone count
- Remove button works correctly
- Error messages shown for failed deployments

### 2.3 Hard Reset Button Not Working (Priority: High)
**Problem:** Hard reset doesn't clear localStorage and reload  
**Solution:**
- Fix event listener binding in ResourcePanel
- Ensure localStorage.clear() is called
- Add delay before window.location.reload()
- Show confirmation dialog before reset

**Acceptance Criteria:**
- Hard reset clears all localStorage data
- Page reloads after reset
- Fresh game state on reload
- Confirmation dialog prevents accidental resets

### 2.4 Starting Base Confusion (Priority: High)
**Problem:** Two concepts exist: "starting base" and "start depot"  
**Solution:**
- Remove "starting base" concept entirely
- Keep only "start depot" renamed to "Starting Base"
- Starting Base generates 1 iron/sec automatically
- Starting Base marked red on map
- Cannot deploy drones to Starting Base

**Acceptance Criteria:**
- Only one starting tile on map
- Labeled "Starting Base" in UI
- Generates 1 iron/sec from game start
- Red border clearly visible
- No duplicate concepts in codebase

### 2.5 Resource Panel Size (Priority: Medium)
**Problem:** Resource panel too large on map  
**Solution:**
- Reduce panel width from 250px to 180px
- Reduce padding and font sizes
- Keep all information visible
- Ensure readability maintained

**Acceptance Criteria:**
- Panel width <= 180px
- All resources visible
- Generation rates visible
- Debug buttons functional

---

## 3. UI/UX Consistency System

### 3.1 Page Layout Standard
**Requirement:** All pages must use identical layout structure

**Standard Template:**
```css
.page-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-primary);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem;
  box-sizing: border-box;
}
```

**Components:**
- Page title: H2, color: var(--accent-primary), margin-bottom: 2rem
- Section headers: H3, color: var(--text-primary), margin-bottom: 1rem
- Cards/panels: Same border, border-radius, padding
- Buttons: Consistent sizing, colors, hover states

### 3.2 Typography System
**Headers:**
- H1: 2rem, var(--accent-primary), bold
- H2: 1.5rem, var(--accent-primary), bold
- H3: 1.2rem, var(--text-primary), semi-bold
- Body: 1rem, var(--text-primary), regular

**Text Colors:**
- Primary: var(--text-primary) #eaeaea
- Secondary: var(--text-secondary) #a0a0a0
- Accent: var(--accent-primary) #e94560
- Success: var(--color-energy) #F5A623
- Error: #d32f2f

### 3.3 Card Component Standard
**Structure:**
```html
<div class="info-card">
  <h3 class="card-header">Title</h3>
  <p class="card-description">Description text</p>
  <div class="card-stats">
    <!-- Stats content -->
  </div>
  <button class="btn card-action">Action</button>
</div>
```

**CSS:**
```css
.info-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}
```

---

## 4. Settings Page

### 4.1 Number Format Settings
**Options:**

1. **Normal (Default):** Suffix notation with K, M, B, T
   - Examples: 1,234 → 1.23K, 1,234,567 → 1.23M, 1,234,567,890 → 1.23B
   - Suffixes: K (thousand), M (million), B (billion), T (trillion), Qa (quadrillion), etc.
   - Below 1,000: Display with commas (1,234)

2. **Scientific Notation:** Standard exponential format
   - Examples: 1,000,000,000 → 1e9, 10,000,000,000 → 1e10, 100,000,000,000 → 1e11
   - Order of magnitude increases by 1 each step
   - Format: {mantissa}e{exponent}, mantissa always 1-10

3. **Engineering Notation:** Exponential with 3-step jumps
   - Examples: 1,000,000,000 → 1e9, 10,000,000,000 → 10e9, 100,000,000,000 → 100e9, 1,000,000,000,000 → 1e12
   - Order of magnitude increases by 3 (matching SI prefix system)
   - Exponent always multiple of 3 (e3, e6, e9, e12, etc.)
   - Mantissa ranges 1-1000

**Implementation:**
- Add dropdown/radio buttons for format selection
- Store preference in localStorage under 'player_settings.numberFormat'
- Apply format to all numeric displays (resources, rates, costs, counts)
- Create formatNumber() utility function with three modes
- Update in real-time when setting changes

**Acceptance Criteria:**
- Setting persists across sessions
- All numbers update immediately on change
- Format applies to resources, rates, costs
- No formatting errors for edge cases (0, negative, very large numbers)
- Performance: <1ms per number formatting call

### 4.2 Rename Functionality
**Feature:** Allow player to rename their base/colony

**UI:**
- Text input field with current name
- "Update Name" button
- Character limit: 30 characters
- Default name: "PANIX Colony"

**Storage:**
- Save to localStorage under 'player_settings.playerName'
- Display in sidebar header
- Update immediately on save

**Acceptance Criteria:**
- Name updates in real-time
- Name persists after reload
- Input validation (length, no special chars)
- Clear visual feedback on save

### 4.3 Localization Settings
**Feature:** Multi-language support for game interface

**Supported Languages:**
- English (en) - Default
- German (de)

**Translation Approach:**
- AI-generated German translations for all keys
- Human review recommended but not blocking
- Translations should be grammatically correct and contextually appropriate

**Implementation:**
- Dropdown/select for language choice
- Store preference in localStorage under 'player_settings.language'
- Load translations from JSON files: `/src/locales/en.json`, `/src/locales/de.json`
- Use i18n utility function: `t('key.path')` or `__('key.path')`
- Apply to ALL text in game (UI labels, descriptions, messages, tooltips)

**Translation File Structure:**
```json
{
  "navigation": {
    "map": "Map",
    "galaxy": "Galaxy",
    "crafting": "Crafting",
    "drones": "Drones",
    "structures": "Structures",
    "research": "Research",
    "settings": "Settings",
    "config": "Config"
  },
  "resources": {
    "iron": "Iron",
    "silicon": "Silicon",
    "energy": "Energy"
  },
  "components": {
    "chassis": "Chassis",
    "circuit": "Circuit",
    "powerCore": "Power Core"
  },
  "messages": {
    "gameSaved": "Game saved!",
    "gameLoaded": "Game loaded successfully!",
    "insufficientResources": "Insufficient resources"
  },
  "descriptions": {
    "solarPanel": "Generates energy from sunlight",
    "basicGatherer": "A basic drone that gathers resources"
  }
}
```

**Areas Requiring Translation:**
1. Navigation menu labels
2. Page titles and headers
3. Resource names and descriptions
4. Component names
5. Structure names and descriptions
6. Drone names and descriptions
7. Button labels ("Build", "Deploy", "Remove", "Save", "Cancel")
8. Notification messages
9. Tooltips and help text
10. Error messages
11. Settings page text
12. Config page labels
13. Locked page messages

**Translation Utility:**
```javascript
// src/utils/i18n.js
export function t(key, params = {}) {
  // Get current language from settings
  // Lookup translation by dot-notation key
  // Replace {param} placeholders with values
  // Fallback to English if translation missing
  // Return translated string
}

// Usage examples:
t('navigation.map') // "Map" or "Karte"
t('messages.resourcesAdded', { amount: 100 }) // "Added 100 resources" or "100 Ressourcen hinzugefügt"
```

**Acceptance Criteria:**
- Language setting persists across sessions
- All UI text translates immediately on language change
- No untranslated text visible in game
- German translations accurate and grammatically correct
- Fallback to English for missing keys
- Number formatting respects locale (1,234.56 vs 1.234,56)

### 4.4 Settings Page Layout
**Sections:**
1. Display Settings (number format, language)
2. Player Settings (rename)
3. Game Settings (placeholder for future: sound, music, autosave frequency)
4. About (version info, credits)

---

## 5. Configuration System (Dev Mode)

### 5.1 Dev Mode Detection
**Methods:**
1. **Environment Variable:** Check `import.meta.env.DEV` (Vite)
2. **URL Parameter:** ?dev=true enables config page
3. **LocalStorage Flag:** localStorage.getItem('dev_mode') === 'true'

**Recommendation:** Use Vite's `import.meta.env.DEV` + URL parameter override

### 5.2 Secure Config Storage Options

**Option 1: Client-Side Only (Development)**
- Store in `/public/config/` folder (excluded from git via .gitignore)
- Load via fetch('/config/drones.json')
- **Pros:** Simple, no backend needed
- **Cons:** Exposed in network tab, not production-ready

**Option 2: Backend API (Production-Ready)**
- Express.js server with authentication
- API endpoints: GET/POST /api/config/:type
- Store in database (PostgreSQL, MongoDB)
- **Pros:** Secure, scalable
- **Cons:** Requires backend setup

**Option 3: Hybrid Approach (Recommended for Stage 2)**
- Development: Load from `/config/dev/` folder (gitignored)
- Production: Compile configs into code at build time
- Config editor only available in dev mode
- **Pros:** Best of both worlds
- **Cons:** Requires build-time config injection

**Implementation for Stage 2:** Use Option 3
- Create `/config/dev/` folder (add to .gitignore)
- Config files: drones.json, structures.json, research.json
- Load dynamically in dev mode
- Fallback to compiled configs in production

### 5.3 Config Page UI
**Scope:** Full CRUD implementation with validation

**Features:**
- **Entity List:** View all entities (drones, structures, research)
- **Edit Form:** Edit selected entity properties with live validation
- **Add New:** Create new entity with template/form
- **Delete:** Remove entity (with confirmation dialog)
- **Export/Import:** JSON download/upload for backup/sharing
- **Save:** Write changes to file (dev mode only)
- **Validation:** Required fields, data types, value ranges
- **Error Handling:** Clear feedback for invalid inputs

**Entity Editor for Drones:**
```json
{
  "id": "basicGatherer",
  "name": "Basic Gatherer Drone",
  "description": "...",
  "components": {
    "chassis": 1,
    "circuit": 1,
    "powerCore": 1
  },
  "stats": {
    "gatherRate": 0.5,
    "energyCost": 0
  }
}
```

**Acceptance Criteria:**
- Config page only visible in dev mode
- All fields editable via form inputs
- Changes persist to JSON files
- Validation on save (required fields, data types)
- Live preview of changes

---

## 6. Energy System Redesign

### 6.1 Remove Energy Resource Tiles
**Changes:**
- Remove 'energy' type from mapConfig.js layout
- Replace with 'empty' tiles
- Update HexGrid to not generate energy from tiles
- Remove energy color from tile rendering

**Migration:**
- Existing energy tiles → empty tiles
- No impact on save data (energy tiles had no drones anyway)

### 6.2 Energy from Structures Only
**New Rule:** Energy generated exclusively by structures built on empty tiles

**First Structure: Solar Panel**
- Builds on empty tiles
- Generates 1 energy/sec
- Costs: 10 iron, 5 silicon (configurable)
- No limit per tile (unlike drones)

---

## 7. Structures System

### 7.1 Structure Manager
**Class:** `StructureManager`

**Properties:**
```javascript
{
  structures: Map<"q,r", Structure>, // tile key -> structure object
  builtStructures: Array<Structure>
}
```

**Structure Object:**
```javascript
{
  id: string,           // e.g., "solarPanel"
  type: string,         // structure type
  q: number,            // tile coordinates
  r: number,
  level: number,        // upgrade level (future)
  stats: {
    energyGeneration: number,
    // future: storage, production, etc.
  }
}
```

**Methods:**
- `canBuildStructure(q, r, structureType)` - Check if buildable
- `buildStructure(q, r, structureType)` - Build structure, deduct costs
- `getStructureAt(q, r)` - Get structure at tile
- `getAllStructures()` - Get all built structures
- `demolishStructure(q, r)` - Remove structure (future)

### 7.2 Structure Recipes
**File:** `src/config/structures.js`

```javascript
export const structures = {
  solarPanel: {
    id: 'solarPanel',
    name: 'Solar Panel',
    description: 'Generates energy from sunlight',
    category: 'energy',
    costs: {
      iron: 10,
      silicon: 5
    },
    requirements: {
      // future: research, resources, etc.
    },
    stats: {
      energyGeneration: 1.0
    },
    buildableOn: ['empty'],
    isVisible: () => true, // visibility logic
    isUnlocked: () => true // unlock logic
  }
};
```

### 7.3 Empty Tile Interaction
**When clicking empty tile:**
1. Show tile info panel
2. Display "Empty Tile" header
3. Show "Build Structure" section
4. List available structures (filtered by isVisible & isUnlocked)
5. Each structure shows:
   - Name and description
   - Resource costs (color-coded: red if can't afford)
   - Stats preview (energy generation)
   - "Build" button (disabled if can't afford)

**Structure Cards:**
```html
<div class="structure-card">
  <h4>Solar Panel</h4>
  <p class="description">Generates energy from sunlight</p>
  <div class="costs">
    <span class="cost iron">10 Iron</span>
    <span class="cost silicon">5 Silicon</span>
  </div>
  <div class="stats">
    <span>+1.0 Energy/s</span>
  </div>
  <button class="btn build-structure-btn">Build</button>
</div>
```

### 7.4 Structures Scene/Page
**Purpose:** Overview of all built structures

**Sections:**
1. **Statistics:**
   - Total structures built
   - Total energy generation
   - Structures by type breakdown

2. **Structure List:**
   - Grouped by type (Energy, Production, Storage, etc.)
   - Each structure shows:
     - Location (Q, R coordinates)
     - Current stats
     - Upgrade button (future)
     - Demolish button (future)

3. **Available Structures:**
   - Show all unlocked structure types
   - Click to filter map view (future)

**Layout:** Same as Drones/Crafting pages (scrollable, padded)

---

## 8. Research System (Locked)

### 8.1 Research Page Placeholder
**Initial State:** Locked with visual indicator

**Implementation:**
- Create full ResearchScene with placeholder layout
- Add lock overlay as separate component that covers page
- Background: Research tree structure with placeholder nodes
- Nodes show categories: Resource Gen, Drone Efficiency, Structures, Map, Automation

**UI:**
- Full-page overlay with lock icon 🔒
- Message: "Research Lab not yet constructed"
- Hint: "Complete initial objectives to unlock research"
- Background: Visible but dimmed/greyed out research tree
- Overlay is semi-transparent to show content beneath

**Unlock Condition (Future):**
- Build specific structure (e.g., "Research Lab")
- Reach resource milestone
- Complete tutorial/quest

### 8.2 Future Research Structure
**Categories (Placeholder):**
- Resource Generation
- Drone Efficiency
- Structure Upgrades
- Map Expansion
- Automation

**Note:** Full implementation in Stage 3+

--Implementation:**
- Create full GalaxyScene with placeholder solar system
- Add lock overlay as separate component
- Background: 3-5 placeholder planets with basic visuals
- Simple CSS animations for rotation/orbits (optional)

**UI:**
- Full-page overlay with lock icon 🔒
- Message: "Deep Space Scanner offline"
- Hint: "Upgrade your base infrastructure to unlock"
- Background: Visible solar system map with planets (dimmed)
- Overlay is semi-transparent showing future content
**Initial State:** Locked with visual indicator

**UI:**
- Full-page overlay with lock icon 🔒
- Message: "Deep Space Scanner offline"
- Hint: "Upgrade your base infrastructure to unlock"
- Background: Animated starfield or galaxy image

**Unlock Condition (Future):**
- Research "Interstellar Travel"
- Build "Observatory" structure
- Reach certain prestige level

### 9.2 Future Galaxy Features (Placeholder)
**Planned Systems:**
- Multiple planets/systems
- Resource variety per planet
- Travel mechanics
- Prestige system integration

**Note:** Full implementation in Stage 4+

---

## 10. Navigation Menu Updates

### 10.1 New Navigation Order
**Updated Menu:**
1. 🗺️ Map
2. 🌌 Galaxy (locked)
3. 🔧 Crafting
4. 🤖 Drones
5. 🏗️ Structures (new)
6. 🔬 Research (locked)
7. ⚙️ Settings (new)
8. 🛠️ Config (dev mode only)

### 10.2 Locked Page Styling
**Visual Indicators:**
- Lock icon after label: "🔬 Research 🔒"
- Dimmed/greyed out button style
- Hover tooltip: "Unlock condition: [message]"
- Clicking shows locked page overlay

**CSS:**
```css
.nav-btn.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn.locked::after {
  content: " 🔒";
  color: var(--text-secondary);
}
```

---

## 11. Testing Framework

### 11.1 Testing Strategy
**Framework:** Vitest (recommended for Vite projects)

**Test Types:**
1. **Unit Tests:** Individual functions and classes
2.Target:** 70%+ coverage across all systems (non-negotiable)

**Managers (Priority 1):**
- ResourceManager: add, consume, generation, rates
- CraftingManager: craft, hasComponents, consume, recipes
- DroneManager: build, deploy, remove, availability
- StructureManager: build, energy generation, placement
- SettingsManager: save, load, format, language switching

**Utilities (Priority 2):**
- hexMath: coordinate conversion, distance calculations
- saveLoad: save, load, data integrity, migration
- formatNumber: all 3 formats (normal, scientific, engineering)
- i18n: translation lookup, fallback, parameter replacement

**Configuration (Priority 3):**
- Validate recipe files structure
- Check balance values are valid
- Ensure no duplicate IDs
- Config CRUD operations

**Coverage Requirements:**
- Minimum 70% overall coverage
- 90%+ for critical paths (resource generation, save/load)
- 100% for money-critical operations (future proofing)
**Configuration:**
- Validate recipe files
- Check balance values
- Ensure no duplicate IDs

### 11.3 Test Files Structure
```
src/
├── systems/
│   ├── ResourceManager.js
│   ├── ResourceManager.test.js
│   ├── DroneManager.js
│   ├── DroneManager.test.js
│   └── StructureManager.test.js
├── utils/
│   ├── hexMath.js
│   ├── hexMath.test.js
│   └── saveLoad.test.js
```

### 11.4 CI/CD Integration
**GitHub Actions:**
- Run tests on every push
- Run tests on pull requests
- Block merge if tests fail
- Coverage report as comment

**Test Script:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## 12. Technical Implementation Details

### 12.1 File Structure Changes
```
src/
├── scenes/
│   ├── StructuresScene.js (new)
│   ├── ResearchScene.js (new)
│   ├── GalaxyScene.js (new)
│   ├── SettingsScene.js (new)
│   └── ConfigScene.js (new)
├── systems/
│   ├── StructureManager.js (new)
│   └── SettingsManager.js (new)
├── config/
│   ├── structures.js (new)
│   └── dev/ (new, gitignored)
│       ├── drones.json
│       ├── structures.json
│       └── research.json
├── locales/ (new)
│   ├── en.json (English translations)
│   └── de.json (German translations)
├── ui/
│   ├── LockedPageOverlay.js (new)
│   └── StructureBuildPanel.js (new)
└── utils/
    ├── formatNumber.js (new)
    ├── i18n.js (new - localization utility)
    └── devMode.js (new)
```

### 12.2 CSS Architecture
**Create:** `src/styles/` folder
```
styles/
├── base.css (variables, resets)
├── components.css (buttons, cards, panels)
├── pages.css (page-specific styles)
└── utilities.css (helpers)
```

**Import order in main.js:**
```javascript
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/utilities.css';
```

### 12.3 State Management Considerations
**Current:** Managers passed via events/references  
**Future (Stage 3+):** Consider centralized state (Redux, Zustand, or custom EventBus)

**For Stage 2:** Keep current architecture, but improve event system:
- Centralize event names in `src/constants/events.js`
- Add event type checking
- Document event payloads

---

## 13. Migration and Data Integrity

### 13.1 Save Data Migration
**New Fields:**
```javascript
{
  version: "2.0",
  settings: {
    numberFoStrategy: HARD RESET REQUIRED**
- Version 2.0 introduces breaking changes (energy system redesign)
- Old saves (v1.0) are incompatible
- Detection: If save version < 2.0, show modal warning
- Warning Message: "Stage 2 update requires a fresh start. Your progress will be reset. Continue?"
- Options: "Start Fresh" (clears save) or "Cancel" (keeps old save, blocks game)
- No automatic migration - clean slate approach

**New Game Initialization:**
- Version: "2.0"
- Default settings applied
- Empty structures array
- Starting base configured correctly
- No energy tiles on map

**Migration Logic:**
- Check save version
- If version < 2.0, migrate old format
- Add default settings if missing
- Remove energy tile drones (if any)
- Initialize empty structures array
- Preserve existing resources, crafting, drones data
- Remove energy tile drones (if any)
- Initialize empty structures array

### 13.2 Config Migration
**Moving from hardcoded to JSON:**
1. Export current recipes to JSON
2. Load JSON in dev mode
3. Fallback to hardcoded in production
4. Test both paths

---

## 14. Performance Considerations

### 14.1 Rendering Optimization
**Concerns:**
- Many tiles with structures
- Real-time energy generation updates

**Solutions:**
- Throttle panel updates (500ms)
- Use requestAnimationFrame for map updates
- Batch tile visual updates
- Cache calculations

### 14.2 Save File Size
**Monitor:**
- Structure count growth
- Deployment array size
- Save frequency

**Optimizations:**
- Compress save data (future)
- Limit auto-save frequency
- Clear unnecessary data

---

## 15. Success Metrics

### 15.1 Bug Resolution
- ✅ Scrolling works on all pages
- ✅ Drone deployment functional
- ✅ Hard reset functional
- ✅ No duplicate "starting base" concepts
- ✅ Resource panel appropriately sized

### 15.2 Feature Completeness
- ✅ Settings page with number format, language, and rename
- ✅ Localization system with English and German
- ✅ All UI text translated
- ✅ Structures sys≥70% (hard requirement)
- ✅ All tests passing in CI/CD
- ✅ No console errors in production build
- ✅ Smooth 60 FPS on target browsers
- ✅ Load time <2 seconds on modern hardware

### 15.4 Browser Compatibility
**Target Platforms:**
- ✅ Chrome (latest) - Desktop
- ✅ Firefox (latest) - Desktop
- ✅ Safari (latest) - Desktop
- ⛔ Mobile browsers - Not in scope for Stage 2
- ⛔ Edge, Opera - Not tested (may work)
- ⛔ Legacy browsers - Not supportedcross all pages

### 15.3 Quality Metrics
- ✅ Test coverage >70%
- ✅ All tests passing in CI
- ✅ No console errors in production
- ✅ Smooth 60 FPS on modern browsers
- ✅ Load time <2 seconds

---

## 16. Development Phases

**Implementation Strategy:** Sequential approach - complete Phase 1 (all bugfixes) before starting new features.

### Phase 1: Critical Bugfixes (1-2 days) ⚠️ PRIORITY
- Fix scrolling issues
- Fix drone deployment
- Fix hard reset
- Resolve starting base confusion
- Resize resource panel
- **Must be 100% complete before Phase 2**

### Phase 2: UI/UX Consistency (1 day)
- Create CSS architecture
- Apply consistent styling to existing pages
- Update all panels to use standard layout
- Test responsive behavior

### Phase 3: Settings System (1-2 days)
- Create SettingsManager
- Build Settings page
- Implement number formatting (normal, scientific, engineering)
- Add localization system (English/German)
- Create translation files
- Implement t() utility function
- Add rename functionality
- Test persistence

### Phase 4: Structures System (2-3 days)
- Create StructureManager
- Build Structures page
- Implement solar panel
- Add empty tile interaction
- Update energy generation
- Remove energy tile nodes

### Phase 5: Config System (2-3 days)
- Set up dev mode detection
- Create config JSON structure
- Build config editor UI
- Implement save/load for configs
- Test dev vs production builds

### Phase 6: Navigation Updates (1 day)
- Add Galaxy and Research pages (locked)
- Update navigation menu
- Implement locked page overlays
- Test page transitions

### Phase 7: Testing Framework (2-3 days)
- Set up Vitest
- Write unit tests for managers
- Write integration tests
- Set up CI/CD pipeline
- Achieve 70%+ coverage

### Phase 8: Localization (1-2 days)
- Audit all text in codebase
- Create comprehensive translation keys
- Translate all text to German
- Update all scenes/managers to use t()
- Test language switching
- Verify all text translates correctly

### Phase 9: Polish and Documentation (1-2 days)
- Code review and cleanup
- Update README
- Write CHANGELOG
- Test on multiple browsers
- Performance profiling

**Total Estimated Time:** 13-21 days

---

## 17. Risks and Mitigations

### Risk 1: Config System Complexity
**Impact:** High  
**Probability:** Medium  
**Mitigation:**
- Start with simple JSON editing
- Defer advanced features to Stage 3
- Use existing libraries (json-editor)

### Risk 2: Breaking Existing Saves
**Impact:** High  
**Probability:** Low  
**Mitigation:**
- Implement version checking
- Test migration thoroughly
- Provide "Clear Save" option
- Keep backup of old format

### Risk 3: Test Coverage Takes Too Long
**Impact:** Medium  
**Probability:** Medium  
**Mitigation:**
- Focus on critical paths first
- Write tests as features are built
- Use AI to generate test boilerplate
- Defer UI tests if time-constrained

---

## 18. Future Considerations (Stage 3+)

### Planned Features:
- Multiple structure types
- Structure upgrades
- Research tree implementation
- Galaxy exploration
- Automation (auto-deploy, auto-craft)
- Prestige system
- Achievements
- Statistics dashboard

### Technical Debt:
- Refactor event system
- Implement state management
- Optimize rendering pipeline
- Add accessibility features
- Improve mobile responsiveness
- Add more languages (French, Spanish, Chinese, etc.)

---

## 19. Appendix

### A. Color Palette Reference
```css
--bg-primary: #1a1a2e;
--bg-secondary: #16213e;
--bg-tertiary: #0f3460;
--accent-primary: #e94560;
--accent-secondary: #533483;
--text-primary: #eaeaea;
--text-secondary: #a0a0a0;
--border-color: #2a2a3e;
--color-iron: #7D7D7D;
--color-silicon: #4A90E2;
--color-energy: #F5A623;
```

### B. Number Format Examples

**Normal (Suffix):**
- 999 → 999
- 1,234 → 1.23K
- 1,234,567 → 1.23M
- 1,234,567,890 → 1.23B
- 1,234,567,890,123 → 1.23T

**Scientific:**
- 1,000 → 1e3
- 1,000,000 → 1e6
- 1,000,000,000 → 1e9
- 10,000,000,000 → 1e10
- 100,000,000,000 → 1e11
- 1,000,000,000,000 → 1e12

**Engineering:**
- 1,000 → 1e3
- 10,000 → 10e3
- 100,000 → 100e3
- 1,000,000 → 1e6
- 10,000,000 → 10e6
- 100,000,000 → 100e6
- 1,000,000,000 → 1e9
- 10,000,000,000 → 10e9
- 100,000,000,000 → 100e9
- 1,000,000,000,000 → 1e12

### C. Event Names Convention
```javascript
// Resource events
'debugAddResources'
'debugResetResources'
'debugHardReset'

// Drone events
'deployDrone'
'removeDrone'

// Structure events
'buildStructure'
'demolishStructure'

// Settings events
'languageChanged'
'numberFormatChanged'
'settingsUpdated'

// Save events
'manualSave'
'gameLoaded'

// UI events
'tileSelected'
'pageChanged'
```

### D. Translation Key Categories
**Comprehensive list of all text requiring translation:**

1. **Navigation** (8 items)
   - Map, Galaxy, Crafting, Drones, Structures, Research, Settings, Config

2. **Resources** (3 base + descriptions)
   - Iron, Silicon, Energy

3. **Components** (3 items + descriptions)
   - Chassis, Circuit, Power Core

4. **Structures** (1 initially, more later)
   - Solar Panel + description

5. **Drones** (1 type initially)
   - Basic Gatherer + description

6. **UI Labels** (~50 items)
   - Build, Deploy, Remove, Save, Cancel, Reset, Hard Reset
   - Available, Total Built, Generation Rate, Cost, Requirements
   - Insufficient Resources, At Capacity, No Drones Available
   - Settings, Display Settings, Player Settings, Game Settings

7. **Messages** (~20 items)
   - Game saved, Game loaded, Hard reset complete
   - Drone deployed, Drone removed, Structure built
   - Error messages for each action

8. **Tooltips** (~15 items)
   - Help text for buttons and features

9. **Locked Pages** (2 items)
   - Research Lab not yet constructed
   - Deep Space Scanner offline

10. **Settings Page** (~15 items)
    - Number format options, Language selection
    - Rename prompts, validation messages

**Estimated Total:** ~120-150 translation keys

### E. Testing Checklist
- [ ] Unit tests for all managers
- [ ] Integration tests for manager interactions
- [ ] Save/load data integrity
- [ ] Number formatting functions (all 3 formats)
- [ ] Localization system (key lookup, fallback)
- [ ] Translation completeness check
- [ ] Config validation
- [ ] Event system reliability
- [ ] CI/CD pipeline functional
- [ ] Coverage report generated
- [ ] German translations reviewed by native speaker

---

**Document Status:** Ready for Review  
**Next Steps:** Review PRD → Prioritize features → Begin implementation  
**Questions/Feedback:** [Add comments or create issues]
