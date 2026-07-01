# Changelog — JTECH Performance HX3
---

## JTECH ECU — v1.6.2 — Hardware Tier System

### JBeam Parts
- Added `jtech_ecu_parts.jbeam` to `vehicles/bx/` with R1, R2, R3 parts fitting `bx_engine_ecu_i4` slot
- Added `jtech_hx1–3.jbeam` and `jtech_r1–3.jbeam` to `vehicles/common/jtech/` (future use)

### Lua — `jtechLoader.lua`
- Added `detectHardwareTiers()` — scans `v.data.slotPartMap` for `jtech_r%d` pattern, writes `jtechRTier` to `electrics.values`
- Called on both `onInit` and `onReset`
- Removed stray `controller.resetSecondStage()` call

### Lua — `jtechECU.lua`
- `rTier` added to `getStatus()` payload
- `applyTune` now gates map application by tier — R2+ for fuel/boost maps, R3 for timing maps
- Settings and tune name always apply regardless of tier
- Toast notification fires when maps are skipped due to insufficient tier

### UI — `app.js`
- `scope.rTier` added to state, populated from status poll
- Tab overlays implemented — dimmed background with lock icon and upgrade message
- Overlay re-evaluates when `rTier` changes mid-session
- Edit mode blocked by tier on `toggleMode`, `toggleTimingMode`, `toggleBoostMode`, `toggleLaunchControl`
- Header label reflects installed hardware: `HX3 · R2 · <ecuName>` or `HX3 · STOCK ECU`
- `ecuName` only shown when R-Series ECU is detected

### Tab Access Matrix
| Tier | DASH | FUEL | TIMING | BOOST | SAFE | SETUP | LOGS |
|------|------|------|--------|-------|------|-------|------|
| 0 (Stock) | ✓ | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | — |
| R1 | ✓ | 🔒 | 🔒 | 🔒 | ✓ | ✓ | — |
| R2 | ✓ | ✓ | 🔒 | ✓ | ✓ | ✓ | — |
| R3 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |

---
## [0.6.1] — SAFE Tab Fixes + SETUP Tab Completion

### SAFE Tab
- Fixed `M. updateSafeSettings` (space in exported key) causing silent fail on all safe settings calls
- Fixed native `twoStepLaunch` controller overriding custom launch logic — now unloaded via `controller.unloadControllerExternal('twoStepLaunch')` in `jtechLoader.lua` `onInit`
- Fixed `engineDevice:cutIgnition()` being insufficient for RPM hold — replaced with `eng:setTempRevLimiter(limitAV, limitAV * 1.05)`
- Fixed transmission detection waiting for clutch movement — replaced with one-time `hPattern` controller check in `jtechECU.lua` `onInit`
- Fixed `scope.safeSettings` never being set from poll — added `if(data.safeSettings) scope.safeSettings = data.safeSettings` in `slowTimer`
- Fixed `toggleLaunchControl` using async `getStatus` call — replaced with direct `scope.safeSettings` read
- Fixed `updateSafeStatus` never being called — added call at end of `updateDOM`
- Launch control toggle, transmission display, launch state, and traction indicator all live-updating correctly
- 2-step RPM now fully adjustable from UI and respected in-game

### SETUP Tab
- Save / load / delete / apply all confirmed working end-to-end in-game
- `ecuName` displayed in app header as `HX3 · <ecuName>`
- Active tune name displayed in status bar right side

### Technical Notes
- `eng:setTempRevLimiter(limitAV, overshootAV)` is the correct API for custom rev limiting — `engineDevice:cutIgnition()` alone is insufficient for RPM hold
- `controller.unloadControllerExternal(name)` removes native controllers at runtime — required to prevent `twoStepLaunch` from overriding custom launch logic
- Transmission type detected via `controller.getController("hPattern")` in `onInit` — clutch-based detection is unreliable at spawn
- `scope.safeSettings` must be explicitly assigned from `data.safeSettings` in the poll — Angular does not auto-populate nested scope objects
---

## [0.6.0] — SAFE Tab + Map Expansion

### SAFE Tab
- Three-panel layout (REV LIMITING / ENGINE PROTECTION / LAUNCH & TRACTION) side by side
- 3-step rev limiting: launch hold (ignition cut), soft limit (AFR lean), hard cut (ignition cut)
- Engine protection: timing pull on water overtemp, fuel enrichment on oil overtemp; thresholds and pull amounts configurable
- Launch control: auto-detects manual vs automatic via `clutchRatio`; manual arms on clutch-in + throttle, releases on clutch-out; automatic uses brake hold + speed threshold
- Traction slip indicator via `avgWheelAV` vs `wheelspeed` delta
- All state live-updated via `slowTimer` poll

