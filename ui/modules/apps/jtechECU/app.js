// @ts-nocheck
angular.module('beamng.apps')
.directive('jtechEcu', [function() {
    return {
        restrict: 'E',
        template: 
    '<style>' +
    ':root{--bg:#0B0D10;--bg2:#0e1116;--bg3:#0d1014;--text:#E6E6E6;--dim:#8A8F98;--border:#1E2229;--teal:#00E5A0;--amber:#F0A500;--red:#E84040;}' +
    '*{box-sizing:border-box;margin:0;padding:0;}' +
    '.root{position:relative;background:var(--bg);border:1px solid var(--border);border-radius:4px;overflow:hidden;font-family:Inter,sans-serif;user-select:none;}' +
    '.hdr{height:40px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 16px;gap:10px;}' +
    '.logo{font-family:Inter,sans-serif;font-weight:500;font-size:12px;color:var(--text);letter-spacing:.08em;}' +
    '.slash{display:inline-block;width:1px;height:13px;background:var(--teal);transform:rotate(20deg);opacity:.7;margin:0 2px;}' +
    '.model{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--teal);letter-spacing:.1em;}' +
    '.status{margin-left:auto;font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--teal);display:flex;align-items:center;gap:5px;}' +
    '.sdot{width:5px;height:5px;border-radius:50%;background:var(--teal);}' +
    '.sstrip{height:40px;background:var(--bg3);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 10px;gap:0;overflow-x:auto;}' +
    '.si{display:flex;flex-direction:column;gap:1px;padding:0 8px;flex-shrink:0;}' +
    '.si:first-child{padding-left:0;}' +
    '.slbl{font-size:8px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;}' +
    '.sval{font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:700;color:var(--teal);line-height:1;}' +
    '.sval.w{color:var(--amber)}.sval.n{color:var(--text);}' +
    '.ssep{width:1px;height:16px;background:#2a2f38;transform:rotate(20deg);flex-shrink:0;}' +
    '.tbar{height:40px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:stretch;}' +
    '.htab{flex:1;display:flex;align-items:center;justify-content:center;font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.08em;border-right:1px solid var(--border);cursor:pointer;position:relative;transition:color 160ms;min-width:0;}' +
    '.htab:last-child{border-right:none;}' +
    '.htab.active{color:var(--teal);background:#0b0e13;}' +
    '.htab.active::after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--teal);}' +
    '.body{padding:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;}' +
    '.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}' +
    '.dash-box{padding:14px 12px;}' +
    '.dash-box .dbv{font-size:28px;}' +
    '.dash-box .dbl{font-size:10px;margin-bottom:6px;}' +
    '.coming-soon{min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;}' +
    '.tab-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(11,13,16,0.85);backdrop-filter:blur(2px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;z-index:50;}' +
    '.tab-overlay-icon{font-size:24px;color:var(--dim);}' +
    '.tab-overlay-title{font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--dim);letter-spacing:.15em;}' +
    '.tab-overlay-sub{font-family:Inter,sans-serif;font-size:10px;color:var(--dim);letter-spacing:.05em;}' +
    '.cs-title{font-family:"JetBrains Mono",monospace;font-size:14px;color:var(--dim);letter-spacing:.15em;text-transform:uppercase;}' +
    '.cs-sub{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--teal);letter-spacing:.1em;}' +
    '.toolbar{display:flex;align-items:center;gap:8px;}' +
    '.mode-btn{font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid;cursor:pointer;transition:all 160ms;}' +
    '.mode-btn.monitor{background:#002a1f;color:var(--teal);border-color:#005540;}' +
    '.mode-btn.edit{background:#2a1f00;color:var(--amber);border-color:#554000;}' +
    '.tl-sep{width:1px;height:20px;background:#2a2f38;transform:rotate(20deg);flex-shrink:0;margin:0 4px;}' +
    '.map-name{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--dim);}' +
    '.tl-right{margin-left:auto;display:flex;align-items:center;gap:8px;}' +
    '.tl-hint{font-family:Inter,sans-serif;font-size:10px;color:var(--dim);font-style:italic;}' +
    '.map-wrap{background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:10px;}' +
    '.map-header{display:flex;align-items:center;gap:8px;margin-bottom:8px;}' +
    '.map-title{font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;}' +
    '.badge{font-size:9px;font-family:"JetBrains Mono",monospace;padding:2px 6px;border-radius:2px;letter-spacing:.05em;}' +
    '.badge.live{background:#002a1f;color:var(--teal);border:1px solid #005540;}' +
    '.badge.edit{background:#2a1f00;color:var(--amber);border:1px solid #554000;}' +
    '.cell-coords{margin-left:auto;font-family:"JetBrains Mono",monospace;font-size:9px;color:var(--dim);}' +
    '.axis-label-row{display:flex;gap:3px;margin-bottom:3px;padding-left:32px;}' +
    '.axl{font-family:"JetBrains Mono",monospace;font-size:8px;color:var(--dim);text-align:center;flex:1;}' +
    '.axl.live-col{color:var(--teal);font-weight:700;}' +
    '.map-row{display:flex;gap:3px;align-items:center;margin-bottom:3px;}' +
    '.row-lbl{font-family:"JetBrains Mono",monospace;font-size:8px;color:var(--dim);width:28px;text-align:right;flex-shrink:0;}' +
    '.cell{flex:1;height:22px;border-radius:1px;display:flex;align-items:center;justify-content:center;font-family:"JetBrains Mono",monospace;font-size:8px;font-weight:700;border:1px solid transparent;transition:filter 80ms;position:relative;}' +
    '.cell.can-edit{cursor:pointer;}' +
    '.cell.can-edit:hover{filter:brightness(1.3);}' +
    '.cell.selected{border-color:var(--amber)!important;background:#332800!important;color:var(--amber)!important;}' +
    '.cell.live-cell{border-color:var(--teal)!important;}' +
    '.cell-input{width:100%;height:100%;background:transparent;border:none;outline:none;font-family:"JetBrains Mono",monospace;font-size:8px;font-weight:700;color:var(--amber);text-align:center;cursor:text;}' +
    '.v0{background:#0f1a14;color:#1a7a50}.v1{background:#0e2018;color:#20a060}.v2{background:#0c2a1c;color:#28c478}.v3{background:#143020;color:#35d988}.v4{background:#1e3a22;color:#44e896}.v5{background:#2a3a18;color:#88d840}.v6{background:#3a3010;color:#d4a030}.v7{background:#3a2010;color:#e07020;}' +
    '.map-footer{display:flex;gap:16px;align-items:center;margin-top:6px;}' +
    '.mf-legend{font-size:9px;font-family:"JetBrains Mono",monospace;}' +
    '.mf-legend.t{color:var(--teal)}.mf-legend.a{color:var(--amber)}.mf-legend.d{color:var(--dim);margin-left:auto;}' +
    '.edit-bar{background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:8px 12px;display:flex;align-items:center;gap:12px;min-height:44px;}' +
    '.eb-info{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--dim);}' +
    '.eb-val{font-family:"JetBrains Mono",monospace;font-size:16px;font-weight:700;color:var(--amber);min-width:40px;}' +
    '.eb-input{background:#1a1400;border:1px solid #554000;border-radius:2px;color:var(--amber);font-family:"JetBrains Mono",monospace;font-size:13px;font-weight:700;width:64px;padding:4px 8px;text-align:center;outline:none;}' +
    '.eb-input:focus{border-color:var(--amber);}' +
    '.eb-hint{font-family:Inter,sans-serif;font-size:10px;color:var(--dim);font-style:italic;}' +
    '.eb-btn{font-family:"JetBrains Mono",monospace;font-size:9px;letter-spacing:.06em;padding:4px 10px;border-radius:2px;cursor:pointer;transition:all 120ms;}' +
    '.eb-btn.apply{background:#332800;color:var(--amber);border:1px solid #554000;}' +
    '.eb-btn.apply:hover{background:#443200;}' +
    '.eb-sep{width:1px;height:20px;background:var(--border);flex-shrink:0;}' +
    '.gauges{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}' +
    '.db{background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:8px 10px;}' +
    '.db.warn{border-color:var(--amber);}' +
    '.dbl{font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;}' +
    '.dbv{font-family:"JetBrains Mono",monospace;font-size:20px;font-weight:700;color:var(--teal);line-height:1;}' +
    '.dbv.a{color:var(--amber)}.dbv.d{color:var(--text);font-weight:400;font-size:16px;}' +
    '.rbar{height:3px;background:var(--border);border-radius:2px;overflow:hidden;margin-top:5px;}' +
    '.rbf{height:100%;border-radius:2px;background:var(--teal);}' +
    '.rbf.w{background:var(--amber);}' +
    '.splash{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;z-index:100;}' +
    '.splash-logo{height:32px;width:auto;}' +
    '.splash-status{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--dim);letter-spacing:.15em;}' +
    '.splash-bar-wrap{width:160px;height:2px;background:var(--border);border-radius:2px;overflow:hidden;}' +
    '.splash-bar{height:100%;width:0%;background:var(--teal);border-radius:2px;transition:width 80ms linear;}' +
    '.setup-wrap{display:flex;gap:10px;height:100%;}' +
    '.setup-panel{flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:2px;display:flex;flex-direction:column;overflow:hidden;}' +
    '.setup-panel-hdr{padding:8px 12px;border-bottom:1px solid var(--border);font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:8px;}' +
    '.setup-panel-body{flex:1;overflow-y:auto;padding:8px;}' +
    '.tune-row{padding:8px 10px;border-radius:2px;border:1px solid transparent;cursor:pointer;margin-bottom:4px;transition:all 120ms;}' +
    '.tune-row:hover{border-color:var(--border);background:#0d1014;}' +
    '.tune-row.selected{border-color:var(--teal);background:#002a1f;}' +
    '.tune-name{font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:700;color:var(--text);}' +
    '.tune-row.selected .tune-name{color:var(--teal);}' +
    '.tune-meta{font-family:"JetBrains Mono",monospace;font-size:9px;color:var(--dim);margin-top:2px;}' +
    '.tune-empty{font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--dim);text-align:center;padding:24px 0;}' +
    '.setup-actions{padding:8px;border-top:1px solid var(--border);display:flex;gap:6px;}' +
    '.setup-btn{flex:1;font-family:"JetBrains Mono",monospace;font-size:9px;letter-spacing:.06em;padding:6px 8px;border-radius:2px;cursor:pointer;transition:all 120ms;text-align:center;}' +
    '.setup-btn.load{background:#002a1f;color:var(--teal);border:1px solid #005540;}' +
    '.setup-btn.load:hover{background:#003a2a;}' +
    '.setup-btn.load:disabled{opacity:.3;cursor:default;}' +
    '.setup-btn.save{background:#1a1400;color:var(--amber);border:1px solid #554000;}' +
    '.setup-btn.save:hover{background:#2a2000;}' +
    '.setup-btn.delete{background:#1a0808;color:var(--red);border:1px solid #550000;}' +
    '.setup-btn.delete:hover{background:#2a0808;}' +
    '.setup-btn.delete:disabled{opacity:.3;cursor:default;}' +
    '.setting-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;}' +
    '.setting-lbl{font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;width:120px;flex-shrink:0;}' +
    '.setting-inp{flex:1;background:#0d1014;border:1px solid var(--border);border-radius:2px;color:var(--text);font-family:"JetBrains Mono",monospace;font-size:11px;padding:4px 8px;outline:none;}' +
    '.setting-inp:focus{border-color:var(--teal);}' +
    '.setting-hint{font-size:9px;font-family:Inter,sans-serif;color:var(--dim);font-style:italic;}' +
    '.active-tune-bar{padding:6px 10px;background:#001a12;border-bottom:1px solid #003322;font-family:"JetBrains Mono",monospace;font-size:9px;color:var(--teal);letter-spacing:.08em;}' +
    '</style>' +
    '<div class="root" id="jtech-hx3">' +

// SPLASH
'<div class="splash" id="jtech-splash">' +
    '<img class="splash-logo" src="/ui/modules/apps/jtechECU/main-logo@2x.png" />' +
    '<div class="splash-bar-wrap"><div class="splash-bar" id="jtech-splash-bar"></div></div>' +
    '<div class="splash-status" id="jtech-splash-status">STANDBY</div>' +
'</div>' +

// HEADER
'<div class="hdr">' +
    '<img src="/ui/modules/apps/jtechECU/logo-header.png" style="height:30px;width:auto;" />' +
    '<span class="slash"></span>' +
    '<span class="model" id="jtech-model-label">HX3</span>' +
    '<div class="status">' +
        '<span id="jtech-active-tune-hdr" style="color:var(--dim);margin-right:8px;"></span>' +
        '<span class="sdot" id="jtech-sdot"></span>' +
        '<span id="jtech-status-text">ECU LINK ACTIVE</span>' +
    '</div>' +
    '<button id="jtech-collapse-btn" onclick="document.getElementById(\'jtech-collapse-btn\').getAttribute(\'data-collapsed\')==\'1\' ? jtechExpand() : jtechCollapse()" style="margin-left:8px;background:transparent;border:none;color:var(--dim);font-size:14px;cursor:pointer;padding:0 4px;line-height:1;">▲</button>' +
'</div>' +

// TAB BAR
'<div class="tbar">' +
    '<div class="htab" ng-class="{active: activeTab===\'dash\'}" ng-click="setTab(\'dash\')">DASH</div>' +
    '<div class="htab" ng-class="{active: activeTab===\'fuel\'}" ng-click="setTab(\'fuel\')">FUEL</div>' +
    '<div class="htab" ng-class="{active: activeTab===\'timing\'}" ng-click="setTab(\'timing\')">TIMING</div>' +
    '<div class="htab" ng-class="{active: activeTab===\'boost\'}" ng-click="setTab(\'boost\')">BOOST</div>' +
    '<div class="htab" ng-class="{active: activeTab===\'safe\'}" ng-click="setTab(\'safe\')">SAFE</div>' +
    '<div class="htab" ng-class="{active: activeTab===\'setup\'}" ng-click="setTab(\'setup\')">SETUP</div>' +
    '<div class="htab" ng-class="{active: activeTab===\'logs\'}" ng-click="setTab(\'logs\')">LOGS</div>' +
'</div>' +

// STATUS STRIP
'<div class="sstrip" ng-show="showStatusStrip()">' +
    '<div class="si"><span class="slbl">RPM</span><span class="sval" id="jtech-s-rpm">0</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">TPS</span><span class="sval n" id="jtech-s-tps">0%</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">AFR</span><span class="sval" id="jtech-s-afr">0.0</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">BOOST</span><span class="sval" id="jtech-s-boost">0.0</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">GEAR</span><span class="sval" id="jtech-s-gear">N</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">SPD</span><span class="sval n" id="jtech-s-spd">0</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">WATER</span><span class="sval n" id="jtech-s-water">0</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">OIL</span><span class="sval n" id="jtech-s-oil">0</span></div>' +
    '<div class="ssep"></div>' +
    '<div class="si"><span class="slbl">OIL P</span><span class="sval n" id="jtech-s-oilp">--</span></div>' +
'</div>' +

// DASH TAB
'<div class="body" ng-show="activeTab===\'dash\'">' +
    '<div class="dash-grid">' +
        '<div class="db dash-box"><div class="dbl">RPM</div><div class="dbv" id="jtech-d-rpm">0</div><div class="rbar"><div class="rbf" id="jtech-d-rpm-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box"><div class="dbl">TPS</div><div class="dbv d" id="jtech-d-tps">0%</div><div class="rbar"><div class="rbf" id="jtech-d-tps-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box" id="jtech-d-afr-block"><div class="dbl">AFR</div><div class="dbv" id="jtech-d-afr">0.0</div><div class="rbar"><div class="rbf" id="jtech-d-afr-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box"><div class="dbl">BOOST</div><div class="dbv" id="jtech-d-boost">0.0</div><div class="rbar"><div class="rbf" id="jtech-d-boost-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box"><div class="dbl">GEAR</div><div class="dbv" id="jtech-d-gear">N</div></div>' +
        '<div class="db dash-box"><div class="dbl">SPEED</div><div class="dbv d" id="jtech-d-spd">0</div><div class="rbar"><div class="rbf" id="jtech-d-spd-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box" id="jtech-d-water-block"><div class="dbl">WATER TEMP</div><div class="dbv d" id="jtech-d-water">0</div><div class="rbar"><div class="rbf" id="jtech-d-water-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box" id="jtech-d-oil-block"><div class="dbl">OIL TEMP</div><div class="dbv d" id="jtech-d-oil">0</div><div class="rbar"><div class="rbf" id="jtech-d-oil-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box"><div class="dbl">OIL PRESSURE</div><div class="dbv d" id="jtech-d-oilp">--</div><div class="rbar"><div class="rbf" id="jtech-d-oilp-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box"><div class="dbl">FUEL LEVEL</div><div class="dbv d" id="jtech-d-fuel">0%</div><div class="rbar"><div class="rbf" id="jtech-d-fuel-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box"><div class="dbl">ENG LOAD</div><div class="dbv d" id="jtech-d-load">0.00</div><div class="rbar"><div class="rbf" id="jtech-d-load-bar" style="width:0%"></div></div></div>' +
        '<div class="db dash-box"><div class="dbl">FUEL MULT</div><div class="dbv d" id="jtech-d-mult">1.00</div><div class="rbar"><div class="rbf" id="jtech-d-mult-bar" style="width:0%"></div></div></div>' +
    '</div>' +
'</div>' +

// FUEL TAB
'<div class="body" ng-show="activeTab===\'fuel\'">' +
    '<div class="toolbar">' +
        '<button class="mode-btn monitor" id="jtech-mode-btn" ng-click="toggleMode()">&#9679; MONITOR</button>' +
        '<div class="tl-sep"></div>' +
        '<span class="map-name">MAP-A / FUEL / LOAD vs RPM</span>' +
        '<div class="tl-right"><span class="tl-hint" id="jtech-tl-hint">click edit to modify cells</span></div>' +
    '</div>' +
    '<div class="map-wrap">' +
        '<div class="map-header">' +
            '<span class="map-title">FUEL MAP - MULTIPLIER TABLE</span>' +
            '<span class="badge live" id="jtech-map-badge">LIVE</span>' +
            '<span class="cell-coords" id="jtech-cell-coords"></span>' +
            '<button id="jtech-map-toggle" ng-click="toggleMap()" style="margin-left:8px;background:transparent;border:1px solid var(--border);border-radius:2px;color:var(--dim);font-family:\'JetBrains Mono\',monospace;font-size:9px;padding:2px 8px;cursor:pointer;letter-spacing:.05em;">▲ HIDE</button>' +
        '</div>' +
        '<div id="jtech-map-body">' +
            '<div id="jtech-map-grid"></div>' +
            '<div class="map-footer">' +
                '<span class="mf-legend t">&#9679; LIVE CELL</span>' +
                '<span class="mf-legend a">&#9632; SELECTED</span>' +
                '<span class="mf-legend d" id="jtech-sel-count"></span>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="edit-bar" id="jtech-edit-bar">' +
        '<span class="eb-info" id="jtech-eb-info">EDIT MODE OFF</span>' +
        '<div class="eb-sep"></div>' +
        '<span class="eb-val" id="jtech-eb-val">—</span>' +
        '<div class="eb-sep"></div>' +
        '<input class="eb-input" id="jtech-eb-input" type="number" placeholder="abs" step="0.1"/>' +
        '<button class="eb-btn apply" ng-click="applyAbsolute()">SET</button>' +
        '<div class="eb-sep"></div>' +
        '<span class="eb-hint" id="jtech-eb-hint">enable edit mode to modify</span>' +
    '</div>' +
    '<div class="gauges">' +
        '<div class="db" id="jtech-afr-block">' +
            '<div class="dbl">AFR</div>' +
            '<div style="display:flex;align-items:baseline;gap:4px;line-height:1;">' +
                '<span id="jtech-g-afr-target" style="font-family:\'JetBrains Mono\',monospace;font-size:20px;font-weight:700;color:var(--amber);">0.0</span>' +
                '<span style="font-family:\'JetBrains Mono\',monospace;font-size:13px;color:var(--dim);margin:0 1px;">/</span>' +
                '<span id="jtech-g-afr-eff" style="font-family:\'JetBrains Mono\',monospace;font-size:16px;font-weight:400;color:var(--text);">0.0</span>' +
            '</div>' +
            '<div class="rbar"><div class="rbf" id="jtech-g-afr-bar" style="width:0%"></div></div>' +
        '</div>' +
        '<div class="db"><div class="dbl">ENG LOAD</div><div class="dbv d" id="jtech-g-load">0.00</div><div class="rbar"><div class="rbf" id="jtech-g-load-bar" style="width:0%"></div></div></div>' +
        '<div class="db"><div class="dbl">FUEL MULT</div><div class="dbv d" id="jtech-g-mult">1.00</div><div class="rbar"><div class="rbf" id="jtech-g-mult-bar" style="width:0%"></div></div></div>' +
    '</div>' +
'</div>' +

// TIMING TAB
'<div class="body" ng-show="activeTab===\'timing\'">' +
    '<div class="toolbar">' +
        '<button class="mode-btn monitor" id="jtech-t-mode-btn" ng-click="toggleTimingMode()">&#9679; MONITOR</button>' +
        '<div class="tl-sep"></div>' +
        '<span class="map-name">MAP-A / TIMING / LOAD vs RPM</span>' +
        '<div class="tl-right"><span class="tl-hint" id="jtech-t-tl-hint">click edit to modify cells</span></div>' +
    '</div>' +
    '<div class="map-wrap">' +
        '<div class="map-header">' +
            '<span class="map-title">TIMING MAP — DEGREES ADVANCE</span>' +
            '<span class="badge live" id="jtech-t-map-badge">LIVE</span>' +
            '<span class="cell-coords" id="jtech-t-cell-coords"></span>' +
            '<button id="jtech-t-map-toggle" ng-click="toggleTimingMap()" style="margin-left:8px;background:transparent;border:1px solid var(--border);border-radius:2px;color:var(--dim);font-family:\'JetBrains Mono\',monospace;font-size:9px;padding:2px 8px;cursor:pointer;letter-spacing:.05em;">▲ HIDE</button>' +
        '</div>' +
        '<div id="jtech-t-map-body">' +
            '<div id="jtech-t-map-grid"></div>' +
            '<div class="map-footer">' +
                '<span class="mf-legend t">&#9679; LIVE CELL</span>' +
                '<span class="mf-legend a">&#9632; SELECTED</span>' +
                '<span class="mf-legend d" id="jtech-t-sel-count"></span>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="edit-bar" id="jtech-t-edit-bar">' +
        '<span class="eb-info" id="jtech-t-eb-info">EDIT MODE OFF</span>' +
        '<div class="eb-sep"></div>' +
        '<span class="eb-val" id="jtech-t-eb-val">—</span>' +
        '<div class="eb-sep"></div>' +
        '<input class="eb-input" id="jtech-t-eb-input" type="number" placeholder="deg" step="0.5"/>' +
        '<button class="eb-btn apply" ng-click="applyTimingAbsolute()">SET</button>' +
        '<div class="eb-sep"></div>' +
        '<span class="eb-hint" id="jtech-t-eb-hint">enable edit mode to modify</span>' +
    '</div>' +
    '<div class="gauges">' +
        '<div class="db"><div class="dbl">IGN ADV</div><div class="dbv" id="jtech-t-ign-adv">0.0°</div></div>' +
        '<div class="db"><div class="dbl">ENG LOAD</div><div class="dbv d" id="jtech-t-load">0.00</div><div class="rbar"><div class="rbf" id="jtech-t-load-bar" style="width:0%"></div></div></div>' +
        '<div class="db"><div class="dbl">KNOCK RETARD</div><div class="dbv" id="jtech-t-knock" style="color:var(--teal);">0.0°</div><div class="rbar"><div class="rbf" id="jtech-t-knock-bar" style="width:0%;background:var(--teal);"></div></div></div>' +
    '</div>' +
'</div>' +

// BOOST TAB
'<div class="body" ng-show="activeTab===\'boost\'">' +
    '<div class="toolbar">' +
        '<button class="mode-btn monitor" id="jtech-b-mode-btn" ng-click="toggleBoostMode()">&#9679; MONITOR</button>' +
        '<div class="tl-sep"></div>' +
        '<div style="display:flex;gap:0;border:1px solid var(--border);border-radius:2px;overflow:hidden;">' +
            '<button id="jtech-b-map-offset" ng-click="setBoostMap(\'offset\')" style="background:#002a1f;color:var(--teal);border:none;font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;">OFFSET</button>' +
            '<button id="jtech-b-map-fuel" ng-click="setBoostMap(\'fuel\')" style="background:transparent;color:var(--dim);border:none;font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;border-left:1px solid var(--border);">FUEL TRIM</button>' +
        '</div>' +
        '<div class="tl-sep"></div>' +
        '<div id="jtech-b-axis-wrap" style="display:none;gap:0;border:1px solid var(--border);border-radius:2px;overflow:hidden;align-items:stretch;">' +
            '<button id="jtech-b-axis-boost" ng-click="setBoostAxis(\'boost\')" style="background:#002a1f;color:var(--teal);border:none;font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;">RPM × BOOST</button>' +
            '<button id="jtech-b-axis-gear" ng-click="setBoostAxis(\'gear\')" style="background:transparent;color:var(--dim);border:none;font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;border-left:1px solid var(--border);">RPM × GEAR</button>' +
        '</div>' +
        '<div class="tl-right"><span class="tl-hint" id="jtech-b-tl-hint">click edit to modify cells</span></div>' +
    '</div>' +
    '<div class="map-wrap">' +
        '<div class="map-header">' +
            '<span class="map-title" id="jtech-b-map-title">BOOST OFFSET MAP — PSI OFFSET</span>' +
            '<span class="badge live" id="jtech-b-map-badge">LIVE</span>' +
            '<span class="cell-coords" id="jtech-b-cell-coords"></span>' +
            '<button id="jtech-b-map-toggle" ng-click="toggleBoostMap()" style="margin-left:8px;background:transparent;border:1px solid var(--border);border-radius:2px;color:var(--dim);font-family:\'JetBrains Mono\',monospace;font-size:9px;padding:2px 8px;cursor:pointer;letter-spacing:.05em;">▲ HIDE</button>' +
        '</div>' +
        '<div id="jtech-b-map-body">' +
            '<div id="jtech-b-map-grid"></div>' +
            '<div class="map-footer">' +
                '<span class="mf-legend t">&#9679; LIVE CELL</span>' +
                '<span class="mf-legend a">&#9632; SELECTED</span>' +
                '<span class="mf-legend d" id="jtech-b-sel-count"></span>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="edit-bar" id="jtech-b-edit-bar">' +
        '<span class="eb-info" id="jtech-b-eb-info">EDIT MODE OFF</span>' +
        '<div class="eb-sep"></div>' +
        '<span class="eb-val" id="jtech-b-eb-val">—</span>' +
        '<div class="eb-sep"></div>' +
        '<input class="eb-input" id="jtech-b-eb-input" type="number" placeholder="val" step="0.1"/>' +
        '<button class="eb-btn apply" ng-click="applyBoostAbsolute()">SET</button>' +
        '<div class="eb-sep"></div>' +
        '<span class="eb-hint" id="jtech-b-eb-hint">enable edit mode to modify</span>' +
    '</div>' +
    '<div class="gauges">' +
        '<div class="db"><div class="dbl">BOOST</div><div class="dbv" id="jtech-b-boost">0.0</div><div class="rbar"><div class="rbf" id="jtech-b-boost-bar" style="width:0%"></div></div></div>' +
        '<div class="db"><div class="dbl">OFFSET</div><div class="dbv d" id="jtech-b-offset">0.0</div></div>' +
        '<div class="db"><div class="dbl">GEAR</div><div class="dbv d" id="jtech-b-gear">N</div></div>' +
    '</div>' +
'</div>' +

// SAFE TAB
'<div class="body" ng-show="activeTab===\'safe\'">' +
    '<div class="setup-wrap">' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">REV LIMITING</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">LAUNCH RPM</span><input class="setting-inp" id="jtech-safe-launchrpm" type="number" min="500" max="8000" step="100"/><span class="setting-hint">2-step</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">SOFT LIMIT</span><input class="setting-inp" id="jtech-safe-softrpm" type="number" min="1000" max="10000" step="100"/><span class="setting-hint">fuel cut</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">HARD CUT</span><input class="setting-inp" id="jtech-safe-hardrpm" type="number" min="1000" max="10000" step="100"/><span class="setting-hint">ign cut</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">STATUS</span><span id="jtech-safe-rev-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">NORMAL</span></div>' +
                '</div>' +
                '<div class="setup-actions"><button class="setup-btn load" ng-click="applySafeRevSettings()">APPLY</button></div>' +
            '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">ENGINE PROTECTION</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">WATER LIMIT</span><input class="setting-inp" id="jtech-safe-waterlimit" type="number" min="60" max="150" step="1"/><span class="setting-hint">°C</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">OIL LIMIT</span><input class="setting-inp" id="jtech-safe-oillimit" type="number" min="60" max="200" step="1"/><span class="setting-hint">°C</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">TIM PULL</span><input class="setting-inp" id="jtech-safe-timingpull" type="number" min="0" max="20" step="0.5"/><span class="setting-hint">°</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">FUEL PULL</span><input class="setting-inp" id="jtech-safe-fuelpull" type="number" min="0" max="50" step="1"/><span class="setting-hint">%</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">WATER</span><span id="jtech-safe-water-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">OIL</span><span id="jtech-safe-oil-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                '</div>' +
                '<div class="setup-actions"><button class="setup-btn load" ng-click="applySafeProtectSettings()">APPLY</button></div>' +
            '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">LAUNCH & TRACTION</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">LAUNCH CTRL</span><button id="jtech-safe-launch-toggle" ng-click="toggleLaunchControl()" style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid #005540;background:#002a1f;color:var(--teal);cursor:pointer;">DISABLED</button></div>' +
                    '<div class="setting-row"><span class="setting-lbl">TRANSMISSION</span><span id="jtech-safe-trans-type" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--dim);">DETECTING...</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">LAUNCH STATE</span><span id="jtech-safe-launch-state" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--dim);">OFF</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">TRACTION</span><span id="jtech-safe-traction" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>' +

// SETUP TAB
'<div class="body" ng-show="activeTab===\'setup\'">' +
    '<div class="active-tune-bar">ACTIVE TUNE: <span id="jtech-active-tune">DEFAULT</span></div>' +
    '<div class="setup-wrap">' +
        '<div class="setup-panel">' +
            '<div class="setup-panel-hdr">LIBRARY</div>' +
            '<div id="jtech-save-form" style="display:none;padding:8px;border-bottom:1px solid var(--border);background:#0a0d10;">' +
                '<div style="font-size:9px;font-family:Inter,sans-serif;color:var(--dim);letter-spacing:.1em;margin-bottom:6px;">TUNE NAME</div>' +
                '<input id="jtech-save-name-input" class="setting-inp" type="text" maxlength="32" style="width:100%;margin-bottom:6px;" />' +
                '<div id="jtech-save-warning" style="display:none;font-family:JetBrains Mono,monospace;font-size:9px;color:var(--amber);margin-bottom:6px;">⚠ TUNE EXISTS — WILL OVERWRITE</div>' +
                '<div style="display:flex;gap:6px;">' +
                    '<button class="setup-btn save" id="jtech-save-confirm-btn" ng-click="confirmSave()">SAVE</button>' +
                    '<button class="setup-btn delete" ng-click="cancelSave()">CANCEL</button>' +
                '</div>' +
            '</div>' +
            '<div class="setup-panel-body" id="jtech-tune-list"></div>' +
            '<div class="setup-actions">' +
                '<button class="setup-btn load" id="jtech-load-btn" ng-click="loadSelectedTune()">LOAD</button>' +
                '<button class="setup-btn save" ng-click="openSaveForm()">SAVE CURRENT</button>' +
                '<button class="setup-btn delete" id="jtech-delete-btn" ng-click="deleteSelectedTune()">DELETE</button>' +
            '</div>' +
        '</div>' +
        '<div class="setup-panel">' +
            '<div class="setup-panel-hdr">SETTINGS</div>' +
            '<div class="setup-panel-body">' +
                '<div class="setting-row"><span class="setting-lbl">ECU NAME</span><input class="setting-inp" id="jtech-set-ecuname" type="text" maxlength="24"/></div>' +
                '<div class="setting-row"><span class="setting-lbl">MAX GEARS</span><input class="setting-inp" id="jtech-set-maxgears" type="number" min="1" max="10" step="1"/></div>' +
                '<div class="setting-row"><span class="setting-lbl">MAX RPM</span><input class="setting-inp" id="jtech-set-maxrpm" type="number" min="1000" max="10000" step="100"/></div>' +
                '<div class="setting-row"><span class="setting-lbl">REV BASELINE</span><input class="setting-inp" id="jtech-set-revbase" type="number" min="1000" max="10000" step="100"/></div>' +
                '<div class="setting-row"><span class="setting-lbl">BOOST OVERRIDE</span><input class="setting-inp" id="jtech-set-boostmax" type="number" min="0" max="50" step="0.5"/><span class="setting-hint">0 = auto</span></div>' +
            '</div>' +
            '<div class="setup-actions">' +
                '<button class="setup-btn load" ng-click="applySettings()">APPLY SETTINGS</button>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>' +

// COMING SOON
'<div class="body coming-soon" ng-show="isComingSoon()">' +
    '<div class="cs-title">{{comingSoonLabel()}}</div>' +
    '<div class="cs-sub">COMING SOON</div>' +
'</div>' +

'</div>',
        link: function(scope, element) {

            scope.booting = false
            var ignitionWasOff = true
            var bootTimer = null
            var bootProgress = 0
            var bootInterval = null
            var boostMaxGears = 6
            var mapMaxRpm = 6000

            // --- STATE ---
            scope.activeTab = 'dash'
            scope.rpm = 0
            scope.tps = 0
            scope.boost = 0
            scope.afr = 0
            scope.effAfr = 0
            scope.gear = 'N'
            scope.watertemp = 0
            scope.oiltemp = 0
            scope.oilpressure = 0
            scope.speed = 0
            scope.fuel = 0
            scope.engineLoad = 0
            scope.multiplier = 1.0
            scope.hasAdvancedEngine = false
            scope.rTier = 0
            scope.editMode = false
            scope.mapVisible = true
            scope.timingEditMode = false
            scope.timingMapVisible = true
            scope.ignAdv = 0
            scope.timingError = 0
            scope.revLimiterRPM = 0

            var settingsLoaded = false

            var timingMapData = []
            var timingSelected = new Set()
            var timingDragStart = null
            var timingInputtingCell = null

            var STATUS_STRIP_TABS = ['fuel', 'timing', 'boost', 'safe']
            var COMING_SOON_TABS = ['logs']
            var TAB_LABELS = {
                timing: 'TIMING',
                boost: 'BOOST',
                safe: 'SAFE',
                setup: 'SETUP',
                logs: 'LOGS / FAULTS'
            }

            scope.showStatusStrip = function() {
                return STATUS_STRIP_TABS.indexOf(scope.activeTab) >= 0
            }

            scope.isComingSoon = function() {
                return COMING_SOON_TABS.indexOf(scope.activeTab) >= 0
            }

            scope.comingSoonLabel = function() {
                return TAB_LABELS[scope.activeTab] || scope.activeTab.toUpperCase()
            }

            scope.setTab = function(tab) {
                if(scope.activeTab === 'fuel' && tab !== 'fuel' && scope.editMode) {
                    scope.toggleMode()
                }
                scope.activeTab = tab
                injectOverlay(tab)
                if(tab === 'fuel') {
                    setTimeout(function() { renderMap() }, 0)
                }
                if(tab === 'timing') {
                    setTimeout(function() { renderTimingMap() }, 0)
                }
                if(tab === 'boost') {
                    setTimeout(function() { renderBoostMap() }, 0)
                }
                if(tab === 'setup') {
                    settingsLoaded = false
                    bngApi.engineLua('extensions.jtechSave.pushTuneListToUI()')
                    bngApi.activeObjectLua('extensions.auto_jtechECU.getSettings()', function(data) {
                        scope.$apply(function() { if(data) populateSettingsInputs(data) })
                    })
                }
                if(tab === 'safe') {
                    bngApi.activeObjectLua('extensions.auto_jtechECU.getStatus()', function(data) {
                        scope.$apply(function() {
                            if(data.safeSettings) populateSafeInputs(data.safeSettings)
                        })
                    })
                }
            }

            function setText(id, val) {
                var el = document.getElementById(id)
                if(el) el.textContent = val
            }

            function setBar(id, pct, warn) {
                var el = document.getElementById(id)
                if(!el) return
                el.style.width = Math.min(100, Math.max(0, pct)) + '%'
                el.className = 'rbf' + (warn ? ' w' : '')
            }

            function clampPct(val, max) {
                return Math.min(100, Math.max(0, (val / max) * 100))
            }

            function tempBarPct(temp) {
                return clampPct(temp - 60, 80)
            }
            // --- TIER GATING ---
            function getTabOverlay(tab) {
                if(tab === 'logs' || tab === 'dash' || tab === 'setup') return null
                if(scope.rTier === 0)
                    return { title: 'NO ECU DETECTED', sub: 'Install a JTECH R-Series ECU to unlock.' }
                if(scope.rTier === 1 && (tab === 'fuel' || tab === 'boost'))
                    return { title: 'R2 ECU REQUIRED', sub: 'Upgrade your ECU to unlock fuel and boost map editing.' }
                if(scope.rTier === 1 && tab === 'timing')
                    return { title: 'R3 ECU REQUIRED', sub: 'Upgrade your ECU to unlock ignition timing.' }
                if(scope.rTier === 2 && tab === 'timing')
                    return { title: 'R3 ECU REQUIRED', sub: 'Upgrade your ECU to unlock ignition timing.' }
                return null
            }

            function injectOverlay(tab) {
                var existing = document.querySelector('.tab-overlay')
                if(existing) existing.parentNode.removeChild(existing)
                var overlay = getTabOverlay(tab)
                if(!overlay) return
                setTimeout(function() {
                    var bodies = document.querySelectorAll('.body')
                    var body = null
                    bodies.forEach(function(b) {
                        var ng = b.getAttribute('ng-show')
                        if(ng && ng.indexOf("'" + tab + "'") >= 0) body = b
                    })
                    if(!body) return
                    body.style.position = 'relative'
                    var el = document.createElement('div')
                    el.className = 'tab-overlay'
                    el.innerHTML =
                        '<div class="tab-overlay-icon">⬡</div>' +
                        '<div class="tab-overlay-title">' + overlay.title + '</div>' +
                        '<div class="tab-overlay-sub">' + overlay.sub + '</div>'
                    body.appendChild(el)
                }, 0)
            }
            // MAP State
            function buildRpmCols() {
                var cols = []
                for(var r = 1000; r <= mapMaxRpm; r += 1000) cols.push(r)
                return cols
            }
            var RPM_COLS = buildRpmCols()
            var LOAD_ROWS = [100, 80, 60, 40, 20, 0]
            var mapData = []
            var selected = new Set()
            var dragStart = null
            var dragState = null
            var inputtingCell = null

            // --- MAP FUNCTIONS ---
            function initMapData(luaMap) {
                RPM_COLS = buildRpmCols()
                mapData = []
                LOAD_ROWS.forEach(function(load, ri) {
                    mapData[ri] = []
                    RPM_COLS.forEach(function(rpm, ci) {
                        var rpmKey = String(rpm)
                        var luaIdx = LOAD_ROWS.length - 1 - ri
                        if(luaMap[rpmKey] && luaMap[rpmKey][luaIdx] !== undefined) {
                            mapData[ri][ci] = luaMap[rpmKey][luaIdx]
                        } else {
                            mapData[ri][ci] = 1.0
                        }
                    })
                })
                renderMap()
            }

            function onCellMouseDown(e,ri,ci) {
                if(!scope.editMode) return
                e.preventDefault()
                if(inputtingCell){ inputtingCell=null }
                if(!e.shiftKey) selected.clear()
                selected.add(cellKey(ri,ci))
                dragState = {
                    startR: ri, startC: ci,
                    origVals: captureVals()
                }
                dragStart = {r:ri, c:ci}
                renderMap()
                updateEditBar()
            }

function onCellEnter(e,ri,ci) {
    if(!scope.editMode) return
    if(e.buttons===1 && dragState && !e.shiftKey) {
        if(dragStart) {
            var minR=Math.min(dragStart.r,ri), maxR=Math.max(dragStart.r,ri)
            var minC=Math.min(dragStart.c,ci), maxC=Math.max(dragStart.c,ci)
            selected.clear()
            for(var r=minR;r<=maxR;r++) for(var c=minC;c<=maxC;c++) selected.add(cellKey(r,c))
            dragState.origVals = captureVals()
        }
        renderMap()
        updateEditBar()
    }
}

function onCellDblClick(e,ri,ci) {
    if(!scope.editMode) return
    e.stopPropagation()
    selected.clear()
    selected.add(cellKey(ri,ci))
    inputtingCell = cellKey(ri,ci)
    renderMap()
    updateEditBar()
}

function captureVals() {
    var snap = {}
    selected.forEach(function(k) {
        var rc = parseKey(k)
        snap[k] = mapData[rc[0]][rc[1]]
    })
    return snap
}

function commitInlineInput(ri,ci,val) {
    var v = parseFloat(val)
    if(!isNaN(v)) mapData[ri][ci] = Math.max(0, Math.min(5.0, v))
    inputtingCell = null
    renderMap()
    updateEditBar()
}

function updateEditBar() {
    var info = document.getElementById('jtech-eb-info')
    var val = document.getElementById('jtech-eb-val')
    var hint = document.getElementById('jtech-eb-hint')
    var inp = document.getElementById('jtech-eb-input')
    if(!info || !val || !hint || !inp) return

    if(!scope.editMode) {
        info.textContent = 'EDIT MODE OFF'
        val.textContent = '—'
        hint.textContent = 'enable edit mode to modify'
        inp.disabled = true
        inp.value = ''
        return
    }

    inp.disabled = selected.size === 0

    if(selected.size === 0) {
        info.textContent = 'NO SELECTION'
        val.textContent = '—'
        hint.textContent = 'click or drag to select cells'
    } else if(selected.size === 1) {
        var rc = parseKey([...selected][0])
        info.textContent = RPM_COLS[rc[1]]+' RPM / '+LOAD_ROWS[rc[0]]+'% LOAD'
        val.textContent = mapData[rc[0]][rc[1]].toFixed(2)
        hint.textContent = '+/−  ·  ↑↓ keys  ·  dbl-click to type  ·  or type below + SET'
    } else {
        var vals = [...selected].map(function(k){ var rc=parseKey(k); return mapData[rc[0]][rc[1]] })
        var mn = Math.min.apply(null,vals), mx = Math.max.apply(null,vals)
        info.textContent = selected.size+' CELLS SELECTED'
        val.textContent = mn===mx ? mn.toFixed(2) : mn.toFixed(2)+'–'+mx.toFixed(2)
        hint.textContent = '+/−  ·  ↑↓ keys  ·  or type absolute below + SET'
    }
}

scope.applyAbsolute = function() {
    var inp = document.getElementById('jtech-eb-input')
    var v = parseFloat(inp.value)
    if(isNaN(v) || selected.size===0) return
    selected.forEach(function(k) {
        var rc = parseKey(k)
        if(!mapData[rc[0]]) mapData[rc[0]] = []
        mapData[rc[0]][rc[1]] = Math.max(0, Math.min(5.0, v))
    })
    inp.value = ''
    renderMap()
    updateEditBar()
    pushMapToLua()
}

function pushMapToLua() {
    var parts = []
    RPM_COLS.forEach(function(rpm, ci) {
        var vals = []
        for(var ri = LOAD_ROWS.length - 1; ri >= 0; ri--) {
            vals.push(mapData[ri][ci])
        }
        parts.push('[' + rpm + ']={' + vals.join(',') + '}')
    })
    var luaStr = '{' + parts.join(',') + '}'
    bngApi.activeObjectLua('extensions.auto_jtechECU.setFuelMap(' + luaStr + ')')
}

function startBoot() {
    scope.booting = true
    bootProgress = 0
    var splash = document.getElementById('jtech-splash')
    var bar = document.getElementById('jtech-splash-bar')
    var status = document.getElementById('jtech-splash-status')
    if(splash) splash.style.display = 'flex'
    if(status) status.textContent = 'INITIALIZING...'

    if(bootInterval) clearInterval(bootInterval)
    bootInterval = setInterval(function() {
        bootProgress += 100 / (1800 / 50) // reach 100% in ~1.8s, leaving 200ms buffer
        if(bar) bar.style.width = Math.min(100, bootProgress) + '%'
        if(bootProgress >= 100) {
            clearInterval(bootInterval)
            bootInterval = null
        }
    }, 50)

    if(bootTimer) clearTimeout(bootTimer)
    bootTimer = setTimeout(function() {
        scope.booting = false
        if(splash) splash.style.display = 'none'
        if(status) status.textContent = 'ECU LINK ACTIVE'
    }, 2000)
}

function showStandby() {
    scope.booting = true
    if(bootTimer) { clearTimeout(bootTimer); bootTimer = null }
    if(bootInterval) { clearInterval(bootInterval); bootInterval = null }
    var splash = document.getElementById('jtech-splash')
    var bar = document.getElementById('jtech-splash-bar')
    var status = document.getElementById('jtech-splash-status')
    if(splash) splash.style.display = 'flex'
    if(bar) bar.style.width = '0%'
    if(status) status.textContent = 'STANDBY'
}

function updateDOM(data) {
    var speedKph = Math.round((data.wheelspeed || 0) * 3.6)
    scope.speed = speedKph
    var oilpDisplay = scope.oilpressure > 0 ? Math.round(scope.oilpressure) : '--'
    var afrLean = parseFloat(scope.afr) > 0 && parseFloat(scope.afr) < 13.0
    var waterHot = scope.watertemp > 100
    var oilHot = scope.oiltemp > 120
    

    // status strip
    setText('jtech-s-rpm', scope.rpm)
    setText('jtech-s-tps', scope.tps + '%')
    setText('jtech-s-afr', scope.afr)
    setText('jtech-s-boost', scope.boost)
    setText('jtech-s-gear', scope.gear)
    setText('jtech-s-spd', speedKph)
    setText('jtech-s-water', scope.watertemp)
    setText('jtech-s-oil', scope.oiltemp)
    setText('jtech-s-oilp', oilpDisplay)

    var afrStrip = document.getElementById('jtech-s-afr')
    if(afrStrip) afrStrip.className = 'sval' + (afrLean ? ' w' : '')
    var waterStrip = document.getElementById('jtech-s-water')
    if(waterStrip) waterStrip.className = 'sval n' + (waterHot ? ' w' : '')
    var oilStrip = document.getElementById('jtech-s-oil')
    if(oilStrip) oilStrip.className = 'sval n' + (oilHot ? ' w' : '')

    // dash panel
    setText('jtech-d-rpm', scope.rpm)
    setBar('jtech-d-rpm-bar', clampPct(scope.rpm, 7000))
    setText('jtech-d-tps', scope.tps + '%')
    setBar('jtech-d-tps-bar', scope.tps)
    setText('jtech-d-afr', scope.afr)
    setBar('jtech-d-afr-bar', clampPct(parseFloat(scope.afr) || 0, 20), afrLean)
    setText('jtech-d-boost', scope.boost)
    setBar('jtech-d-boost-bar', clampPct(parseFloat(scope.boost) || 0, 20))
    setText('jtech-d-gear', scope.gear)
    setText('jtech-d-spd', speedKph)
    setBar('jtech-d-spd-bar', clampPct(speedKph, 200))
    setText('jtech-d-water', scope.watertemp)
    setBar('jtech-d-water-bar', tempBarPct(scope.watertemp), waterHot)
    setText('jtech-d-oil', scope.oiltemp)
    setBar('jtech-d-oil-bar', tempBarPct(scope.oiltemp), oilHot)
    setText('jtech-d-oilp', oilpDisplay)
    setBar('jtech-d-oilp-bar', clampPct(scope.oilpressure || 0, 60))
    setText('jtech-d-fuel', scope.fuel + '%')
    setBar('jtech-d-fuel-bar', scope.fuel, scope.fuel < 15)
    setText('jtech-d-load', scope.engineLoad)
    setBar('jtech-d-load-bar', parseFloat(scope.engineLoad) * 100 || 0)
    setText('jtech-d-mult', (scope.multiplier || 1.0).toFixed(2))
    setBar('jtech-d-mult-bar', clampPct(scope.multiplier || 0, 3))

    var dAfrBlock = document.getElementById('jtech-d-afr-block')
    if(dAfrBlock) dAfrBlock.className = 'db dash-box' + (afrLean ? ' warn' : '')
    var dWaterBlock = document.getElementById('jtech-d-water-block')
    if(dWaterBlock) dWaterBlock.className = 'db dash-box' + (waterHot ? ' warn' : '')
    var dOilBlock = document.getElementById('jtech-d-oil-block')
    if(dOilBlock) dOilBlock.className = 'db dash-box' + (oilHot ? ' warn' : '')

    var gLoad = document.getElementById('jtech-g-load')
    var gMult = document.getElementById('jtech-g-mult')
    var gAfrBar = document.getElementById('jtech-g-afr-bar')
    var gLoadBar = document.getElementById('jtech-g-load-bar')
    var gMultBar = document.getElementById('jtech-g-mult-bar')

    var gAfrTarget = document.getElementById('jtech-g-afr-target')
    var gAfrEff = document.getElementById('jtech-g-afr-eff')
    if(gAfrTarget) gAfrTarget.textContent = parseFloat(scope.afr) > 0 ? scope.afr : '--'
    if(gAfrEff) gAfrEff.textContent = parseFloat(scope.effAfr) > 0 ? scope.effAfr : '--'
    var afrDiff = Math.abs((scope.effAfr || 0) - (scope.afr || 0))
    var afrColor = afrDiff < 0.5 ? 'var(--teal)' : afrDiff < 1.5 ? 'var(--amber)' : 'var(--red)'
    if(gAfrBar) {
        gAfrBar.style.width = Math.min(100, ((scope.effAfr || 0) / 20.0) * 100) + '%'
        gAfrBar.style.background = afrColor
        }
    if(gLoad) gLoad.textContent = scope.engineLoad
    if(gMult) gMult.textContent = (scope.multiplier || 1.0).toFixed(2)
    if(gLoadBar) gLoadBar.style.width = (scope.engineLoad * 100) + '%'
    if(gMultBar) gMultBar.style.width = Math.min(100, (scope.multiplier / 3.0) * 100) + '%'

    // timing tab gauges
    var tIgnAdv = document.getElementById('jtech-t-ign-adv')
    var tKnock = document.getElementById('jtech-t-knock')
    var tKnockBar = document.getElementById('jtech-t-knock-bar')
    var tLoad = document.getElementById('jtech-t-load')
    var tLoadBar = document.getElementById('jtech-t-load-bar')
    if(tIgnAdv) tIgnAdv.textContent = (data.ignAdv || 0).toFixed(1) + '°'
    var knockVal = Math.abs(data.timingError || 0) * 57.3 // rad to deg
    var knockColor = knockVal > 1.5 ? 'var(--red)' : knockVal > 0.5 ? 'var(--amber)' : 'var(--teal)'
    if(tKnock){ tKnock.textContent = knockVal > 0.05 ? '-'+knockVal.toFixed(1)+'°' : '0.0°'; tKnock.style.color = knockColor }
    if(tKnockBar){ tKnockBar.style.width = Math.min(100,(knockVal/5)*100)+'%'; tKnockBar.style.background = knockColor }
    if(tLoad) tLoad.textContent = (data.engineLoad || 0).toFixed(2)
    if(tLoadBar) tLoadBar.style.width = Math.min(100,(data.engineLoad||0)*100)+'%'
    if(scope.activeTab === 'timing') renderTimingMap()

    // Boost Map
    var bBoost = document.getElementById('jtech-b-boost')
    var bBoostBar = document.getElementById('jtech-b-boost-bar')
    var bOffset = document.getElementById('jtech-b-offset')
    var bGear = document.getElementById('jtech-b-gear')
    if(bBoost) bBoost.textContent = (data.liveBoost || 0).toFixed(1)
    if(bBoostBar) bBoostBar.style.width = Math.min(100, ((data.liveBoost||0) / (boostMaxLocal||10.5)) * 100) + '%'
    if(bOffset) bOffset.textContent = (data.currentBoostOffset || 0).toFixed(1)
    if(bGear) bGear.textContent = data.gear || 'N'
    if(scope.activeTab === 'boost') renderBoostMap()

    var statusText = document.getElementById('jtech-status-text')
    var sdot = document.getElementById('jtech-sdot')
    if(statusText && sdot) {
        if(scope.hasAdvancedEngine) {
            statusText.textContent = 'ECU LINK ACTIVE'
            sdot.style.background = 'var(--teal)'
        } else {
            statusText.textContent = 'ADV ENGINE NOT FOUND'
            sdot.style.background = 'var(--red)'
        }
    }
    if(scope.activeTab === 'safe') updateSafeStatus(data)
}

scope.toggleMode = function() {
    if(scope.rTier < 2) return
    scope.editMode = !scope.editMode
    selected.clear()
    inputtingCell = null

    var btn = document.getElementById('jtech-mode-btn')
    var badge = document.getElementById('jtech-map-badge')
    var hint = document.getElementById('jtech-tl-hint')

    if(btn) btn.textContent = scope.editMode ? '✎ EDIT MODE' : '● MONITOR'
    if(btn) btn.className = 'mode-btn ' + (scope.editMode ? 'edit' : 'monitor')
    if(badge) badge.textContent = scope.editMode ? 'EDIT MODE' : 'LIVE'
    if(badge) badge.className = 'badge ' + (scope.editMode ? 'edit' : 'live')
    if(hint) hint.textContent = scope.editMode ? 'click or drag to select — +/− or ↑↓ to adjust' : 'click edit to modify cells'

    updateEditBar()
    renderMap()
}

scope.toggleMap = function() {
    scope.mapVisible = !scope.mapVisible
    var body = document.getElementById('jtech-map-body')
    var btn = document.getElementById('jtech-map-toggle')
    var editBar = document.getElementById('jtech-edit-bar')
    if(body) body.style.display = scope.mapVisible ? '' : 'none'
    if(btn) btn.textContent = scope.mapVisible ? '▲ HIDE' : '▼ SHOW'
    if(editBar) editBar.style.display = scope.mapVisible ? '' : 'none'
}

document.addEventListener('mouseup', function(e) {
    if(dragState){ dragState = null }
    timingDragStart = null
})

document.addEventListener('keydown', function(e) {
    if(e.key==='Escape'){
        selected.clear()
        inputtingCell = null
        renderMap()
        updateEditBar()
        return
    }
    if(e.key==='ArrowUp' || e.key==='ArrowDown') {
        e.preventDefault()
        var delta = e.key==='ArrowUp' ? 0.1 : -0.1
        selected.forEach(function(k) {
            var rc = parseKey(k)
            if(!mapData[rc[0]]) mapData[rc[0]] = []
            mapData[rc[0]][rc[1]] = Math.max(0, Math.min(5.0, Math.round((mapData[rc[0]][rc[1]] + delta) * 100) / 100))
        })
        renderMap()
        updateEditBar()
        pushMapToLua()
    }
    if(e.key==='+' || e.key==='=') {
        e.preventDefault()
        selected.forEach(function(k) {
            var rc = parseKey(k)
            if(!mapData[rc[0]]) mapData[rc[0]] = []
            mapData[rc[0]][rc[1]] = Math.max(0, Math.min(5.0, Math.round((mapData[rc[0]][rc[1]] + 0.1) * 100) / 100))
        })
        renderMap()
        updateEditBar()
        pushMapToLua()
    }
    if(e.key==='-') {
        e.preventDefault()
        selected.forEach(function(k) {
            var rc = parseKey(k)
            if(!mapData[rc[0]]) mapData[rc[0]] = []
            mapData[rc[0]][rc[1]] = Math.max(0, Math.min(5.0, Math.round((mapData[rc[0]][rc[1]] - 0.1) * 100) / 100))
        })
        renderMap()
        updateEditBar()
        pushMapToLua()
    }
    // timing map keys
    if(scope.activeTab === 'timing' && scope.timingEditMode && timingSelected.size > 0) {
        var tdelta = 0
        if(e.key==='ArrowUp'||e.key==='+'||e.key==='=') tdelta = 0.5
        if(e.key==='ArrowDown'||e.key==='-') tdelta = -0.5
        if(tdelta !== 0) {
            e.preventDefault()
            timingSelected.forEach(function(k) {
                var rc = parseKey(k)
                timingMapData[rc[0]][rc[1]] = Math.max(0, Math.min(45, Math.round((timingMapData[rc[0]][rc[1]] + tdelta) * 10) / 10))
            })
            renderTimingMap(); updateTimingEditBar(); pushTimingMapToLua()
        }
    }
    if(scope.activeTab === 'boost' && scope.boostEditMode && boostSelected.size > 0) {
    var bdelta = 0
    if(e.key==='ArrowUp'||e.key==='+'||e.key==='=') bdelta = 0.1
    if(e.key==='ArrowDown'||e.key==='-') bdelta = -0.1
    if(bdelta !== 0) {
        e.preventDefault()
        var bdata = getBoostCurrentData()
        boostSelected.forEach(function(k) {
            var rc = k.split(',')
            if(bdata[+rc[0]]) bdata[+rc[0]][+rc[1]] = Math.max(-25, Math.min(25, Math.round((bdata[+rc[0]][+rc[1]] + bdelta)*10)/10))
        })
        renderBoostMap(); updateBoostEditBar(); pushBoostMapToLua()
    }
}
})

// --- TIMING MAP ---
function initTimingMapData(luaMap) {
    RPM_COLS = buildRpmCols()
    timingMapData = []
    LOAD_ROWS.forEach(function(load, ri) {
        timingMapData[ri] = []
        RPM_COLS.forEach(function(rpm, ci) {
            var rpmKey = String(rpm)
            var luaIdx = LOAD_ROWS.length - 1 - ri
            if(luaMap[rpmKey] && luaMap[rpmKey][luaIdx] !== undefined) {
                timingMapData[ri][ci] = luaMap[rpmKey][luaIdx]
            } else {
                timingMapData[ri][ci] = 15.0
            }
        })
    })
    renderTimingMap()
}

function getTimingColorClass(v) {
    if(v>=34)return'v7'; if(v>=30)return'v6'; if(v>=26)return'v5';
    if(v>=22)return'v4'; if(v>=18)return'v3'; if(v>=14)return'v2';
    if(v>=10)return'v1'; return'v0';
}

function renderTimingMap() {
    RPM_COLS = buildRpmCols()
    var liveRpmIdx = 0, liveLoadIdx = 0
    RPM_COLS.forEach(function(r,i){ if(scope.rpm >= r) liveRpmIdx = i })
    LOAD_ROWS.forEach(function(l,ri){ if(scope.tps <= l) liveLoadIdx = ri })

    var grid = document.getElementById('jtech-t-map-grid')
    if(!grid) return
    grid.innerHTML = ''

    var hdrRow = document.createElement('div')
    hdrRow.style.cssText = 'display:flex;gap:3px;margin-bottom:3px;padding-left:32px;'
    RPM_COLS.forEach(function(rpm, i) {
        var h = document.createElement('div')
        h.className = 'axl' + (i === liveRpmIdx ? ' live-col' : '')
        h.textContent = rpm
        hdrRow.appendChild(h)
    })
    grid.appendChild(hdrRow)

    LOAD_ROWS.forEach(function(load, ri) {
        var row = document.createElement('div')
        row.className = 'map-row'
        var lbl = document.createElement('div')
        lbl.className = 'row-lbl'
        lbl.textContent = load
        row.appendChild(lbl)

        RPM_COLS.forEach(function(rpm, ci) {
            var cell = document.createElement('div')
            var k = cellKey(ri, ci)
            var isLive = ri === liveLoadIdx && ci === liveRpmIdx
            var isSel = timingSelected.has(k)
            var val = (timingMapData[ri] && timingMapData[ri][ci] !== undefined) ? timingMapData[ri][ci] : 15.0
            var cls = 'cell ' + getTimingColorClass(val)
            if(scope.timingEditMode) cls += ' can-edit'
            if(isLive) cls += ' live-cell'
            if(isSel) cls += ' selected'
            cell.className = cls

            if(isSel && timingInputtingCell === k) {
                var inp = document.createElement('input')
                inp.className = 'cell-input'
                inp.type = 'number'
                inp.value = val
                inp.addEventListener('keydown', function(e) {
                    if(e.key==='Enter'){ commitTimingInline(ri,ci,inp.value); e.preventDefault() }
                    if(e.key==='Escape'){ timingInputtingCell=null; renderTimingMap() }
                    e.stopPropagation()
                })
                inp.addEventListener('click', function(e){ e.stopPropagation() })
                cell.appendChild(inp)
                setTimeout(function(){ inp.focus(); inp.select() }, 10)
            } else {
                cell.textContent = val.toFixed(1) + '°'
            }

            if(scope.timingEditMode) {
                cell.addEventListener('mousedown', function(e){ onTimingCellMouseDown(e,ri,ci) })
                cell.addEventListener('mouseenter', function(e){ onTimingCellEnter(e,ri,ci) })
                cell.addEventListener('dblclick', function(e){ onTimingCellDblClick(e,ri,ci) })
            }
            row.appendChild(cell)
        })
        grid.appendChild(row)
    })

    var countEl = document.getElementById('jtech-t-sel-count')
    if(countEl) countEl.textContent = timingSelected.size ? timingSelected.size+' CELL'+(timingSelected.size>1?'S':'')+' SELECTED' : ''
    var coordEl = document.getElementById('jtech-t-cell-coords')
    if(coordEl) {
        if(timingSelected.size===1){ var rc=parseKey([...timingSelected][0]); coordEl.textContent=RPM_COLS[rc[1]]+' RPM / '+LOAD_ROWS[rc[0]]+'% LOAD' }
        else if(timingSelected.size>1) coordEl.textContent=timingSelected.size+' CELLS'
        else coordEl.textContent=''
    }
}

function onTimingCellMouseDown(e,ri,ci) {
    if(!scope.timingEditMode) return
    e.preventDefault()
    timingInputtingCell = null
    if(!e.shiftKey) timingSelected.clear()
    timingSelected.add(cellKey(ri,ci))
    timingDragStart = {r:ri, c:ci}
    renderTimingMap(); updateTimingEditBar()
}

function onTimingCellEnter(e,ri,ci) {
    if(!scope.timingEditMode || !e.buttons) return
    if(timingDragStart) {
        var minR=Math.min(timingDragStart.r,ri), maxR=Math.max(timingDragStart.r,ri)
        var minC=Math.min(timingDragStart.c,ci), maxC=Math.max(timingDragStart.c,ci)
        timingSelected.clear()
        for(var r=minR;r<=maxR;r++) for(var c=minC;c<=maxC;c++) timingSelected.add(cellKey(r,c))
        renderTimingMap(); updateTimingEditBar()
    }
}

function onTimingCellDblClick(e,ri,ci) {
    if(!scope.timingEditMode) return
    e.stopPropagation()
    timingSelected.clear()
    timingSelected.add(cellKey(ri,ci))
    timingInputtingCell = cellKey(ri,ci)
    renderTimingMap(); updateTimingEditBar()
}

function commitTimingInline(ri,ci,val) {
    var v = parseFloat(val)
    if(!isNaN(v)) timingMapData[ri][ci] = Math.max(0, Math.min(45, v))
    timingInputtingCell = null
    renderTimingMap(); updateTimingEditBar()
}

function updateTimingEditBar() {
    var info = document.getElementById('jtech-t-eb-info')
    var val = document.getElementById('jtech-t-eb-val')
    var hint = document.getElementById('jtech-t-eb-hint')
    var inp = document.getElementById('jtech-t-eb-input')
    if(!info) return
    if(!scope.timingEditMode) {
        info.textContent='EDIT MODE OFF'; val.textContent='—'
        hint.textContent='enable edit mode to modify'; inp.disabled=true; inp.value=''; return
    }
    inp.disabled = timingSelected.size===0
    if(timingSelected.size===0){
        info.textContent='NO SELECTION'; val.textContent='—'; hint.textContent='click or drag to select cells'
    } else if(timingSelected.size===1){
        var rc=parseKey([...timingSelected][0])
        info.textContent=RPM_COLS[rc[1]]+' RPM / '+LOAD_ROWS[rc[0]]+'% LOAD'
        val.textContent=timingMapData[rc[0]][rc[1]].toFixed(1)+'°'
        hint.textContent='+/−  ·  ↑↓ keys  ·  dbl-click to type  ·  or SET below'
    } else {
        var vals=[...timingSelected].map(function(k){ var rc=parseKey(k); return timingMapData[rc[0]][rc[1]] })
        var mn=Math.min.apply(null,vals), mx=Math.max.apply(null,vals)
        info.textContent=timingSelected.size+' CELLS SELECTED'
        val.textContent=mn===mx?mn.toFixed(1)+'°':mn.toFixed(1)+'°–'+mx.toFixed(1)+'°'
        hint.textContent='+/−  ·  ↑↓ keys  ·  or SET absolute below'
    }
}

scope.toggleTimingMode = function() {
    if(scope.rTier < 3) return
    scope.timingEditMode = !scope.timingEditMode
    timingSelected.clear(); timingInputtingCell = null
    var btn = document.getElementById('jtech-t-mode-btn')
    var badge = document.getElementById('jtech-t-map-badge')
    var hint = document.getElementById('jtech-t-tl-hint')
    if(btn){ btn.textContent = scope.timingEditMode ? '✎ EDIT MODE' : '● MONITOR'; btn.className = 'mode-btn '+(scope.timingEditMode?'edit':'monitor') }
    if(badge){ badge.textContent = scope.timingEditMode ? 'EDIT MODE' : 'LIVE'; badge.className = 'badge '+(scope.timingEditMode?'edit':'live') }
    if(hint) hint.textContent = scope.timingEditMode ? 'click or drag to select — +/− or ↑↓ to adjust' : 'click edit to modify cells'
    updateTimingEditBar(); renderTimingMap()
}

scope.toggleTimingMap = function() {
    scope.timingMapVisible = !scope.timingMapVisible
    var body = document.getElementById('jtech-t-map-body')
    var btn = document.getElementById('jtech-t-map-toggle')
    var editBar = document.getElementById('jtech-t-edit-bar')
    if(body) body.style.display = scope.timingMapVisible ? '' : 'none'
    if(btn) btn.textContent = scope.timingMapVisible ? '▲ HIDE' : '▼ SHOW'
    if(editBar) editBar.style.display = scope.timingMapVisible ? '' : 'none'
}

scope.applyTimingAbsolute = function() {
    var inp = document.getElementById('jtech-t-eb-input')
    var v = parseFloat(inp.value)
    if(isNaN(v) || timingSelected.size===0) return
    timingSelected.forEach(function(k) {
        var rc = parseKey(k)
        timingMapData[rc[0]][rc[1]] = Math.max(0, Math.min(45, v))
    })
    inp.value = ''
    renderTimingMap(); updateTimingEditBar(); pushTimingMapToLua()
}

function pushTimingMapToLua() {
    var parts = []
    RPM_COLS.forEach(function(rpm, ci) {
        var vals = []
        for(var ri = LOAD_ROWS.length - 1; ri >= 0; ri--) {
            vals.push(timingMapData[ri][ci])
        }
        parts.push('[' + rpm + ']={' + vals.join(',') + '}')
    })
    var luaStr = '{' + parts.join(',') + '}'
    bngApi.activeObjectLua('extensions.auto_jtechECU.setTimingMap(' + luaStr + ')')
}

// --- BOOST MAP ---
function buildBoostRpmRows() { return buildRpmCols().slice().reverse() }
var BOOST_RPM_ROWS = buildBoostRpmRows()
var boostOffsetMapData = []
var boostFuelTrimMapData = []
var boostBreaksLocal = [0, 2, 4.1, 6.2, 8.3, 10.4]
var boostMaxLocal = 10.5
var boostSelected = new Set()
var boostInputtingCell = null
var boostDragStart = null
var activeBoostMap = 'offset'
var boostAxis = 'boost'
scope.boostEditMode = false
scope.boostMapVisible = true

function initBoostOffsetMapData(luaMap) {
    BOOST_RPM_ROWS = buildBoostRpmRows()
    boostOffsetMapData = []
    BOOST_RPM_ROWS.forEach(function(rpm, ri) {
        boostOffsetMapData[ri] = []
        for(var ci = 0; ci < boostMaxGears; ci++) {
            var rpmKey = String(rpm)
            if(luaMap[rpmKey] && luaMap[rpmKey][ci] !== undefined) {
                boostOffsetMapData[ri][ci] = luaMap[rpmKey][ci]
            } else {
                boostOffsetMapData[ri][ci] = 0.0
            }
        }
    })
    if(activeBoostMap === 'offset') renderBoostMap()
}

function initBoostFuelTrimMapData(luaMap) {
    BOOST_RPM_ROWS = buildBoostRpmRows()
    boostFuelTrimMapData = []
    BOOST_RPM_ROWS.forEach(function(rpm, ri) {
        boostFuelTrimMapData[ri] = []
        for(var ci = 0; ci < boostMaxGears; ci++) {
            var rpmKey = String(rpm)
            if(luaMap[rpmKey] && luaMap[rpmKey][ci] !== undefined) {
                boostFuelTrimMapData[ri][ci] = luaMap[rpmKey][ci]
            } else {
                boostFuelTrimMapData[ri][ci] = 0.0
            }
        }
    })
    if(activeBoostMap === 'fuel') renderBoostMap()
}

function getBoostColLabels() {
    var gearLabels = []
    for(var g = 1; g <= boostMaxGears; g++) gearLabels.push('G'+g)
    if(activeBoostMap === 'offset') return gearLabels
    return boostAxis === 'boost'
        ? boostBreaksLocal.slice(0, boostMaxGears).map(function(v){ return v.toFixed(1) })
        : gearLabels
}

function getBoostLiveColIdx() {
    if(activeBoostMap === 'offset' || boostAxis === 'gear') {
        var g = parseInt(scope.gear) || 0
        return Math.min(boostMaxGears - 1, Math.max(0, g - 1))
    }
    var boost = parseFloat(scope.boost) || 0
    var idx = 0
    boostBreaksLocal.slice(0, boostMaxGears).forEach(function(b, i){ if(boost >= b) idx = i })
    return idx
}

function getBoostLiveRowIdx() {
    var rpm = scope.rpm || 0
    for(var i = 0; i < BOOST_RPM_ROWS.length; i++) {
        if(rpm >= BOOST_RPM_ROWS[i]) return i
    }
    return BOOST_RPM_ROWS.length - 1
}

function getBoostCurrentData() {
    return activeBoostMap === 'offset' ? boostOffsetMapData : boostFuelTrimMapData
}

function getBoostCellColor(val) {
    if(val === 0) return {bg:'#0f1a14', color:'#1a4a30'}
    if(val > 0) {
        var t = Math.min(1, val / 25)
        var g = Math.round(0x1B + t * (0xC9 - 0x1B))
        var bch = Math.round(0x24 + t * (0xA7 - 0x24))
        return {bg:'rgba(0,'+g+','+bch+','+(0.12+t*0.35)+')', color:'#'+(t>0.5?'00E5A0':'20c080')}
    } else {
        var t2 = Math.min(1, Math.abs(val) / 25)
        return {bg:'rgba(232,64,64,'+(0.1+t2*0.35)+')', color: t2>0.5?'#E84040':'#c04040'}
    }
}

function getBoostUnitLabel() {
    return activeBoostMap === 'offset' ? 'psi' : '%'
}

function renderBoostMap() {
    RPM_COLS = buildRpmCols()
    BOOST_RPM_ROWS = buildBoostRpmRows()
    var grid = document.getElementById('jtech-b-map-grid')
    if(!grid) return

    var data = getBoostCurrentData()
    if(!data) return

    var colLabels = getBoostColLabels()
    var liveRow = getBoostLiveRowIdx()
    var liveCol = getBoostLiveColIdx()
    var unit = getBoostUnitLabel()

    grid.innerHTML = ''

    var hdrRow = document.createElement('div')
    hdrRow.style.cssText = 'display:flex;gap:3px;margin-bottom:3px;padding-left:32px;'
    colLabels.forEach(function(lbl, ci) {
        var h = document.createElement('div')
        h.className = 'axl' + (ci === liveCol ? ' live-col' : '')
        h.textContent = lbl
        hdrRow.appendChild(h)
    })
    grid.appendChild(hdrRow)

    BOOST_RPM_ROWS.forEach(function(rpm, ri) {
        var row = document.createElement('div')
        row.className = 'map-row'
        var lbl = document.createElement('div')
        lbl.className = 'row-lbl'
        lbl.textContent = (rpm/1000).toFixed(0)+'k'
        row.appendChild(lbl)

        for(var ci = 0; ci < boostMaxGears; ci++) {
            var cell = document.createElement('div')
            var k = ri+','+ci
            var isLive = ri === liveRow && ci === liveCol
            var isSel = boostSelected.has(k)
            var val = (data[ri] && data[ri][ci] !== undefined) ? data[ri][ci] : 0.0
            var col = getBoostCellColor(val)

            var cls = 'cell'
            if(scope.boostEditMode) cls += ' can-edit'
            if(isLive) cls += ' live-cell'
            if(isSel) cls += ' selected'
            cell.className = cls
            if(!isSel) { cell.style.background = col.bg; cell.style.color = col.color }

            if(isSel && boostInputtingCell === k) {
                var inp = document.createElement('input')
                inp.className = 'cell-input'
                inp.type = 'number'
                inp.value = val
                inp.addEventListener('keydown', function(ri2, ci2) {
                    return function(e) {
                        if(e.key==='Enter'){ commitBoostInline(ri2,ci2,inp.value); e.preventDefault() }
                        if(e.key==='Escape'){ boostInputtingCell=null; renderBoostMap() }
                        e.stopPropagation()
                    }
                }(ri, ci))
                inp.addEventListener('click', function(e){ e.stopPropagation() })
                cell.appendChild(inp)
                setTimeout(function(){ inp.focus(); inp.select() }, 10)
            } else {
                cell.textContent = val.toFixed(1) + unit
            }

            if(scope.boostEditMode) {
                cell.addEventListener('mousedown', function(ri2, ci2){ return function(e){ onBoostCellMouseDown(e,ri2,ci2) } }(ri,ci))
                cell.addEventListener('mouseenter', function(ri2, ci2){ return function(e){ onBoostCellEnter(e,ri2,ci2) } }(ri,ci))
                cell.addEventListener('dblclick', function(ri2, ci2){ return function(e){ onBoostCellDblClick(e,ri2,ci2) } }(ri,ci))
            }
            row.appendChild(cell)
        }
        grid.appendChild(row)
    })

    var countEl = document.getElementById('jtech-b-sel-count')
    if(countEl) countEl.textContent = boostSelected.size ? boostSelected.size+' CELL'+(boostSelected.size>1?'S':'')+' SELECTED' : ''
    var coordEl = document.getElementById('jtech-b-cell-coords')
    if(coordEl) {
        if(boostSelected.size===1){ var rc=boostSelected.values().next().value.split(','); coordEl.textContent=BOOST_RPM_ROWS[+rc[0]]+'RPM / col '+(+rc[1]+1) }
        else if(boostSelected.size>1) coordEl.textContent=boostSelected.size+' CELLS'
        else coordEl.textContent=''
    }

    var titleEl = document.getElementById('jtech-b-map-title')
    if(titleEl) titleEl.textContent = activeBoostMap === 'offset' ? 'BOOST OFFSET MAP — PSI OFFSET' : 'BOOST FUEL TRIM — % TRIM'
}

function onBoostCellMouseDown(e,ri,ci) {
    if(!scope.boostEditMode) return
    e.preventDefault()
    boostInputtingCell = null
    if(!e.shiftKey) boostSelected.clear()
    boostSelected.add(ri+','+ci)
    boostDragStart = {r:ri, c:ci}
    renderBoostMap(); updateBoostEditBar()
}

function onBoostCellEnter(e,ri,ci) {
    if(!scope.boostEditMode || !e.buttons) return
    if(boostDragStart) {
        var minR=Math.min(boostDragStart.r,ri), maxR=Math.max(boostDragStart.r,ri)
        var minC=Math.min(boostDragStart.c,ci), maxC=Math.max(boostDragStart.c,ci)
        boostSelected.clear()
        for(var r=minR;r<=maxR;r++) for(var c=minC;c<=maxC;c++) boostSelected.add(r+','+c)
        renderBoostMap(); updateBoostEditBar()
    }
}

function onBoostCellDblClick(e,ri,ci) {
    if(!scope.boostEditMode) return
    e.stopPropagation()
    boostSelected.clear()
    boostSelected.add(ri+','+ci)
    boostInputtingCell = ri+','+ci
    renderBoostMap(); updateBoostEditBar()
}

function commitBoostInline(ri,ci,val) {
    var v = parseFloat(val)
    var data = getBoostCurrentData()
    if(!isNaN(v) && data[ri]) data[ri][ci] = Math.max(-25, Math.min(25, v))
    boostInputtingCell = null
    renderBoostMap(); updateBoostEditBar(); pushBoostMapToLua()
}

function updateBoostEditBar() {
    var info = document.getElementById('jtech-b-eb-info')
    var val = document.getElementById('jtech-b-eb-val')
    var hint = document.getElementById('jtech-b-eb-hint')
    var inp = document.getElementById('jtech-b-eb-input')
    if(!info) return
    if(!scope.boostEditMode) {
        info.textContent='EDIT MODE OFF'; val.textContent='—'
        hint.textContent='enable edit mode to modify'; inp.disabled=true; inp.value=''; return
    }
    var unit = getBoostUnitLabel()
    inp.disabled = boostSelected.size===0
    if(boostSelected.size===0){
        info.textContent='NO SELECTION'; val.textContent='—'; hint.textContent='click or drag to select cells'
    } else if(boostSelected.size===1){
        var rc=boostSelected.values().next().value.split(',')
        var data=getBoostCurrentData()
        info.textContent=BOOST_RPM_ROWS[+rc[0]]+' RPM'
        val.textContent=(data[+rc[0]][+rc[1]]).toFixed(1)+unit
        hint.textContent='+/−  ·  ↑↓ keys  ·  dbl-click to type  ·  or SET below'
    } else {
        info.textContent=boostSelected.size+' CELLS SELECTED'; val.textContent='multi'
        hint.textContent='+/−  ·  ↑↓ keys  ·  or SET absolute below'
    }
}

scope.applyBoostAbsolute = function() {
    var inp = document.getElementById('jtech-b-eb-input')
    var v = parseFloat(inp.value)
    if(isNaN(v) || boostSelected.size===0) return
    var data = getBoostCurrentData()
    boostSelected.forEach(function(k) {
        var rc = k.split(',')
        if(data[+rc[0]]) data[+rc[0]][+rc[1]] = Math.max(-25, Math.min(25, v))
    })
    inp.value = ''
    renderBoostMap(); updateBoostEditBar(); pushBoostMapToLua()
}

function pushBoostMapToLua() {
    var rows = buildBoostRpmRows()
    var data = getBoostCurrentData()
    var parts = []
    rows.forEach(function(rpm, ri) {
        var vals = []
        for(var ci = 0; ci < boostMaxGears; ci++) vals.push(data[ri] && data[ri][ci] !== undefined ? data[ri][ci] : 0)
        parts.push('['+rpm+']={'+vals.join(',')+'}')
    })
    var luaStr = '{'+parts.join(',')+'}'
    var fn = activeBoostMap === 'offset' ? 'setBoostOffsetMap' : 'setBoostFuelTrimMap'
    bngApi.activeObjectLua('extensions.auto_jtechECU.'+fn+'('+luaStr+')')
}

scope.toggleBoostMode = function() {
    if(scope.rTier < 2) return
    scope.boostEditMode = !scope.boostEditMode
    boostSelected.clear(); boostInputtingCell = null
    var btn = document.getElementById('jtech-b-mode-btn')
    var badge = document.getElementById('jtech-b-map-badge')
    var hint = document.getElementById('jtech-b-tl-hint')
    if(btn){ btn.textContent = scope.boostEditMode ? '✎ EDIT MODE' : '● MONITOR'; btn.className='mode-btn '+(scope.boostEditMode?'edit':'monitor') }
    if(badge){ badge.textContent = scope.boostEditMode ? 'EDIT MODE' : 'LIVE'; badge.className='badge '+(scope.boostEditMode?'edit':'live') }
    if(hint) hint.textContent = scope.boostEditMode ? 'click or drag to select — +/− or ↑↓ to adjust' : 'click edit to modify cells'
    updateBoostEditBar(); renderBoostMap()
}

scope.toggleBoostMap = function() {
    scope.boostMapVisible = !scope.boostMapVisible
    var body = document.getElementById('jtech-b-map-body')
    var btn = document.getElementById('jtech-b-map-toggle')
    var editBar = document.getElementById('jtech-b-edit-bar')
    if(body) body.style.display = scope.boostMapVisible ? '' : 'none'
    if(btn) btn.textContent = scope.boostMapVisible ? '▲ HIDE' : '▼ SHOW'
    if(editBar) editBar.style.display = scope.boostMapVisible ? '' : 'none'
}

scope.setBoostMap = function(mapName) {
    activeBoostMap = mapName
    boostSelected.clear(); boostInputtingCell = null
    var btnOffset = document.getElementById('jtech-b-map-offset')
    var btnFuel = document.getElementById('jtech-b-map-fuel')
    var axisWrap = document.getElementById('jtech-b-axis-wrap')
    if(btnOffset){ btnOffset.style.background = mapName==='offset'?'#002a1f':'transparent'; btnOffset.style.color = mapName==='offset'?'var(--teal)':'var(--dim)' }
    if(btnFuel){ btnFuel.style.background = mapName==='fuel'?'#002a1f':'transparent'; btnFuel.style.color = mapName==='fuel'?'var(--teal)':'var(--dim)' }
    if(axisWrap) axisWrap.style.display = mapName==='offset' ? 'none' : 'flex'
    updateBoostEditBar(); renderBoostMap()
}

scope.setBoostAxis = function(axis) {
    boostAxis = axis
    boostSelected.clear(); boostInputtingCell = null
    var btnBoost = document.getElementById('jtech-b-axis-boost')
    var btnGear = document.getElementById('jtech-b-axis-gear')
    if(btnBoost){ btnBoost.style.background = axis==='boost'?'#002a1f':'transparent'; btnBoost.style.color = axis==='boost'?'var(--teal)':'var(--dim)' }
    if(btnGear){ btnGear.style.background = axis==='gear'?'#002a1f':'transparent'; btnGear.style.color = axis==='gear'?'var(--teal)':'var(--dim)' }
    updateBoostEditBar(); renderBoostMap()
}

// --- SETUP TAB ---
var selectedTuneFile = null
var tuneList = []

function renderTuneList() {
    var container = document.getElementById('jtech-tune-list')
    if(!container) return
    container.innerHTML = ''
    if(tuneList.length === 0) {
        var empty = document.createElement('div')
        empty.className = 'tune-empty'
        empty.textContent = 'NO SAVED TUNES'
        container.appendChild(empty)
        return
    }
    tuneList.forEach(function(tune) {
        var row = document.createElement('div')
        row.className = 'tune-row' + (tune.filename === selectedTuneFile ? ' selected' : '')
        row.innerHTML =
            '<div class="tune-name">' + (tune.name || 'Unnamed') + '</div>' +
            '<div class="tune-meta">' + (tune.ecuName || '') + ' · ' + new Date(tune.savedAt).toLocaleString() + '</div>'
        row.addEventListener('click', function() {
            selectedTuneFile = tune.filename
            updateSetupButtons()
            renderTuneList()
        })
        container.appendChild(row)
    })
}

function updateSetupButtons() {
    var loadBtn = document.getElementById('jtech-load-btn')
    var delBtn = document.getElementById('jtech-delete-btn')
    if(loadBtn) loadBtn.disabled = !selectedTuneFile
    if(delBtn) delBtn.disabled = !selectedTuneFile
}

function populateSettingsInputs(settings) {
    var f = function(id, val) { var el = document.getElementById(id); if(el) el.value = val }
    f('jtech-set-ecuname', settings.ecuName || '')
    f('jtech-set-maxgears', settings.maxGears || 6)
    f('jtech-set-maxrpm', settings.maxRpm || 7000)
    f('jtech-set-revbase', settings.revLimiterBaseline || 6800)
    f('jtech-set-boostmax', settings.boostMaxOverride || 0)
}

scope.loadSelectedTune = function() {
    if(!selectedTuneFile) return
    bngApi.engineLua('extensions.jtechSave.loadTune(be:getPlayerVehicle(0):getID(), "' + selectedTuneFile + '")')
}

function checkNameConflict(name) {
    var warning = document.getElementById('jtech-save-warning')
    var btn = document.getElementById('jtech-save-confirm-btn')
    if(!warning || !btn) return
    var exists = tuneList.some(function(t) {
        return (t.name || '').toLowerCase() === (name || '').trim().toLowerCase()
    })
    warning.style.display = exists ? 'block' : 'none'
    btn.textContent = exists ? 'OVERWRITE' : 'SAVE'
}

scope.openSaveForm = function() {
    var form = document.getElementById('jtech-save-form')
    var input = document.getElementById('jtech-save-name-input')
    if(!form || !input) return
    bngApi.activeObjectLua('extensions.auto_jtechECU.getStatus()', function(data) {
        scope.$apply(function() {
            input.value = data.currentTuneName || 'New Tune'
            checkNameConflict(input.value)
            form.style.display = 'block'
            setTimeout(function() { input.focus(); input.select() }, 50)
        })
    })
    input.addEventListener('input', function() {
        checkNameConflict(input.value)
    })
}

scope.confirmSave = function() {
    var input = document.getElementById('jtech-save-name-input')
    var form = document.getElementById('jtech-save-form')
    if(!input) return
    var name = input.value.trim()
    if(!name) return
    var existing = tuneList.find(function(t) {
        return (t.name || '').toLowerCase() === name.toLowerCase()
    })
    if(existing) {
        bngApi.engineLua('extensions.jtechSave.deleteTune("' + existing.filename + '")')
    }
    bngApi.activeObjectLua('extensions.auto_jtechECU.saveCurrentTuneNamed("' + name + '")')
    if(form) form.style.display = 'none'
}

scope.cancelSave = function() {
    var form = document.getElementById('jtech-save-form')
    if(form) form.style.display = 'none'
}

scope.deleteSelectedTune = function() {
    if(!selectedTuneFile) return
    bngApi.engineLua('extensions.jtechSave.deleteTune("' + selectedTuneFile + '")')
    selectedTuneFile = null
    bngApi.engineLua('extensions.jtechSave.pushTuneListToUI()')
    updateSetupButtons()
}

scope.applySettings = function() {
    var g = function(id) { var el = document.getElementById(id); return el ? el.value : null }
    var newSettings = {
        ecuName: g('jtech-set-ecuname'),
        maxGears: parseInt(g('jtech-set-maxgears')) || 6,
        maxRpm: parseInt(g('jtech-set-maxrpm')) || 7000,
        revLimiterBaseline: parseInt(g('jtech-set-revbase')) || 6800,
        boostMaxOverride: parseFloat(g('jtech-set-boostmax')) || 0
    }
    // Immediately apply to local state so re-render uses the new dimensions
    boostMaxGears = Math.min(10, newSettings.maxGears)
    mapMaxRpm = Math.min(10000, Math.max(1000, Math.floor(newSettings.maxRpm / 1000) * 1000))
    // Re-render whichever map tab is active
    if(scope.activeTab === 'fuel') renderMap()
    else if(scope.activeTab === 'timing') renderTimingMap()
    else if(scope.activeTab === 'boost') renderBoostMap()
    var parts = []
    Object.keys(newSettings).forEach(function(k) {
        var v = newSettings[k]
        if(typeof v === 'string') parts.push(k + '=' + JSON.stringify(v))
        else parts.push(k + '=' + v)
    })
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateSettings({' + parts.join(',') + '})')
    settingsLoaded = false  // allow one repopulate on next poll
}

function populateSafeInputs(s) {
    var f = function(id, val) { var el = document.getElementById(id); if(el) el.value = val }
    f('jtech-safe-launchrpm', s.launchRpm || 3500)
    f('jtech-safe-softrpm', s.softLimitRpm || 6500)
    f('jtech-safe-hardrpm', s.hardCutRpm || 6800)
    f('jtech-safe-waterlimit', s.waterTempLimit || 100)
    f('jtech-safe-oillimit', s.oilTempLimit || 130)
    f('jtech-safe-timingpull', s.timingPullDeg || 5.0)
    f('jtech-safe-fuelpull', s.fuelPullPct || 10.0)
}

function updateSafeStatus(data) {
    var revEl = document.getElementById('jtech-safe-rev-status')
    if(revEl) {
        if(data.hardCutActive) {
            revEl.textContent = 'HARD CUT'
            revEl.style.color = 'var(--red)'
        } else if(data.softLimitActive) {
            revEl.textContent = 'SOFT LIMIT'
            revEl.style.color = 'var(--amber)'
        } else {
            revEl.textContent = 'NORMAL'
            revEl.style.color = 'var(--teal)'
        }
    }

    var waterEl = document.getElementById('jtech-safe-water-status')
    if(waterEl) {
        waterEl.textContent = data.waterTempWarning ? 'WARNING' : 'OK'
        waterEl.style.color = data.waterTempWarning ? 'var(--red)' : 'var(--teal)'
    }

    var oilEl = document.getElementById('jtech-safe-oil-status')
    if(oilEl) {
        oilEl.textContent = data.oilTempWarning ? 'WARNING' : 'OK'
        oilEl.style.color = data.oilTempWarning ? 'var(--red)' : 'var(--teal)'
    }

    var transEl = document.getElementById('jtech-safe-trans-type')
    if(transEl) {
        if(data.isManual === null || data.isManual === undefined) {
            transEl.textContent = 'DETECTING...'
            transEl.style.color = 'var(--dim)'
        } else {
            transEl.textContent = data.isManual ? 'MANUAL' : 'AUTOMATIC'
            transEl.style.color = 'var(--teal)'
        }
    }

    var launchEl = document.getElementById('jtech-safe-launch-state')
    if(launchEl) {
        if(data.launchActive) {
            launchEl.textContent = 'ACTIVE'
            launchEl.style.color = 'var(--amber)'
        } else if(data.launchArmed) {
            launchEl.textContent = 'ARMED'
            launchEl.style.color = 'var(--teal)'
        } else {
            launchEl.textContent = 'OFF'
            launchEl.style.color = 'var(--dim)'
        }
    }

    var tractionEl = document.getElementById('jtech-safe-traction')
    if(tractionEl) {
        tractionEl.textContent = data.tractionSlip ? 'SLIP' : 'OK'
        tractionEl.style.color = data.tractionSlip ? 'var(--amber)' : 'var(--teal)'
    }

    var toggleBtn = document.getElementById('jtech-safe-launch-toggle')
    if(toggleBtn && data.safeSettings) {
        var enabled = data.safeSettings.launchEnabled
        toggleBtn.textContent = enabled ? 'ENABLED' : 'DISABLED'
        toggleBtn.style.background = enabled ? '#002a1f' : '#1a0808'
        toggleBtn.style.borderColor = enabled ? '#005540' : '#550000'
        toggleBtn.style.color = enabled ? 'var(--teal)' : 'var(--red)'
    }
}

scope.applySafeRevSettings = function() {
    var g = function(id) { var el = document.getElementById(id); return el ? el.value : null }
    var s = {
        launchRpm: parseInt(g('jtech-safe-launchrpm')) || 3500,
        softLimitRpm: parseInt(g('jtech-safe-softrpm')) || 6500,
        hardCutRpm: parseInt(g('jtech-safe-hardrpm')) || 6800
    }
    var parts = []
    Object.keys(s).forEach(function(k) { parts.push(k + '=' + s[k]) })
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateSafeSettings({' + parts.join(',') + '})')
}

scope.applySafeProtectSettings = function() {
    var g = function(id) { var el = document.getElementById(id); return el ? el.value : null }
    var s = {
        waterTempLimit: parseInt(g('jtech-safe-waterlimit')) || 100,
        oilTempLimit: parseInt(g('jtech-safe-oillimit')) || 130,
        timingPullDeg: parseFloat(g('jtech-safe-timingpull')) || 5.0,
        fuelPullPct: parseFloat(g('jtech-safe-fuelpull')) || 10.0
    }
    var parts = []
    Object.keys(s).forEach(function(k) { parts.push(k + '=' + s[k]) })
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateSafeSettings({' + parts.join(',') + '})')
}

scope.toggleLaunchControl = function() {
    if(scope.rTier < 3) return
    if(!scope.safeSettings) scope.safeSettings = {}
    var newVal = !(scope.safeSettings.launchEnabled === true)
    scope.safeSettings.launchEnabled = newVal
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateSafeSettings({launchEnabled=' + (newVal ? 'true' : 'false') + '})')
}

scope.$on('jtechTuneList', function(event, data) {
    scope.$apply(function() {
        tuneList = data || []
        renderTuneList()
        updateSetupButtons()
    })
})

scope.$on('jtechTuneApplied', function(event, data) {
    scope.$apply(function() {
        var nameEl = document.getElementById('jtech-active-tune')
        if(nameEl) nameEl.textContent = (data.tuneName || 'DEFAULT').toUpperCase()
        if(data.settings) populateSettingsInputs(data.settings)
        mapData = []
        timingMapData = []
        boostOffsetMapData = []
        boostFuelTrimMapData = []
    })
})

scope.$on('jtechSettingsUpdated', function(event, data) {
    scope.$apply(function() {
        if(data) populateSettingsInputs(data)
    })
})

function cellKey(r,c){ return r+','+c }
function parseKey(k){ var p=k.split(','); return[+p[0],+p[1]] }

function getColorClass(v) {
    if(v>=1.8)return'v7'; if(v>=1.6)return'v6'; if(v>=1.4)return'v5';
    if(v>=1.2)return'v4'; if(v>=1.0)return'v3'; if(v>=0.8)return'v2';
    if(v>=0.6)return'v1'; return'v0';
}

function renderMap() {
    RPM_COLS = buildRpmCols()
    var container = document.getElementById('jtech-hx3')
    if(!container) return

// find or create live cell tracking
var liveRpm = scope.rpm
var liveLoad = scope.tps
var liveRpmIdx = 0
var liveLoadIdx = 0
RPM_COLS.forEach(function(r, i){ if(liveRpm >= r) liveRpmIdx = i })
LOAD_ROWS.forEach(function(l, ri){ if(liveLoad <= l) liveLoadIdx = ri })
    var grid = document.getElementById('jtech-map-grid')
    if(!grid) return

    grid.innerHTML = ''

    // column headers
    var hdrRow = document.createElement('div')
    hdrRow.className = 'axis-label-row'
    hdrRow.style.paddingLeft = '32px'
    hdrRow.style.display = 'flex'
    hdrRow.style.gap = '3px'
    hdrRow.style.marginBottom = '3px'
    RPM_COLS.forEach(function(rpm, i) {
        var h = document.createElement('div')
        h.className = 'axl' + (i === liveRpmIdx ? ' live-col' : '')
        h.textContent = rpm
        hdrRow.appendChild(h)
    })
    grid.appendChild(hdrRow)

    // rows
    LOAD_ROWS.forEach(function(load, ri) {
        var row = document.createElement('div')
        row.className = 'map-row'
        var lbl = document.createElement('div')
        lbl.className = 'row-lbl'
        lbl.textContent = load
        row.appendChild(lbl)

        RPM_COLS.forEach(function(rpm, ci) {
            var cell = document.createElement('div')
            var k = cellKey(ri, ci)
            var isLive = ri === liveLoadIdx && ci === liveRpmIdx
            var isSel = selected.has(k)
            var val = (mapData[ri] && mapData[ri][ci] !== undefined) ? mapData[ri][ci] : 1.0

            var cls = 'cell ' + getColorClass(val)
            if(scope.editMode) cls += ' can-edit'
            if(isLive) cls += ' live-cell'
            if(isSel) cls += ' selected'
            cell.className = cls
            cell.dataset.r = ri
            cell.dataset.c = ci

            if(isSel && inputtingCell === k) {
                var inp = document.createElement('input')
                inp.className = 'cell-input'
                inp.type = 'number'
                inp.value = val
                inp.addEventListener('keydown', function(e) {
                    if(e.key==='Enter'){ commitInlineInput(ri,ci,inp.value); e.preventDefault() }
                    if(e.key==='Escape'){ inputtingCell=null; renderMap() }
                    e.stopPropagation()
                })
                inp.addEventListener('click', function(e){ e.stopPropagation() })
                cell.appendChild(inp)
                setTimeout(function(){ inp.focus(); inp.select() }, 10)
            } else {
                cell.textContent = val.toFixed(2)
            }

            if(scope.editMode) {
                cell.addEventListener('mousedown', function(e){ onCellMouseDown(e,ri,ci) })
                cell.addEventListener('mouseenter', function(e){ onCellEnter(e,ri,ci) })
                cell.addEventListener('dblclick', function(e){ onCellDblClick(e,ri,ci) })
            }
            row.appendChild(cell)
        })
        grid.appendChild(row)
    })

    // update sel count
    var countEl = document.getElementById('jtech-sel-count')
    if(countEl) countEl.textContent = selected.size ? selected.size+' CELL'+(selected.size>1?'S':'')+' SELECTED' : ''

    var coordEl = document.getElementById('jtech-cell-coords')
    if(coordEl) {
        if(selected.size===1){
            var rc = parseKey([...selected][0])
            coordEl.textContent = RPM_COLS[rc[1]]+' RPM / '+LOAD_ROWS[rc[0]]+'% LOAD'
        } else if(selected.size>1){
            coordEl.textContent = selected.size+' CELLS'
        } else {
            coordEl.textContent = ''
        }
    }
}
                        
            // --- INIT ---

            var slowTimer = setInterval(function() {
                bngApi.activeObjectLua(
                    'extensions.auto_jtechECU.getStatus()',
                    function(data) {
                        var ignLevel = data.ignitionLevel || 0
                        if(ignLevel === 0) {
                            if(!ignitionWasOff) {
                                ignitionWasOff = true
                                scope.$apply(function() { showStandby() })
                            }
                            return // don't update anything else while off
                        }
                        if(ignitionWasOff && ignLevel > 0) {
                            ignitionWasOff = false
                            scope.$apply(function() { startBoot() })
                        }
                        scope.$apply(function() {
                            scope.rpm = Math.round(data.rpm || 0)
                            scope.tps = Math.round(data.tps || 0)
                            scope.boost = (data.boost || 0).toFixed(1)
                            scope.afr = (data.afr || 0).toFixed(1)
                            if(data.effAfr) scope.effAfr = data.effAfr.toFixed(1)
                            scope.gear = data.gear || 'N'
                            scope.watertemp = Math.round(data.watertemp || 0)
                            scope.oiltemp = Math.round(data.oiltemp || 0)
                            scope.oilpressure = data.oilpressure || 0
                            scope.fuel = Math.round((data.fuel || 0) * 100)
                            scope.engineLoad = (data.engineLoad || 0).toFixed(2)
                            scope.multiplier = data.multiplier || 1.0
                            scope.hasAdvancedEngine = data.hasAdvancedEngine || false
                            if(data.currentTuneName) {
                                var nameEl = document.getElementById('jtech-active-tune')
                                if(nameEl) nameEl.textContent = data.currentTuneName.toUpperCase()
                                var hdrEl = document.getElementById('jtech-active-tune-hdr')
                                if(hdrEl) hdrEl.textContent = data.currentTuneName.toUpperCase()
                            }
                            if(data.settings) {
                                if(data.settings.maxGears) boostMaxGears = Math.min(10, data.settings.maxGears)
                                if(data.settings.maxRpm) mapMaxRpm = Math.min(10000, Math.max(1000, Math.floor(data.settings.maxRpm / 1000) * 1000))
                            }
                            if(data.settings && scope.activeTab === 'setup' && !settingsLoaded) {
                                settingsLoaded = true
                                populateSettingsInputs(data.settings)
                            }
                            var modelEl = document.getElementById('jtech-model-label')
                            if(modelEl) {
                                var rLabel = scope.rTier > 0 ? 'R' + scope.rTier : 'STOCK ECU'
                                var ecuLabel = (scope.rTier > 0 && data.settings && data.settings.ecuName) ? ' · ' + data.settings.ecuName : ''
                                modelEl.textContent = 'HX3 · ' + rLabel + ecuLabel
                            }
                            updateDOM(data)
                            if(scope.activeTab === 'fuel') renderMap()

                            // initialize mapData from Lua on first load
                            if(mapData.length === 0 && data.fuelMap) {
                                initMapData(data.fuelMap)
                            }
                            if(timingMapData.length === 0 && data.timingMap)
                                initTimingMapData(data.timingMap)
                            if(boostOffsetMapData.length === 0 && data.boostOffsetMap)
                                initBoostOffsetMapData(data.boostOffsetMap)
                            if(boostFuelTrimMapData.length === 0 && data.boostFuelTrimMap)
                                initBoostFuelTrimMapData(data.boostFuelTrimMap)
                            if(data.boostBreaks) boostBreaksLocal = data.boostBreaks
                            if(data.boostMax) boostMaxLocal = data.boostMax
                            if(data.safeSettings) scope.safeSettings = data.safeSettings
                            if(data.rTier !== undefined && data.rTier !== scope.rTier) {
                                scope.rTier = data.rTier
                                injectOverlay(scope.activeTab)
                            } else if(data.rTier !== undefined) {
                                scope.rTier = data.rTier
                            }
                        })
                    }
                )
            }, 200)

            // --- CLEANUP ---
            scope.$on('$destroy', function() {
                clearInterval(slowTimer)
                if(bootTimer) clearTimeout(bootTimer)
                    if(bootInterval) clearInterval(bootInterval)
            })
            window.jtechCollapse = function() {
                var btn = document.getElementById('jtech-collapse-btn')
                var tbar = document.querySelector('.tbar')
                var bodies = document.querySelectorAll('.body')
                if(tbar) tbar.style.display = 'none'
                bodies.forEach(function(b) { b.style.display = 'none' })
                if(btn) { btn.textContent = '▼'; btn.setAttribute('data-collapsed', '1') }
            }

            window.jtechExpand = function() {
                var btn = document.getElementById('jtech-collapse-btn')
                var tbar = document.querySelector('.tbar')
                var bodies = document.querySelectorAll('.body')
                if(tbar) tbar.style.display = ''
                bodies.forEach(function(b) { b.style.display = '' })
                if(btn) { btn.textContent = '▲'; btn.setAttribute('data-collapsed', '0') }
            }
        }
    }
}])