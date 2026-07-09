# Changelog — JTECH Performance HX3

---
---

---
## [1.8.2]

### Fixed
- **Critical: tune changes (fuel, timing, boost) had no effect on engine behavior.** Root cause was twofold:
  - `combustionEngineAdvanced.lua`'s ECU-detection scan matched part keys against the substring `"ecu"`, but current R-Series ECU part names (`jtech_r1_bx`, `jtech_r2_bx`, `jtech_r3_bx`) don't contain that substring in the bare key. The scan now also matches the `^jtech_r%d` pattern, and detection is confirmed working via the full installed slot path (e.g. `.../bx_engine_ecu_i4/jtech_r3_bx`).
  - BeamNG's `extensions/auto/` loader registers a single file under two independent instances — the bare filename (`jtechECU`) and the `auto_`-prefixed hook name (`auto_jtechECU`) — each with fully separate module state. Both instances ran `updateGFX` every frame, causing tune values to visibly alternate between your edited fuel map and the untouched default on alternating ticks. `jtechECU.lua`'s `updateGFX` now checks `M.__extensionName__` and only executes real update logic for the `auto_jtechECU` instance; the duplicate instance's `updateGFX` becomes a no-op.
- **Stale engine device reference after any mid-session reset.** `jtechECU.lua` cached `engineDevice` permanently after first acquisition and never re-validated it. A vehicle reset (part swap, respawn, etc.) can rebuild the underlying `powertrain` device, silently detaching the cached reference from the live object — all subsequent writes (`targetAfr`, `timing`, turbo/supercharger calls) landed on a dead object. Added `onReset` to `jtechECU.lua` to clear `engineDevice`, `engineDeviceName`, `boostInitialized`, and `isManual`, forcing a fresh device lookup on the next update.
- **Missing `onInit` in `jtechECU.lua`.** A prior edit dropped the `onInit` function while `M.onInit = onInit` remained, silently assigning `nil`. This skipped loading `jtechSave`/`jtechLoggerGE` and the initial tune push on vehicle spawn. Restored.
- **Tune state bled between vehicles when switching with Tab.** The UI's polling loop always targeted whichever vehicle currently had focus (via `bngApi.activeObjectLua`), but never detected when the active vehicle actually changed — so cached client-side map data from the previously active vehicle could be re-pushed onto the newly active one. The poll loop now tracks the active vehicle ID and resets all "already initialized" flags and cached map arrays on change, forcing a fresh pull from the new vehicle's real Lua state.
- Removed 'Analyze with AI' until fully implemented 

### Changed
- Boost offset and boost fuel trim map editing range widened from ±25 to ±60 across all four input paths (keyboard shortcuts, double-click inline edit, absolute SET input, and the new nudge buttons).

### Added
- `+`/`−` nudge buttons in the FUEL, TIMING, and BOOST tab edit bars, next to SET, for adjusting the current selection without keyboard input. Nudge increments match existing keyboard shortcuts (0.1 for fuel/boost, 0.5 for timing).

### Known Issues (carried forward, not fixed in this release)
- **Timing map has no effect on engine behavior.** `combustionEngineAdvanced.lua`'s physics-rate `updateTorque` unconditionally overwrites `device.timing` every tick whenever `device.ecu ~= "empty"` (now true, following the fix above), computing its own value from boost/induction state with no reference to the timing map. `jtechECU.lua`'s graphics-rate write to `device.timing` is overwritten before it ever affects combustion. Needs a fix on the `combustionEngineAdvanced.lua` side — likely reconciling the ECU-active timing override path with manual timing map input — deferred to a future release.
- SAFE tab is still missing AFR fault threshold surfacing in some contexts (pre-existing, unrelated to this session).
- D-series (pickup) and Bastion ECU part support added this session for i6/V8/V8 diesel/6.9L variants — confirmed working on the 6.9 V8 after a file-naming/placement fix; other pickup variants and Bastion V6/V8 use the same pattern but have not yet been individually confirmed in-game.
---

---

## [1.8.2] — 2026-07-06 - Log Tab, More Telemetry, 3-Step, Engine Protextion and UI expansion

### Added
- **LOGS tab** — full implementation across three layers:
  - `jtechLogger.lua` (VE): ring buffer logger sampling 10 channels at 10Hz via `updateGFX`
  - `jtechLoggerGE.lua` (GE): start/stop/fetch bridge with `Engine.Platform.getSystemTimeMS()` timestamps
  - UI: canvas chart with toggleable channel legend, event log panel, transbrake event logging
  - Standalone branded HTML report export via JavaScript Blob download
  - AFR exponential moving average applied at the `electrics` bus level
- **Four new telemetry logger channels**: Engine Load % (`jtechLoad`), Ignition Advance
  (`jtechTimingAdv`), Fuel Map cell indices (`jtechFuelCellRPM`, `jtechFuelCellLoad`)
  - EGT and knock channels pre-wired into logger sample table for Phase 1
  - All 17 channels added to JS CSV export, `logChannels` array, modal legend, and HTML report builder
