# JTECH Performance — HX3 ECU Display & Tuning Mod
**Version 1.8.2** | BeamNG.drive | by JTECH Performance

---

## Overview

The JTECH HX3 is an in-game ECU display and live tuning interface for BeamNG.drive. It simulates a real aftermarket ECU system — monitoring engine sensors in real time, allowing direct map editing while the vehicle is running, and enforcing feature access through a hardware tier model that mirrors a real ECU product line.

This mod is the flagship product of the JTECH Performance ecosystem, a fictional American drag racing company founded by Jesse Harmon out of Atkins, Iowa. The brand's reputation was built on a Cedar Rapids to St. Louis drag-and-drive event run entirely on a self-built tune.

---

## For Users

### Requirements
- BeamNG.drive (current version)
- A vehicle with a compatible combustion engine
- The `combustionEngineAdvanced` powertrain module (bundled with this mod)

### Installation
1. Place the `jtechECU` folder into your BeamNG mods directory:
   ```
   C:\Users\<you>\AppData\Local\BeamNG\BeamNG.drive\current\mods\unpacked\
   ```
2. Launch BeamNG.drive
3. Spawn a vehicle with a JTECH R-Series ECU part equipped (or run in stock-ECU monitor mode)
4. Open the app menu and add the **JTECH HX3** app to your HUD

---

## Hardware Tiers

JTECH ECU functionality is gated by two independent hardware product lines:

### R-Series ECUs
Controls which maps are editable and which features are unlocked.

| Tier | Part | Access |
|---|---|---|
| R0 | Stock ECU | DASH read-only |
| R1 | JTECH R1 | DASH + SAFE + SETUP |
| R2 | JTECH R2 | + FUEL + BOOST editing |
| R3 | JTECH R3 | Full access including TIMING |

R-Series parts are equipped via the vehicle parts selector on compatible vehicles.

### HX-Series Displays
The physical display unit. The HX3 is the primary in-game display; HX Compact and HX Wide are companion hardware products.

---

## Tabs

| Tab | Access | Description |
|---|---|---|
| **DASH** | All tiers | Live sensor readout — RPM, TPS, AFR, boost, gear, speed, water temp, oil temp, oil pressure, fuel level, engine load, fuel multiplier |
| **FUEL** | R2+ | Fuel map editor (RPM × load). Monitor mode tracks your live cell. Edit mode allows real-time map changes |
| **TIMING** | R3 | Ignition timing advance map editor |
| **BOOST** | R2+ | Boost target and wastegate control map |
| **SAFE** | R1+ | Engine protection thresholds — EGT, knock, AFR lean/rich fault actions, boost overrun |
| **SETUP** | R1+ | ECU configuration — ECU name, transmission type, feature toggles |
| **LIMITERS** | R1+ | Launch control, 3-step boost threshold, soft/hard rev limiting |
| **LOGS** | R2+ | 17-channel telemetry ring buffer with HTML export |
| **SUGGEST** | R2+ | Client-side Tune Advisor rule engine |
| **LEARN** | All tiers | Tuning guides and reference articles |

Locked tabs display an upgrade overlay with tier messaging.

---

## Fuel Map Editing
1. Switch to the **FUEL** tab
2. Click **MONITOR** to toggle into **EDIT MODE**
3. Click a cell to select it, or click and drag to select a range
4. Adjust values with:
   - `+` / `-` keys — increment or decrement by 0.1
   - `↑` / `↓` arrow keys — same as above
   - Double-click a cell to type a value directly
   - Type a value in the bottom bar and press **SET** for absolute input
5. Changes are applied to the engine in real time

Multiplier values: `1.0` = stock fueling. `>1.0` = richer. `<1.0` = leaner. Range is `0.0` to `5.0`.

The same editing pattern applies to the TIMING and BOOST maps on R3 and R2+ hardware respectively.

---

## Ignition Behavior
The display wakes up with the car. With ignition off it shows the standby screen. Turn the key and the unit boots with a progress bar before displaying live data.

---

## For Developers

### File Structure

