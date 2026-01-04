# Panix Incremental - Game Design Document

**Version:** 0.1  
**Last Updated:** December 28, 2025  
**Genre:** Incremental/Idle Game with RPG and Strategy Elements  
**Platform:** Web Browser (HTML5/JavaScript)  
**Target Audience:** Incremental game enthusiasts, 16+  
**Estimated Playtime:** 50+ hours for core content

---

## Table of Contents

1. [Game Overview](#game-overview)
2. [Core Gameplay Loop](#core-gameplay-loop)
3. [Resource System](#resource-system)
4. [Research & Technology](#research--technology)
5. [Drone System](#drone-system)
6. [Combat System](#combat-system)
7. [Prestige Systems](#prestige-systems)
8. [Challenge System](#challenge-system)
9. [Narrative & Lore](#narrative--lore)
10. [Progression Pacing](#progression-pacing)
11. [UI/UX Design](#uiux-design)
12. [Technical Requirements](#technical-requirements)

---

## Game Overview

### High Concept

An incremental browser game where players gather resources, automate production through drones, research technologies, and combat enemies across multiple solar systems. The game features a narrative-driven dual prestige system with challenges that modify gameplay.

### Core Pillars

1. **Meaningful Progression** - Every action advances the player toward clear goals
2. **Narrative Integration** - Story justifies mechanics (prestige = fleeing to survive)
3. **Strategic Depth** - Balance between staying longer vs. prestiging earlier
4. **Automation Satisfaction** - Watch your drone empire grow
5. **Crafting Complexity** - Multi-part crafting system with component management
6. **Exploration & Territory** - Map-based planet exploration with strategic choices
7. **Long-term Engagement** - Months of content, not days

### Unique Selling Points

- Story-driven prestige system (not arbitrary reset)
- Dual-layer prestige with different narratives
- Deep crafting system with multi-component recipes
- Map-based exploration with strategic territory control
- Configurable crafting recipes for increased complexity
- Challenge system that fundamentally changes gameplay
- No forced prestige - players choose when to flee
- Exploration of multiple solar systems with unique characteristics

---

## Core Gameplay Loop

### Phase 1: Early Game (Manual Phase)

**Duration:** 15-30 minutes  
**Activities:**

- Manual clicking to gather basic resources (Iron, Silicon)
- Craft basic components (drone chassis, wings, circuits)
- Assemble first basic drone from components
- Unlock first research nodes (some require multiple prerequisites)
- Encounter first weak enemies on the planet map
- Tutorial introduces all core systems: gathering, crafting, research, combat, exploration

### Phase 2: Automation Phase

**Duration:** 1-2 hours  
**Activities:**

- Deploy multiple drones for automatic resource gathering
- Build structures (Mining Rigs, Deforestation Stations) for automated resource collection
- Craft component drones to automate crafting of parts
- Research drone efficiency upgrades (some research unlocks nothing immediately)
- Build defensive structures on the planet map
- Explore new map territories to find resource deposits
- Fight increasingly difficult enemy waves for resource rewards
- Unlock advanced resource types through exploration and research

### Phase 3: Expansion Phase

**Duration:** 2-4 hours  
**Activities:**

- Manage multiple resource chains and component crafting pipelines
- Configure complex crafting recipes (customize component requirements)
- Specialize drones (gatherers, fighters, crafters) with advanced components
- Build specialized structures across the planet map
- Research advanced technologies (unlock through multi-research prerequisites)
- Explore planet regions for rare resources and enemy territories
- Conquer map territories, triggering stronger enemy counterattacks
- Defeat elite enemies for valuable resource drops
- Maintain component stockpiles through automated crafting drones

### Phase 4: End Game (Pre-Prestige)

**Duration:** 30 minutes - 2 hours (player choice)  
**Activities:**

- Enemies become overwhelming
- Research teleportation technology
- Gather materials for teleportation device
- Decision point: flee now or optimize longer
- Activate teleportation → Prestige 1

### The Loop Repeats

Each cycle becomes faster due to prestige bonuses, but with new challenges and content.

---

## Resource System

### Tier 1: Basic Resources (Accessible from start)

| Resource    | Gathering Method          | Primary Use               |
| ----------- | ------------------------- | ------------------------- |
| **Iron**    | Surface mining, asteroids | Basic drones, structures  |
| **Silicon** | Sand processing, deposits | Electronics, solar panels |
| **Energy**  | Solar panels, generators  | Powers all operations     |

### Tier 2: Advanced Resources (Unlock via research)

| Resource     | Gathering Method        | Primary Use                     |
| ------------ | ----------------------- | ------------------------------- |
| **Titanium** | Deep mining, rare veins | Advanced drones, weapons        |
| **Chromium** | Asteroid mining         | Armor, shields                  |
| **Uranium**  | Rare deposits           | Nuclear reactors, heavy weapons |
| **Copper**   | Mining, processing      | Advanced electronics            |

### Tier 3: Exotic Resources (Late game)

| Resource            | Gathering Method        | Primary Use                           |
| ------------------- | ----------------------- | ------------------------------------- |
| **Alien Artifacts** | Enemy drops, ruins      | Research boosts, special tech         |
| **Dark Matter**     | Dimensional rifts       | Teleportation tech, ultimate upgrades |
| **Quantum Cores**   | Boss enemies            | Second prestige layer                 |
| **Ancient Data**    | Exploration, lore items | Permanent unlock bonuses              |

### Resource Conversion

- Smelting: Iron Ore → Iron Ingots (50% efficiency, upgradeable)
- Refining: Silicon Ore → Pure Silicon (60% efficiency)
- Energy conversion: Various sources with different efficiency rates

### Storage

- Base storage: 1,000 per resource
- Upgradeable via research and structures
- Storage drones can increase capacity
- Some resources don't count toward storage (Ancient Data)

---

## Crafting System

### Core Crafting Mechanics

**Philosophy:** Crafting is NOT instant or simple. Players must gather/craft individual components, then assemble them into finished items. This creates deep supply chains and satisfying automation possibilities.

### Component-Based Crafting

Every drone, structure, and advanced item requires multiple components:

```
Example: Basic Gathering Drone
├─ Drone Chassis (requires: 50 Iron, 20 Silicon)
├─ Drone Wings x2 (requires each: 30 Iron, 10 Titanium)
├─ Basic Circuit (requires: 15 Silicon, 10 Copper)
├─ Power Core (requires: 20 Silicon, 5 Energy Cells)
└─ Assembly: 1 Chassis + 2 Wings + 1 Circuit + 1 Power Core → Gathering Drone
```

### Crafting Process

1. **Gather Raw Resources** (Iron, Silicon, etc.)
2. **Craft Basic Components** (Chassis, Wings, Circuits)
   - Each component has its own crafting time
   - Can queue multiple crafts
3. **Craft Intermediate Components** (Some components require other components)
4. **Assemble Final Product** (Combine all components)

### Component Types

#### Basic Components (Tier 1)

| Component         | Resources Required | Craft Time | Used In                |
| ----------------- | ------------------ | ---------- | ---------------------- |
| **Iron Plate**    | 20 Iron            | 5s         | Chassis, Structures    |
| **Silicon Wafer** | 15 Silicon         | 5s         | Circuits, Solar Panels |
| **Wire**          | 10 Copper          | 3s         | Circuits, Power Cores  |
| **Bolt**          | 5 Iron             | 2s         | Universal assembly     |

#### Structural Components (Tier 2)

| Component            | Resources Required            | Craft Time | Used In                  |
| -------------------- | ----------------------------- | ---------- | ------------------------ |
| **Drone Chassis**    | 5 Iron Plate, 2 Wire          | 15s        | All drones               |
| **Reinforced Frame** | 10 Iron Plate, 5 Titanium     | 30s        | Structures, Heavy Drones |
| **Modular Panel**    | 8 Iron Plate, 4 Silicon Wafer | 20s        | Structures               |

#### Electronic Components (Tier 2)

| Component             | Resources Required                          | Craft Time | Used In                         |
| --------------------- | ------------------------------------------- | ---------- | ------------------------------- |
| **Basic Circuit**     | 3 Silicon Wafer, 4 Wire                     | 10s        | Basic Drones, Simple Structures |
| **Advanced Circuit**  | 2 Basic Circuit, 5 Silicon Wafer, 10 Copper | 25s        | Advanced Drones, Research Labs  |
| **Quantum Processor** | 3 Advanced Circuit, 20 Alien Artifacts      | 60s        | Combat Drones, Late-game Tech   |

#### Propulsion Components (Tier 2)

| Component        | Resources Required                       | Craft Time | Used In                    |
| ---------------- | ---------------------------------------- | ---------- | -------------------------- |
| **Drone Wings**  | 30 Iron, 10 Titanium                     | 12s        | Flying Drones              |
| **Thruster**     | 2 Drone Wings, 1 Power Core, 15 Uranium  | 40s        | Fast Drones, Combat Drones |
| **Hover Module** | 5 Silicon Wafer, 2 Power Core, 20 Energy | 35s        | Hovering Structures        |

#### Power Components (Tier 2)

| Component       | Resources Required                           | Craft Time | Used In                         |
| --------------- | -------------------------------------------- | ---------- | ------------------------------- |
| **Energy Cell** | 10 Silicon, 5 Copper                         | 8s         | Power Cores, Batteries          |
| **Power Core**  | 5 Energy Cell, 2 Wire                        | 20s        | All Drones, Power Structures    |
| **Fusion Core** | 2 Power Core, 50 Uranium, 1 Advanced Circuit | 90s        | Heavy Structures, Combat Drones |

#### Weapon Components (Tier 3)

| Component            | Resources Required                                  | Craft Time | Used In                |
| -------------------- | --------------------------------------------------- | ---------- | ---------------------- |
| **Laser Emitter**    | 3 Advanced Circuit, 10 Chromium                     | 45s        | Combat Drones, Turrets |
| **Missile Launcher** | 2 Reinforced Frame, 1 Advanced Circuit, 30 Titanium | 60s        | Heavy Combat Drones    |
| **Shield Generator** | 2 Quantum Processor, 5 Dark Matter                  | 120s       | Defense Structures     |

### Recipe System

**Designer-Controlled Recipes:**

- All recipes are defined by the game designer (you)
- Players cannot directly modify recipes
- Recipes can change through gameplay progression:
  - **Challenges** can simplify recipes (remove intermediate steps)
  - **Better Factories/Buildings** enable bulk production (craft multiple at once)
  - **Progression** may unlock alternative recipe versions

**Example Recipe Evolution:**

```
Basic Gathering Drone (Early Game):
├─ Drone Chassis: 1
├─ Drone Wings: 2
├─ Bolts: 4 (intermediate component)
├─ Basic Circuit: 1
└─ Power Core: 1

Streamlined Gathering Drone (After Challenge "Minimalist"):
├─ Drone Chassis: 1
├─ Drone Wings: 2 (bolts eliminated)
├─ Iron: 20 (direct material instead of bolts)
├─ Basic Circuit: 1
└─ Power Core: 1

Bulk Production (After "Advanced Fabrication" building):
├─ Same recipe as above
└─ Can craft 5 drones simultaneously
```

**Recipe Modifications Only Through:**

1. **Challenges:** Simplify recipes, remove steps
2. **Building Upgrades:** Enable parallel/bulk crafting (same recipe, multiple outputs)
3. **Special Research:** Unlock alternative simplified versions

### Automated Crafting

#### Crafting Drones

**Function:** Automatically craft components using designer-defined recipes

**Crafting Drone Specs:**

- **Base Crafting Speed:** 1 component per 20 seconds
- **Queue Capacity:** 10 items
- **Smart Crafting:** Can maintain minimum stock levels
- **Recipe Source:** Uses current active recipe (modified by challenges/progression)

**Crafting Drone Configuration:**

```
Crafting Drone #1 Settings:
├─ Priority Queue:
│  ├─ Drone Wings (maintain stock: 10)
│  ├─ Basic Circuit (maintain stock: 15)
│  └─ Power Core (maintain stock: 5)
├─ Auto-pull resources: [✓] Enabled
├─ Pause when storage full: [✓] Enabled
└─ Active Recipe Version: Streamlined (if unlocked)
```

#### Component Storage System

Drones and structures can maintain component stockpiles:

- **Component Warehouse:** Building that stores crafted components
- **Smart Allocation:** Drones prioritize using stored components
- **Stock Alerts:** Notify when component stocks run low

**Stock Management UI:**

```
Component Inventory:
├─ Drone Chassis: 8/20 (Auto-craft: ON)
├─ Drone Wings: 15/30 (Auto-craft: ON)
├─ Basic Circuit: 3/20 (⚠️ LOW - Crafting queued)
├─ Power Core: 0/10 (🚨 EMPTY - Awaiting resources)
```

### Crafting Progression

**Early Game (Manual Crafting):**

- Player manually crafts each component
- Simple recipes with 2-3 components
- Immediate crafting (no queues)

**Mid Game (Semi-Automated):**

- First crafting drones unlocked
- Component storage available
- Recipes get more complex (4-6 components)
- Can queue multiple crafts

**Late Game (Full Automation):**

- Multiple crafting drones with specialized tasks
- Complex supply chains (components requiring components)
- Configurable recipes for optimization
- Auto-crafting maintains stockpiles

### Crafting Research Tree

```
Crafting Technology Tree:
Level 1: Basic Assembly (Unlock component crafting)
├─ Level 2: Crafting Queue (Queue up to 5 items)
│  ├─ Level 3: Mass Production (Queue up to 20 items)
│  └─ Level 3: Component Storage (Unlock warehouses)
│     └─ Level 4: Smart Storage (Auto-craft on low stock)
├─ Level 2: Crafting Speed I (+25% craft speed)
│  ├─ Level 3: Crafting Speed II (+50% craft speed)
│  └─ Level 3: Efficient Assembly (-10% material cost)
└─ Level 2: Crafting Drones (Unlock automated crafting)
   ├─ Level 3: Advanced Crafting Drones (2x speed, larger queues)
   └─ Level 3: Advanced Fabrication (Can craft 5 items simultaneously)
      └─ Level 4: Industrial Fabrication (Can craft 10 items simultaneously)
```

---

## Refining System

### Refining vs. Crafting

**Key Differences:**

| Aspect         | Crafting                                  | Refining                               |
| -------------- | ----------------------------------------- | -------------------------------------- |
| **Process**    | Discrete, queue-based assembly            | Continuous, passive conversion         |
| **Output**     | Components (ONLY obtainable via crafting) | Resources (can ALSO drop from enemies) |
| **Automation** | Crafting Drones (late unlock)             | Refineries (earlier unlock)            |
| **Management** | Active queue management                   | Set-and-forget                         |
| **Speed**      | Item-by-item                              | Bulk processing over time              |
| **Buildings**  | Component Warehouse, Fabricators          | Refineries, Processing Plants          |

**Examples:**

- **Crafting:** Drone Chassis, Wings, Circuits (never drop from enemies)
- **Refining:** Iron Ingots, Pure Silicon, Processed Titanium (can also drop from enemies)

### Refining Mechanics

**Process:**

1. Build a **Refinery** structure
2. Set refining recipe (e.g., Iron Ore → Iron Ingots)
3. Refinery continuously processes as long as:
   - Input materials available
   - Output storage not full
   - Energy available

**Refinery Stats:**

- **Processing Rate:** 100 ore → 80 refined per minute (80% efficiency)
- **Energy Cost:** 30 energy/second
- **Automatic:** No queue needed, runs continuously
- **Capacity:** Can hold 1,000 input, 1,000 output

### Refining Recipes

#### Basic Refining

| Input             | Output          | Efficiency | Time   |
| ----------------- | --------------- | ---------- | ------ |
| 100 Iron Ore      | 80 Iron Ingots  | 80%        | 1 min  |
| 100 Silicon Ore   | 75 Pure Silicon | 75%        | 1 min  |
| 50 Organic Matter | 30 Biofuel      | 60%        | 30 sec |

#### Advanced Refining

| Input            | Output             | Efficiency | Time    |
| ---------------- | ------------------ | ---------- | ------- |
| 100 Titanium Ore | 70 Titanium Ingots | 70%        | 2 min   |
| 50 Chromium Ore  | 35 Chromium Alloy  | 70%        | 2 min   |
| 100 Crude Oil    | 80 Refined Fuel    | 80%        | 1.5 min |

#### Special Refining (Requires Research)

| Input                         | Output                | Efficiency | Time  |
| ----------------------------- | --------------------- | ---------- | ----- |
| 50 Alien Organic + 50 Silicon | 40 Biosilicon         | 80%        | 3 min |
| 100 Raw Dark Matter           | 60 Stable Dark Matter | 60%        | 5 min |

### Refined vs. Raw Materials

**Why Refine?**

- Many recipes require **refined** materials, not raw ore
- Refined materials are more efficient for advanced crafting
- Some structures only accept refined inputs

**Example:**

```
Basic Circuit (Early Game):
├─ Raw Silicon: 20
├─ Copper Wire: 5

Advanced Circuit (Mid Game):
├─ Pure Silicon: 10 (must be refined!)
├─ Copper Wire: 10
├─ Gold Trace: 2
```

### Refining Automation

#### Refinery Drones

**Function:** Transport materials to/from refineries automatically

**Stats:**

- Don't process materials (refineries do that)
- Simply move materials between storage and refineries
- Can prioritize critical refining operations
- Unlocked via research (separate from crafting drones)

#### Auto-Refinery Management

```
Refinery #1: Iron Ore → Iron Ingots
├─ Input: Auto-pull from main storage
├─ Output: Auto-deposit to refined storage
├─ Priority: High (always keep running)
└─ Stop Condition: Output storage full

Refinery #2: Silicon Ore → Pure Silicon
├─ Input: Auto-pull from main storage
├─ Output: Auto-deposit to refined storage
├─ Priority: Medium
└─ Stop Condition: Output > 500 units
```

### Enemy Drops Overlap

**Important:** Refined materials can ALSO drop from enemies:

- Defeating a **Sentry Bot** might drop: Iron Ingots, Pure Silicon, Circuits
- The **ingots and silicon** could be refined OR looted
- The **circuits** can ONLY be crafted (never refined)

This creates strategic choice:

- **Fight more enemies** → Get refined materials as loot (risky)
- **Build more refineries** → Get refined materials passively (resource investment)

### Refining Research Tree

```
Refining Technology:
Level 1: Basic Refining (Unlock refineries, 70% efficiency)
├─ Level 2: Efficient Refining (80% efficiency)
│  ├─ Level 3: Advanced Refining (90% efficiency)
│  └─ Level 3: Parallel Processing (2x refinery speed)
├─ Level 2: Refinery Drones (Automate material transport)
│  └─ Level 3: Smart Logistics (Drones prioritize bottlenecks)
└─ Level 2: Advanced Recipes (Unlock special refining recipes)
   └─ Level 3: Exotic Processing (Dark Matter, Alien materials)
```

### Multi-Step Crafting Chains

**Example: Combat Drone Crafting Chain**

```
Raw Resources:
Iron (200) + Silicon (150) + Titanium (80) + Copper (100) + Uranium (50)
                              ↓
Tier 1 Components:
├─ Iron Plate (x10) ← 20 Iron each
├─ Silicon Wafer (x10) ← 15 Silicon each
└─ Wire (x10) ← 10 Copper each
                              ↓
Tier 2 Components:
├─ Reinforced Frame (x2) ← 10 Iron Plate + 40 Titanium
├─ Advanced Circuit (x2) ← 2 Basic Circuit + 10 Silicon Wafer + 20 Copper
├─ Thruster (x2) ← 2 Drone Wings + 1 Power Core + 15 Uranium each
└─ Laser Emitter (x1) ← 3 Advanced Circuit + 10 Chromium
                              ↓
Assembly:
Combat Drone ← 2 Reinforced Frame + 2 Advanced Circuit + 2 Thruster + 1 Laser Emitter
```

**Total Time to Craft (Manual):**

- Tier 1: ~10 minutes
- Tier 2: ~15 minutes
- Assembly: ~5 minutes
- **Total: ~30 minutes for one combat drone (first time)**

**With Automation (Mid-Game):**

- Crafting drones maintain component stocks
- Assembly time only: ~2 minutes
- Can produce multiple drones simultaneously

---

## Research & Technology

### Research Mechanics

- **Research Points (RP):** Generated passively at 1 RP/second base rate
- **Research Labs:** Buildings that boost RP generation
- **Research Drones:** Automate RP generation
- **Ancient Data:** Rare resource that provides instant RP bursts
- **Multi-Prerequisites:** Some research requires 2+ completed research nodes
- **Progressive Unlocks:** Not all research unlocks new content immediately; some are stepping stones

### Research Types

#### 1. Immediate Unlock Research

Completes and immediately unlocks new content:

- **Basic Drone Construction** → Unlocks drone crafting
- **Laser Weapons** → Unlocks laser emitters
- **Solar Efficiency** → +50% solar energy output

#### 2. Progressive Research

Completes but unlocks nothing immediately. Required as prerequisite for future research:

- **Materials Science I** → No immediate effect
- **Materials Science II** → No immediate effect (requires Materials Science I)
- **Advanced Alloys** → Unlocks Titanium processing (requires both Materials Science I & II)

#### 3. Stat Boost Research

Only provides numerical improvements:

- **Drone Efficiency I** → +25% drone speed
- **Resource Gathering I** → +15% all resource gathering

#### 4. Gateway Research

Must complete multiple different trees to unlock:

- **Quantum Theory** → Requires: Energy Systems III + Advanced Computing + Dimensional Studies

### Research Dependencies

**Example: Complex Research Path**

```
Quantum Teleportation Device (PRESTIGE 1 UNLOCK)
Requires ALL of:
├─ Quantum Theory
│  Requires ALL of:
│  ├─ Energy Systems III
│  │  └─ Requires: Energy Systems II → Energy Systems I
│  ├─ Advanced Computing
│  │  └─ Requires: Basic Computing → Electronics I & II
│  └─ Dimensional Studies
│     └─ Requires: Xenobiology II + Ancient Analysis
├─ Power Generation IV
└─ 1,000 Dark Matter (resource requirement)
```

**Why Multi-Prerequisites?**

- Creates meaningful research planning
- Forces players to explore different tech branches
- Some "dead-end" research becomes valuable later
- Adds strategic depth to progression

### Research Trees

#### 1. Mining Technology

```
Level 1: Basic Mining (+25% gathering rate)
├─ Level 2: Efficient Extraction (+50% gathering rate)
│  ├─ Level 3: Deep Mining (Unlock Titanium, +75%)
│  └─ Level 3: Asteroid Mining (Unlock space resources)
└─ Level 2: Resource Processing (Unlock refineries)
   └─ Level 3: Advanced Smelting (+100% conversion efficiency)
```

#### 2. Automation & Drones

```
Level 1: Basic Drone Construction (Unlock first drone)
├─ Level 2: Drone Efficiency I (+25% drone speed)
│  ├─ Level 3: Drone Efficiency II (+50% drone speed)
│  │  └─ Level 4: Drone Efficiency III (+100% drone speed)
│  └─ Level 3: Specialized Drones
│     ├─ Level 4: Combat Drones
│     ├─ Level 4: Mining Drones
│     └─ Level 4: Research Drones
├─ Level 2: Drone Networking (Drones share resources)
└─ Level 2: Drone AI (Basic autonomous behavior)
   └─ Level 3: Advanced AI (Smart resource prioritization)
```

#### 3. Combat Technology

```
Level 1: Basic Weapons (Unlock laser weapons)
├─ Level 2: Ballistic Weapons (Unlock projectile weapons)
│  └─ Level 3: Heavy Weapons (Unlock missiles, cannons)
├─ Level 2: Energy Shields (Unlock shield generators)
│  ├─ Level 3: Advanced Shields (+100% shield capacity)
│  └─ Level 3: Regenerative Shields (Shields recharge faster)
└─ Level 2: Tactical Systems (Unlock turrets, auto-defense)
   └─ Level 3: Strategic Warfare (Army formations, tactics)
```

#### 4. Xenobiology & Enemy Research

```
Level 1: Enemy Analysis (See enemy stats)
├─ Level 2: Weakness Detection (+10% damage vs studied enemies)
│  └─ Level 3: Critical Strike (Chance for 2x damage)
└─ Level 2: Loot Enhancement (+25% drop rates)
   └─ Level 3: Rare Finds (+50% rare resource drops)
```

#### 5. Quantum Physics (Prestige Unlock)

```
Level 1: Quantum Theory (Unlock teleportation research)
└─ Level 2: Dimensional Rifts (Unlock rift exploration)
   └─ Level 3: Teleportation Device (Activate Prestige 1)
      └─ Level 4: Universal Anchors (Prestige 2 unlock path)
```

#### 6. Energy Systems

```
Level 1: Solar Efficiency (+50% solar energy)
├─ Level 2: Nuclear Fission (Unlock nuclear reactors)
│  └─ Level 3: Nuclear Fusion (5x energy output)
└─ Level 2: Energy Storage (Batteries, capacitors)
   └─ Level 3: Zero-Point Energy (Unlimited energy late game)
```

### Research Costs

Research follows exponential scaling:

- Base cost: 100 RP × (1.15^level)
- Each tier multiplies base cost by 10
- Some research requires specific resources as prerequisites

---

## Drone System

### Drone Types

#### 1. Gathering Drones

**Function:** Automatically collect resources  
**Base Stats:**

- Gathering Rate: 1 resource/second
- Energy Cost: 5 energy/second
- **Build Components Required:**
  - 1× Drone Chassis
  - 2× Drone Wings
  - 1× Basic Circuit
  - 1× Power Core

**Upgrades:**

- Speed: +25% per level (max 5 levels)
- Efficiency: -20% energy cost per level (max 3 levels)
- Capacity: Can carry 2/3/5/10 resources at once

**Recipe Notes:**

- Recipe can be simplified through challenge completion
- Bulk production available with Advanced Fabrication building

**Specializations (via research):**

- Mining Drones: +100% for metal resources
- Energy Drones: +100% for energy gathering
- Scout Drones: Can find rare resource deposits

#### 2. Combat Drones

**Function:** Defend against enemies, attack proactively  
**Base Stats:**

- Damage: 10 DPS
- Health: 100 HP
- Energy Cost: 10 energy/second
- **Build Components Required:**
  - 2× Reinforced Frame
  - 2× Thruster
  - 2× Advanced Circuit
  - 1× Laser Emitter
  - 1× Power Core

**Upgrades:**

- Weapons: +50% damage per level
- Armor: +100% HP per level
- Tactics: Better target prioritization

**Specializations:**

- Tank Drones: 3x HP, -50% damage
- DPS Drones: 2x damage, -50% HP
- Support Drones: Heal other drones

**Recipe Notes:**

- Expensive to build, requires advanced components
- Recipes can be simplified via challenges

#### 3. Crafting Drones

**Function:** Automatically craft items using current active recipes  
**Base Stats:**

- Crafting Speed: 1 item/10 seconds
- Energy Cost: 8 energy/second
- **Build Components Required:**
  - 1× Drone Chassis
  - 2× Drone Wings
  - 2× Advanced Circuit
  - 1× Power Core
  - 1× Fabrication Module (special component)

**Capabilities:**

- Follows designer-defined recipes
- Uses simplified recipes if unlocked via challenges
- Can maintain component stock levels automatically

**Upgrades:**

- Speed: -20% craft time per level
- Efficiency: -15% resource cost per level
- Parallel Processing: Craft multiple items

#### 4. Research Drones

**Function:** Generate research points  
**Base Stats:**

- RP Generation: +2 RP/second
- Energy Cost: 15 energy/second
- **Build Components Required:**
  - 1× Drone Chassis
  - 2× Hover Module
  - 3× Quantum Processor
  - 1× Fusion Core
  - 25× Alien Artifacts

**Upgrades:**

- Intelligence: +100% RP generation per level
- Analysis: Research specific tech trees faster

**Upgrades:**

- Intelligence: +100% RP generation per level
- Analysis: Research specific tech trees faster

### Drone Management

- **Drone Limit:** Starts at 10, upgradeable to 500+
- **Drone Assignment:** Manual or automatic allocation
- **Drone Recycling:** Destroy drones to reclaim 50% resources
- **Drone Prioritization:** Set resource gathering priorities

### Drone Persistence

- **Pre-Prestige 1:** All drones lost on teleportation
- **Post-Prestige 1:** Blueprints remain, faster rebuild
- **Post-Prestige 2:** Keep 10% of drones (see Prestige 2)

---

## Structures & Buildings

### Structure Overview

Structures are static buildings placed on the planet map that provide automation, resource generation, defense, or utility functions. Unlike drones, structures cannot move but are generally more powerful and efficient.

### Structure Types

#### Production Structures

##### 1. Mining Rig

**Function:** Automatically extracts resources from a specific map location  
**Requirements:**

- Must be placed on a resource deposit (found via exploration)
- **Build Components:**
  - 5× Reinforced Frame
  - 3× Modular Panel
  - 2× Advanced Circuit
  - 1× Power Core
  - 1× Drilling Module (special component)

**Stats:**

- Production Rate: 5 resources/second (depends on deposit quality)
- Range: Extracts from 3×3 map tiles
- Energy Cost: 20 energy/second
- Durability: 1,000 HP (can be damaged by enemies)

**Upgrades:**

- Extraction Speed: +50% per level
- Efficiency: Extracts rare resources (10% chance)
- Defense: +500 HP, basic turret attachment

**Notes:**

- Can be built in bulk with Advanced Construction tech
- Recipe may be simplified through challenges

##### 2. Deforestation Station

**Function:** Clears vegetation and collects organic resources  
**Requirements:**

- Must be placed on forest/vegetation tiles
- **Build Components:**
  - 4× Reinforced Frame
  - 3× Modular Panel
  - 1× Advanced Circuit
  - 1× Power Core
  - 2× Cutting Blade (special component)

**Stats:**

- Clear Rate: 1 tile per 30 seconds
- Resource Yield: Wood, organic compounds
- Energy Cost: 15 energy/second
- Durability: 800 HP

**Effects:**

- Cleared tiles can be used for other structures
- Unlocks building expansion
- Some enemies hide in forests (clearing reveals them)

##### 3. Refinery

**Function:** Converts raw resources into processed materials  
**Requirements:**

- **Build Components:**
  - 6× Reinforced Frame
  - 4× Modular Panel
  - 3× Advanced Circuit
  - 2× Fusion Core
  - 1× Processing Unit (special component)

**Stats:**

- Conversion Rate: 10 raw → 8 processed per minute
- Energy Cost: 30 energy/second
- Can queue conversions
- Efficiency: 80% (upgradeable to 95%)

**Conversions:**

- Iron Ore → Iron Ingots
- Silicon Ore → Pure Silicon
- Organic Matter → Biofuel

##### 4. Solar Farm

**Function:** Generates energy from sunlight  
**Requirements:**

- Must be placed in open terrain (not covered)
- **Build Components:**
  - 3× Modular Panel
  - 8× Silicon Wafer
  - 4× Wire
  - 1× Energy Storage Unit

**Stats:**

- Energy Generation: 20 energy/second (day), 5 energy/second (night)
- No upkeep cost
- Can be upgraded for better efficiency

##### 5. Component Warehouse

**Function:** Stores crafted components for automated assembly  
**Requirements:**

- **Build Components:**
  - 8× Reinforced Frame
  - 6× Modular Panel
  - 2× Basic Circuit

**Stats:**

- Storage Capacity: 100 components (each type)
- Can set auto-craft thresholds
- Drones auto-pull from warehouse
- Upgradeable capacity

#### Defense Structures

##### 1. Turret

**Function:** Auto-targets and attacks enemies  
**Requirements:**

- **Build Components:**
  - 2× Reinforced Frame
  - 1× Advanced Circuit
  - 1× Laser Emitter
  - 1× Power Core

**Stats:**

- Damage: 25 DPS
- Range: 5 map tiles
- Energy Cost: 12 energy/second
- Durability: 500 HP

**Upgrades:**

- Weapon upgrades (laser → ballistic → missile)
- Range: +2 tiles per level
- Targeting: Prioritize high-threat enemies

##### 2. Wall/Barrier

**Function:** Blocks enemy movement and protects structures  
**Requirements:**

- **Build Components:**
  - 10× Iron Plate
  - 5× Reinforced Frame

**Stats:**

- Durability: 2,000 HP
- Energy Cost: 0
- Blocks 1 map tile
- Can be upgraded to electrified (damages enemies on touch)

##### 3. Shield Generator

**Function:** Projects energy shield over an area  
**Requirements:**

- **Build Components:**
  - 3× Reinforced Frame
  - 2× Quantum Processor
  - 1× Fusion Core
  - 1× Shield Emitter (special component)

**Stats:**

- Shield Capacity: 1,000 shield HP
- Regeneration: 50 HP/second
- Coverage: 5×5 map tiles
- Energy Cost: 40 energy/second

##### 4. Repair Station

**Function:** Automatically repairs drones and structures in range  
**Requirements:**

- **Build Components:**
  - 4× Modular Panel
  - 3× Advanced Circuit
  - 2× Power Core
  - 1× Repair Arm (special component)

**Stats:**

- Heal Rate: 50 HP/second
- Range: 3 map tiles
- Energy Cost: 25 energy/second
- Can repair multiple targets simultaneously

#### Research Structures

##### 1. Research Lab

**Function:** Boosts research point generation  
**Requirements:**

- **Build Components:**
  - 6× Modular Panel
  - 5× Advanced Circuit
  - 2× Quantum Processor
  - 1× Fusion Core

**Stats:**

- RP Boost: +10 RP/second
- Energy Cost: 35 energy/second
- Can specialize in specific research trees (+50% to that tree)

##### 2. Quantum Scanner

**Function:** Reveals hidden resources and lore on the map  
**Requirements:**

- **Build Components:**
  - 3× Reinforced Frame
  - 4× Quantum Processor
  - 1× Fusion Core
  - 10× Dark Matter

**Stats:**

- Scan Range: 10 map tiles
- Reveals: Hidden resources, enemy nests, ancient ruins
- Energy Cost: 50 energy/second (only when actively scanning)

### Structure Placement

**Map Grid System:**

- Planets divided into grid tiles (50×50 grid for first planet)
- Each structure occupies 1-9 tiles depending on size
- Structures must be placed on appropriate terrain:
  - Mining Rigs → Resource deposits
  - Solar Farms → Open terrain
  - Turrets → Strategic defense points
  - Refineries → Anywhere with space

**Placement Restrictions:**

- Cannot place on water/lava (unless researched)
- Cannot place too close to enemy territories (until cleared)
- Some tiles blocked by terrain features (mountains, chasms)

**Structure Management:**

- Structures visible on planet map
- Click structure for stats, upgrades, configuration
- Can dismantle for 50% component refund
- Structures can be damaged/destroyed in combat

---

## Map & Exploration

### Planet Map System

Each planet has a unique procedurally-generated map divided into regions and tiles.

### Map Structure

**Map Layout:**

```
50×50 Grid (2,500 tiles total per planet)
├─ Starting Zone (5×5, cleared and safe)
├─ Explored Territory (visible, can place structures)
├─ Fog of War (unexplored, hidden)
└─ Enemy Territory (hostile, requires conquest)
```

### Tile Types

#### Resource Tiles

| Tile Type             | Contains        | Rarity         | Extraction Method                 |
| --------------------- | --------------- | -------------- | --------------------------------- |
| **Iron Deposit**      | Iron ore        | Common (30%)   | Mining Rig                        |
| **Silicon Vein**      | Silicon         | Common (25%)   | Mining Rig                        |
| **Titanium Deposit**  | Titanium        | Uncommon (15%) | Mining Rig (requires Deep Mining) |
| **Chromium Asteroid** | Chromium        | Rare (8%)      | Space Mining Rig                  |
| **Alien Ruins**       | Artifacts, Data | Rare (5%)      | Excavation Drone                  |
| **Dark Matter Rift**  | Dark Matter     | Very Rare (2%) | Quantum Extractor                 |

#### Terrain Tiles

| Terrain       | Properties       | Special Rules                             |
| ------------- | ---------------- | ----------------------------------------- |
| **Plains**    | Open, flat       | Can build any structure                   |
| **Forest**    | Dense vegetation | Blocks construction until cleared         |
| **Mountains** | Elevated, rocky  | High resource density, hard to access     |
| **Water**     | Liquid surface   | Cannot build (until Water Platform tech)  |
| **Desert**    | Barren, sandy    | +50% solar energy generation              |
| **Volcanic**  | Extreme heat     | High energy resources, damaging to drones |

#### Strategic Tiles

| Tile Type             | Purpose                  | Benefits                        |
| --------------------- | ------------------------ | ------------------------------- |
| **High Ground**       | Defense bonus            | Turrets +50% range              |
| **Chokepoint**        | Funnel enemies           | Easy to defend                  |
| **Resource Cluster**  | Multiple deposits nearby | Efficient mining                |
| **Ancient Structure** | Lore + bonuses           | +RP generation or unique unlock |

### Exploration Mechanics

#### Fog of War

- **Initial State:** Only starting 5×5 zone visible
- **Exploration Methods:**
  1. **Scout Drones:** Reveal 3×3 area per drone
  2. **Manual Expansion:** Slowly reveal adjacent tiles
  3. **Quantum Scanner:** Reveals 10×10 area instantly

#### Exploration Rewards

Exploring new tiles can reveal:

- **Resource Deposits:** 40% chance
- **Enemy Encounters:** 25% chance
- **Lore Fragments:** 15% chance
- **Special Events:** 10% chance (ancient cache, crashed ship)
- **Empty Tile:** 10% chance

#### Exploration Risks

- Revealed tiles may contain enemy nests
- Some tiles have environmental hazards (radiation, acid pools)
- Exploration costs energy (scout drones)

### Territory Control

**Conquest System:**

- Map divided into **territories** (10×10 tile regions)
- Each territory has a control percentage (0-100%)
- Control increases by:

  - Building structures in territory: +5% per structure
  - Defeating enemies in territory: +10% per wave
  - Holding territory for time: +1% per minute

**Territory Benefits:**

- 100% Control: Territory is "secured"
  - No random enemy attacks
  - +25% resource gathering in that territory
  - Unlock special structures (Command Center)

**Enemy Escalation:**

- **More Conquest = More Aggression**
- For every 10% of planet controlled, enemy attack frequency increases by 5%
- Conquering enemy nest territories triggers **Retaliation Waves**
  - 2-3× normal enemy count
  - Elite enemies included
  - 5-minute countdown to prepare

**Strategic Choices:**

- **Slow Expansion:** Secure each territory fully, fewer attacks
- **Rapid Expansion:** Grab resources quickly, face constant combat
- **Defensive Play:** Fortify borders, don't expand aggressively

### Solar System UI

Once **Interplanetary Travel** is researched, players can view and travel between planets.

**Solar System View:**

```
System Map (Visual UI):
     ☀️ Star
    /  |  \
   🌍  🌕  🌑
   P1  P2  P3

Planet 1 (Current): Earth-like, 45% explored
Planet 2 (Locked): Requires Ship Construction
Planet 3 (Locked): Requires Advanced Propulsion
```

**Planet Selection UI:**

```
╔═══════════════════════════════════════════════╗
║         SOLAR SYSTEM: ALPHA CENTAURI          ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  [Planet 1: Terran Prime]        ← CURRENT   ║
║  Type: Earth-like                            ║
║  Size: 50×50 grid                            ║
║  Control: 45% (23/50 territories)            ║
║  Resources: Iron★★★ Silicon★★ Titanium★     ║
║  Enemies: Wildlife, Moderate threat          ║
║  Special: Ancient ruins discovered           ║
║  ────────────────────────────────────────── ║
║  [Planet 2: Desolate Rock]       🔒 LOCKED   ║
║  Requires: Interplanetary Ship (0/1)         ║
║  Type: Rocky, low atmosphere                 ║
║  Resources: Titanium★★★ Iron★★ Chromium★★  ║
║  Enemies: Robotic forces, High threat        ║
║  ────────────────────────────────────────── ║
║  [Planet 3: Gas Giant Moon]      🔒 LOCKED   ║
║  Requires: Advanced Propulsion Tech          ║
║  Type: Frozen, high-energy storms            ║
║  Resources: Dark Matter★★ Exotic★★★         ║
║  Enemies: Energy beings, Extreme threat      ║
║                                               ║
╚═══════════════════════════════════════════════╝
```

**Planet Characteristics (Visible Before Travel):**

- **Resource Density:** How rich the planet is
- **Enemy Threat Level:** Combat difficulty
- **Special Features:** Unique planet traits
  - High Gravity: Drones 50% slower, structures more durable
  - Toxic Atmosphere: Drones take damage over time
  - Rich Deposits: 2× resource extraction rate
  - Ancient Civilization: More lore fragments, special tech

**Traveling Between Planets:**

- Requires **Interplanetary Ship** (expensive to build)
- Travel is ONE-WAY initially (can't go back until Return Ship tech)
- Can build ships to transport drones/resources (late game)
- Each planet in system has different progression curve

### Map UI Elements

**In-Game Map Display:**

- **Minimap:** Always visible, shows explored area
- **Full Map:** Opens overlay, shows full 50×50 grid
- **Filters:**
  - Resource view (highlight resource deposits)
  - Threat view (show enemy positions and strength)
  - Control view (show territory control %)
  - Structure view (show all placed structures)

**Map Interactions:**

- **Click tile:** View tile details
- **Right-click:** Quick-build structure menu
- **Drag-select:** Select multiple tiles for mass actions
- **Hotkeys:** Quick-navigate to important areas

**Map Notifications:**

- **!** New resource discovered
- **⚔️** Enemy attack incoming on tile
- **✓** Territory secured (100% control)
- **📜** Lore fragment found
- **⚠️** Structure under attack

---

## Combat System

### Combat Mechanics

**Combat Mode:** Automated with strategic options  
**Player Role:** Deploy drones, build defenses, research weaknesses

### Enemy Types

#### Tier 1: Native Wildlife (Solar System 1)

| Enemy               | HP  | Damage | Special Ability        |
| ------------------- | --- | ------ | ---------------------- |
| **Scavenger Beast** | 50  | 5 DPS  | None                   |
| **Rock Crawler**    | 100 | 3 DPS  | High armor             |
| **Swarm Bug**       | 20  | 8 DPS  | Attacks in groups of 5 |

#### Tier 2: Hostile Machines (Mid Game)

| Enemy              | HP  | Damage | Special Ability     |
| ------------------ | --- | ------ | ------------------- |
| **Scout Drone**    | 150 | 15 DPS | Fast movement       |
| **Sentry Bot**     | 300 | 20 DPS | Shield regeneration |
| **Destroyer Mech** | 800 | 40 DPS | Area damage         |

#### Tier 3: Alien Forces (Late Game)

| Enemy               | HP    | Damage | Special Ability  |
| ------------------- | ----- | ------ | ---------------- |
| **Voidling**        | 500   | 30 DPS | Teleport dodge   |
| **Enforcer**        | 1,200 | 50 DPS | Summons minions  |
| **Harvester Queen** | 3,000 | 80 DPS | Drains resources |

#### Boss Enemies

**Phase Boss (End of each solar system):**

- 10,000+ HP
- Multiple attack patterns
- Requires strategic drone positioning
- Drops Quantum Cores (Prestige 2 currency)
- Optional but recommended for prestige bonuses

### Wave System

- **Frequency:** Every 2-5 minutes (speeds up over time)
- **Scaling:** +15% enemy stats per wave
- **Warning System:** 30-second countdown before waves
- **Territory-Based Spawns:** Enemies spawn from unconquered territories

**Wave Rewards (Always Granted):**
Every wave defeated provides guaranteed rewards:

| Wave Tier                | Resource Drop           | Research Points | Special Drops         |
| ------------------------ | ----------------------- | --------------- | --------------------- |
| **Basic (Waves 1-10)**   | 50-100 random resources | 10-20 RP        | 5% Uncommon Component |
| **Intermediate (11-25)** | 150-300 resources       | 30-50 RP        | 10% Uncommon, 3% Rare |
| **Advanced (26-50)**     | 400-600 resources       | 60-100 RP       | 15% Uncommon, 8% Rare |
| **Elite (51+)**          | 800-1,200 resources     | 150-250 RP      | 25% Rare, 5% Exotic   |

**Individual Enemy Rewards:**

- Basic enemies: 10-20 resources
- Elite enemies: 50-100 resources + component chance
- Boss enemies: 500-1,000 resources + guaranteed rare loot + Quantum Cores

**Reward Scaling:**

- +10% resources per territory controlled
- +25% with Loot Enhancement research
- Rare drops can include: Alien Artifacts, Quantum Processors, special components

### Enemy Escalation System

**Conquest Triggers Retaliation:**

The more territory you control, the more aggressively enemies respond:

**Escalation Formula:**

```
Base Attack Frequency: 1 wave per 5 minutes
Modified Frequency = Base × (1 + (Territory Control % × 0.05))

Example:
- 0% Control: 1 wave / 5 min (baseline)
- 20% Control: 1 wave / 4 min
- 50% Control: 1 wave / 2.5 min
- 80% Control: 1 wave / 1.5 min (very aggressive!)
```

**Territory-Specific Retaliation:**

When conquering enemy nest territories:

- **Retaliation Wave** triggers immediately
- Enemy count: 2-3× normal wave size
- Includes elite enemies (25% of wave)
- Possible mini-boss spawn (10% chance)
- 5-minute warning to prepare defenses

**Enemy Faction System:**

Different map regions controlled by different factions:

- **Wildlife Faction:** Weak but numerous, frequent attacks
- **Machine Faction:** Strong, organized, slower attacks
- **Alien Faction:** Elite units, special abilities, rare attacks

Attacking one faction's territory angers that faction specifically:

- Faction Anger Level: 0-100%
- Higher anger = stronger waves from that faction
- Anger decays slowly over time (-1% per minute)
- Conquering their HQ reduces anger by 50%

**Strategic Defense Considerations:**

- Expand too fast → overwhelmed by attacks
- Expand too slow → miss resource opportunities
- Balance expansion with defense structure placement
- Use chokepoints and high ground strategically

### Defense Structures

_Note: Defense structures now use component-based crafting (see Structures section)_

| Structure            | Primary Function                | Effectiveness                 |
| -------------------- | ------------------------------- | ----------------------------- |
| **Turret**           | 25 DPS, auto-targets            | Essential for wave defense    |
| **Wall**             | 2,000 HP, blocks enemies        | Funnel enemies to kill zones  |
| **Shield Generator** | Protects area with 1,000 shield | Protect high-value structures |
| **Repair Station**   | Heals drones/structures         | Sustain prolonged battles     |

### Combat Rewards Summary

**Why Fight?**

1. **Resources:** Primary income source beyond gathering
2. **Territory:** Control more of the map for structures
3. **Progression:** Some research requires enemy data
4. **Loot:** Rare components only from enemies
5. **Challenge:** Stronger enemies = better rewards

**Risk vs. Reward:**

- Safer to stay in starting zone (slow progress)
- Expanding brings conflict (faster progress, better loot)
- Strategic players balance expansion with defense investment

---

## Prestige Systems

### Prestige Layer 1: Galactic Jump

#### Narrative

_"The enemies grow too strong. Your drones fall one by one. The ancient teleportation device offers escape—a jump to a new **galaxy** where you can rebuild. You arrive in a solar system eerily similar to your starting point, as if the universe repeats itself. Perhaps your mind simply cannot comprehend the scale, so you name it the same. You lose everything physical, but knowledge cannot be taken away."_

#### Unlock Condition

- Research "Intergalactic Teleportation" (Quantum Physics Tree)
- Craft Galactic Jump Device (500 Dark Matter, 1,000 Alien Artifacts)
- Activated manually (no forced prestige)

#### What You Lose

- All resources (reset to 0)
- All drones (destroyed)
- All structures (left behind)
- Return to starting planet in new galaxy's solar system

#### What You Keep

- All research progress (tech tree stays unlocked)
- Research blueprints (research completed faster)
- Interplanetary travel unlocks (if achieved)
- Lore fragments collected
- Achievement progress

#### Prestige Bonuses (Per Prestige)

**Base Bonuses:**

- +20% resource gathering speed (multiplicative)
- +15% research speed
- +10% drone build speed
- +5% combat effectiveness

**Milestone Bonuses:**
Calculate based on pre-prestige progress:

- +1% per 10 enemies defeated
- +5% per boss defeated
- +3% per 100K resources gathered
- +10% per complete research tree

**Example:**
First prestige with 200 enemies, 2 bosses, 500K resources, 3 trees:

- Base: 20% gather, 15% research, 10% build, 5% combat
- Milestones: +20% gather, +10% research, +15% build
- Total: 40% gather, 25% research, 25% build, 5% combat

#### Galaxy Progression

**Structure:** Each galaxy contains the same solar system layout ("Alpha Centauri"), but with fresh start:

**Within Each Galaxy:**

- **Planet 1 (Terran Prime):** Starting planet, balanced, earth-like
- **Planet 2 (Desolate Rock):** High metal deposits, robotic enemies (requires interplanetary travel)
- **Planet 3 (Frozen Moon):** Exotic resources, extreme conditions (requires advanced propulsion)

**Between Galaxies (Prestige Jumps):**

- **Galaxy 1:** Tutorial, standard difficulty
- **Galaxy 2:** Same planets/layout, fresh start, faster with bonuses
- **Galaxy 3:** Same planets/layout, even faster progression
- **Galaxy N:** Structure repeats, prestige bonuses stack

**Why Same Names?**

- Lore: Player's mind cannot comprehend galactic differences, applies familiar names
- Gameplay: Consistent structure across prestiges, focus on optimization not learning new layouts
- **Planets DO differ:** Each planet has unique bonuses/characteristics (see Planet System)

### Prestige Layer 2: Universal Anchor

#### Narrative

_"You've jumped between systems countless times, following the trail of an ancient civilization. Deep in System 7, you discover it: a Universal Anchor—a device that can link across dimensions. Activating it grants cosmic knowledge but fractures your timeline, starting everything anew... but with power beyond measure."_

#### Unlock Condition

- Complete 7+ Prestige 1 resets
- Collect 50 Quantum Cores (from boss enemies)
- Research "Universal Anchors" (final Quantum Physics unlock)
- Craft Universal Anchor (5,000 Dark Matter, 50 Quantum Cores)

#### What You Lose

- Everything from Prestige 1
- **Additionally:** All Prestige 1 bonuses reset to zero
- All solar system progress
- Return to System 1

#### What You Keep

- Research unlocks (still faster research)
- Achievement progress
- Lore fragments
- **New:** Challenge unlocks (see Challenge System)

#### Prestige 2 Bonuses (Per Prestige 2)

**Cosmic Knowledge (Permanent Upgrades):**

- +1 Prestige Point per Prestige 2
- Spend Prestige Points on permanent upgrades:
  - **Temporal Echo:** Start each run with 10% of drones from previous run
  - **Resource Resonance:** +50% to all Prestige 1 bonuses (multiplicative)
  - **Quantum Memory:** Unlock 3 research nodes automatically per run
  - **Dimensional Storage:** Keep 25% of one chosen resource type
  - **Combat Mastery:** Start with +100% combat effectiveness
  - **Ancient Wisdom:** Unlock all challenge modifiers

**Meta Progression:**

- Prestige Points accumulate infinitely
- Each upgrade costs more Prestige Points (1, 2, 4, 8, 16...)
- Max 20 upgrades per category
- Allows experimentation with different build paths

#### Endgame Goal

After multiple Prestige 2 resets, unlock final story mission:

- Face the source of the overwhelming threat
- Final boss: The Devourer (requires multiple Prestige 2 bonuses)
- "True Ending" unlocks endless mode with unique rewards

---

## Challenge System

### Challenge Mechanics

- Unlocked after first Prestige 1
- Can activate multiple challenges simultaneously
- Each challenge provides **multiplier bonus** to prestige rewards
- Challenges can be toggled at the start of each run
- More challenges = exponentially harder but better rewards

### Challenge Categories

#### 1. Resource Challenges

| Challenge           | Effect                         | Reward Multiplier |
| ------------------- | ------------------------------ | ----------------- |
| **Scarcity**        | -50% resource gathering rate   | 1.5x              |
| **Limited Storage** | Max storage capped at 1,000    | 1.3x              |
| **Energy Crisis**   | Energy generation -75%         | 2.0x              |
| **Barren World**    | No passive resource generation | 1.8x              |

#### 2. Drone Challenges

| Challenge                | Effect                                | Reward Multiplier |
| ------------------------ | ------------------------------------- | ----------------- |
| **No Drones**            | Cannot build any drones (manual only) | 3.0x              |
| **Drone Limit**          | Max 5 drones total                    | 2.5x              |
| **Expensive Automation** | Drones cost 5x resources              | 1.7x              |
| **Fragile Machines**     | Drones have 50% HP                    | 1.4x              |

#### 3. Combat Challenges

| Challenge             | Effect                            | Reward Multiplier |
| --------------------- | --------------------------------- | ----------------- |
| **Aggressive Swarms** | Enemy waves 2x as frequent        | 1.6x              |
| **Hardened Enemies**  | Enemies have 3x HP and damage     | 2.5x              |
| **No Defense**        | Cannot build defensive structures | 2.0x              |
| **Boss Rush**         | Face boss enemy every 10 waves    | 2.8x              |

#### 4. Research Challenges

| Challenge              | Effect                             | Reward Multiplier |
| ---------------------- | ---------------------------------- | ----------------- |
| **Slow Progress**      | Research speed -75%                | 1.8x              |
| **Limited Knowledge**  | Can only research 50% of tech tree | 2.2x              |
| **Expensive Research** | Research costs 3x RP               | 1.5x              |

#### 5. Special Challenges (Post-Prestige 2)

| Challenge         | Effect                                       | Reward Multiplier |
| ----------------- | -------------------------------------------- | ----------------- |
| **Time Trial**    | Must prestige within 2 hours                 | 3.5x              |
| **Pacifist Run**  | Cannot deal damage to enemies                | 4.0x              |
| **Minimalist**    | Max 3 of each drone type                     | 2.0x              |
| **Perfectionist** | Must complete all milestones before prestige | 2.5x              |

### Challenge Stacking

- Multipliers are additive: (1.5x + 2.0x = 3.5x total)
- Max 5 challenges active simultaneously
- Challenge combinations unlock special achievements
- "Challenge Master" achievement: Complete run with 5 challenges

### Challenge Rewards

Rewards apply to Prestige 1 bonuses:

- **2x multiplier** → Prestige bonuses doubled
- **3x multiplier** → Prestige bonuses tripled
- Etc.

Example: Complete run with 3.5x challenge multiplier

- Normal: +20% gathering bonus
- With challenges: +70% gathering bonus (20% × 3.5)

---

## Narrative & Lore

### Overarching Story

#### Act 1: The Awakening (Systems 1-3)

You awaken on an unknown planet with fragmented memories. Basic survival instincts kick in—gather, build, survive. Hostile wildlife attacks. You discover ancient technology scattered across the landscape, hints of a civilization that fled in terror.

**Key Revelations:**

- You're not the first to be here
- The enemies are following a pattern
- Ancient logs speak of "The Devourer"

#### Act 2: The Flight (Systems 4-7)

Each teleportation reveals more. The ancient civilization developed the teleportation network to escape an unstoppable force. They jumped from system to system, each time stronger, each time hoping to outpace their pursuer. They failed.

**Key Revelations:**

- The Devourer consumes entire solar systems
- The teleportation network spans the galaxy
- You're following the same escape route

#### Act 3: The Revelation (System 7+, Post-Prestige 2)

You discover the Universal Anchor—a device that doesn't just teleport through space, but through parallel dimensions. The ancient civilization used it as a last resort, fracturing reality to hide. You activate it, gaining cosmic knowledge, but also understanding: **you're not running from The Devourer. You're being herded.**

**Key Revelations:**

- The Devourer is intelligent, strategic
- It's been guiding you along this path
- The Universal Anchor is a trap—or is it?

#### Final Act: The Confrontation (Endgame)

With enough Prestige 2 resets and cosmic knowledge, you finally understand. The Devourer isn't evil—it's the galaxy's immune system, removing civilizations that grow too powerful. The ancient civilization tried to hide in parallel dimensions, creating the very instability that drew The Devourer. You must choose: accept defeat, continue fleeing through infinite dimensions, or find a way to prove your civilization deserves to exist.

**Multiple Endings:**

1. **Surrender Ending:** Stop prestiging, let The Devourer consume you (Bad End)
2. **Eternal Flight Ending:** Keep prestiging forever (Neutral End)
3. **Confrontation Ending:** Defeat The Devourer (requires 10+ Prestige 2, Good End)
4. **Transcendence Ending:** Merge with The Devourer, become the next guardian (requires perfect run, True End)

### Lore Delivery Methods

- **Data Logs:** Found while exploring, tell ancient civilization's story
- **Enemy Descriptions:** Provide context on threat escalation
- **Research Unlocks:** Flavor text explains technology
- **Achievement Descriptions:** Hint at deeper narrative
- **Prestige Cutscenes:** Short text-based scenes during teleportation
- **Environmental Storytelling:** Ruins, debris, signs of past battles

### Lore Fragments

Collectible items (50 total) that piece together the full story:

- **Series 1:** Ancient Civilization Origins (10 fragments)
- **Series 2:** The First Encounter (10 fragments)
- **Series 3:** The Great Flight (10 fragments)
- **Series 4:** The Universal Anchor Project (10 fragments)
- **Series 5:** The Truth About The Devourer (10 fragments)

Completing a series unlocks permanent bonus:

- Series 1: +10% research speed
- Series 2: +10% combat effectiveness
- Series 3: +10% prestige bonuses
- Series 4: Unlock special research node
- Series 5: Unlock secret ending path

---

## Progression Pacing

### Time to Milestones

#### First Playthrough (No Prestige Bonuses)

- **Tutorial Phase:** 10-15 minutes
- **First Drone:** 20 minutes
- **First Enemy Wave:** 30 minutes
- **10 Drones Active:** 1 hour
- **First Boss (Optional):** 2 hours
- **First Prestige (Recommended):** 3-4 hours
- **First Prestige (Speedrun):** 2 hours

#### Second Playthrough (With P1 Bonuses)

- **First Prestige:** 1.5-2 hours
- Progression accelerates due to bonuses

#### Prestige 1 Curve

| Prestige # | Approximate Time | Cumulative Hours |
| ---------- | ---------------- | ---------------- |
| 1          | 3 hours          | 3h               |
| 2          | 2 hours          | 5h               |
| 3          | 1.5 hours        | 6.5h             |
| 4-7        | 1 hour each      | 10.5h            |
| 8-15       | 45 min each      | 16.5h            |
| 16+        | 30 min each      | Varies           |

#### Prestige 2 Unlock

- Estimated at 15-20 hours for dedicated player
- 30-40 hours for casual play

#### Full Story Completion

- 50-60 hours for main endings
- 100+ hours for 100% completion (all lore, achievements)

### Soft Caps & Incentives

**Staying Longer vs. Prestiging:**

- Staying longer yields slightly better bonuses (diminishing returns)
- Prestiging earlier means more runs, more total bonus accumulation
- Optimal strategy: Prestige when progress slows by 70-80%

**Anti-Frustration Features:**

- Always show prestige bonus preview before activating
- "Prestige Calculator" shows optimal timing
- Auto-save every 30 seconds
- Export/import save feature
- Offline progress (up to 24 hours)

---

## UI/UX Design

### Screen Layout

```
┌─────────────────────────────────────────────────────┐
│  PANIX INCREMENTAL            [?][⚙][💾]            │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  NAVIGATION  │          MAIN CONTENT AREA          │
│              │                                      │
│ ▸ Dashboard  │  (Dynamic based on selected tab)    │
│ ▸ Map        │                                      │
│ ▸ Resources  │                                      │
│ ▸ Crafting   │                                      │
│ ▸ Drones     │                                      │
│ ▸ Structures │                                      │
│ ▸ Research   │                                      │
│ ▸ Combat     │                                      │
│ ▸ Solar Sys  │                                      │
│ ▸ Prestige   │                                      │
│ ▸ Challenges │                                      │
│ ▸ Lore       │                                      │
│              │                                      │
├──────────────┴──────────────────────────────────────┤
│  STATUS BAR                                         │
│  Wave 23 | Next: 1:45 | Control: 45% | Energy: 1,245/2,000       │
└─────────────────────────────────────────────────────┘
```

### Dashboard Tab

**Primary display when game loads:**

- Resource overview (top resources with gather rates)
- Active drones count and status by type
- Active structures count and production rates
- Territory control percentage
- Current combat status (next wave timer, faction anger levels)
- Quick actions: Craft Components, Build Drone, Research Next, View Map
- Recent notifications/achievements
- Prestige progress bar (when prestige unlocked)
- Component stockpile summary

### Map Tab

**Interactive planet map interface:**

- Full 50×50 grid display
- Zoom in/out functionality
- Filter toggles:
  - Resource deposits
  - Enemy positions
  - Territory control
  - Structure placements
- Click tile to view details
- Right-click to build/place structure
- Minimap always visible in corner
- Exploration progress indicator
- Quick-travel to points of interest

### Resources Tab

- List all resources with current amount, max storage, gather rate
- Resource icons with visual distinction
- Click resources for detailed breakdown (sources, consumption)
- Resource conversion interface (refineries)
- Storage upgrade options
- Resource history graph (production over time)

### Crafting Tab

**Component-based crafting interface:**

**Section 1: Component Library**

- All available components listed
- Current stock / Max stock
- Auto-craft toggle for each component
- Queue management

**Section 2: Active Crafting**

- Current crafting queue
- Progress bars for each item
- Cancel/priority adjustment

**Section 3: Recipes**

- Browse all unlocked recipes (drones, structures, items)
- Recipe details (required components, crafting time)
- View active recipe version (base, streamlined, etc.)
- See which challenges/buildings modify recipes

**Section 4: Crafting Automation**

- Assign crafting drones to specific components
- Set stock thresholds (auto-craft when below X)
- Resource allocation priorities

### Drones Tab

- Grid or list view of all drones
- Filter by type (Gatherer, Combat, Crafter, Research)
- **Build new drones interface:**
  - Select drone type
  - Choose configuration (standard/custom recipe)
  - View required components
  - "Build" button (grayed if components unavailable)
- Assign/reassign drones to tasks
- Drone stats and upgrade paths
- Drone automation settings
- Drone location (which map territory)

### Structures Tab

**Structure management interface:**

- List all placed structures
- Filter by type (Production, Defense, Research)
- **Build new structures:**
  - Select structure type
  - View required components
  - Click map location to place
- Structure stats and upgrade options
- Structure health/status
- Quick-jump to structure on map
- Dismantle option (50% component refund)

### Research Tab

- **Tech tree visualization (node-based graph)**
  - Nodes color-coded: unlocked (green), in-progress (yellow), locked (gray), prerequisite-missing (red)
  - Multi-prerequisite nodes show all requirements
  - Progressive research nodes marked with "No immediate unlock" tag
- Current research progress bar
- Research queue (optional feature)
- Research point generation rate breakdown
- Filter by tree (Mining, Automation, Combat, etc.)
- Lore text for each research unlock
- **Prerequisite view:** Click node to see full dependency chain

### Combat Tab

- Enemy wave countdown timer (next wave + faction)
- Faction anger levels (Wildlife/Machine/Alien)
- Current enemies on screen (simple visualization or map overlay)
- Deployed combat drones status and positioning
- Defense structure status (HP, ammo, energy)
- Enemy codex (all encountered enemies with stats and rewards)
- Boss fight interface (when active)
- **Combat stats:**
  - Enemies defeated this run
  - Total resources earned from combat
  - Highest wave survived

### Solar System Tab

**Visual solar system map:**

- Current planet highlighted
- Other planets in system (locked/unlocked)
- Planet details on hover:
  - Resource types and density
  - Enemy threat level
  - Special characteristics
  - Unlock requirements
- **Travel interface:**
  - Build Interplanetary Ship
  - Select destination planet
  - Confirm one-way travel (early game)

### Prestige Tab

- Prestige 1 section:
  - Current bonuses overview
  - Potential bonuses if prestiged now
  - Prestige calculator
  - Activate prestige button (requires confirmation)
- Prestige 2 section (locked until available):
  - Quantum Core count
  - Prestige Point allocation
  - Permanent upgrades list
- Prestige history log

### Challenges Tab

- List of all unlocked challenges
- Challenge descriptions and reward multipliers
- Toggle challenges on/off
- Active challenges display
- Challenge achievement progress

### Lore Tab

- Collected lore fragments
- Story synopsis
- Enemy codex
- Achievement list
- Statistics (total resources gathered, enemies defeated, etc.)

### Visual Design Principles

- **Clean and readable:** Dark theme with high contrast
- **Sci-fi aesthetic:** Blues, purples, teals
- **Minimal animations:** Smooth but not distracting
- **Mobile-friendly:** Responsive design for smaller screens
- **Accessibility:** Colorblind modes, text scaling options

### Sound Design (Optional)

- Ambient background music (space/sci-fi theme)
- Sound effects: drone building, resource collection, combat
- Notification sounds for waves, prestige availability
- Mute/volume controls

---

## Technical Requirements

### Technology Stack

**Frontend:**

- HTML5, CSS3, JavaScript (ES6+)
- Optional: React or Vue.js for component-based architecture
- LocalStorage for save data
- Responsive design (mobile and desktop)

**Backend (Optional for future multiplayer/leaderboards):**

- Node.js with Express
- Database: MongoDB or PostgreSQL

### Performance Requirements

- 60 FPS on modern browsers
- Low memory footprint (<200MB)
- Efficient game loop (requestAnimationFrame)
- Optimized calculations (caching, delta time)

### Save System

- Auto-save every 30 seconds
- Manual save button
- Export save as JSON string
- Import save from JSON
- Cloud save (future feature)

### Offline Progress

- Calculate progress when player returns
- Max 24 hours of offline time counted
- Reduced rates for offline progress (50% efficiency)
- Notification on return showing offline gains

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Development Roadmap

### Phase 1: Core Mechanics (MVP)

**Estimated Time:** 4-6 weeks

- Basic resource gathering (manual clicking)
- First drone type (gatherers)
- Simple research tree (5-10 nodes)
- Basic enemy waves
- First prestige implementation
- Save/load system

### Phase 2: Automation & Combat

**Estimated Time:** 4-6 weeks

- All drone types functional
- Complete research tree
- Full combat system with enemy variety
- Defense structures
- Challenge system basics
- UI polish

### Phase 3: Prestige & Progression

**Estimated Time:** 4-6 weeks

- Prestige 2 implementation
- Multiple solar systems
- Boss fights
- Lore system complete
- All challenges implemented
- Balance tuning

### Phase 4: Polish & Content

**Estimated Time:** 2-4 weeks

- Additional solar systems
- More lore fragments
- Achievement system
- Sound effects and music
- Mobile optimization
- Tutorial improvements

### Phase 5: Endgame & Story

**Estimated Time:** 2-3 weeks

- Final boss fight
- Multiple endings
- True ending requirements
- Endless mode
- Leaderboards (optional)

### Post-Launch

- Bug fixes and balance updates
- Community feedback integration
- Potential DLC/expansion content
- Multiplayer/social features exploration

---

## Success Metrics

### Player Retention Goals

- **Day 1 Retention:** 40%
- **Day 7 Retention:** 20%
- **Day 30 Retention:** 10%

### Engagement Metrics

- Average session length: 30-45 minutes
- Average time to first prestige: 3-4 hours
- Percentage reaching Prestige 2: 30%
- Percentage completing story: 15%

### Monetization (If Applicable)

- Completely free to play (no ads)
- Optional donations for development support
- No pay-to-win mechanics
- Possible cosmetic items (visual drone skins)

---

## Open Questions & Future Considerations

1. **Multiplayer Features?**

   - Leaderboards for fastest prestige times?
   - Guild system for shared challenges?
   - Trading system for resources?

2. **Mobile App?**

   - Native iOS/Android apps vs. web-only?
   - Push notifications for waves/prestige ready?

3. **Expanded Content?**

   - Seasonal events with unique challenges?
   - New enemy types post-launch?
   - Additional prestige layers?

4. **Modding Support?**

   - Allow community to create custom challenges?
   - Custom solar systems?

5. **Accessibility Features?**
   - Screen reader support?
   - Keyboard-only controls?
   - Difficulty options for combat?

---

## Version History

**v0.2 - December 29, 2025**

- **MAJOR UPDATE: Component-Based Crafting System**
  - Multi-part crafting for all drones and structures
  - Designer-controlled recipes (not player-editable)
  - Recipe modifications via challenges and progression
  - Component stockpile management
  - Crafting drones for automation
  - Complex multi-tier crafting chains
  - Bulk production through building upgrades
- **NEW: Refining System**
  - Continuous passive resource conversion
  - Refined materials can also drop from enemies
  - Separate from crafting (different buildings/mechanics)
  - Refinery drones for material transport automation
- **NEW: Structures & Buildings System**
  - Production structures (Mining Rigs, Deforestation Stations, Refineries)
  - Defense structures (Turrets, Walls, Shield Generators, Repair Stations)
  - Research structures (Labs, Quantum Scanners)
  - Component-based building requirements
- **NEW: Map & Exploration System**
  - 50×50 grid-based planet maps
  - Fog of war and exploration mechanics
  - Territory control system
  - Multiple tile types (resource deposits, terrain, strategic locations)
  - Solar System UI for interplanetary travel
  - Visual planet characteristics before travel
- **ENHANCED: Research System**
  - Multi-prerequisite research nodes
  - Progressive research (some unlock nothing immediately)
  - Gateway research requiring multiple tree completion
  - More complex research dependencies
- **ENHANCED: Combat System**
  - Always-rewarding combat (guaranteed resource drops)
  - Wave rewards scale with difficulty
  - Individual enemy loot drops (including refined materials)
  - Enemy escalation based on territory conquest
  - Faction anger system
  - Retaliation waves for aggressive expansion
  - Strategic risk/reward for conquest speed
- **ENHANCED: Prestige System**
  - Prestige = Jump to new **galaxy** (not just solar system)
  - Each galaxy has same solar system structure ("Alpha Centauri")
  - Lore explanation for repeated names (mind cannot comprehend scale)
  - Planets within systems provide progression without prestige
  - Interplanetary travel unlocks persist across prestiges
- **UPDATED: All drone types now use component-based crafting**
- **UPDATED: UI/UX expanded with Map, Crafting, Structures, Solar System tabs**

**v0.1 - December 28, 2025**

- Initial GDD draft
- Core gameplay loops defined
- Dual prestige system outlined
- Challenge system designed
- Narrative structure created

---

## Credits & Notes

**Design:** Robin Lorenz  
**Inspirations:** Cookie Clicker, Incremental Epic Hero, Universal Paperclips, Kittens Game, Factorio (crafting/refining), Civilization (territory control)

**Design Philosophy:**
This game aims to respect the player's time while providing deep, engaging progression. Every mechanic serves the narrative, and every prestige feels earned and meaningful. The component-based crafting and refining systems add satisfying complexity and automation depth, with crafting providing unique components and refining offering continuous resource conversion (with enemy loot overlap for strategic choice). The map system provides strategic territorial gameplay, while the always-rewarding combat ensures fighting enemies is valuable. Recipes are designer-controlled but can be simplified through challenges and progression milestones. The galaxy-based prestige system with repeating solar system structure allows for consistent optimization across prestiges. The challenge system allows players to customize difficulty, and the dual-prestige structure provides both short-term and long-term goals.

---

_End of Game Design Document_