- **LIMITERS tab** (unlocks at R2):
  - Dedicated tab housing launch control, 3-step, rev limiting, and traction — moved out of SAFE
  - `limiterSettings` table in Lua with `updateLimiterSettings` and `getStatus()` exposure
  - New UI panels: REV LIMITING, LAUNCH CONTROL, 3-STEP BOOST THRESHOLD, TRACTION
- **3-step launch control** — boost PSI threshold gate between spool RPM and 2-step launch RPM;
  rev limiter set unconditionally while launch is active (fixes idle-to-launch ceiling ordering bug)
- **ENGINE PROTECTION expanded** (SAFE tab) — fully implemented and tested in-game:
  - `safeSettings.egtLimitC` (1050°C), `knockThreshold` (0.55), `knockRetardDeg` (4.0°),
    `boostCeilingPsi` (0, disabled by default)
  - EGT protection: timing pull + fuel enrichment when EGT exceeds `egtLimitC`
  - Knock protection: additional timing retard (`knockRetardDeg`) when `jtechKnockLevel`
    exceeds `knockThreshold`
  - Boost overrun protection: timing pull when boost exceeds `boostCeilingPsi` (if enabled)
  - AFR lean fault action: ~6% fuel enrichment when lean fault condition is active
  - New electrics outputs: `jtechEGTWarn`, `jtechKnockWarn`, `jtechAFRLeanWarn`,
    `jtechAFRRichWarn`, `jtechBoostOverrun`
  - New `getStatus()` fields: `egtWarning`, `knockWarning`, `afrLeanWarning`,
    `afrRichWarning`, `boostOverrunWarning`
- **Tune Advisor (AI Suggestions)** — local JavaScript rule engine in `app.js`:
  - Replaces prior `runSuggestionScan` GE/Lua dependency with client-side `runAdvisorRules(data)`
  - Analyzes live status map data and loaded log samples against four rule categories
- **LEARN tab and SUGGEST tab** — full feature spec and Cowork build prompt exported
  (`jtech_cowork_prompt.md`), covering 8 dependency-ordered tasks

### Changed
- **SAFE tab** restructured — now contains engine protection only; rev/launch features moved to LIMITERS
- `safeSettings` split into trimmed protection-only table; new `limiterSettings` table handles
  launch, rev, and 3-step fields
- **ENGINE PROTECTION block** in `onUpdate` now evaluates EGT, knock, AFR, and boost-overrun
  conditions alongside existing water/oil temp checks
- **Tab click routing** unified — all tab clicks now flow through `tabClick()` / `canAccessTab()`
  single tier-aware handler; eliminates toast firing on correctly-tiered tabs and fixes
  tier-downgrade re-lock lag
- **Collapse/minimize behavior** fixed — `jtechCollapse`/`jtechExpand` updated to target correct
  current layout classes (`.jt-shell`, `.hdr`); 32×32 teal `+` pill added as collapsed state indicator

### Fixed
- **Critical: all tab navigation clicks silently failing** — `tabClick()` was calling
  `scope.selectTab()` which was never defined; fix: `scope.selectTab = scope.setTab` added after
  `setTab` definition (`app.js:842`)
- **`runSuggestionScan` fatal Lua error** — was being called from GE context on
  `extensions.auto_jtechECU`, a VE extension; replaced with client-side JS rule engine
- **Tune Advisor cross-map rule** — was accessing `fuelMap` by index instead of RPM break key;
  corrected to key-based lookup
- **Duplicate `jtech-log-legend` element ID** — caused modal legend to not populate; ID deduplicated
- **`engineLoadVal` scope error** — variable used outside its declaration block; hoisted to correct scope
- **Lua trailing comma syntax error** in logger sample table
- **Typo** `funalTimingDeg` → `finalTimingDeg`
- **Duplicate locked nav item** causing non-functional Limiters entry under ECU Settings group
- **Mismatched `end` structure** in launch control block causing cascading Lua parse errors

### Investigated / Deferred
- **Injector duty cycle channel** — `inject` property on engine device is an internal combustion
  model scalar, not true duty cycle; channel dropped
- **PGP engine compatibility** — slot type mismatch (`bx_engine_ecu_i4` vs PGP ECU slot) and
  possible device name mismatch identified; awaiting PGP JBeam slot type value and engine device
  name before fix is written
- **In-app modal log viewer** — identified as preferred primary review UX; not yet built
---

## JTECH ECU 1.8.0 - Help Tab & UI