```
jtechECU/
├── lua/
│   └── vehicle/
│       ├── extensions/
│       │   └── auto/
│       │       ├── jtechECU.lua          # VE extension — sensor polling, map logic, updateGFX hook
│       │       ├── jtechLoader.lua       # Loads combustionEngineAdvanced; detects R-Series tier
│       │       ├── jtechSave.lua         # Tune persistence (save/load)
│       │       ├── jtechLogger.lua       # VE-side telemetry ring buffer (LOGS tab)
│       │       └── jtechTurbo.lua        # Boost/wastegate control logic
│       ├── ge/
│       │   └── extensions/
│       │       └── jtechLoggerGE.lua     # GE-side logger coordinator
│       ├── powertrain/
│       │   ├── combustionEngineAdvanced.lua         # Advanced engine module (bCDDL license)
│       │   └── combustionEngineThermalsAdvanced.lua # Thermals companion module
│       └── (future: per-vehicle JBeam slot files for non-BX vehicles)
├── vehicles/
│   └── bx/
│       └── jtech_ecu_parts.jbeam         # R1/R2/R3 parts slotting into bx_engine_ecu_i4
├── ui/
│   └── modules/
│       └── apps/
│           └── jtechECU/
│               ├── app.js                # AngularJS directive — all UI logic and DOM rendering
│               ├── app.json              # App metadata (name, directive, dimensions, icon)
│               ├── logo-header.png       # Header bar logo
│               └── main-logo@2x.png     # Splash screen logo
└── README.md
```

### Architecture

This mod uses BeamNG's three-context architecture:

| Context | Role |
|---|---|
| VE (Vehicle Engine) | `jtechECU.lua` runs every frame via `updateGFX`, reads sensors, applies `targetAfr`. `jtechLoader.lua` detects hardware tier via `v.data.slotPartMap` scan and writes `electrics.values.jtechRTier` |
| UI (CEF/AngularJS) | `app.js` polls VE every 200ms via `bngApi.activeObjectLua`, renders DOM directly, enforces tab access by tier |
| GE (Game Engine) | `jtechLoggerGE.lua` coordinates log export. `guihooks.trigger` is GE-only — VE routes through `obj:queueGameEngineLua` |

### Hardware Tier Detection

Tier is detected in `jtechLoader.lua` on `onInit` and `onReset` by scanning `v.data.slotPartMap` for a key matching the pattern `jtech_r%d`. The result is written to `electrics.values.jtechRTier` (0–3) and exposed in the `getStatus()` payload. The UI reads this value and applies tab overlays accordingly.

### Key Technical Notes

- **`updateGFX` not `onUpdateGFX`** — BeamNG's hook name for the graphics-step callback
- **`auto/` subdirectory** — VE extensions that auto-load must live in `extensions/auto/`
- **`eng.targetAfr`** — the correct intervention point for fuel control. Only exists when `combustionEngineAdvanced` is active. Formula: `targetAfr = 14.7 / multiplier`
- **`applyTune` tier gating** — map application is gated per-map by tier (R2 for fuel/boost, R3 for timing); a toast fires when maps are skipped due to insufficient tier
- **CEF blocks external CSS and Google Fonts** — all styles are inline in the `<style>` tag inside `app.js`. JetBrains Mono is loaded via inline `@font-face`
- **`<select>` elements are unreliable in CEF** — button-group replacements are used throughout
- **`activeObjectLua` requires Lua table syntax** — not JSON. Structured data uses a `serializeToLua` helper
- **`guihooks.trigger` is GE-only** — VE extensions must route UI events through `obj:queueGameEngineLua`
- **AFR source** — `engineDevice.lastAfr` / `engineDevice.lastEffAfr` read directly from the powertrain device
- **`twoStepLaunch` controller** — the native BeamNG controller overrides custom launch logic and is unloaded at init via `controller.unloadControllerExternal('twoStepLaunch')`
- **Log export** — BeamNG's GE Lua sandbox blocks `os.execute` and `io.open`; log export uses client-side JS Blob download

### Brand Identity

| Token | Hex | Use |
|---|---|---|
| Teal | `#00C9A7` | Primary accent, live data, active states |
| Redline | `#E8442A` | Alerts, error states, redline indicators |
| Off-white | `#F2F0EB` | Primary text |
| Dark BG | `#0B0D10` / `#0E1118` | Base backgrounds |
| Typeface | JetBrains Mono | All UI text |

### Header Format

The HX3 header displays: `HX3 · R# · ecuName` when a JTECH ECU part is equipped, or `HX3 · STOCK ECU` when running on a stock vehicle.

---

## License

`combustionEngineAdvanced.lua` and `combustionEngineThermalsAdvanced.lua` are distributed under the **BeamNG Community Derivative Distribution License (bCDDL)**. All other files are copyright JTECH Performance.