### Map Expansion
- All 5 maps expanded from 6×6 to 10 RPM rows × 10 gear/boost columns
- RPM rows now 1000–10000; new rows copy from 6000 row
- Boost map columns now 1–10 gears; new columns copy from column 6
- Fuel and timing maps: RPM rows expanded, load axis unchanged
- Map dimensions now driven by SETUP tab settings (`maxGears`, `maxRpm`)
- JS map renders fully dynamic — `buildRpmCols()` rebuilds on every render

### SETUP Tab Fixes
- Fixed `guihooks.trigger` silent failures in VE context — all triggers now routed via `obj:queueGameEngineLua`
- Fixed `settings` declared after functions that reference it — moved to top of file
- Fixed Lua table syntax in `updateSettings` call (was using JSON bracket key format)
- Fixed `settingsLoaded` never resetting after APPLY
- ECU name and active tune name now shown in header
- Collapse/expand toggle added to header bar

---

## [0.5.0] — SETUP Tab

- SETUP tab with two inner panels: LIBRARY and SETTINGS
- LIBRARY: scrollable tune list, load/delete actions, inline save form with conflict detection and overwrite confirmation
- SETTINGS: ECU name, max gears, max RPM, boost max override, rev limiter baseline
- `jtechSave.lua` GE extension: `saveTune`, `loadTune`, `deleteTune`, `getTuneList`, `pushTuneListToUI`, `pushTuneToVehicle`, `saveLastActive`
- Tunes stored as JSON in BeamNG user data at `/settings/jtechECU/tunes/`
- `applyTune`, `getCurrentTune`, `updateSettings`, `getSettings` added to `jtechECU.lua`
- Map grids reset on tune load so grids redraw correctly
- Fixed `Engine.Platform.getSystemTimeMS()` replacing broken `os.time()` in GE sandbox
- Fixed `jsonEncode` output being passed to `queueLuaCommand` — replaced with `serializeToLua` helper

---

## [0.4.0] — BOOST Tab

- BOOST tab with Boost Offset Map (RPM × Gear) and Boost Fuel Trim Map (RPM × Boost or RPM × Gear, axis toggle)
- Live cell tracking, drag-select, inline editing, keyboard nudge — same interaction model as FUEL and TIMING tabs
- `jtechTurbo.lua` custom turbocharger module — writes `jtechHasTurbo` and `jtechBoostMax` to `electrics.values`; exports `setWastegateOffset`
- `boostBreaks` dynamically sourced from `electrics.values.jtechBoostMax`
- Fixed `boostInitialized` leaking as implicit global
- Fixed live RPM row tracking always resolving to lowest row
- Fixed keyboard input being blocked by cross-tab `editMode` guard

---

## [0.3.0] — TIMING Tab

- TIMING tab with 6×6 RPM vs Load timing map using `eng.timing`
- Live IGN ADV gauge reading from `eng.timing` (radians converted to degrees)
- Knock Retard gauge using `eng.timingError` as knock proxy
- Full edit interaction matching FUEL tab
- `getStatus()` extended with `ignAdv`, `timingError`, `revLimiterRPM`, `maxRPM`, `timingMap`

---

## [0.2.0] — Ignition Splash + Polish

- Ignition-linked splash screen: standby on ignition off, 2-second animated boot sequence on ignition on
- Header logo image replaces text wordmark; separate splash logo
- Status strip moved below tab bar (eliminates tab-switch layout jump)
- Map collapse/expand toggle (▲ HIDE / ▼ SHOW) hides map and edit bar together
- AFR dual gauge (target / effective) with color-coded deviation bar

---

## [0.1.0] — Initial Release

- AngularJS directive `jtechEcu` with full inline CSS (BeamNG CEF blocks external stylesheets)
- Tab structure: DASH / FUEL / TIMING / BOOST / SAFE / SETUP / LOGS
- DASH tab with 12 live sensor gauges
- FUEL tab with interactive 6×6 multiplier map — live cell tracking, click/drag/keyboard editing, edit/monitor mode toggle
- 200ms polling via `bngApi.activeObjectLua`
- `jtechECU.lua` VE extension with `updateGFX` hook
- `jtechLoader.lua` loading `combustionEngineAdvanced` at vehicle spawn
- `eng.targetAfr` confirmed as correct fuel intervention point
- AFR read from `engineDevice.lastAfr` / `engineDevice.lastEffAfr`

---

## Technical Notes

- `combustionEngineAdvanced` must be active for `eng.targetAfr` to exist
- `auto_` prefix in extension name maps to `auto/` subfolder
- `guihooks.trigger` does not work in VE context — use `obj:queueGameEngineLua("guihooks.trigger(...)")`
- Passing full engine device objects through `guihooks` causes Lua stack overflow — always extract specific fields
- `queueLuaCommand` requires Lua table syntax — use `serializeToLua`, not `JSON.stringify`
- Mac-to-Windows file sync has dropped functions before — verify file contents on Windows after any sync



All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
