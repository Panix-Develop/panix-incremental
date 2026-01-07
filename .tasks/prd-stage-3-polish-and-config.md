# Product Requirements Document: Stage 3 - Polish & Config Enhancement

**Status:** Draft  
**Created:** 2026-01-07  
**Priority:** High (Bugs), Medium (Features)  
**Timeline:** Flexible - Implement in phases

---

## Introduction/Overview

Stage 3 focuses on fixing critical bugs from v2.0, adding visual polish to improve user experience, and overhauling the config system to make all game entities (tiles, resources, structures, drones) fully customizable through a user-friendly interface. This will establish the foundation for easy game expansion without code changes.

The config system will be enhanced from a basic JSON editor to a comprehensive management interface with dropdowns, live previews, and relationship management between entities. Configs will be saved during development and bundled into production builds securely.

---

## Goals

1. **Fix Critical Bugs:** Resolve all known issues from v2.0 (translations, language persistence, duplicate entities, alignment)
2. **Improve Visual Feedback:** Add indicators for structures, drone capacity, and live resource updates
3. **Enhance Config System:** Transform config editor into a production-ready tool with proper UI controls
4. **Enable Full Customization:** Make tiles, resources, structures, and drones fully configurable
5. **Secure Config Storage:** Store configs in a way that prevents user tampering in production
6. **Maintain Code Quality:** Keep test coverage above 80%, add tests for new features

---

## User Stories

### As a Player
- I want to see structure indicators on tiles so I know what's built without clicking
- I want resources to update in real-time so I can see progress without interactions
- I want to see when tiles are at max drone capacity so I know where to expand
- I want the game to remember my language preference on reload
- I want translations to work correctly in production builds
- I want a clean, aligned resource panel that's easy to read

### As a Developer/Designer
- I want to create new resources without touching code
- I want to define new tile types that produce specific resources
- I want to design new structures with dependencies and requirements
- I want to configure drones with custom costs and capabilities
- I want to see live previews of changes in dev mode
- I want to export/import configurations for backups
- I want configs to be secure in production (not user-editable)

---

## Functional Requirements

### Phase 1: Critical Bug Fixes

**REQ-BUG-001: Fix Translation Loading in Production**
- Translations must load correctly in production builds
- All `navigation.*`, `resources.*`, etc. keys must resolve to actual text
- Fallback to English must work if translation missing

**REQ-BUG-002: Persist Language Selection**
- Selected language must persist across page reloads
- Settings should load language from localStorage on initialization
- Language switcher should reflect current language on page load

**REQ-BUG-003: Fix Duplicate Entity Creation**
- Creating new structure/drone must create exactly 1 entity, not 2
- Deletion must remove exactly the selected entity
- Implement proper ID generation to prevent collisions

**REQ-BUG-004: Align Resource Panel**
- Resource names must align vertically in a column
- Current amounts must align vertically in a column
- Production rates must align vertically in a column
- Use CSS grid or table layout for consistent spacing

**REQ-BUG-005: Fix Config Editor Button Layout**
- Move "Save Changes", "Reset", "Export" buttons outside nested panels
- Place action buttons in a fixed toolbar or header area
- Prevent UI overlap/scrolling issues with nested panels

### Phase 2: Visual Enhancements

**REQ-VIS-001: Structure Tier Indicators**
- Display icon on map tile showing structure type and tier
- Icon should be small, positioned in corner of hex tile
- Structure types (energy, production, mining) have distinct icons
- Tier shown as vertical bars (1-5 bars for tiers 1-5)
- Unlimited tiers supported (dynamically generated)
- Icon must not obscure tile resource information

**REQ-VIS-002: Live Resource Updates**
- Resources in crafting/drones tabs update every frame (or every second)
- Button enable/disable states update in real-time based on resources
- No need to click/interact to see current values
- Maintain good performance (no lag from constant updates)

**REQ-VIS-003: Drone Capacity Indicator**
- Drone count bubble on tile changes color based on capacity
- Green when at max capacity (drones = maxDrones)
- Yellow/orange when partially filled
- Default (white/gray) when below 50% capacity
- Visual must be clear and accessible (colorblind-friendly)

**REQ-VIS-004: Remove "Custom" Label**
- All structures and drones are configurable by default
- Don't distinguish between "custom" and "default" in UI
- Keep solar panel and basic gatherer as defaults after hard reset
- Remove any special "custom" styling or indicators

### Phase 3: Config System Overhaul