### Added
- **AFR fault thresholds** — `SAFE_AFR_LEAN` (15.5) / `SAFE_AFR_RICH` (10.5) constants added to `auto_jtechECU.lua`; `afrLeanFault`, `afrRichFault`, `afrLeanThreshold`, `afrRichThreshold` now exposed via `getStatus()`
- **EGT + Knock Phase 1** (R2+) — `M.jtechEGT` and `M.jtechKnockLevel` calculated each `updateGFX` tick from engine load, AFR lean deviation, boost, and RPM/timing; written to `electrics.values.jtechEGT` / `jtechKnockLevel` and exposed via `getStatus()`. Knock uses a 0.15-alpha EMA smoother
  - DASH tab: EGT readout (green < 1200°C, yellow 1200–1350°C, red > 1350°C) and 10-segment KNOCK bar (green 0–4, yellow 5–6, red 7–10), both gated behind an R2-required locked panel
- **Suggestion scan rule engine** (R2+) — `M.runSuggestionScan()` in `auto_jtechECU.lua` evaluates 6 rules (lean AFR at WOT, rich idle, abrupt timing transition, sustained high EGT, knock detected, boost overrun) and serializes findings via `jtechLoggerGE.sendSuggestions()` → `JtechSuggestions` guihook
  - New SUGGEST tab: scan bar with last-scan timestamp and RE-SCAN button (spinner while pending), severity-colored suggestion cards (warn/caution/info), empty state, auto-scan on first tab open.
- **LEARN tab** — two-pane knowledge base with 9 articles across Getting Started / Tuning / Safety / Reference categories (`what-is-this-ecu`, `hardware-tiers`, `afr-basics`, `reading-fuel-map`, `ignition-timing`, `boost-control`, `fault-thresholds`, `rev-limiters`, `glossary`), grouped sidebar navigation, content rendered via `ng-switch` on block type, Prev/Next article navigation
- **Modal log viewer** — LOGS tab now opens an in-app modal overlay (`scope.logModalOpen`) instead of relying on the inline chart alone; header with close button, canvas chart, channel legend, scrollable event list, and EXPORT REPORT button, all styled with existing brand tokens
- **Sidebar navigation** — flat horizontal tab bar replaced with a grouped 200px left sidebar (CORE / TUNING / BOOST / ECU SETTINGS / LOGGING / TOOLS); locked items (Nitrous R3, Limiters R3, Dyno R2) show a lock icon and fire a `"Requires R[N] hardware"` toast on click via `lockedTabClick()`
- SUGGEST and LEARN removed from `COMING_SOON_TABS`

### Changed
- `auto_jtechECU.lua` — added `MAP_RPM_ROWS`/`RPM_STEP` constants and `M.mapRpmRows` header array (1000–10000), exposed via `getStatus()` alongside the existing `M.mapLoadCols`; FUEL/TIMING map grids in `app.js` now render via `ng-repeat` over these arrays instead of hardcoded rows

### Notes
- Map load axis remains 6 columns (0/20/40/60/80/100%) rather than the originally scoped 10, to match the existing fuel/timing/boost map data already in production — changing column count would require migrating all five map tables and was left out of this pass. Flagging for follow-up if 10-column resolution is still wanted.
- **Task 8 (AI Tune Advisor companion HTML) skipped at user's request** — `jtech_tune_advisor.html` was not created this round.

---

## JTECH ECU V1.7.1 - Logs Tab

### Added
- **LOGS tab** — first full implementation
  - VE ring buffer logger (`jtechLogger.lua`) sampling at 10Hz with configurable duration (30s / 60s / 120s / 300s)
  - Channels recorded: RPM, TPS, boost, AFR, AFR target, gear, clutch, speed, water temp, oil temp, oil pressure, transbrake state, launch active
  - Rising-edge event detection: `HARD_CUT`, `WATER_WARN`, `OIL_WARN`, `LAUNCH_ACTIVE`, `GEAR_CHANGE`, `TRANSBRAKE_ON`, `TRANSBRAKE_OFF`, `LOG_START`, `LOG_STOP`
  - GE bridge (`jtechLoggerGE.lua`) for start/stop/fetch commands from UI
  - Manual start/stop button with recording state indicator
  - Duration selector button group (replaces unreliable CEF `<select>`)
  - Auto-stop at end of configured duration with automatic data push to UI
  - Multi-channel time-series canvas chart with toggleable channel visibility
  - Color-coded channel legend with click-to-toggle buttons
  - Scrollable event log with formatted labels and severity colors
  - `GEAR_CHANGE` events formatted as human-readable labels (GEAR: N, GEAR: R, GEAR: 1, etc.)

### Changed
- `auto_jtechECU.lua` — added electrics bus writes for logger consumption: `jtechHardCut`, `jtechLaunchActive`, `jtechWaterTempWarn`, `jtechOilTempWarn`, `jtechSoftLimit`, `jtechAfr`, `jtechAfrTarget`, `jtechOilPressure`
- Reverse lights now activate on transbrake engage in addition to reverse gear (`reverselight_filament` + `reverse` keyed off transbrake state combined with gear index)
- LOGS tab removed from `COMING_SOON_TABS`

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
