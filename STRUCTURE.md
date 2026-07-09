# JTECH HX3 — App Structure
**v1.8.2**

---

## Directory Tree

```
jtechECU/
├── README.md
├── CHANGELOG.md
├── STRUCTURE.md                                  ← this file
│
├── lua/
│   ├── vehicle/
│   │   ├── extensions/
│   │   │   └── auto/
│   │   │       ├── jtechECU.lua                  ← VE extension — sensor polling, map logic, engine protection
│   │   │       ├── jtechLoader.lua               ← loads combustionEngineAdvanced; detects R-Series hardware tier
│   │   │       ├── jtechSave.lua                 ← tune persistence (save/load named profiles)
│   │   │       ├── jtechLogger.lua               ← VE-side telemetry ring buffer (LOGS tab)
│   │   │       └── jtechTurbo.lua                ← boost/wastegate control logic
│   │   └── powertrain/
│   │       ├── combustionEngineAdvanced.lua       ← advanced engine module (bCDDL license)
│   │       └── combustionEngineThermalsAdvanced.lua
│   │
│   └── ge/
│       └── extensions/
│           └── jtechLoggerGE.lua                 ← GE-side log export coordinator
│
├── vehicles/
│   └── bx/
│       └── jtech_ecu_parts.jbeam                 ← R1/R2/R3 parts slotting into bx_engine_ecu_i4
│
└── ui/
    └── modules/
        └── apps/
            └── jtechECU/
                ├── app.js                        ← AngularJS directive — all UI logic, CSS, HTML template
                ├── app.json                      ← BeamNG app metadata
                ├── logo-header.png               ← header bar logo
                └── main-logo@2x.png              ← splash screen logo
```

---

## File Responsibilities

### `lua/vehicle/extensions/auto/jtechECU.lua`
The core VE extension. Auto-loads on vehicle spawn via the `auto/` directory convention.

| Function | Purpose |
|---|---|
| `onInit()` | Initialises state, caches engine device reference, queues tune load via GE |
| `updateGFX(dt)` | Fires every graphics frame — reads sensors, looks up active maps, writes `eng.targetAfr`, runs engine protection checks |
| `getStatus()` | Returns full sensor + config snapshot to UI: rpm, tps, afr, effAfr, boost, gear, temps, fuel, load, multiplier, all map tables, ignitionLevel, rTier, ecuName, fault states |
| `setFuelMap(newMap)` | Receives updated fuel map from UI, writes into local table |
| `setTimingMap(newMap)` | Receives updated timing advance map from UI |
| `setBoostMap(newMap)` | Receives updated boost target map from UI |
| `applyTune()` | Applies all maps to engine; gates per-map by rTier (R2 for fuel/boost, R3 for timing); fires toast when maps are skipped |
| `updateSafeSettings(s)` | Writes engine protection thresholds (EGT, knock, AFR, boost overrun) and fault actions to `electrics.values` outputs |
| `updateSetupSettings(s)` | Writes ECU name, transmission type, and feature toggle state |
| `updateLimiters(s)` | Writes launch control RPM, 3-step boost threshold, soft/hard rev limiter targets |
| `getTuneData()` | Returns `{ fuelMap, timingMap, boostMap, safeSettings, setupSettings }` for save system |

**Key locals:**
- `fuelMap` — RPM × load multiplier table
- `timingMap` — RPM × load ignition advance table
- `boostMap` — RPM × load boost target table
- `rpmBreaks` — RPM row breakpoints
- `loadBreaks` — load column breakpoints
- `currentMultiplier` — last looked-up fuel multiplier
- `engineDevice` — cached reference to `combustionEngineAdvanced` powertrain device
- `jtechEGT`, `jtechKnockLevel` — derived/simulated EGT and knock values written to `electrics.values`

---

### `lua/vehicle/extensions/auto/jtechLoader.lua`
Loads `combustionEngineAdvanced` into the powertrain at vehicle spawn. Also responsible for hardware tier detection and controller management.

| Function | Purpose |
|---|---|
| `loadAdvancedEngine()` | Patches `combustionEngine` → `combustionEngineAdvanced`, loads `auto_jtechECU`, unloads `twoStepLaunch` |
| `detectHardwareTiers()` | Scans `v.data.slotPartMap` for a key matching `jtech_r%d`; writes result to `electrics.values.jtechRTier` (0–3) |
| `onInit()` / `onReset()` | Calls both of the above on spawn and reset |