**REQ-CFG-001: Resource Management**
- Add/edit/delete resources through UI
- Fields: id, name (i18n key), icon, base generation rate
- Validate unique IDs
- Show list of tiles/structures that use this resource
- Prevent deletion if resource is in use

**REQ-CFG-002: Tile Type Management**
- Add/edit/delete tile types through UI
- Fields: id, name (i18n key), resource produced, base rate
- Select resource from dropdown (populated from defined resources)
- Configure which drones can be deployed to this tile type
- Prevent deletion if tiles of this type exist on map

**REQ-CFG-003: Structure Management Enhancement**
- Replace JSON editor with form-based UI
- Fields: id, name (i18n key), description, tier, type, costs, production
- Costs: Multi-select resources with amount inputs
- Production: Select resource + amount per second
- Structure type dropdown: energy, production, mining, etc.
- Tier: Number input (unlimited, dynamic)
- Tile type restrictions: Multi-select which tiles can have this structure
- Prerequisites: Will be added in Stage 4 (research)

**REQ-CFG-004: Drone Management Enhancement**
- Replace JSON editor with form-based UI
- Fields: id, name (i18n key), description, costs, components, capacity
- Costs: Multi-select resources with amount inputs
- Components: Multi-select from available components
- Gathering capacity: Number input for resources per tick
- Available on tile types: Multi-select which tiles accept this drone
- Prerequisites: Will be added in Stage 4 (research/structures)

**REQ-CFG-005: Config Relationships**
- When adding new resource, it appears in:
  - Structure cost dropdowns
  - Structure production dropdowns
  - Tile production dropdowns
- When adding new tile type, it appears in:
  - Structure placement restrictions
  - Drone deployment restrictions
- When adding new structure, it appears in:
  - Drone prerequisite options (Stage 4)
- Live updates: Adding resource immediately available in other forms

**REQ-CFG-006: Config Storage & Security**
- Dev mode: Save configs to JSON files in `/config/dev/`
  - `resources.json`, `tiles.json`, `structures.json`, `drones.json`
- Production build: Bundle configs into build (not readable by users)
  - Configs should be minified/bundled by build process
  - Users should not be able to modify game data in browser
- If bundling doesn't prevent user access:
  - Fallback: Upload configs to secure webspace (GitHub Gists API with token)
  - Load configs from remote URL in production
  - Require auth token to modify (developer only)

**REQ-CFG-007: Config Validation**
- Validate all fields before saving
- Check for duplicate IDs
- Verify all referenced entities exist (resources, components, etc.)
- Show clear error messages for validation failures
- Prevent saving invalid configurations

**REQ-CFG-008: Config Import/Export**
- Export all configs as single JSON file
- Import configs from JSON file (with validation)
- Allow sharing configurations between developers
- Backup/restore functionality

**REQ-CFG-009: Live Preview**
- Show preview of entity as it's being edited
- For structures: Show how it will appear on map
- For drones: Show stats summary
- Update preview in real-time as fields change

---

## Non-Goals (Out of Scope)

### Stage 3 Will NOT Include:
- Research system implementation (gameplay or config) - Stage 4
- Galaxy system implementation - Stage 4+
- Achievement system
- New game mechanics beyond what exists in v2.0
- Multiplayer features
- Cloud save functionality
- Mobile app optimization
- Sound effects or music
- Animations beyond basic state changes

---

## Design Considerations

### Structure Tier Icons
```
Energy Structures:
⚡ + |     = Tier 1 (Solar Panel)
⚡ + ||    = Tier 2 (Advanced Solar)
⚡ + |||   = Tier 3 (Fusion Reactor)

Production Structures:
🏭 + |     = Tier 1 (Basic Factory)
🏭 + ||    = Tier 2 (Advanced Factory)
🏭 + |||   = Tier 3 (Mega Factory)

Mining Structures:
⛏️ + |     = Tier 1 (Mining Outpost)
⛏️ + ||    = Tier 2 (Deep Mine)
⛏️ + |||   = Tier 3 (Planetary Excavator)
```

### Drone Capacity Colors
- **Green** (`#4ade80`): 100% capacity (maxed out)
- **Yellow** (`#fbbf24`): 50-99% capacity
- **Gray** (`#9ca3af`): 0-49% capacity

