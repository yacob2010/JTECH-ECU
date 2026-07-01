# JTECH Performance — HX3 ECU Display & Tuning Mod
**Version 0.2.1** | BeamNG.drive | by JTECH Performance

---

## Overview

The JTECH HX3 is an in-game ECU display and live tuning interface for BeamNG.drive. It simulates a real aftermarket ECU unit — monitoring engine sensors in real time and allowing direct fuel map editing while the vehicle is running.

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
3. Spawn a vehicle
4. Open the app menu and add the **JTECH HX3** app to your HUD

### How to Use

**DASH tab** — Live sensor readout. Shows RPM, TPS, AFR, boost, gear, speed, water temp, oil temp, oil pressure, fuel level, engine load, and fuel multiplier.

**FUEL tab** — Fuel map editor. Shows the active multiplier table (RPM vs load). In monitor mode, the live cell tracks your current operating point on the map. Switch to edit mode to modify cells.

**Ignition behavior** — The display wakes up with the car. With ignition off it shows the standby screen. Turn the key and the unit boots with a progress bar before displaying live data.

### Fuel Map Editing
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

---

## For Developers

### File Structure

```
jtechECU/
├── lua/
│   └── vehicle/
│       ├── extensions/
│       │   └── auto/
│       │       ├── jtechECU.lua          # VE extension — sensor polling, fuel map logic, updateGFX hook
│       │       └── jtechLoader.lua       # Loads combustionEngineAdvanced at vehicle spawn
│       └── powertrain/
│           ├── combustionEngineAdvanced.lua         # Advanced engine module (bCDDL license)
│           └── combustionEngineThermalsAdvanced.lua # Thermals companion module
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
| VE (Vehicle Engine) | `jtechECU.lua` runs every frame via `updateGFX`, reads sensors, applies `targetAfr` |
| UI (CEF/AngularJS) | `app.js` polls VE every 200ms via `bngApi.activeObjectLua`, renders DOM directly |
| GE (Game Engine) | Not used for core loop — reserved for future save/load system |

### Key Technical Notes

- **`updateGFX` not `onUpdateGFX`** — BeamNG's hook name for the graphics-step callback
- **`auto/` subdirectory** — VE extensions that auto-load must live in `extensions/auto/`, not just use an `auto_` prefix
- **`eng.targetAfr`** — the correct intervention point for fuel control. Only exists when `combustionEngineAdvanced` is active. Formula: `targetAfr = 14.7 / multiplier`
- **CEF blocks external CSS** — all styles are inline in the `<style>` tag inside `app.js`. No external stylesheets load
- **`activeObjectLua` requires Lua table syntax** — not JSON. The fuel map is serialized manually as a Lua table string before being sent
- **AFR source** — `engineDevice.lastAfr` and `engineDevice.lastEffAfr` read directly from the powertrain device. `electrics.values.afr` returns nil on some vehicles

### Brand Colors

| Token | Hex | Use |
|---|---|---|
| Teal | `#00E5A0` | Primary accent, live data, active states |
| Amber | `#F0A500` | Edit mode, warnings, selected cells |
| Red | `#E84040` | Alerts, error states |
| Background | `#0B0D10` | Base background |
| Muted | `#4A5570` | Secondary text, dim labels |

---

## License

`combustionEngineAdvanced.lua` and `combustionEngineThermalsAdvanced.lua` are distributed under the **BeamNG Community Derivative Distribution License (bCDDL)**. All other files are copyright JTECH Performance.