**Notes:**
- `twoStepLaunch` must be unloaded — the native BeamNG controller overrides custom launch logic
- `controller.resetSecondStage()` is intentionally not called (causes gearbox crash)
- Tier is re-detected on every reset so part swaps mid-session take effect

---

### `lua/vehicle/extensions/auto/jtechSave.lua`
Handles named tune profile persistence. Serialises and deserialises all map and settings data via the GE context (BeamNG's GE sandbox blocks direct file I/O from VE).

---

### `lua/vehicle/extensions/auto/jtechLogger.lua`
VE-side telemetry ring buffer. Captures 17 channels at configurable sample rate and holds them in memory for the LOGS tab. Exposes `getLogBuffer()` for UI polling.

**Logged channels:** RPM, TPS, AFR, Eff. AFR, Boost, Gear, Speed, Water Temp, Oil Temp, Oil Pressure, Fuel Level, Engine Load, Fuel Multiplier, IGN Advance, Knock Level, EGT, Timestamp

---

### `lua/vehicle/extensions/auto/jtechTurbo.lua`
Boost and wastegate control logic. Reads the boost target map and applies wastegate duty cycle adjustments via `electrics.values`.

---

### `lua/ge/extensions/jtechLoggerGE.lua`
GE-side coordinator for LOGS tab HTML export. Receives log buffer data from VE via `obj:queueGameEngineLua`, assembles the HTML document, and triggers a client-side Blob download in the UI. Direct file I/O (`io.open`) is not used — BeamNG's GE sandbox blocks it.

---

### `vehicles/bx/jtech_ecu_parts.jbeam`
Defines the R1, R2, and R3 ECU parts for the Ibishu 200BX. Each part slots into `bx_engine_ecu_i4` and carries a part name matching the pattern `jtech_r#` for tier detection.

---

### `lua/vehicle/powertrain/combustionEngineAdvanced.lua`
BeamNG's advanced combustion engine module. Bundled under bCDDL license. Provides `targetAfr` and extended thermal/load fields used by `jtechECU.lua`.

---

### `ui/modules/apps/jtechECU/app.js`
Single-file UI. All CSS is inline in a `<style>` tag (BeamNG CEF blocks external stylesheets and Google Fonts). JetBrains Mono loaded via inline `@font-face`. `<select>` elements are not used — CEF renders them unreliably; button-groups are used throughout.

**Directive:** `jtechEcu` → HTML element `<jtech-ecu>`

**Scope state:**

| Variable | Type | Purpose |
|---|---|---|
| `activeTab` | string | Current tab: `dash/fuel/timing/boost/safe/setup/limiters/logs/suggest/learn` |
| `editMode` | bool | Map edit mode active |
| `booting` | bool | Splash / boot sequence active |
| `rTier` | number | R-Series tier (0–3) from `getStatus()` — controls tab overlays |
| `ecuName` | string | User-configured ECU name shown in header |
| `rpm, tps, afr, effAfr, boost, gear...` | number | Live sensor values |
| `fuelMap, timingMap, boostMap` | array | Active map tables |
| `selectedCells` | array | Current cell selection for edit operations |

**Tab access gating:**
Tab overlays are applied in the template based on `rTier`. The `COMING_SOON_TABS` array pattern is used for deferred tabs (DYNO). Locked tabs display an upgrade overlay with tier messaging; no underlying functionality is exposed.

**Key functions:**

| Function | Purpose |
|---|---|
| `startBoot()` | Shows splash, runs progress bar, transitions to live view |
| `showStandby()` | Shows splash in standby state (ignition off) |
| `renderMap(mapType)` | Rebuilds map grid DOM from the relevant map table |
| `initMapData(luaMap, mapType)` | Populates map tables from Lua payload on first load |
| `pushMapToLua(mapType)` | Serialises map as Lua table string via `serializeToLua`, sends via `activeObjectLua` |
| `applyTune()` | Calls `auto_jtechECU.applyTune()` — server-side gating applies |
| `updateDOM(data)` | Updates all gauge text and bar elements from status snapshot |
| `toggleEditMode()` | Switches between monitor and edit mode; blocked by tier |
| `applyAbsolute()` | Applies SET input value to all selected cells |
| `onCellMouseDown/Enter/Up` | Cell selection and drag logic |
| `commitInlineInput()` | Saves double-click typed value to map table |
| `updateEditBar()` | Syncs edit bar info text with current selection state |
| `exportLogs()` | Triggers Blob download of HTML log report |

**Poll loop:** `setInterval` at 200ms — calls `extensions.auto_jtechECU.getStatus()` via `bngApi.activeObjectLua`

**Ignition logic in poll:**
```
ignitionLevel 0  → showStandby()
ignitionLevel >0 (was 0)  → startBoot()
ignitionLevel >0 (already booted)  → normal update cycle
```

**Header format:** `HX3 · R# · ecuName` when a JTECH ECU part is equipped; `HX3 · STOCK ECU` on a stock vehicle.

---

### `ui/modules/apps/jtechECU/app.json`
```json
{
  "name": "JTECH HX3",
  "author": "JTECH Performance",
  "version": "1.8.2",
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
jtechECU.lua  (updateGFX, every graphics frame)
  ├─ reads electrics.values.* (rpm, tps, boost, gear, temps, fuel...)
  ├─ reads engineDevice.lastAfr / lastEffAfr
  ├─ looks up fuelMap[rpmBin][loadBin] → currentMultiplier
  ├─ sets engineDevice.targetAfr = 14.7 / currentMultiplier
  ├─ applies timing and boost map outputs
  ├─ derives jtechEGT and jtechKnockLevel → electrics.values
  └─ runs engine protection fault checks → electrics.values outputs
     │
     │  (200ms poll via bngApi.activeObjectLua)
     ▼
app.js
  ├─ receives getStatus() snapshot
  ├─ reads rTier → applies tab overlay state
  ├─ checks ignitionLevel → splash state machine
  ├─ updates scope variables
  ├─ calls updateDOM() → updates gauges, bars, status lines
  └─ calls renderMap() if on an active map tab
     │
     │  (on map edit, via bngApi.activeObjectLua)
     ▼
jtechECU.lua  setFuelMap() / setTimingMap() / setBoostMap()
  └─ writes new values into map table → takes effect next updateGFX frame
     │
     │  (on log export, via obj:queueGameEngineLua)
     ▼
jtechLoggerGE.lua
  └─ assembles HTML report → triggers Blob download in UI
```

---

## Electrics Bus Keys (JTECH-namespaced)

| Key | Written by | Read by | Purpose |
|---|---|---|---|
| `jtechRTier` | `jtechLoader.lua` | `app.js` | R-Series hardware tier (0–3) |
| `jtechEGT` | `jtechECU.lua` | `app.js`, SAFE fault logic | Simulated exhaust gas temperature |
| `jtechKnockLevel` | `jtechECU.lua` | `app.js`, SAFE fault logic | Simulated knock level |
| `jtechLaunchActive` | `jtechECU.lua` | `jtechTurbo.lua` | Launch control state flag |
| `jtechFaultEGT` | `jtechECU.lua` | `app.js` | EGT fault active flag |
| `jtechFaultKnock` | `jtechECU.lua` | `app.js` | Knock fault active flag |
| `jtechFaultAFR` | `jtechECU.lua` | `app.js` | AFR lean fault active flag |
| `jtechFaultBoost` | `jtechECU.lua` | `app.js` | Boost overrun fault active flag |

---

## Planned / In Progress

- [ ] AFR fault threshold in `getStatus()` (lean/rich out-of-range) — SAFE tab
- [ ] Fix Lua syntax error at line 142 in `jtechECU.lua` (missing comma in table definition)
- [ ] Dynamic map dimensions (10 RPM rows × 10 load columns)
- [ ] EGT + knock DASH readout and WARN-tier status line (R2+ gating)
- [ ] Sidebar UI restructure — grouped left-nav replacing flat tab bar
- [ ] LIMITERS auto-set on spawn from vehicle actual specs
- [ ] Per-engine-type EGT and protection defaults (SAFE tab)
- [ ] HX display unit JBeam slot detection (deferred — 3D model pending)
- [ ] PGP / CEEP third-party engine compatibility (slot type + device name fix)
- [ ] DYNO tab
- [ ] LOGS tab in-app modal viewer
- [ ] Tune Compare tab
- [ ] Nitrous tab
- [ ] Tune export / import (JSON)
- [ ] Garage tuning menu two-way sync
- [ ] Additional vehicle JBeam slot files beyond the Ibishu 200BX