### Config UI Layout
```
┌─────────────────────────────────────┐
│ Config Editor - Structures          │
├─────────────────────────────────────┤
│ [Save] [Reset] [Export] [Import]    │ ← Action toolbar
├─────────────────────────────────────┤
│ ┌─────────────┐  ┌─────────────────┐│
│ │             │  │                 ││
│ │ Entity List │  │  Edit Form      ││
│ │ (scrolls)   │  │  (scrolls)      ││
│ │             │  │                 ││
│ │ [+ New]     │  │                 ││
│ └─────────────┘  └─────────────────┘│
└─────────────────────────────────────┘
```

---

## Technical Considerations

### Config File Security
1. **Primary Approach:** Bundled configs (not user-accessible)
   - Store configs in `/src/config/dev/` during development
   - Vite bundles them into JavaScript during build
   - Configs become part of minified application code
   - Users can view but not easily modify (requires dev tools + understanding)

2. **Fallback Approach:** External secure storage
   - If bundling doesn't provide sufficient security
   - Use GitHub Gists API with personal access token
   - Store token in environment variables (not in code)
   - Production loads from remote URL
   - Only developer can update via API

### Translation Loading Fix
- Problem: `fetch('/src/locales/en.json')` fails in production
- Solution: Import JSON directly or use dynamic imports
```javascript
// Option 1: Direct import (preferred)
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';

// Option 2: Dynamic import (for lazy loading)
const translations = await import(`../locales/${lang}.json`);
```

### Live Updates Performance
- Update UI on requestAnimationFrame or setInterval(1000ms)
- Only update changed values (dirty checking)
- Use React/Vue patterns if performance becomes issue
- Consider virtual DOM or selective re-rendering

### Config Relationships
- Maintain in-memory graph of dependencies
- When deleting entity, check if anything references it
- When adding resource, update all relevant dropdowns
- Use reactive/observable pattern for live updates

---

## Success Metrics

1. **Bug Resolution:** All 5 critical bugs fixed and verified
2. **Test Coverage:** Maintain >80% code coverage
3. **Config Usability:** Create new structure/drone in <2 minutes (dev)
4. **Performance:** No FPS drop with live resource updates
5. **Security:** Config files not easily modifiable in production builds
6. **User Satisfaction:** Visual indicators improve clarity (subjective but testable)

---

## Implementation Phases

### Phase 1: Bug Fixes (Week 1)
- Fix translation loading
- Fix language persistence
- Fix duplicate entity creation
- Fix resource panel alignment
- Fix config editor button layout
- Test thoroughly

### Phase 2: Visual Enhancements (Week 2)
- Add structure tier indicators
- Implement live resource updates
- Add drone capacity colors
- Remove "custom" labels
- Test performance

### Phase 3: Config System - Foundation (Week 3-4)
- Implement resource management UI
- Implement tile type management UI
- Add validation system
- Add import/export functionality
- Test entity creation/deletion

### Phase 4: Config System - Advanced (Week 5-6)
- Enhance structure management with dropdowns
- Enhance drone management with dropdowns
- Implement relationship management
- Add live preview system
- Implement secure config storage
- Full integration testing

---

## Open Questions

1. **Config Storage Decision:** 
   - Is bundled config secure enough? 
   - Or do we need external storage?
   - User to test if configs are easily accessible in production build

2. **Structure Icons:**
   - Should we use emoji, SVG, or icon font?
   - Need icon set for structure types
   - Recommendation: Use Unicode emoji for simplicity (⚡🏭⛏️🔬)

3. **Performance Thresholds:**
   - What's acceptable FPS drop with live updates?
   - How many structures/drones before performance concerns?
   - Should we implement virtualization for large entity lists?

4. **Config Migration:**
   - How to handle existing hardcoded configs?
   - Migration path from v2.0 structures.js to new system?
   - Should old configs be auto-imported on first dev mode launch?

5. **Validation Rules:**
   - Min/max values for costs, production rates, etc.?
   - Character limits for IDs and names?
   - Allowed characters in IDs (alphanumeric + hyphen/underscore)?

---

## Dependencies

- Existing config files: `src/config/structures.js`, `src/config/recipes.js`
- Translation system: `src/utils/i18n.js`
- Settings manager: `src/systems/SettingsManager.js`
- Config editor: `src/scenes/ConfigScene.js`
- Map rendering: `src/scenes/MapScene.js`

---

## Notes for Implementation

- **Priority Order:** Bugs → Visual → Config Foundation → Config Advanced
- **Testing:** Add tests for each new feature before marking complete
- **Documentation:** Update README with new config system usage
- **Backward Compatibility:** Ensure existing saves still work (or require hard reset)
- **Code Quality:** Follow Stage 2 patterns (JSDoc, modular CSS, i18n)
