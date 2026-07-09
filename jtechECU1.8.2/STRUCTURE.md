# JTECH HX3 — App Structure
**v0.2.1**

---

## Directory Tree

```
jtechECU/
├── README.md
├── CHANGELOG.md
├── STRUCTURE.md                          ← this file
│
├── lua/
│   └── vehicle/
│       ├── extensions/
│       │   └── auto/
│       │       ├── jtechECU.lua          ← VE extension (auto-loads on vehicle spawn)
│       │       └── jtechLoader.lua       ← loads combustionEngineAdvanced
│       └── powertrain/
│           ├── combustionEngineAdvanced.lua
│           └── combustionEngineThermalsAdvanced.lua
│
└── ui/
    └── modules/
        └── apps/
            └── jtechECU/
                ├── app.js                ← all UI logic, CSS, and HTML template
                ├── app.json              ← BeamNG app metadata
                ├── logo-header.png       ← header bar logo
                └── main-logo@2x.png      ← splash screen logo
```

---

## File Responsibilities

### `lua/vehicle/extensions/auto/jtechECU.lua`
The core VE extension. Auto-loads when any vehicle spawns.

| Function | Purpose |
|---|---|
| `onInit()` | Logs load, triggers jtechSave load via GE queue |
| `updateGFX(dt)` | Fires every graphics frame — reads RPM/TPS, looks up fuel map, sets `eng.targetAfr` |
| `getStatus()` | Returns sensor snapshot to UI: rpm, tps, afr, effAfr, boost, gear, temps, fuel, load, multiplier, fuelMap, ignitionLevel |
| `setFuelMap(newMap)` | Receives updated map from UI, writes values into local `fuelMap` table |
| `getTuneData()` | Returns `{ fuelMap }` for save system (future) |

**Key locals:**
- `fuelMap` — 6×6 table keyed by RPM, indexed by load breakpoint
- `rpmBreaks` — `{1000, 2000, 3000, 4000, 5000, 6000}`
- `loadBreaks` — `{0, 20, 40, 60, 80, 100}`
- `currentMultiplier` — last looked-up multiplier value
- `engineDevice` — cached reference to `mainEngine` powertrain device

---

### `lua/vehicle/extensions/auto/jtechLoader.lua`
Loads `combustionEngineAdvanced` into the powertrain at vehicle spawn. Required for `eng.targetAfr` to exist.

---

### `lua/vehicle/powertrain/combustionEngineAdvanced.lua`
BeamNG's advanced combustion engine module. Bundled under bCDDL license. Provides `targetAfr` field used by `jtechECU.lua`.

---

### `ui/modules/apps/jtechECU/app.js`
Single-file UI. All CSS is inline in a `<style>` tag (BeamNG CEF blocks external stylesheets).

**Directive:** `jtechEcu` → HTML element `<jtech-ecu>`

**Scope state:**
| Variable | Type | Purpose |
|---|---|---|
| `activeTab` | string | Current tab: dash/fuel/timing/boost/safe/setup/logs |
| `editMode` | bool | Fuel map edit mode active |
| `mapVisible` | bool | Fuel map section expanded |
| `booting` | bool | Splash screen active |
| `rpm, tps, afr, effAfr...` | number | Live sensor values |

**Key functions:**
| Function | Purpose |
|---|---|
| `startBoot()` | Shows splash, runs progress bar, hides after 2s |
| `showStandby()` | Shows splash in standby state (ignition off) |
| `renderMap()` | Rebuilds fuel map grid DOM from `mapData` |
| `initMapData(luaMap)` | Populates `mapData` from Lua map on first load |
| `pushMapToLua()` | Serializes `mapData` as Lua table string, sends via `activeObjectLua` |
| `updateDOM(data)` | Updates all gauge text and bar elements |
| `toggleMode()` | Switches between monitor and edit mode |
| `toggleMap()` | Collapses/expands fuel map section |
| `applyAbsolute()` | Applies SET input value to all selected cells |
| `onCellMouseDown/Enter/DblClick` | Cell selection and drag logic |
| `commitInlineInput()` | Saves double-click typed value to `mapData` |
| `updateEditBar()` | Syncs edit bar info text with current selection state |

**Poll loop:** `setInterval` at 200ms — calls `extensions.auto_jtechECU.getStatus()` via `bngApi.activeObjectLua`

**Ignition logic in poll:**
```
ignitionLevel 0 → showStandby()
ignitionLevel >0 (was 0) → startBoot()
ignitionLevel >0 (already booted) → normal update
```

---

### `ui/modules/apps/jtechECU/app.json`
```json
{
  "name": "JTECH HX3",
  "author": "JTECH Performance",
  "version": "0.2.1",
  "directive": "jtechEcu",
  "categories": ["debug"],
  "width": 600,
  "height": 800,
  "icon": "logo-header.png"
}
```

---

## Data Flow

```
BeamNG Physics
     │
     ▼
jtechECU.lua (updateGFX, every frame)
  - reads electrics.values.*
  - reads engineDevice.lastAfr / lastEffAfr
  - looks up fuelMap[rpm][loadIdx]
  - sets engineDevice.targetAfr = 14.7 / multiplier
     │
     │  (200ms poll via bngApi.activeObjectLua)
     ▼
app.js
  - receives getStatus() snapshot
  - checks ignitionLevel → splash state machine
  - updates scope variables
  - calls updateDOM() → sets text/bar elements
  - calls renderMap() if on fuel tab
     │
     │  (on map edit, via bngApi.activeObjectLua)
     ▼
jtechECU.lua setFuelMap()
  - writes new values into fuelMap table
  - takes effect next updateGFX frame
```

---

## Planned Features

- [ ] Save/load named tune profiles (JSON export/import)
- [ ] TIMING tab — ignition advance map
- [ ] BOOST tab — wastegate control, anti-lag
- [ ] SAFE tab — rev limiter (3-step), launch control, traction control, engine protection
- [ ] SETUP tab — base configuration
- [ ] LOGS tab — fault codes, event log
- [ ] DYNO tab — power/torque curve capture
- [ ] COMPARE tab — tune comparison
- [ ] Flex fuel map (E85/methanol/nitro blending)
- [ ] Warm-up enrichment curve
- [ ] Cold start map
- [ ] ECU damage state tied to BeamNG damage system
- [ ] Knock detection proxy via engine wear rate
