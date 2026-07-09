// @ts-nocheck
angular.module('beamng.apps')
.directive('jtechEcu', [function() {
    return {
        restrict: 'E',
        template: 
    '<style>' +
    ':root{--bg:#0B0D10;--bg2:#0e1116;--bg3:#0d1014;--text:#E6E6E6;--dim:#8A8F98;--border:#1E2229;--teal:#00E5A0;--amber:#F0A500;--red:#E84040;}' +
    '*{box-sizing:border-box;margin:0;padding:0;}' +
    '.root{position:relative;background:var(--bg);border:1px solid var(--border);border-radius:4px;overflow:hidden;font-family:"JetBrains Mono",monospace;font-size:14px;font-weight:800;user-select:none;}'+
    '.hdr{height:40px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 16px;gap:10px;}' +
    '.logo{font-family:Inter,sans-serif;font-weight:500;font-size:12px;color:var(--text);letter-spacing:.08em;}' +
    '.slash{display:inline-block;width:1px;height:13px;background:var(--teal);transform:rotate(20deg);opacity:.7;margin:0 2px;}' +
    '.model{font-size:10px;color:var(--teal);letter-spacing:.1em;}' +
    '.status{margin-left:auto;font-size:10px;color:var(--teal);display:flex;align-items:center;gap:5px;}' +
    '.sdot{width:5px;height:5px;border-radius:50%;background:var(--teal);}' +
    '.sstrip{height:40px;background:var(--bg3);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 10px;gap:0;overflow-x:auto;}' +
    '.si{display:flex;flex-direction:column;gap:1px;padding:0 8px;flex-shrink:0;}' +
    '.si:first-child{padding-left:0;}' +
    '.slbl{font-size:8px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;}' +
    '.sval{font-size:11px;font-weight:700;color:var(--teal);line-height:1;}' +
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
    '.tab-overlay-title{font-size:13px;color:var(--dim);letter-spacing:.15em;}' +
    '.tab-overlay-sub{font-family:Inter,sans-serif;font-size:10px;color:var(--dim);letter-spacing:.05em;}' +
    '.cs-title{font-size:14px;color:var(--dim);letter-spacing:.15em;text-transform:uppercase;}' +
    '.cs-sub{font-size:11px;color:var(--teal);letter-spacing:.1em;}' +
    '.toolbar{display:flex;align-items:center;gap:8px;}' +
    '.mode-btn{font-size:10px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid;cursor:pointer;transition:all 160ms;}' +
    '.mode-btn.monitor{background:#002a1f;color:var(--teal);border-color:#005540;}' +
    '.mode-btn.edit{background:#2a1f00;color:var(--amber);border-color:#554000;}' +
    '.tl-sep{width:1px;height:20px;background:#2a2f38;transform:rotate(20deg);flex-shrink:0;margin:0 4px;}' +
    '.map-name{font-size:10px;color:var(--dim);}' +
    '.tl-right{margin-left:auto;display:flex;align-items:center;gap:8px;}' +
    '.tl-hint{font-family:Inter,sans-serif;font-size:10px;color:var(--dim);font-style:italic;}' +
    '.map-wrap{background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:10px;}' +
    '.map-header{display:flex;align-items:center;gap:8px;margin-bottom:8px;}' +
    '.map-title{font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;}' +
    '.badge{font-size:9px;padding:2px 6px;border-radius:2px;letter-spacing:.05em;}' +
    '.badge.live{background:#002a1f;color:var(--teal);border:1px solid #005540;}' +
    '.badge.edit{background:#2a1f00;color:var(--amber);border:1px solid #554000;}' +
    '.cell-coords{margin-left:auto;font-size:9px;color:var(--dim);}' +
    '.axis-label-row{display:flex;gap:3px;margin-bottom:3px;padding-left:32px;}' +
    '.axl{font-size:8px;color:var(--dim);text-align:center;flex:1;}' +
    '.axl.live-col{color:var(--teal);font-weight:700;}' +
    '.map-row{display:flex;gap:3px;align-items:center;margin-bottom:3px;}' +
    '.row-lbl{font-size:8px;color:var(--dim);width:28px;text-align:right;flex-shrink:0;}' +
    '.cell{flex:1;height:22px;border-radius:1px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;border:1px solid transparent;transition:filter 80ms;position:relative;}' +
    '.cell.can-edit{cursor:pointer;}' +
    '.cell.can-edit:hover{filter:brightness(1.3);}' +
    '.cell.selected{border-color:var(--amber)!important;background:#332800!important;color:var(--amber)!important;}' +
    '.cell.live-cell{border-color:var(--teal)!important;}' +
    '.cell-input{width:100%;height:100%;background:transparent;border:none;outline:none;font-size:8px;font-weight:700;color:var(--amber);text-align:center;cursor:text;}' +
    '.v0{background:#0f1a14;color:#1a7a50}.v1{background:#0e2018;color:#20a060}.v2{background:#0c2a1c;color:#28c478}.v3{background:#143020;color:#35d988}.v4{background:#1e3a22;color:#44e896}.v5{background:#2a3a18;color:#88d840}.v6{background:#3a3010;color:#d4a030}.v7{background:#3a2010;color:#e07020;}' +
    '.map-footer{display:flex;gap:16px;align-items:center;margin-top:6px;}' +
    '.mf-legend{font-size:9px;}' +
    '.mf-legend.t{color:var(--teal)}.mf-legend.a{color:var(--amber)}.mf-legend.d{color:var(--dim);margin-left:auto;}' +
    '.edit-bar{background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:8px 12px;display:flex;align-items:center;gap:12px;min-height:44px;}' +
    '.eb-info{font-size:10px;color:var(--dim);}' +
    '.eb-val{font-size:16px;font-weight:700;color:var(--amber);min-width:40px;}' +
    '.eb-input{background:#1a1400;border:1px solid #554000;border-radius:2px;color:var(--amber);font-size:13px;font-weight:700;width:64px;padding:4px 8px;text-align:center;outline:none;}' +
    '.eb-input:focus{border-color:var(--amber);}' +
    '.eb-hint{font-family:Inter,sans-serif;font-size:10px;color:var(--dim);font-style:italic;}' +
    '.eb-btn{font-size:9px;letter-spacing:.06em;padding:4px 10px;border-radius:2px;cursor:pointer;transition:all 120ms;}' +
    '.eb-btn.apply{background:#332800;color:var(--amber);border:1px solid #554000;}' +
    '.eb-btn.apply:hover{background:#443200;}' +
    '.eb-sep{width:1px;height:20px;background:var(--border);flex-shrink:0;}' +
    '.gauges{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}' +
    '.db{background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:8px 10px;}' +
    '.db.warn{border-color:var(--amber);}' +
    '.dbl{font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;}' +
    '.dbv{font-size:20px;font-weight:700;color:var(--teal);line-height:1;}' +
    '.dbv.a{color:var(--amber)}.dbv.d{color:var(--text);font-weight:400;font-size:16px;}' +
    '.rbar{height:3px;background:var(--border);border-radius:2px;overflow:hidden;margin-top:5px;}' +
    '.rbf{height:100%;border-radius:2px;background:var(--teal);}' +
    '.rbf.w{background:var(--amber);}' +
    '.splash{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;z-index:100;}' +
    '.splash-logo{height:32px;width:auto;}' +
    '.splash-status{font-size:10px;color:var(--dim);letter-spacing:.15em;}' +
    '.splash-bar-wrap{width:160px;height:2px;background:var(--border);border-radius:2px;overflow:hidden;}' +
    '.splash-bar{height:100%;width:0%;background:var(--teal);border-radius:2px;transition:width 80ms linear;}' +
    '.setup-wrap{display:flex;gap:10px;height:100%;}' +
    '.setup-panel{flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:2px;display:flex;flex-direction:column;overflow:hidden;}' +
    '.setup-panel-hdr{padding:8px 12px;border-bottom:1px solid var(--border);font-size:9px;font-family:Inter,sans-serif;font-weight:500;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:8px;}' +
    '.setup-panel-body{flex:1;overflow-y:auto;padding:8px;}' +
    '.tune-row{padding:8px 10px;border-radius:2px;border:1px solid transparent;cursor:pointer;margin-bottom:4px;transition:all 120ms;}' +
    '.tune-row:hover{border-color:var(--border);background:#0d1014;}' +
    '.tune-row.selected{border-color:var(--teal);background:#002a1f;}' +
    '.tune-name{font-size:11px;font-weight:700;color:var(--text);}' +
    '.tune-row.selected .tune-name{color:var(--teal);}' +
    '.tune-meta{font-size:9px;color:var(--dim);margin-top:2px;}' +
    '.tune-empty{font-size:10px;color:var(--dim);text-align:center;padding:24px 0;}' +
    '.setup-actions{padding:8px;border-top:1px solid var(--border);display:flex;gap:6px;}' +
    '.setup-btn{flex:1;font-size:9px;letter-spacing:.06em;padding:6px 8px;border-radius:2px;cursor:pointer;transition:all 120ms;text-align:center;}' +
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
    '.setting-inp{flex:1;background:#0d1014;border:1px solid var(--border);border-radius:2px;color:var(--text);font-size:11px;padding:4px 8px;outline:none;}' +
    '.setting-inp:focus{border-color:var(--teal);}' +
    '.setting-hint{font-size:9px;font-family:Inter,sans-serif;color:var(--dim);font-style:italic;}' +
    '.active-tune-bar{padding:6px 10px;background:#001a12;border-bottom:1px solid #003322;font-size:9px;color:var(--teal);letter-spacing:.08em;}' +
    /* Sidebar Navigation */
    '.jt-shell{display:flex;align-items:stretch;}' +
    '.jt-sidebar{width:200px;flex-shrink:0;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;padding:6px 0;overflow-y:auto;}' +
    '.jt-nav-group-hdr{font-size:9px;color:var(--teal);text-transform:uppercase;letter-spacing:.15em;padding:4px 16px;margin-top:12px;}' +
    '.jt-nav-group-hdr:first-child{margin-top:4px;}' +
    '.jt-nav-item{font-size:11px;padding:7px 16px;display:flex;align-items:center;gap:8px;cursor:pointer;color:#888;transition:background 120ms,color 120ms;}' +
    '.jt-nav-dot{width:5px;height:5px;border-radius:50%;background:#444;flex-shrink:0;}' +
    '.jt-nav-item.active{color:var(--text);background:#00C9A712;}' +
    '.jt-nav-item.active .jt-nav-dot{background:var(--teal);}' +
    '.jt-nav-item.locked{color:#444;cursor:pointer;}' +
    '.jt-nav-lock{margin-left:auto;font-size:9px;opacity:.7;}' +
    '.jt-main{flex:1;min-width:0;display:flex;flex-direction:column;}' +
    /* EGT / knock */
    '.jt-locked-mini{padding:10px;text-align:center;}' +
    '.jt-locked-mini-text{font-size:9px;color:#555;letter-spacing:.1em;}' +
    '.egt-green{color:#00C9A7 !important;}' +
    '.egt-yellow{color:#d4a017 !important;}' +
    '.egt-red{color:#E8442A !important;}' +
    '.jt-knock-bar{display:flex;gap:2px;margin-top:4px;}' +
    '.jt-knock-seg{flex:1;height:10px;border-radius:1px;background:#1e2229;}' +
    '.jt-knock-seg.on-green{background:#00C9A7;}' +
    '.jt-knock-seg.on-yellow{background:#d4a017;}' +
    '.jt-knock-seg.on-red{background:#E8442A;}' +
    /* Log modal */
    '.jt-log-modal-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:200;}' +
    '.jt-log-modal-panel{width:90%;max-width:480px;max-height:90%;background:var(--bg2);border:1px solid var(--border);border-radius:4px;display:flex;flex-direction:column;overflow:hidden;}' +
    '.jt-log-modal-hdr{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--border);font-size:11px;letter-spacing:.1em;color:var(--teal);}' +
    '.jt-log-modal-close{background:transparent;border:none;color:#888;font-size:14px;cursor:pointer;}' +
    '.jt-log-modal-body{padding:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;}' +
    /* SUGGEST tab */
    '.jt-suggest-lastscan{font-size:10px;color:#888;letter-spacing:.05em;}' +
    '.jt-suggest-list{display:flex;flex-direction:column;gap:8px;}' +
    '.jt-suggest-card{background:var(--bg2);border:1px solid var(--border);border-left:3px solid #555;border-radius:2px;padding:10px 12px;}' +
    '.jt-suggest-card.sev-warn{border-left-color:#E8442A;}' +
    '.jt-suggest-card.sev-caution{border-left-color:#d4a017;}' +
    '.jt-suggest-card.sev-info{border-left-color:#00C9A7;}' +
    '.jt-suggest-card-hdr{display:flex;align-items:center;gap:8px;margin-bottom:4px;}' +
    '.jt-suggest-badge{font-size:8px;text-transform:uppercase;letter-spacing:.1em;padding:2px 6px;border-radius:2px;}' +
    '.jt-suggest-badge.sev-warn{background:#E8442A22;color:#E8442A;}' +
    '.jt-suggest-badge.sev-caution{background:#d4a01722;color:#d4a017;}' +
    '.jt-suggest-badge.sev-info{background:#00C9A722;color:#00C9A7;}' +
    '.jt-suggest-title{font-size:12px;color:var(--text);font-weight:700;}' +
    '.jt-suggest-body{font-family:Inter,sans-serif;font-size:11px;color:#ccc;margin-bottom:4px;}' +
    '.jt-suggest-fix{font-size:9px;color:var(--teal);}' +
    '.jt-suggest-cells{font-size:9px;color:#555;margin-top:4px;}' +
    '.jt-suggest-empty{text-align:center;padding:24px 0;font-size:10px;color:#555;}' +
    '.jt-ai-btn{font-size:10px;letter-spacing:.08em;padding:8px 16px;border-radius:2px;border:1px solid #005540;background:#002a1f;color:var(--teal);cursor:pointer;}' +
    /* LEARN tab */
    '.jt-learn-sidebar{width:200px;flex-shrink:0;border-right:1px solid var(--border);overflow-y:auto;padding:8px 0;}' +
    '.jt-learn-cat-hdr{font-size:9px;color:var(--teal);text-transform:uppercase;letter-spacing:.12em;padding:8px 14px 4px;}' +
    '.jt-learn-item{font-size:11px;font-family:Inter,sans-serif;padding:6px 14px;cursor:pointer;color:#888;}' +
    '.jt-learn-item.active{color:#F2F0EB;background:#00C9A712;border-left:2px solid var(--teal);}' +
    '.jt-learn-content{flex:1;min-width:0;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;}' +
    '.jt-learn-article-cat{font-size:9px;color:var(--teal);text-transform:uppercase;letter-spacing:.12em;}' +
    '.jt-learn-article-title{font-size:16px;font-family:Inter,sans-serif;font-weight:600;color:#F2F0EB;}' +
    '.jt-learn-article-sub{font-size:11px;font-family:Inter,sans-serif;color:#888;}' +
    '.jt-learn-block{font-size:11px;font-family:Inter,sans-serif;color:#ccc;line-height:1.5;}' +
    '.jt-learn-callout{background:#00C9A712;border-left:3px solid var(--teal);padding:8px 10px;border-radius:2px;color:#F2F0EB;}' +
    '.jt-learn-tip{background:#d4a01712;border-left:3px solid #d4a017;padding:8px 10px;border-radius:2px;font-size:10px;color:#d4a017;}' +
    '.jt-learn-body-text{color:#ccc;}' +
    '.jt-learn-params{display:flex;flex-direction:column;gap:4px;}' +
    '.jt-learn-param-row{display:flex;align-items:center;gap:8px;background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:6px 10px;}' +
    '.jt-learn-param-name{font-size:10px;color:var(--teal);min-width:64px;}' +
    '.jt-learn-param-desc{flex:1;font-size:10px;color:#ccc;}' +
    '.jt-learn-param-tag{font-size:8px;letter-spacing:.08em;color:#888;border:1px solid var(--border);border-radius:2px;padding:2px 6px;}' +
    '.jt-learn-footer{display:flex;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid var(--border);}' +
    '.jt-learn-progress{font-size:9px;color:#555;}' +
    '.jt-learn-nav-btn{font-size:9px;letter-spacing:.06em;padding:5px 12px;border-radius:2px;border:1px solid var(--border);background:#0d1014;color:#888;cursor:pointer;}' +
    '.jt-learn-nav-btn:disabled{opacity:.3;cursor:default;}' +
    '</style>' +
    '<div class="root" id="jtech-hx3">' +
        '<div id="jtech-collapsed-pill" onclick="jtechExpand()" style="display:none;width:32px;height:32px;align-items:center;justify-content:center;cursor:pointer;background:var(--bg2);border:1px solid var(--border);border-radius:4px;">' +
        '<span style="color:var(--teal);font-size:18px;line-height:1;font-family:JetBrains Mono,monospace;">+</span>' +
    '</div>' +

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

// SIDEBAR + MAIN SHELL 
'<div class="jt-shell">' +
'<div class="jt-sidebar">' +
    '<div class="jt-nav-group-hdr">CORE</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'dash\'}" ng-click="tabClick(\'dash\')"><span class="jt-nav-dot"></span>Dash</div>' +

    '<div class="jt-nav-group-hdr">TUNING</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'fuel\'}" ng-click="tabClick(\'fuel\')"><span class="jt-nav-dot"></span>Fuel</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'timing\'}" ng-click="tabClick(\'timing\')"><span class="jt-nav-dot"></span>Timing</div>' +

    '<div class="jt-nav-group-hdr">BOOST</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'boost\'}" ng-click="tabClick(\'boost\')"><span class="jt-nav-dot"></span>Boost</div>' +
    '<div class="jt-nav-item locked" ng-click="lockedTabClick(\'nitrous\')"><span class="jt-nav-dot"></span>Nitrous<span class="jt-nav-lock">&#128274;</span></div>' +

   
    '<div class="jt-nav-group-hdr">ECU SETTINGS</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'limiters\', locked: !canAccessTab(\'limiters\')}" ng-click="tabClick(\'limiters\')"><span class="jt-nav-dot"></span>Limiters<span class="jt-nav-lock" ng-show="!canAccessTab(\'limiters\')">&#128274;</span></div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'safe\'}" ng-click="tabClick(\'safe\')"><span class="jt-nav-dot"></span>Safe</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'setup\'}" ng-click="tabClick(\'setup\')"><span class="jt-nav-dot"></span>Setup</div>' +

    '<div class="jt-nav-group-hdr">LOGGING</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'logs\'}" ng-click="tabClick(\'logs\')"><span class="jt-nav-dot"></span>Logs</div>' +
    '<div class="jt-nav-item locked" ng-click="lockedTabClick(\'dyno\')"><span class="jt-nav-dot"></span>Dyno<span class="jt-nav-lock">&#128274;</span></div>' +

    '<div class="jt-nav-group-hdr">TOOLS</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'learn\'}" ng-click="tabClick(\'learn\')"><span class="jt-nav-dot"></span>Learn</div>' +
    '<div class="jt-nav-item" ng-class="{active: activeTab===\'suggest\'}" ng-click="tabClick(\'suggest\')"><span class="jt-nav-dot"></span>Suggest</div>' +
'</div>' +
'<div class="jt-main">' +

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
    '<div class="dash-grid" style="position:relative;" ng-if="rTier >= 2">' +
        '<div class="db dash-box"><div class="dbl">EGT</div><div class="dbv" ng-class="egtColorClass()">{{status.egt | number:0}} &deg;C</div></div>' +
        '<div class="db dash-box">' +
            '<div class="dbl">KNOCK</div>' +
            '<div class="jt-knock-bar">' +
                '<span class="jt-knock-seg" ng-repeat="n in [0,1,2,3,4,5,6,7,8,9]" ng-class="knockSegClass(n)"></span>' +
            '</div>' +
            '<div class="dbv d" style="font-size:13px;margin-top:4px;">{{(status.knockLevel * 10) | number:1}}</div>' +
        '</div>' +
    '</div>' +
    '<div class="jt-locked-mini" ng-if="rTier < 2">' +
        '<div class="jt-locked-mini-text">EGT / KNOCK &mdash; R2 REQUIRED</div>' +
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
        '<button class="eb-btn apply" ng-click="nudgeFuelSelection(-0.1)">−</button>'+
        '<button class="eb-btn apply" ng-click="nudgeFuelSelection(0.1)">+</button>'+
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
        '<button class="eb-btn apply" ng-click="nudgeTimingSelection(-0.5)">−</button>'+
        '<button class="eb-btn apply" ng-click="nudgeTimingSelection(0.5)">+</button>'+
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
        '<button class="eb-btn apply" ng-click="nudgeBoostSelection(-0.1)">−</button>'+
        '<button class="eb-btn apply" ng-click="nudgeBoostSelection(0.1)">+</button>'+
        '<div class="eb-sep"></div>' +
        '<span class="eb-hint" id="jtech-b-eb-hint">enable edit mode to modify</span>' +
    '</div>' +
    '<div class="gauges">' +
        '<div class="db"><div class="dbl">BOOST</div><div class="dbv" id="jtech-b-boost">0.0</div><div class="rbar"><div class="rbf" id="jtech-b-boost-bar" style="width:0%"></div></div></div>' +
        '<div class="db"><div class="dbl">OFFSET</div><div class="dbv d" id="jtech-b-offset">0.0</div></div>' +
        '<div class="db"><div class="dbl">GEAR</div><div class="dbv d" id="jtech-b-gear">N</div></div>' +
    '</div>' +
'</div>' +

// LIMITERS TAB
'<div class="body" ng-show="activeTab===\'limiters\'">' +
    '<div class="setup-wrap">' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">REV LIMITING</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">SOFT LIMIT</span><input class="setting-inp" id="jtech-lim-softrpm" type="number" min="1000" max="10000" step="100"/><span class="setting-hint">fuel cut</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">HARD CUT</span><input class="setting-inp" id="jtech-lim-hardrpm" type="number" min="1000" max="10000" step="100"/><span class="setting-hint">ign cut</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">STATUS</span><span id="jtech-lim-rev-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">NORMAL</span></div>' +
                '</div>' +
                '<div class="setup-actions"><button class="setup-btn load" ng-click="applyLimiterRevSettings()">APPLY</button></div>' +
            '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">LAUNCH CONTROL</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">LAUNCH CTRL</span><button id="jtech-lim-launch-toggle" ng-click="toggleLaunchControl()" style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid #550000;background:#1a0808;color:var(--red);cursor:pointer;">DISABLED</button></div>' +
                    '<div class="setting-row"><span class="setting-lbl">LAUNCH RPM</span><input class="setting-inp" id="jtech-lim-launchrpm" type="number" min="500" max="8000" step="100"/><span class="setting-hint">2-step</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">TRANSMISSION</span><span id="jtech-lim-trans-type" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--dim);">DETECTING...</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">LAUNCH STATE</span><span id="jtech-lim-launch-state" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--dim);">OFF</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">TRACTION</span><span id="jtech-lim-traction" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                '</div>' +
                '<div class="setup-actions"><button class="setup-btn load" ng-click="applyLimiterLaunchSettings()">APPLY</button></div>' +
            '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">3-STEP</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">3-STEP</span><button id="jtech-lim-3step-toggle" ng-click="toggleThreeStep()" style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid #550000;background:#1a0808;color:var(--red);cursor:pointer;">DISABLED</button></div>' +
                    '<div class="setting-row"><span class="setting-lbl">3-STEP RPM</span><input class="setting-inp" id="jtech-lim-3steprpm" type="number" min="500" max="8000" step="100"/><span class="setting-hint">spool RPM</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">BOOST THRESH</span><input class="setting-inp" id="jtech-lim-boostthresh" type="number" min="0" max="50" step="0.5"/><span class="setting-hint">PSI</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">3-STEP STATE</span><span id="jtech-lim-3step-state" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--dim);">OFF</span></div>' +
                '</div>' +
                '<div class="setup-actions"><button class="setup-btn load" ng-click="applyLimiterLaunchSettings()">APPLY</button></div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>' +

// SAFE TAB
'<div class="body" ng-show="activeTab===\'safe\'">' +
    '<div class="setup-wrap">' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">ENGINE PROTECTION</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">WATER LIMIT</span><input class="setting-inp" id="jtech-safe-waterlimit" type="number" min="60" max="150" step="1"/><span class="setting-hint">°C</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">OIL LIMIT</span><input class="setting-inp" id="jtech-safe-oillimit" type="number" min="60" max="200" step="1"/><span class="setting-hint">°C</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">EGT LIMIT</span><input class="setting-inp" id="jtech-safe-egtlimit" type="number" min="500" max="1500" step="25"/><span class="setting-hint">°C</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">KNOCK THRESH</span><input class="setting-inp" id="jtech-safe-knockthresh" type="number" min="0" max="1" step="0.05"/><span class="setting-hint">0–1</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">KNOCK RETARD</span><input class="setting-inp" id="jtech-safe-knockretard" type="number" min="0" max="15" step="0.5"/><span class="setting-hint">°</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">BOOST CEILING</span><input class="setting-inp" id="jtech-safe-boostceiling" type="number" min="0" max="50" step="0.5"/><span class="setting-hint">PSI · 0=off</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">TIM PULL</span><input class="setting-inp" id="jtech-safe-timingpull" type="number" min="0" max="20" step="0.5"/><span class="setting-hint">°</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">FUEL PULL</span><input class="setting-inp" id="jtech-safe-fuelpull" type="number" min="0" max="50" step="1"/><span class="setting-hint">%</span></div>' +
                '</div>' +
                '<div class="setup-actions"><button class="setup-btn load" ng-click="applySafeProtectSettings()">APPLY</button></div>' +
            '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1;">' +
            '<div class="setup-panel-hdr">STATUS</div>' +
            '<div class="setup-panel">' +
                '<div class="setup-panel-body">' +
                    '<div class="setting-row"><span class="setting-lbl">WATER</span><span id="jtech-safe-water-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">OIL</span><span id="jtech-safe-oil-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">EGT</span><span id="jtech-safe-egt-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">KNOCK</span><span id="jtech-safe-knock-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">AFR</span><span id="jtech-safe-afr-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
                    '<div class="setting-row"><span class="setting-lbl">BOOST</span><span id="jtech-safe-boost-status" style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--teal);">OK</span></div>' +
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
                '<div class="setting-row"><span class="setting-lbl"> CUSTOM ECU NAME</span><input class="setting-inp" id="jtech-set-ecuname" type="text" maxlength="24"/></div>' +
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

// LOGS TAB
'<div class="body" ng-show="activeTab===\'logs\'">' +
    '<div class="toolbar">' +
        '<button class="mode-btn" ng-class="logRecording ? \'edit\' : \'monitor\'" ng-click="logRecording ? stopLog() : startLog()">{{logRecording ? "&#9679; RECORDING" : "&#9675; START LOG"}}</button>' +
        '<div class="tl-sep"></div>' +
        '<div style="display:flex;gap:0;border:1px solid var(--border);border-radius:2px;overflow:hidden;">' +
            '<button ng-click="logDuration=10" ng-style="{background: logDuration===10 ? \'#002a1f\' : \'transparent\', color: logDuration===10 ? \'var(--teal)\' : \'var(--dim)\'}" style="border:none;font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;">10s</button>' +
            '<button ng-click="logDuration=30" ng-style="{background: logDuration===30 ? \'#002a1f\' : \'transparent\', color: logDuration===30 ? \'var(--teal)\' : \'var(--dim)\'}" style="border:none;border-left:1px solid var(--border);font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;">30s</button>' +
            '<button ng-click="logDuration=60" ng-style="{background: logDuration===60 ? \'#002a1f\' : \'transparent\', color: logDuration===60 ? \'var(--teal)\' : \'var(--dim)\'}" style="border:none;border-left:1px solid var(--border);font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;">60s</button>' +
            '<button ng-click="logDuration=120" ng-style="{background: logDuration===120 ? \'#002a1f\' : \'transparent\', color: logDuration===120 ? \'var(--teal)\' : \'var(--dim)\'}" style="border:none;border-left:1px solid var(--border);font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;">120s</button>' +
            '<button ng-click="logDuration=300" ng-style="{background: logDuration===300 ? \'#002a1f\' : \'transparent\', color: logDuration===300 ? \'var(--teal)\' : \'var(--dim)\'}" style="border:none;border-left:1px solid var(--border);font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 10px;cursor:pointer;">300s</button>' +
        '</div>' +
        '<button ng-click="exportLog()" ng-show="logData && !logRecording" style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid #005540;background:#002a1f;color:var(--teal);cursor:pointer;">EXPORT CSV</button>' +
        '<button ng-click="exportHTML()" ng-show="logData && !logRecording" style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid #1E2229;background:#0d1014;color:var(--dim);cursor:pointer;">EXPORT REPORT</button>' +
        '<button ng-click="openLogModal()" ng-show="logData && !logRecording" style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;border:1px solid #005540;background:#002a1f;color:var(--teal);cursor:pointer;">VIEW LOG</button>' +
        '<div id="jtech-log-legend" style="display:flex;flex-wrap:wrap;gap:6px;padding:4px 8px;background:var(--bg2);border:1px solid var(--border);border-radius:2px;"></div>' +
    '</div>' +
    '<canvas id="jtech-log-chart" style="width:100%;height:160px;background:var(--bg2);border:1px solid var(--border);border-radius:2px;display:block;"></canvas>' +
    '<div id="jtech-log-events" style="flex:1;overflow-y:auto;background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:8px;min-height:80px;max-height:140px;">' +
        '<div id="jtech-log-event-list" style="display:flex;flex-direction:column;gap:4px;">' +
            '<div style="font-family:\'JetBrains Mono\',monospace;font-size:10px;color:var(--dim);text-align:center;padding:16px 0;">NO LOG DATA</div>' +
        '</div>' +
    '</div>' +
'</div>' +

// LOG VIEWER MODAL
'<div class="jt-log-modal-overlay" ng-show="logModalOpen">' +
    '<div class="jt-log-modal-panel">' +
        '<div class="jt-log-modal-hdr">' +
            '<span>LOG VIEWER</span>' +
            '<button class="jt-log-modal-close" ng-click="logModalOpen=false">&#10005;</button>' +
        '</div>' +
        '<div class="jt-log-modal-body">' +
            '<div id="jtech-log-modal-legend" style="display:flex;flex-wrap:wrap;gap:6px;padding:4px 0;"></div>' +
            '<canvas id="jtech-log-modal-chart" style="width:100%;height:220px;background:var(--bg2);border:1px solid var(--border);border-radius:2px;display:block;"></canvas>' +
            '<div id="jtech-log-modal-events" style="flex:1;overflow-y:auto;background:var(--bg2);border:1px solid var(--border);border-radius:2px;padding:8px;min-height:100px;max-height:180px;">' +
                '<div id="jtech-log-modal-event-list" style="display:flex;flex-direction:column;gap:4px;"></div>' +
            '</div>' +
            '<div style="display:flex;justify-content:flex-end;">' +
                '<button ng-click="exportHTML()" style="font-family:\'JetBrains Mono\',monospace;font-size:9px;letter-spacing:.08em;padding:6px 14px;border-radius:2px;border:1px solid #1E2229;background:#0d1014;color:var(--dim);cursor:pointer;">EXPORT REPORT</button>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>' +

// LEARN TAB
'<div class="body" ng-show="activeTab===\'learn\'" style="flex-direction:row;gap:0;padding:0;">' +
    '<div class="jt-learn-sidebar">' +
        '<div ng-repeat="cat in learnCategories" >' +
            '<div class="jt-learn-cat-hdr">{{cat}}</div>' +
            '<div class="jt-learn-item" ng-repeat="a in learnArticlesByCategory[cat]" ng-class="{active: activeArticleId===a.id}" ng-click="openArticle(a.id)">{{a.title}}</div>' +
        '</div>' +
    '</div>' +
    '<div class="jt-learn-content" ng-if="currentArticle">' +
        '<div class="jt-learn-article-cat">{{currentArticle.category}}</div>' +
        '<div class="jt-learn-article-title">{{currentArticle.title}}</div>' +
        '<div class="jt-learn-article-sub">{{currentArticle.subtitle}}</div>' +
        '<div ng-repeat="block in currentArticle.content" ng-switch="block.type" class="jt-learn-block">' +
            '<div ng-switch-when="callout" class="jt-learn-callout">{{block.text}}</div>' +
            '<div ng-switch-when="tip" class="jt-learn-tip">TIP &mdash; {{block.text}}</div>' +
            '<div ng-switch-when="body" class="jt-learn-body-text">{{block.text}}</div>' +
            '<div ng-switch-when="params" class="jt-learn-params">' +
                '<div class="jt-learn-param-row" ng-repeat="row in block.rows">' +
                    '<span class="jt-learn-param-name">{{row.name}}</span>' +
                    '<span class="jt-learn-param-desc">{{row.desc}}</span>' +
                    '<span class="jt-learn-param-tag" ng-if="row.tag">{{row.tag}}</span>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="jt-learn-footer">' +
            '<span class="jt-learn-progress">{{articleProgress()}}</span>' +
            '<div style="margin-left:auto;display:flex;gap:8px;">' +
                '<button class="jt-learn-nav-btn" ng-disabled="!prevArticleId()" ng-click="openArticle(prevArticleId())">&larr; PREV</button>' +
                '<button class="jt-learn-nav-btn" ng-disabled="!nextArticleId()" ng-click="openArticle(nextArticleId())">NEXT &rarr;</button>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>' +

// SUGGEST TAB
'<div class="body" ng-show="activeTab===\'suggest\'">' +
    '<div class="toolbar">' +
        '<span class="jt-suggest-lastscan">{{lastScanTime ? ("LAST SCAN: " + lastScanTime) : "NOT SCANNED YET"}}</span>' +
        '<div class="tl-right">' +
            '<button class="mode-btn monitor" ng-click="rescan()" ng-disabled="scanPending">{{scanPending ? "&#8987; SCANNING..." : "&#8635; RE-SCAN"}}</button>' +
        '</div>' +
    '</div>' +
    '<div class="jt-suggest-list" ng-if="suggestions.length">' +
        '<div class="jt-suggest-card" ng-repeat="s in suggestions" ng-class="\'sev-\' + s.severity">' +
            '<div class="jt-suggest-card-hdr">' +
                '<span class="jt-suggest-badge" ng-class="\'sev-\' + s.severity">{{s.severity}}</span>' +
                '<span class="jt-suggest-title">{{s.title}}</span>' +
            '</div>' +
            '<div class="jt-suggest-body">{{s.body}}</div>' +
            '<div class="jt-suggest-fix" ng-if="s.fix">FIX &mdash; {{s.fix}}</div>' +
            '<div class="jt-suggest-cells" ng-if="s.cells">{{s.cells}}</div>' +
        '</div>' +
    '</div>' +
    '<div class="jt-suggest-empty" ng-if="!suggestions.length && !scanPending">No issues found</div>' +
'</div>' +

// COMING SOON
'<div class="body coming-soon" ng-show="isComingSoon()">' +
    '<div class="cs-title">{{comingSoonLabel()}}</div>' +
    '<div class="cs-sub">COMING SOON</div>' +
'</div>' +

'</div>' + // close jt-main
'</div>' + // close jt-shell

'</div>',
        link: function(scope, element) {

            scope.booting = false
            var ignitionWasOff = true
            var bootTimer = null
            var mapDataInitialized = false
            var timingMapDataInitialized = false
            var boostOffsetMapDataInitialized = false
            var boostFuelTrimMapDataInitialized = false
            var currentVehicleId = null
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
            scope.logRecording = false
            scope.logDuration = 60
            scope.logData = null
            scope.status = {}

            // Log modal
            scope.logModalOpen = false
            scope.openLogModal = function() {
                scope.logModalOpen = true
                setTimeout(function() {
                    if(scope.logData) {
                        renderLogModalChart(scope.logData.samples)
                        renderLogModalEvents(scope.logData.events)
                        renderLogModalLegend()
                    }
                }, 0)
            }

            // SUGGEST tab state
            // Helpers

            const SEVERITY_ORDER = { warn: 0, caution: 1, info: 2 };

            function hasSamples(data) {
                return Array.isArray(data && data.samples) && data.samples.length > 0;
            }

            function fmtTime(t) {
                if (t === undefined || t === null || isNaN(t)) return 'unknown time';
                return `${Number(t).toFixed(1)}s`;
            }

            function cellRef(rowIdx, colIdx) {
                return `R${rowIdx + 1}C${colIdx + 1}`;
            }

            function cellRangeRef(rowIdx, colStart, colEnd) {
                if (colStart === colEnd) return cellRef(rowIdx, colStart);
                return `${cellRef(rowIdx, colStart)}–${cellRef(rowIdx, colEnd)}`;
            }


            function collectMatches(samples, predicate, scoreFn) {
                const matches = [];
                for (let i = 0; i < samples.length; i++) {
                    if (predicate(samples[i], i, samples)) matches.push(samples[i]);
                }
                if (matches.length === 0) return null;
                let worst = matches[0];
                let worstScore = scoreFn ? scoreFn(worst) : 0;
                if (scoreFn) {
                    for (let i = 1; i < matches.length; i++) {
                        const s = scoreFn(matches[i]);
                        if (s > worstScore) {
                            worstScore = s;
                            worst = matches[i];
                        }
                    }
                }
                return { count: matches.length, worst };
            }

            function occurrenceSuffix(count, worst) {
                if (count <= 1) return `worst at ${fmtTime(worst.time)}.`;
                return `occurred ${count} times, worst at ${fmtTime(worst.time)}.`;
            }

            function mode(values) {
                const counts = new Map();
                let best = null;
                let bestCount = 0;
                for (const v of values) {
                    const c = (counts.get(v) || 0) + 1;
                    counts.set(v, c);
                    if (c > bestCount) {
                        bestCount = c;
                        best = v;
                    }
                }
                return best;
            }

            // FUEL RULES

            function ruleWotLeanWarn(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.load > 80 && s.afr > 13.0,
                    s => s.afr
                );
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Dangerously lean at wide-open throttle',
                    body: `AFR exceeded 13.0 under heavy load (>80% load), ${occurrenceSuffix(m.count, m.worst)} Peak AFR was ${m.worst.afr.toFixed(2)}.`,
                    fix: 'Add fuel in the affected high-load RPM range of the fuel map — increase multiplier 3-6% and re-log.',
                };
            }

            function ruleWotLeanCaution(data) {
                if (!hasSamples(data)) return null;
               const m = collectMatches(
                    data.samples,
                    s => s.load > 80 && s.afr > 12.5 && s.afr <= 13.0,
                    s => s.afr
                );
                if (!m) return null;
                return {
                    severity: 'caution',
                    title: 'Slightly lean at wide-open throttle',
                    body: `AFR crept above 12.5 under heavy load, ${occurrenceSuffix(m.count, m.worst)} Peak AFR was ${m.worst.afr.toFixed(2)}.`,
                    fix: 'Consider adding 2-3% fuel in this load/RPM cell to build in more margin.',
                };
            }

            function ruleWotRichCaution(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.load > 80 && s.afr < 11.0,
                    s => -s.afr
                );
                if (!m) return null;
                return {
                    severity: 'caution',
                    title: 'Overly rich at wide-open throttle',
                    body: `AFR dropped below 11.0 under heavy load, ${occurrenceSuffix(m.count, m.worst)} Leanest-of-the-rich reading was ${m.worst.afr.toFixed(2)}.`,
                    fix: 'Trim fuel 2-4% in this cell — excess richness wastes power and fouls plugs without a safety benefit here.',
                };
            }

            function ruleIdleRich(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.rpm < 1200 && s.afr < 13.5,
                    s => -s.afr
                );
                if (!m) return null;
                return {
                    severity: 'info',
                    title: 'Rich idle condition',
                    body: `AFR under 13.5 while below 1200 RPM, ${occurrenceSuffix(m.count, m.worst)}`,
                    fix: 'Lean the idle cells slightly (1-2%) for smoother idle quality and reduced fouling.',
                };
            }

            function ruleTipInSpike(data) {
                if (!hasSamples(data)) return null;
                const samples = data.samples;
                const hits = [];
                for (let i = 1; i < samples.length; i++) {
                    const prev = samples[i - 1];
                    const cur = samples[i];
                    const dt = (cur.time - prev.time) || 0.001;
                    const tpsRate = (cur.tps - prev.tps) / dt;
                    if (tpsRate > 150 && cur.afr < 11.0) {
                        hits.push(cur);
                    }
                }
                if (hits.length === 0) return null;
                let worst = hits[0];
                for (const h of hits) if (h.afr < worst.afr) worst = h;
                return {
                    severity: 'caution',
                    title: 'Fuel spike on rapid tip-in',
                    body: `AFR fell below 11.0 during a fast throttle stab, ${occurrenceSuffix(hits.length, worst)} Worst reading ${worst.afr.toFixed(2)}.`,
                    fix: 'Reduce accelerator-pump / transient fuel enrichment to avoid over-fueling on quick tip-in.',
                };
            }

            function ruleAfrDeviationSustained(data) {
                if (!hasSamples(data)) return null;
                const samples = data.samples;
                let runStart = null;
                let worstDelta = 0;
                let worstSample = null;
                let flaggedCount = 0;
                let worstOverall = null;
                let worstOverallDelta = 0;

                for (let i = 0; i < samples.length; i++) {
                    const s = samples[i];
                    const dev = Math.abs(s.afr - s.afrTarget) > 1.0;
                    if (dev) {
                        if (runStart === null) {
                            runStart = s.time;
                            worstDelta = Math.abs(s.afr - s.afrTarget);
                            worstSample = s;
                        } else {
                            const d = Math.abs(s.afr - s.afrTarget);
                            if (d > worstDelta) {
                                worstDelta = d;
                                worstSample = s;
                            }
                        }
                    } else {
                        if (runStart !== null) {
                            const duration = samples[i - 1].time - runStart;
                            if (duration > 2.0) {
                                flaggedCount++;
                                if (worstDelta > worstOverallDelta) {
                                    worstOverallDelta = worstDelta;
                                    worstOverall = worstSample;
                                }
                            }
                            runStart = null;
                        }
                    }
                }

                if (runStart !== null) {
                    const duration = samples[samples.length - 1].time - runStart;
                    if (duration > 2.0) {
                        flaggedCount++;
                        if (worstDelta > worstOverallDelta) {
                            worstOverallDelta = worstDelta;
                            worstOverall = worstSample;
                        }
                    }
                }

                if (flaggedCount === 0 || !worstOverall) return null;
                return {
                    severity: 'caution',
                    title: 'AFR drifting from target for 2+ seconds',
                    body: `AFR deviated more than 1.0 from target for a sustained period, ${occurrenceSuffix(flaggedCount, worstOverall)} Deviation reached ${worstOverallDelta.toFixed(2)}.`,
                    fix: 'Check closed-loop fueling trims and the fuel map cell for this RPM/load range — the map may not match actual delivery.',
                };
            }

            // BOOST RULES (turbo only)

            function ruleLeanUnderBoost(data) {
                if (!hasSamples(data) || !data.hasTurbo) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.boost > 5 && s.afr > 13.2,
                    s => s.afr
                );
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Lean condition under boost',
                    body: `AFR exceeded 13.2 while boost was above 5 PSI, ${occurrenceSuffix(m.count, m.worst)} Peak AFR ${m.worst.afr.toFixed(2)} at ${m.worst.boost.toFixed(1)} PSI.`,
                    fix: 'Add fuel in the boosted cells immediately — lean-under-boost risks detonation and engine damage.',
                };
            }

            function ruleBoostOvershoot(data) {
                if (!hasSamples(data) || !data.hasTurbo) return null;
                const limit = (data.boostMax || 0) * 1.1;
                const m = collectMatches(
                    data.samples,
                    s => s.boost > limit,
                    s => s.boost
                );
                if (!m) return null;
                return {
                    severity: 'caution',
                    title: 'Boost overshooting target ceiling',
                    body: `Boost exceeded 110% of max target (${limit.toFixed(1)} PSI), ${occurrenceSuffix(m.count, m.worst)} Peak boost ${m.worst.boost.toFixed(1)} PSI.`,
                    fix: 'Tighten wastegate duty cycle / boost controller gain to reduce overshoot.',
                };
            }

            function ruleLaunchBoostSpike(data) {
                if (!hasSamples(data) || !data.hasTurbo) return null;
                const samples = data.samples;
                const hits = [];
                for (let i = 1; i < samples.length; i++) {
                    const prev = samples[i - 1];
                    const cur = samples[i];
                    if (prev.transBrake === 1 && cur.transBrake === 0 && cur.boost > 8) {
                        hits.push(cur);
                    }
                }
                if (hits.length === 0) return null;
                let worst = hits[0];
                for (const h of hits) if (h.boost > worst.boost) worst = h;
                return {
                    severity: 'info',
                    title: 'High boost spike at transbrake release',
                    body: `Boost exceeded 8 PSI at the moment of transbrake release, ${occurrenceSuffix(hits.length, worst)} Peak ${worst.boost.toFixed(1)} PSI.`,
                    fix: 'This is expected for a strong launch setup — verify the driveline and clutch can handle the spike.',
                };
            }

            // TIMING RULES
            
            function ruleAggressiveAdvanceHighLoad(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.load > 70 && s.timingAdv > 20,
                    s => s.timingAdv
                );
                if (!m) return null;
                return {
                    severity: 'caution',
                    title: 'Aggressive timing advance at high load',
                    body: `Timing advance exceeded 20° with load above 70%, ${occurrenceSuffix(m.count, m.worst)} Peak advance ${m.worst.timingAdv.toFixed(1)}°.`,
                    fix: 'Pull 2-3° of timing from this load range unless knock data confirms it is safe.',
                };
            }

            function ruleAggressiveWotHighRpm(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.rpm > 5000 && s.load > 80 && s.timingAdv > 25,
                    s => s.timingAdv
                );
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Excessive timing at high RPM WOT',
                    body: `Timing advance exceeded 25° above 5000 RPM at wide-open throttle, ${occurrenceSuffix(m.count, m.worst)} Peak advance ${m.worst.timingAdv.toFixed(1)}° at ${Math.round(m.worst.rpm)} RPM.`,
                    fix: 'Reduce timing in this RPM/load cell — this is a high-risk detonation zone.',
                };
            }

            function ruleTimingIntoLeanZone(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.afr > 13.0 && s.timingAdv > 18,
                    s => s.timingAdv + (s.afr - 13.0) * 5
                );
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Timing too aggressive in a lean zone',
                    body: `Timing exceeded 18° while AFR was above 13.0, ${occurrenceSuffix(m.count, m.worst)} AFR ${m.worst.afr.toFixed(2)} with ${m.worst.timingAdv.toFixed(1)}° advance.`,
                    fix: 'Either richen the fuel map in this cell or pull timing — this combination is a knock risk.',
                };
            }

            // SAFETY / THERMAL RULES

            function ruleWaterTempHigh(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(data.samples, s => s.waterTemp > 105, s => s.waterTemp);
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Coolant temperature too high',
                    body: `Water temp exceeded 105°C, ${occurrenceSuffix(m.count, m.worst)} Peak ${m.worst.waterTemp.toFixed(1)}°C.`,
                    fix: 'Check cooling system capacity and airflow before further high-load runs.',
                };
            }

            function ruleOilTempHigh(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(data.samples, s => s.oilTemp > 130, s => s.oilTemp);
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Oil temperature too high',
                    body: `Oil temp exceeded 130°C, ${occurrenceSuffix(m.count, m.worst)} Peak ${m.worst.oilTemp.toFixed(1)}°C.`,
                    fix: 'Add or upgrade oil cooling before continuing sustained high-load sessions.',
                };
            }

            function ruleOilPressureLowAtRpm(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.rpm > 3000 && s.oilPressure < 10,
                    s => -s.oilPressure
                );
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Low oil pressure at high RPM',
                    body: `Oil pressure dropped below 10 PSI above 3000 RPM, ${occurrenceSuffix(m.count, m.worst)} Lowest pressure ${m.worst.oilPressure.toFixed(1)} PSI at ${Math.round(m.worst.rpm)} RPM.`,
                    fix: 'Stop and inspect oil level, pump, and bearings immediately — this risks engine damage.',
                };
            }

            // LAUNCH / TRANSBRAKE RULES

            function ruleLaunchRpmDeviation(data) {
                if (!hasSamples(data)) return null;
                const samples = data.samples;
                const heldRpms = samples.filter(s => s.transBrake === 1).map(s => Math.round(s.rpm));
                if (heldRpms.length === 0) return null;
                const commonRpm = mode(heldRpms);
                if (commonRpm === null) return null;

                const hits = [];
                for (let i = 1; i < samples.length; i++) {
                    const prev = samples[i - 1];
                    const cur = samples[i];
                    if (prev.transBrake === 1 && cur.transBrake === 0) {
                        if (Math.abs(cur.rpm - commonRpm) > 300) hits.push(cur);
                    }
                }
                if (hits.length === 0) return null;
                let worst = hits[0];
                for (const h of hits) {
                    if (Math.abs(h.rpm - commonRpm) > Math.abs(worst.rpm - commonRpm)) worst = h;
                }
                return {
                    severity: 'caution',
                    title: 'Launch RPM inconsistent at release',
                    body: `Release RPM deviated more than 300 from the usual launch RPM (${commonRpm}), ${occurrenceSuffix(hits.length, worst)} Release RPM was ${Math.round(worst.rpm)}.`,
                    fix: 'Check transbrake solenoid timing and idle-up/launch RPM control consistency.',
                };
            }

            function ruleAfrDuringLaunchHold(data) {
                if (!hasSamples(data)) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.transBrake === 1 && (s.afr < 12.0 || s.afr > 13.5),
                    s => Math.max(12.0 - s.afr, s.afr - 13.5)
                );
                if (!m) return null;
                return {
                    severity: 'caution',
                    title: 'AFR out of range during launch hold',
                    body: `AFR fell outside 12.0-13.5 while holding the transbrake, ${occurrenceSuffix(m.count, m.worst)} Reading was ${m.worst.afr.toFixed(2)}.`,
                    fix: 'Tune the launch-hold fuel cell so AFR stays in the 12.0-13.5 window for a consistent launch.',
                };
            }

            // CROSS-MAP RULES

            function ruleLeanBoostHighLoad(data) {
                if (!hasSamples(data) || !data.hasTurbo) return null;
                const m = collectMatches(
                    data.samples,
                    s => s.boost > 8 && s.afr > 13.0 && s.load > 70,
                    s => s.boost + (s.afr - 13.0) * 5
                );
                if (!m) return null;
                return {
                    severity: 'warn',
                    title: 'Lean, high boost, and high load together',
                    body: `The most dangerous combination occurred: boost above 8 PSI, AFR above 13.0, and load above 70%, ${occurrenceSuffix(m.count, m.worst)} Boost ${m.worst.boost.toFixed(1)} PSI, AFR ${m.worst.afr.toFixed(2)}.`,
                    fix: 'Address immediately — add substantial fuel and/or reduce boost target in this cell before further runs.',
                };
            }

            function ruleTimingAggressiveInLeanFuelCell(data) {
                if (!hasSamples(data)) return null;
                if (!data.fuelMap) return null;
                const samples = data.samples;
                const hits = [];
                for (const s of samples) {
                    if (s.fuelCellRPM === undefined || s.fuelCellLoad === undefined) continue;
                    const row = data.fuelMap[s.fuelCellRPM];
                    if (!row) continue;
                    const mult = row[s.fuelCellLoad];
                    if (mult === undefined) continue;
                    if (s.timingAdv > 20 && mult < 1.0) {
                        hits.push(s);
                    }
                }
                if (hits.length === 0) return null;
                let worst = hits[0];
                for (const h of hits) if (h.timingAdv > worst.timingAdv) worst = h;
                return {
                    severity: 'warn',
                    title: 'Aggressive timing paired with lean fuel cell',
                    body: `Timing advance was aggressive (>20°) in a fuel map cell with a sub-1.0 multiplier, ${occurrenceSuffix(hits.length, worst)} Timing ${worst.timingAdv.toFixed(1)}°.`,
                    fix: 'Either richen the fuel map cell toward 1.0 or reduce timing advance for that RPM/load combination.',
                    cells: cellRef(worst.fuelCellRPM, worst.fuelCellLoad),
                };
            }

            // MAP-ONLY RULES (used when no log samples are present)

            function ruleMapHighRpmLeanFuel(data) {
                if (hasSamples(data) || !data.fuelMap) return null;
                const rowKeys = Object.keys(data.fuelMap);
                if (rowKeys.length < 10) {
                }
                const flaggedCells = [];
                for (let r = 5; r <= 9 && r < rowKeys.length; r++) {
                    const row = data.fuelMap[rowKeys[r]];
                    if (!Array.isArray(row)) continue;
                    for (let c = 0; c < row.length; c++) {
                        if (row[c] < 0.7) flaggedCells.push({ r, c, val: row[c] });
                    }
                }
                if (flaggedCells.length === 0) return null;
                let worst = flaggedCells[0];
                for (const cell of flaggedCells) if (cell.val < worst.val) worst = cell;
                const cellsStr = flaggedCells
                    .map(cell => cellRef(cell.r, cell.c))
                    .join(', ');
                return {
                    severity: 'caution',
                    title: 'High-RPM lean fuel cells detected',
                    body: `${flaggedCells.length} cell(s) in RPM rows 6-10 have a fuel multiplier below 0.7. Lowest multiplier is ${worst.val.toFixed(2)} at ${cellRef(worst.r, worst.c)}.`,
                    fix: 'Raise the multiplier in these high-RPM cells toward at least 0.85-1.0 before running the tune, then verify with a log.',
                    cells: cellsStr,
                };
            }

            function ruleMapHighLoadAggressiveTiming(data) {
                if (hasSamples(data) || !data.timingMap) return null;
                const rowKeys = Object.keys(data.timingMap);
                const flaggedCells = [];
                for (let r = 0; r < rowKeys.length; r++) {
                    const row = data.timingMap[rowKeys[r]];
                    if (!Array.isArray(row)) continue;
                    for (let c = 7; c <= 9 && c < row.length; c++) {
                        if (row[c] > 28) flaggedCells.push({ r, c, val: row[c] });
                    }
                }
                if (flaggedCells.length === 0) return null;
                let worst = flaggedCells[0];
                for (const cell of flaggedCells) if (cell.val > worst.val) worst = cell;
                const cellsStr = flaggedCells
                    .map(cell => cellRef(cell.r, cell.c))
                    .join(', ');
                return {
                    severity: 'warn',
                    title: 'High-load timing too aggressive',
                    body: `${flaggedCells.length} cell(s) in load columns 8-10 exceed 28° of advance. Highest is ${worst.val.toFixed(1)}° at ${cellRef(worst.r, worst.c)}.`,
                    fix: 'Pull timing in these high-load columns before running this map — untested aggressive timing at high load is a detonation risk.',
                    cells: cellsStr,
                };
            }

            // RULES registry (priority order preserved; final sort is by severity)

            const RULES = [
                // FUEL
                ruleWotLeanWarn,
                ruleWotLeanCaution,
                ruleWotRichCaution,
                ruleIdleRich,
                ruleTipInSpike,
                ruleAfrDeviationSustained,
                // BOOST
                ruleLeanUnderBoost,
                ruleBoostOvershoot,
                ruleLaunchBoostSpike,
                // TIMING
                ruleAggressiveAdvanceHighLoad,
                ruleAggressiveWotHighRpm,
                ruleTimingIntoLeanZone,
                // SAFETY / THERMAL
                ruleWaterTempHigh,
                ruleOilTempHigh,
                ruleOilPressureLowAtRpm,
                // LAUNCH / TRANSBRAKE
                ruleLaunchRpmDeviation,
                ruleAfrDuringLaunchHold,
                // CROSS-MAP
                ruleLeanBoostHighLoad,
                ruleTimingAggressiveInLeanFuelCell,
                // MAP-ONLY (only fire when samples are absent)
                ruleMapHighRpmLeanFuel,
                ruleMapHighLoadAggressiveTiming,
            ];

            /**
            * Runs every rule against `data`, drops nulls, and returns suggestions
            * sorted by severity (warn > caution > info). Rules that don't apply
            * (e.g. boost rules with no turbo) simply return null and are skipped.
            *
            * @param {Object} data - see spec for full shape (samples, fuelMap, timingMap,
            *                         boostMax, hasTurbo, rTier)
            * @returns {Array<Object>} suggestion cards
            */
            function runAdvisorRules(data) {
                if (!data) return [];

                const suggestions = [];
                for (const rule of RULES) {
                    let result;
                    try {
                        result = rule(data);
                    } catch (err) {
                        result = null;
                    }
                    if (result) suggestions.push(result);
                }

                suggestions.sort((a, b) => {
                    const sa = SEVERITY_ORDER[a.severity] ?? 99;
                    const sb = SEVERITY_ORDER[b.severity] ?? 99;
                    return sa - sb;
                });

                return suggestions;
            }

            if (typeof module !== 'undefined' && module.exports) {
                module.exports = { RULES, runAdvisorRules };
            }

            scope.suggestions = []
            scope.lastScanTime = null
            scope.scanPending = false

            scope.rescan = function() {
                scope.scanPending = true
                bngApi.activeObjectLua('extensions.auto_jtechECU.getStatus()', function(status) {
                    scope.$apply(function() {
                        if (!status) {
                            scope.scanPending = false
                            return
                        }

                        var advisorData = {
                            samples: scope.logData ? scope.logData.samples : [],
                            fuelMap: status.fuelMap,
                            timingMap: status.timingMap,
                            boostMax: status.boostMax,
                            hasTurbo: status.hasTurbo,
                            rTier: status.rTier
                        }

                        scope.suggestions = runAdvisorRules(advisorData)
                        scope.scanPending = false

                        var now = new Date()
                        scope.lastScanTime = ('0' + now.getHours()).slice(-2) + ':' +
                            ('0' + now.getMinutes()).slice(-2) + ':' +
                            ('0' + now.getSeconds()).slice(-2)
                    })
                })
            }

            scope.openTuneAdvisor = function() {
                window.open('jtech_tune_advisor.html')
            }

            // LEARN tab data

            scope.learnArticles = [
                {
                    id: 'what-is-this-ecu', category: 'Getting Started', title: 'What is this ECU?',
                    subtitle: 'An overview of the JTECH Performance ECU system.',
                    content: [
                        { type: 'callout', text: 'The JTECH ECU replaces your stock engine management with a fully tunable fuel, timing, and boost control system.' },
                        { type: 'body', text: 'It reads live sensor data (RPM, throttle, air-fuel ratio, boost, and temperatures) and adjusts fuel and ignition maps in real time to match the conditions you tune for.' },
                        { type: 'body', text: 'The amount of control you have depends on the hardware tier installed in your vehicle — higher tiers unlock more maps, safety features, and diagnostic tools.' },
                        { type: 'tip', text: 'Start on the DASH tab to get a feel for your current readings before making any changes.' }
                    ]
                },
                {
                    id: 'hardware-tiers', category: 'Getting Started', title: 'Hardware tiers explained',
                    subtitle: 'What R1, R2, and R3 ECUs unlock.',
                    content: [
                        { type: 'body', text: 'JTECH hardware comes in three tiers. Each tier builds on the last, unlocking more editable maps and advanced protections.' },
                        { type: 'params', rows: [
                            { name: 'R1', desc: 'Basic monitoring — read-only dash and fault detection.', tag: 'ENTRY' },
                            { name: 'R2', desc: 'Fuel and boost map editing, EGT/knock estimation, tune suggestions.', tag: 'MID' },
                            { name: 'R3', desc: 'Full timing map control, launch control, and advanced safety limiters.', tag: 'TOP' }
                        ]},
                        { type: 'tip', text: 'Locked tabs in the sidebar show a lock icon — click one to see which tier unlocks it.' }
                    ]
                },
                {
                    id: 'afr-basics', category: 'Tuning', title: 'Understanding AFR',
                    subtitle: 'What air-fuel ratio means and why it matters.',
                    content: [
                        { type: 'callout', text: 'AFR (air-fuel ratio) is the mass ratio of air to fuel in the combustion chamber. It is one of the most important numbers in tuning.' },
                        { type: 'params', rows: [
                            { name: '14.7:1', desc: 'Stoichiometric — the chemically ideal ratio for complete combustion.', tag: 'CRUISE' },
                            { name: '12.5–13.2:1', desc: 'Slightly rich — used under load for extra cooling and safety margin.', tag: 'WOT' },
                            { name: '10.5–12:1', desc: 'Very rich — common on high-boost applications to control EGT and knock.', tag: 'BOOST' }
                        ]},
                        { type: 'tip', text: 'Running too lean under load raises combustion temperatures and knock risk — the SAFE tab lets you set fault thresholds to catch this.' },
                        { type: 'body', text: 'The fuel map on the FUEL tab is a multiplier table: values above 1.0 add fuel (richer), values below 1.0 remove fuel (leaner).' }
                    ]
                },
                {
                    id: 'reading-fuel-map', category: 'Tuning', title: 'Reading the fuel map',
                    subtitle: 'How the RPM × load grid controls your mixture.',
                    content: [
                        { type: 'body', text: 'The fuel map is a grid with RPM across the columns and engine load down the rows. Each cell is a multiplier applied to the base stoichiometric AFR.' },
                        { type: 'body', text: 'Cells are colored from lean (green) to rich (orange) so you can spot trends across the map at a glance. The currently active cell is outlined so you can watch it change live as you drive.' },
                        { type: 'tip', text: 'Edit multiple cells at once by clicking and dragging to select a region, then typing an absolute value or nudging with the arrow keys.' }
                    ]
                },
                {
                    id: 'ignition-timing', category: 'Tuning', title: 'Ignition timing basics',
                    subtitle: 'Advancing and retarding spark for power and safety.',
                    content: [
                        { type: 'body', text: 'Ignition timing controls when the spark plug fires relative to piston position, measured in degrees of advance before top dead center.' },
                        { type: 'body', text: 'More advance generally makes more power up to a point, but too much advance causes knock — the sound of fuel igniting unevenly under pressure, which can damage the engine.' },
                        { type: 'tip', text: 'Avoid abrupt jumps between adjacent timing cells — smooth transitions reduce torque spikes and knock risk. The SUGGEST tab flags steps greater than 8°.' }
                    ]
                },
                {
                    id: 'boost-control', category: 'Tuning', title: 'Boost control',
                    subtitle: 'Wastegate offsets and fuel/timing trims under boost.',
                    content: [
                        { type: 'body', text: 'The BOOST tab lets you trim wastegate duty (offset) as well as fuel and timing behavior specifically under boost, layered on top of the base fuel and timing maps.' },
                        { type: 'body', text: 'The boost offset map is indexed by RPM and gear, letting you tailor spool and boost delivery differently per gear.' },
                        { type: 'tip', text: 'If boost consistently overshoots your target, the SUGGEST tab will flag it as a boost overrun and recommend a wastegate duty adjustment.' }
                    ]
                },
                {
                    id: 'fault-thresholds', category: 'Safety', title: 'Fault thresholds',
                    subtitle: 'How lean and rich AFR faults are detected.',
                    content: [
                        { type: 'body', text: 'The SAFE tab lets you configure AFR thresholds that trigger lean and rich fault warnings.' },
                        { type: 'params', rows: [
                            { name: 'Lean fault', desc: 'Triggers when AFR rises above the configured lean threshold (default 15.5:1).', tag: 'WARN' },
                            { name: 'Rich fault', desc: 'Triggers when AFR falls below the configured rich threshold (default 10.5:1).', tag: 'INFO' }
                        ]},
                        { type: 'tip', text: 'Faults surface on the DASH and LOGS tabs so you can catch problems mid-drive.' }
                    ]
                },
                {
                    id: 'rev-limiters', category: 'Safety', title: 'Rev limiters',
                    subtitle: 'Soft and hard rev limiting behavior.',
                    content: [
                        { type: 'body', text: 'The soft limit leans the mixture out to gently discourage further RPM climb. The hard cut interrupts ignition entirely to enforce a strict ceiling.' },
                        { type: 'tip', text: 'Set the soft limit a few hundred RPM below the hard cut to give yourself a warning margin before ignition cut kicks in.' }
                    ]
                },
                {
                    id: 'glossary', category: 'Reference', title: 'Glossary',
                    subtitle: 'Common terms used throughout the ECU.',
                    content: [
                        { type: 'params', rows: [
                            { name: 'AFR', desc: 'Air-fuel ratio — mass of air relative to fuel in the mixture.' },
                            { name: 'EGT', desc: 'Exhaust gas temperature, measured in the exhaust stream.' },
                            { name: 'VE', desc: 'Volumetric efficiency — the fuel map multiplier table.' },
                            { name: 'WOT', desc: 'Wide open throttle — full throttle input.' },
                            { name: 'Knock', desc: 'Uncontrolled combustion causing pressure spikes, a.k.a. detonation.' }
                        ]}
                    ]
                }
            ]

            scope.activeArticleId = null
            scope.currentArticle = null
            scope.learnCategories = []
            scope.learnArticlesByCategory = {}
            scope.learnArticles.forEach(function(a) {
                if(scope.learnCategories.indexOf(a.category) === -1) scope.learnCategories.push(a.category)
                if(!scope.learnArticlesByCategory[a.category]) scope.learnArticlesByCategory[a.category] = []
                scope.learnArticlesByCategory[a.category].push(a)
            })

            scope.openArticle = function(id) {
                scope.activeArticleId = id
                scope.currentArticle = scope.learnArticles.filter(function(a) { return a.id === id })[0] || null
            }

            scope.articleProgress = function() {
                if(!scope.currentArticle) return ''
                var group = scope.learnArticlesByCategory[scope.currentArticle.category] || []
                var idx = group.map(function(a){return a.id}).indexOf(scope.currentArticle.id)
                return (idx + 1) + ' / ' + group.length + ' articles in ' + scope.currentArticle.category
            }

            scope.prevArticleId = function() {
                var idx = scope.learnArticles.map(function(a){return a.id}).indexOf(scope.activeArticleId)
                return idx > 0 ? scope.learnArticles[idx - 1].id : null
            }

            scope.nextArticleId = function() {
                var idx = scope.learnArticles.map(function(a){return a.id}).indexOf(scope.activeArticleId)
                return (idx >= 0 && idx < scope.learnArticles.length - 1) ? scope.learnArticles[idx + 1].id : null
            }

            var LOCK_TIER = { nitrous: 3, limiters: 2, dyno: 2 }
            scope.canAccessTab = function(key) {
                var required = LOCK_TIER[key]
                if (!required) return true
                return scope.rTier >= required
            }

            scope.tabClick = function(key) {
                if (scope.canAccessTab(key)) {
                    scope.selectTab(key)
                } else {
                    var tier = LOCK_TIER[key]
                    var msg = 'Requires R' + tier + ' hardware'
                    bngApi.engineLua("guihooks.trigger('toastMsg', {type='warning', title='JTECH',msg='" + msg + "'})")
                }
            }

            var settingsLoaded = false

            var timingMapData = []
            var timingSelected = new Set()
            var timingDragStart = null
            var timingInputtingCell = null

            var STATUS_STRIP_TABS = ['fuel', 'timing', 'boost', 'safe', 'limiters']
            var COMING_SOON_TABS = []
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
                if(tab === 'limiters') {
                    bngApi.activeObjectLua('extensions.auto_jtechECU.getStatus()', function(data) {
                        scope.$apply(function() {
                            if(data.limiterSettings) populateLimiterInputs(data.limiterSettings)
                        })
                    })
                }
                if(tab === 'suggest' && scope.suggestions.length === 0 && !scope.scanPending) {
                    scope.rescan()
                }
                if(tab === 'learn' && !scope.activeArticleId && scope.learnArticles.length) {
                    scope.openArticle(scope.learnArticles[0].id)
                }
            }

            scope.selectTab = scope.setTab

            scope.startLog = function() {
                bngApi.engineLua('extensions.jtechLoggerGE.startLog(' + scope.logDuration + ')')
                scope.logRecording = true
            }

            var logChannels = [
                    { key: 'rpm',           label: 'RPM',               color: '#00E5A0', max: 10000 },
                    { key: 'tps',           label: 'TPS %',             color: '#F0A500', max: 100   },
                    { key: 'boost',         label: 'BOOST PSI',         color: '#60A0FF', max: 30    },
                    { key: 'afr',           label: 'AFR',               color: '#FF6060', max: 20    },
                    { key: 'clutch',        label: 'CLUTCH %',          color: '#E060FF', max: 100   },
                    { key: 'speed',         label: 'SPEED MPH',         color: '#FFFFFF', max: 100   },
                    { key: 'waterTemp',     label: 'WATER °C',          color: '#FF8844', max: 150   },
                    { key: 'oilTemp',       label: 'OIL °C',            color: '#FF4444', max: 150   },
                    { key: 'oilPressure',   label: 'OIL PSI',           color: '#FFDD44', max: 80    },
                    { key: 'transBrake',    label: 'TransBrake',        color: '#CC44FF', max: 1     },
                    { key: 'launchActive',  label: 'Launch Control',    color: '#00C9A7', max: 1     },
                    { key: 'load',          label: 'Engine Load %',     color: '#707070', max: 100   },
                    { key: 'timingAdv',     label: 'Ignition Advance°', color: '#A78BFA', max: 45    },
                    { key: 'fuelCellRPM',   label: 'Active Cell RPM',   color: '#6B9FD4', max: 10    },
                    { key: 'fuelCellLoad',  label: 'Active Cell Load',  color: '#C4854A', max: 10    },
                    { key: 'egt',           label: 'EGT °C',            color: '#FF4400', max: 1200  },
                    { key: 'knockLevel',    label: 'Knock Level',       color: '#FFB700', max: 100   },
                ]

            scope.stopLog = function() {
                bngApi.engineLua('extensions.jtechLoggerGE.stopLog()')
                scope.logRecording = false
                bngApi.engineLua('extensions.jtechLoggerGE.fetchLogData()')
            }

            scope.exportLog = function() {
                if(!scope.logData || !scope.logData.samples || scope.logData.samples.length === 0) return
                
                var rows = ['time,rpm,tps,boost,afr,afrTarget,gear,clutch,speed_mph,waterTemp_c,oilTemp_c,oilPressure,transBrake,launchActive,load_pct,timingAdv_deg,fuelCellRPM,fuelCellLoad,egt_c,knockLevel']
                scope.logData.samples.forEach(function(s) {
                    rows.push([
                        (s.time || 0).toFixed(2),
                        Math.round(s.rpm || 0),
                        (s.tps || 0).toFixed(1),
                        (s.boost || 0).toFixed(2),
                        (s.afr || 0).toFixed(2),
                        (s.afrTarget || 0).toFixed(2),
                        (function() { var g = String(s.gear || 'N'); if(g === '0') g = 'N'; if(g === '-1') g = 'R'; return g; })(),
                        (s.clutch || 0).toFixed(1),
                        ((s.speed || 0) * 2.237).toFixed(2),
                        (s.waterTemp || 0).toFixed(1),
                        (s.oilTemp || 0).toFixed(1),
                        (s.oilPressure || 0).toFixed(1),
                        s.transBrake || 0,
                        s.launchActive || 0,
                        (s.load || 0).toFixed(1),
                        (s.timingAdv || 0).toFixed(1),
                        Math.round(s.fuelCellRPM || 0),
                        Math.round(s.fuelCellLoad || 0),
                        (s.egt || 0).toFixed(0),
                        (s.knockLevel || 0).toFixed(1)
                    ].join(','))
                })
                
                var csv = rows.join('\n')
                var blob = new Blob([csv], {type: 'text/csv'})
                var url = URL.createObjectURL(blob)
                var a = document.createElement('a')
                a.href = url
                var now = new Date()
                var ts = now.getFullYear().toString().slice(-2) +
                ('0' + (now.getMonth() + 1)).slice(-2) +
                ('0' + now.getDate()).slice(-2) + '_' +
                ('0' + now.getHours()).slice(-2) +
                ('0' + now.getMinutes()).slice(-2)
                a.download = 'jtech_log_' + ts + '.csv'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                bngApi.engineLua('guihooks.trigger("toastrMsg",{type="success",title="JTECH — Log Exported",msg="Saved to Downloads folder."})')
            }

            scope.exportHTML = function() {
                if(!scope.logData || !scope.logData.samples || scope.logData.samples.length === 0) return

                var samples = scope.logData.samples
                var events = scope.logData.events
                var duration = scope.logData.duration

                var channels = [
                    { key: 'rpm',           label: 'RPM',               color: '#00E5A0', max: 10000 },
                    { key: 'tps',           label: 'TPS %',             color: '#F0A500', max: 100   },
                    { key: 'boost',         label: 'BOOST PSI',         color: '#60A0FF', max: 30    },
                    { key: 'afr',           label: 'AFR',               color: '#FF6060', max: 20    },
                    { key: 'clutch',        label: 'CLUTCH %',          color: '#E060FF', max: 100   },
                    { key: 'speed',         label: 'SPEED MPH',         color: '#FFFFFF', max: 100   },
                    { key: 'waterTemp',     label: 'WATER °C',          color: '#FF8844', max: 150   },
                    { key: 'oilTemp',       label: 'OIL °C',            color: '#FF4444', max: 150   },
                    { key: 'oilPressure',   label: 'OIL PSI',           color: '#FFDD44', max: 80    },
                    { key: 'transBrake',    label: 'TransBrake',        color: '#CC44FF', max: 1     },
                    { key: 'launchActive',  label: 'Launch Control',    color: '#00C9A7', max: 1     },
                    { key: 'load',          label: 'Engine Load %',     color: '#707070', max: 100   },
                    { key: 'timingAdv',     label: 'Ignition Advance°', color: '#A78BFA', max: 45    },
                    { key: 'fuelCellRPM',   label: 'Active Cell RPM',   color: '#6B9FD4', max: 10    },
                    { key: 'fuelCellLoad',  label: 'Active Cell Load',  color: '#C4854A', max: 10    },
                    { key: 'egt',           label: 'EGT °C',            color: '#FF4400', max: 1200  },
                    { key: 'knockLevel',    label: 'Knock Level',        color: '#FFB700', max: 100   },
                ]

                var now = new Date()
                var ts = now.getFullYear().toString().slice(-2) +
                    ('0' + (now.getMonth() + 1)).slice(-2) +
                    ('0' + now.getDate()).slice(-2) + '_' +
                    ('0' + now.getHours()).slice(-2) +
                    ('0' + now.getMinutes()).slice(-2)

                var html = `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <title>JTECH Log — ${ts}</title>
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
            <style>
            *{box-sizing:border-box;margin:0;padding:0;}
            body{background:#0B0D10;color:#E6E6E6;font-family:Inter,sans-serif;padding:24px;}
            .header{display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #1E2229;}
            .header-title{font-size:18px;color:#00E5A0;letter-spacing:.1em;}
            .header-meta{font-size:11px;color:#8A8F98;margin-top:4px;}
            .section-title{font-size:10px;color:#8A8F98;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}
            .chart-wrap{background:#0e1116;border:1px solid #1E2229;border-radius:4px;padding:12px;margin-bottom:12px;}
            .y-axis-label{font-size:9px;color:#8A8F98;margin-bottom:8px;}
            canvas{width:100%;display:block;border-radius:2px;}
            .legend{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;}
            .legend-btn{font-size:9px;padding:3px 10px;border-radius:2px;cursor:pointer;letter-spacing:.05em;transition:all 120ms;}
            .y-controls{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
            .y-label{font-size:9px;color:#8A8F98;letter-spacing:.08em;}
            .y-input{background:#0d1014;border:1px solid #1E2229;border-radius:2px;color:#E6E6E6;font-size:11px;padding:3px 8px;width:80px;outline:none;}
            .y-input:focus{border-color:#00E5A0;}
            .y-btn{font-size:9px;padding:4px 10px;border-radius:2px;cursor:pointer;background:#002a1f;color:#00E5A0;border:1px solid #005540;letter-spacing:.05em;}
            .events{background:#0e1116;border:1px solid #1E2229;border-radius:4px;padding:12px;margin-bottom:16px;max-height:300px;overflow-y:auto;}
            .event-row{display:flex;gap:16px;align-items:center;padding:4px 0;border-bottom:1px solid #1E2229;}
            .event-time{font-size:9px;color:#8A8F98;flex-shrink:0;width:60px;}
            .event-tag{font-size:10px;font-weight:700;}
            .footer{font-size:9px;color:#4A5570;text-align:center;margin-top:24px;letter-spacing:.08em;}
            </style>
            </head>
            <body>
            <div class="header">
                <div>
                    <div class="header-title">JTECH PERFORMANCE — DATA LOG</div>
                    <div class="header-meta">RECORDED: ${ts} &nbsp;·&nbsp; DURATION: ${duration.toFixed(1)}s &nbsp;·&nbsp; SAMPLES: ${samples.length}</div>
                </div>
            </div>

            <div class="section-title">Channel Display</div>
            <div class="legend" id="legend"></div>

            <div class="y-controls">
                <span class="y-label">Y-AXIS CHANNEL:</span>
                <select id="yAxisChannel" style="background:#0d1014;border:1px solid #1E2229;border-radius:2px;color:#E6E6E6;font-family:'JetBrains Mono',monospace;font-size:10px;padding:3px 8px;outline:none;">
                    ${channels.map(function(ch) { return '<option value="' + ch.key + '">' + ch.label + '</option>' }).join('')}
                </select>
                <span class="y-label">MAX:</span>
                <input class="y-input" id="yMax" type="number" value="10000"/>
                <button class="y-btn" onclick="applyYAxis()">APPLY</button>
                <button class="y-btn" onclick="resetYAxis()" style="background:#1a1400;color:#F0A500;border-color:#554000;">RESET</button>
            </div>

            <div class="chart-wrap">
                <div class="y-axis-label" id="yAxisLabel">Y-AXIS: RPM (0 – 10000)</div>
                <canvas id="chart"></canvas>
            </div>

            <div class="section-title">Event Log</div>
            <div class="events" id="events"></div>

            <div class="footer">GENERATED BY JTECH PERFORMANCE ECU &nbsp;·&nbsp; JTECH-PERFORMANCE.COM</div>

            <script>
            var samples = ${JSON.stringify(samples)};
            var events = ${JSON.stringify(events)};
            var channels = ${JSON.stringify(channels)};
            var activeChannels = channels.map(function() { return true; });
            var yAxisKey = 'rpm';
            var yAxisMax = 10000;

            function formatTime(t) {
                var m = Math.floor(t/60), s = Math.floor(t%60), d = Math.floor((t%1)*10);
                return (m<10?'0':'')+m+':'+(s<10?'0':'')+s+'.'+d;
            }

            function getEventColor(tag) {
                if(tag==='HARD_CUT'||tag==='WATER_WARN'||tag==='OIL_WARN') return '#E84040';
                if(tag==='LOG_START'||tag==='LOG_STOP'||tag==='TRANSBRAKE_OFF') return '#00E5A0';
                return '#F0A500';
            }

            function formatTag(tag) {
                if(tag.indexOf('GEAR_CHANGE_')===0) {
                    var g = tag.replace('GEAR_CHANGE_','');
                    if(g==='0') g='N'; if(g==='-1') g='R';
                    return 'GEAR: '+g;
                }
                var labels = {HARD_CUT:'HARD CUT',WATER_WARN:'WATER TEMP WARNING',OIL_WARN:'OIL TEMP WARNING',
                    LAUNCH_ACTIVE:'LAUNCH ACTIVE',LOG_START:'LOG START',LOG_STOP:'LOG STOP',
                    TRANSBRAKE_ON:'TRANSBRAKE ENGAGED',TRANSBRAKE_OFF:'TRANSBRAKE RELEASED'};
                return labels[tag]||tag;
            }

            function buildLegend() {
                var el = document.getElementById('legend');
                el.innerHTML = '';
                channels.forEach(function(ch, i) {
                    var btn = document.createElement('button');
                    btn.className = 'legend-btn';
                    btn.style.border = '1px solid '+ch.color;
                    btn.style.background = activeChannels[i] ? ch.color+'22' : 'transparent';
                    btn.style.color = activeChannels[i] ? ch.color : '#4A5570';
                    btn.textContent = '— '+ch.label;
                    btn.onclick = function() {
                        activeChannels[i] = !activeChannels[i];
                        buildLegend();
                        renderChart();
                    };
                    el.appendChild(btn);
                });
            }

            function buildEvents() {
                var el = document.getElementById('events');
                el.innerHTML = '';
                if(!events||!events.length) { el.innerHTML='<div style="font-family:JetBrains Mono,monospace;font-size:10px;color:#4A5570;text-align:center;padding:16px;">NO EVENTS</div>'; return; }
                events.forEach(function(ev) {
                    var row = document.createElement('div');
                    row.className = 'event-row';
                    row.innerHTML = '<span class="event-time">'+formatTime(ev.time)+'</span><span class="event-tag" style="color:'+getEventColor(ev.tag)+'">'+formatTag(ev.tag)+'</span>';
                    el.appendChild(row);
                });
            }

            function applyYAxis() {
                yAxisKey = document.getElementById('yAxisChannel').value;
                yAxisMax = parseFloat(document.getElementById('yMax').value) || 100;
                var ch = channels.find(function(c){return c.key===yAxisKey;});
                document.getElementById('yAxisLabel').textContent = 'Y-AXIS: '+(ch?ch.label:yAxisKey)+' (0 – '+yAxisMax+')';
                renderChart();
            }

            function resetYAxis() {
                var ch = channels.find(function(c){return c.key===yAxisKey;});
                if(ch) { yAxisMax = ch.max; document.getElementById('yMax').value = ch.max; }
                document.getElementById('yAxisLabel').textContent = 'Y-AXIS: '+(ch?ch.label:yAxisKey)+' (0 – '+yAxisMax+')';
                renderChart();
            }

            document.getElementById('yAxisChannel').addEventListener('change', function() {
                var ch = channels.find(function(c){return c.key===this.value;}.bind(this));
                if(ch) { document.getElementById('yMax').value = ch.max; }
            });

            function renderChart() {
                var canvas = document.getElementById('chart');
                canvas.width = canvas.offsetWidth;
                canvas.height = Math.round(canvas.offsetWidth * 0.35);
                var ctx = canvas.getContext('2d');
                var w = canvas.width, h = canvas.height;
                var pad = {top:30, right:20, bottom:30, left:60};
                var cw = w-pad.left-pad.right, ch = h-pad.top-pad.bottom;
                var dur = samples[samples.length-1].time||1;

                ctx.fillStyle='#0e1116'; ctx.fillRect(0,0,w,h);

                // Grid lines
                ctx.strokeStyle='#1E2229'; ctx.lineWidth=1;
                for(var gi=0;gi<=4;gi++) {
                    var gy = pad.top + ch - (gi/4)*ch;
                    ctx.beginPath(); ctx.moveTo(pad.left,gy); ctx.lineTo(pad.left+cw,gy); ctx.stroke();
                    ctx.fillStyle='#4A5570'; ctx.font='9px JetBrains Mono'; ctx.textAlign='right';
                    ctx.fillText(Math.round(yAxisMax*gi/4), pad.left-6, gy+3);
                }

                // X axis labels
                ctx.fillStyle='#4A5570'; ctx.font='9px JetBrains Mono'; ctx.textAlign='center';
                for(var ti=0;ti<=4;ti++) {
                    var t = (dur/4)*ti;
                    var tx = pad.left + (t/dur)*cw;
                    ctx.fillText(formatTime(t), tx, h-6);
                }

                // Channel lines — non-primary channels normalized to their own max
                channels.forEach(function(ch2, i) {
                    if(!activeChannels[i]) return;
                    var isPrimary = ch2.key === yAxisKey;
                    var max = isPrimary ? yAxisMax : ch2.max;
                    ctx.beginPath();
                    ctx.strokeStyle = ch2.color;
                    ctx.lineWidth = isPrimary ? 2.5 : 1.2;
                    ctx.globalAlpha = isPrimary ? 1.0 : 0.45;
                    samples.forEach(function(s, si) {
                        var x = pad.left + (s.time/dur)*cw;
                        var y = pad.top + ch - ((s[ch2.key]||0)/max)*ch;
                        if(si===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
                    });
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                });

                // Event markers
                if(events) events.forEach(function(ev) {
                    var x = pad.left + (ev.time/dur)*cw;
                    ctx.strokeStyle = getEventColor(ev.tag);
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = 0.5;
                    ctx.setLineDash([3,3]);
                    ctx.beginPath(); ctx.moveTo(x,pad.top); ctx.lineTo(x,pad.top+ch); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 1.0;
                });
            }

            window.addEventListener('resize', renderChart);
            buildLegend();
            buildEvents();
            renderChart();
            </script>
            </body>
            </html>`

                var blob = new Blob([html], {type: 'text/html'})
                var url = URL.createObjectURL(blob)
                var a = document.createElement('a')
                a.href = url
                var now2 = new Date()
                var ts2 = now2.getFullYear().toString().slice(-2) +
                    ('0' + (now2.getMonth() + 1)).slice(-2) +
                    ('0' + now2.getDate()).slice(-2) + '_' +
                    ('0' + now2.getHours()).slice(-2) +
                    ('0' + now2.getMinutes()).slice(-2)
                a.download = 'jtech_log_' + ts2 + '.html'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                bngApi.engineLua('guihooks.trigger("toastrMsg",{type="success",title="JTECH — Report Exported",msg="HTML report saved to Downloads folder."})')
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
                    return { title: 'JTECH ECU NOT DETECTED', sub: 'Install a JTECH R-Series ECU to unlock.' }
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

scope.nudgeFuelSelection = function(delta) {
    if (!scope.editMode || selected.size === 0) return
    selected.forEach(function(k) {
        var rc = parseKey(k)
        if (!mapData[rc[0]]) mapData[rc[0]] = []
        mapData[rc[0]][rc[1]] = Math.max(0, Math.min(5.0, Math.round((mapData[rc[0]][rc[1]] + delta) * 100) / 100))
    })
    renderMap()
    updateEditBar()
    pushMapToLua()
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
        if(scope.activeTab === 'limiters') updateLimiterStatus(data)
}

// EGT / Knock helpers
scope.egtColorClass = function() {
    var v = (scope.status && scope.status.egt) || 0
    if(v > 1350) return 'egt-red'
    if(v >= 1200) return 'egt-yellow'
    return 'egt-green'
}

scope.knockSegClass = function(n) {
    var filled = Math.round(((scope.status && scope.status.knockLevel) || 0) * 10)
    if(n >= filled) return ''
    if(n >= 7) return 'on-red'
    if(n >= 5) return 'on-yellow'
    return 'on-green'
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
            if(bdata[+rc[0]]) bdata[+rc[0]][+rc[1]] = Math.max(-60, Math.min(60, Math.round((bdata[+rc[0]][+rc[1]] + bdelta)*10)/10))
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

scope.nudgeTimingSelection = function(delta) {
    if (!scope.timingEditMode || timingSelected.size === 0) return
    timingSelected.forEach(function(k) {
        var rc = parseKey(k)
        timingMapData[rc[0]][rc[1]] = Math.max(0, Math.min(45, Math.round((timingMapData[rc[0]][rc[1]] + delta) * 10) / 10))
    })
    renderTimingMap()
    updateTimingEditBar()
    pushTimingMapToLua()
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

scope.nudgeBoostSelection = function(delta) {
    if (!scope.boostEditMode || boostSelected.size === 0) return
    var data = getBoostCurrentData()
    boostSelected.forEach(function(k) {
        var rc = k.split(',')
        if (data[+rc[0]]) data[+rc[0]][+rc[1]] = Math.max(-60, Math.min(60, Math.round((data[+rc[0]][+rc[1]] + delta) * 10) / 10))
    })
    renderBoostMap()
    updateBoostEditBar()
    pushBoostMapToLua()
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
        if(data[+rc[0]]) data[+rc[0]][+rc[1]] = Math.max(-60, Math.min(60, v))
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
    f('jtech-safe-waterlimit', s.waterTempLimit || 100)
    f('jtech-safe-oillimit', s.oilTempLimit || 130)
    f('jtech-safe-egtlimit', s.egtLimitC || 1050)
    f('jtech-safe-knockthresh', s.knockThreshold || 0.55)
    f('jtech-safe-knockretard', s.knockRetardDeg || 4.0)
    f('jtech-safe-boostceiling', s.boostCeilingPsi || 0)
    f('jtech-safe-timingpull', s.timingPullDeg || 5.0)
    f('jtech-safe-fuelpull', s.fuelPullPct || 10.0)
}

function populateLimiterInputs(s) {
    var f = function(id, val) { var el = document.getElementById(id); if(el) el.value = val }
    f('jtech-lim-launchrpm', s.launchRpm || 3500)
    f('jtech-lim-softrpm', s.softLimitRpm || 6500)
    f('jtech-lim-hardrpm', s.hardCutRpm || 6800)
    f('jtech-lim-3steprpm', s.threeStepRpm || 4500)
    f('jtech-lim-boostthresh', s.boostThresholdPsi || 8.0)
}

function updateSafeStatus(data) {
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
    var egtEl = document.getElementById('jtech-safe-egt-status')
    if(egtEl) {
        egtEl.textContent = data.egtWarning ? 'WARNING' : 'OK'
        egtEl.style.color = data.egtWarning ? 'var(--red)' : 'var(--teal)'
    }
    var knockEl = document.getElementById('jtech-safe-knock-status')
    if(knockEl) {
        knockEl.textContent = data.knockWarning ? 'KNOCK' : 'OK'
        knockEl.style.color = data.knockWarning ? 'var(--amber)' : 'var(--teal)'
    }
    var afrEl = document.getElementById('jtech-safe-afr-status')
    if(afrEl) {
        if(data.afrLeanWarning) { afrEl.textContent = 'LEAN'; afrEl.style.color = 'var(--red)' }
        else if(data.afrRichWarning) { afrEl.textContent = 'RICH'; afrEl.style.color = 'var(--amber)' }
        else { afrEl.textContent = 'OK'; afrEl.style.color = 'var(--teal)' }
    }
    var boostEl = document.getElementById('jtech-safe-boost-status')
    if(boostEl) {
        boostEl.textContent = data.boostOverrunWarning ? 'OVERRUN' : 'OK'
        boostEl.style.color = data.boostOverrunWarning ? 'var(--amber)' : 'var(--teal)'
    }
}

function updateLimiterStatus(data) {
    var revEl = document.getElementById('jtech-lim-rev-status')
    if(revEl) {
        if(data.hardCutActive) { revEl.textContent = 'HARD CUT'; revEl.style.color = 'var(--red)' }
        else if(data.softLimitActive) { revEl.textContent = 'SOFT LIMIT'; revEl.style.color = 'var(--amber)' }
        else { revEl.textContent = 'NORMAL'; revEl.style.color = 'var(--teal)' }
    }
    var transEl = document.getElementById('jtech-lim-trans-type')
    if(transEl) {
        if(data.isManual === null || data.isManual === undefined) { transEl.textContent = 'DETECTING...'; transEl.style.color = 'var(--dim)' }
        else { transEl.textContent = data.isManual ? 'MANUAL' : 'AUTOMATIC'; transEl.style.color = 'var(--teal)' }
    }
    var launchEl = document.getElementById('jtech-lim-launch-state')
    if(launchEl) {
        if(data.launchActive) { launchEl.textContent = 'ACTIVE'; launchEl.style.color = 'var(--amber)' }
        else if(data.launchArmed) { launchEl.textContent = 'ARMED'; launchEl.style.color = 'var(--teal)' }
        else { launchEl.textContent = 'OFF'; launchEl.style.color = 'var(--dim)' }
    }
    var tractionEl = document.getElementById('jtech-lim-traction')
    if(tractionEl) {
        tractionEl.textContent = data.tractionSlip ? 'SLIP' : 'OK'
        tractionEl.style.color = data.tractionSlip ? 'var(--amber)' : 'var(--teal)'
    }
    var launchBtn = document.getElementById('jtech-lim-launch-toggle')
    if(launchBtn && data.limiterSettings) {
        var len = data.limiterSettings.launchEnabled
        launchBtn.textContent = len ? 'ENABLED' : 'DISABLED'
        launchBtn.style.background = len ? '#002a1f' : '#1a0808'
        launchBtn.style.borderColor = len ? '#005540' : '#550000'
        launchBtn.style.color = len ? 'var(--teal)' : 'var(--red)'
    }
    var threeBtn = document.getElementById('jtech-lim-3step-toggle')
    if(threeBtn && data.limiterSettings) {
        var en3 = data.limiterSettings.threeStepEnabled
        threeBtn.textContent = en3 ? 'ENABLED' : 'DISABLED'
        threeBtn.style.background = en3 ? '#002a1f' : '#1a0808'
        threeBtn.style.borderColor = en3 ? '#005540' : '#550000'
        threeBtn.style.color = en3 ? 'var(--teal)' : 'var(--red)'
    }
    var stateEl = document.getElementById('jtech-lim-3step-state')
    if(stateEl && data.limiterSettings) {
        if(!data.limiterSettings.threeStepEnabled) { stateEl.textContent = 'OFF'; stateEl.style.color = 'var(--dim)' }
        else if(data.launchActive) {
            var boostNow = parseFloat(scope.boost) || 0
            if(boostNow < data.limiterSettings.boostThresholdPsi) { stateEl.textContent = 'SPOOLING'; stateEl.style.color = 'var(--amber)' }
            else { stateEl.textContent = 'BOOST MET'; stateEl.style.color = 'var(--teal)' }
        } else { stateEl.textContent = 'STANDBY'; stateEl.style.color = 'var(--dim)' }
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
        egtLimitC: parseInt(g('jtech-safe-egtlimit')) || 1050,
        knockThreshold: parseFloat(g('jtech-safe-knockthresh')) || 0.55,
        knockRetardDeg: parseFloat(g('jtech-safe-knockretard')) || 4.0,
        boostCeilingPsi: parseFloat(g('jtech-safe-boostceiling')) || 0,
        timingPullDeg: parseFloat(g('jtech-safe-timingpull')) || 5.0,
        fuelPullPct: parseFloat(g('jtech-safe-fuelpull')) || 10.0
    }
    var parts = []
    Object.keys(s).forEach(function(k) { parts.push(k + '=' + s[k]) })
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateSafeSettings({' + parts.join(',') + '})')
}

scope.applyLimiterRevSettings = function() {
    var g = function(id) { var el = document.getElementById(id); return el ? el.value : null }
    var s = {
        softLimitRpm: parseInt(g('jtech-lim-softrpm')) || 6500,
        hardCutRpm: parseInt(g('jtech-lim-hardrpm')) || 6800
    }
    var parts = []
    Object.keys(s).forEach(function(k) { parts.push(k + '=' + s[k]) })
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateLimiterSettings({' + parts.join(',') + '})')
}

scope.applyLimiterLaunchSettings = function() {
    var g = function(id) { var el = document.getElementById(id); return el ? el.value : null }
    var s = {
        launchRpm: parseInt(g('jtech-lim-launchrpm')) || 3500,
        threeStepRpm: parseInt(g('jtech-lim-3steprpm')) || 4500,
        boostThresholdPsi: parseFloat(g('jtech-lim-boostthresh')) || 8.0
    }
    var parts = []
    Object.keys(s).forEach(function(k) { parts.push(k + '=' + s[k]) })
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateLimiterSettings({' + parts.join(',') + '})')
}

scope.toggleLaunchControl = function() {
    if(scope.rTier < 2) return
    if(!scope.limiterSettings) scope.limiterSettings = {}
    var newVal = !(scope.limiterSettings.launchEnabled === true)
    scope.limiterSettings.launchEnabled = newVal
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateLimiterSettings({launchEnabled=' + (newVal ? 'true' : 'false') + '})')
}

scope.toggleThreeStep = function() {
    if(scope.rTier < 2) return
    if(!scope.limiterSettings) scope.limiterSettings = {}
    var newVal = !(scope.limiterSettings.threeStepEnabled === true)
    scope.limiterSettings.threeStepEnabled = newVal
    bngApi.activeObjectLua('extensions.auto_jtechECU.updateLimiterSettings({threeStepEnabled=' + (newVal ? 'true' : 'false') + '})')
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

scope.$on('jtechLogData', function(event, data) {
    scope.$apply(function() {
        scope.logData = data
        renderLogChart(data.samples)
        renderLogEvents(data.events)
        renderLogLegend()
        if(scope.logModalOpen) {
            renderLogModalChart(data.samples)
            renderLogModalEvents(data.events)
            renderLogModalLegend()
        }
    })
})

scope.$on('jtechLogStopped', function() {
    scope.$apply(function() {
        scope.logRecording = false
    })
})

// Suggestion scan results
scope.$on('JtechSuggestions', function(event, data) {
    scope.$apply(function() {
        scope.suggestions = data || []
        var now = new Date()
        scope.lastScanTime = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2)
        scope.scanPending = false
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

// --- Log Tab --- 
function formatLogTime(t) {
    var m = Math.floor(t / 60)
    var s = Math.floor(t % 60)
    var d = Math.floor((t % 1) * 10)
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '.' + d
}

function getEventColor(tag) {
    if(tag === 'HARD_CUT' || tag === 'WATER_WARN' || tag === 'OIL_WARN') return 'var(--red)'
    if(tag === 'LOG_START' || tag === 'LOG_STOP') return 'var(--teal)'
    if(tag === 'TRANSBRAKE_ON') return 'var(--amber)'
    if(tag === 'TRANSBRAKE_OFF') return 'var(--teal)'
    return 'var(--amber)'
}

function renderLogEvents(events) {
    var container = document.getElementById('jtech-log-event-list')
    if(!container) return
    container.innerHTML = ''
    if(!events || events.length === 0) {
        var empty = document.createElement('div')
        empty.style.cssText = 'font-size:10px;color:var(--dim);text-align:center;padding:16px 0;'
        empty.textContent = 'NO EVENTS'
        container.appendChild(empty)
        return
    }
    events.forEach(function(ev) {
        var row = document.createElement('div')
        row.style.cssText = 'display:flex;gap:12px;align-items:center;padding:3px 0;border-bottom:1px solid var(--border);'
        var time = document.createElement('span')
        time.style.cssText = 'font-size:9px;color:var(--dim);flex-shrink:0;'
        time.textContent = formatLogTime(ev.time)
        var tag = document.createElement('span')
        tag.style.cssText = 'font-size:10px;font-weight:700;color:' + getEventColor(ev.tag) + ';'
        tag.textContent = formatEventTag(ev.tag)
        row.appendChild(time)
        row.appendChild(tag)
        container.appendChild(row)
    })
}

function formatEventTag(tag) {
    if(tag.indexOf('GEAR_CHANGE_') === 0) {
        var g = tag.replace('GEAR_CHANGE_', '')
        if(g === '0') g = 'N'
        if(g === '-1') g = 'R'
        return 'GEAR: ' + g
    }
    var labels = {
        'HARD_CUT': 'HARD CUT',
        'WATER_WARN': 'WATER TEMP WARNING',
        'OIL_WARN': 'OIL TEMP WARNING',
        'LAUNCH_ACTIVE': 'LAUNCH ACTIVE',
        'LOG_START': 'LOG START',
        'LOG_STOP': 'LOG STOP',
        'TRANSBRAKE_ON': 'TRANSBRAKE ENGAGED',
        'TRANSBRAKE_OFF': 'TRANSBRAKE RELEASED',
    }
    return labels[tag] || tag
}

function renderLogChart(samples) {
    var canvas = document.getElementById('jtech-log-chart')
    if(!canvas || !samples || samples.length === 0) return
    var ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    var w = canvas.width
    var h = canvas.height
    var pad = { top: 10, right: 10, bottom: 20, left: 40 }
    var chartW = w - pad.left - pad.right
    var chartH = h - pad.top - pad.bottom

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#0e1116'
    ctx.fillRect(0, 0, w, h)

    var duration = samples[samples.length - 1].time || 1
    
    logChannels.forEach(function(ch) {
        if(!ch.on) return
        ctx.beginPath()
        ctx.strokeStyle = ch.color
        ctx.lineWidth = 1.5
        samples.forEach(function(s, i) {
            var x = pad.left + (s.time / duration) * chartW
            var y = pad.top + chartH - ((s[ch.key] || 0) / ch.max) * chartH
            if(i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        })
        ctx.stroke()
    })

    ctx.strokeStyle = '#1E2229'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pad.left, pad.top + chartH)
    ctx.lineTo(pad.left + chartW, pad.top + chartH)
    ctx.stroke()

    ctx.fillStyle = '#4A5570'
    ctx.font = '8px JetBrains Mono'
    ctx.textAlign = 'center'
    for(var i = 0; i <= 4; i++) {
        var t = (duration / 4) * i
        var x = pad.left + (t / duration) * chartW
        ctx.fillText(formatLogTime(t), x, h - 4)
    }
}

function renderLogLegend() {
    var container = document.getElementById('jtech-log-legend')
    if(!container) return
    container.innerHTML = ''
    logChannels.forEach(function(ch, i) {
        var btn = document.createElement('button')
        btn.style.cssText = 'font-size:10px;padding:2px 8px;border-radius:2px;pointer;border:1px solid ' + ch.color + ';background:' + (ch.on ? ch.color + '22' : 'transparent') + ';color:' + (ch.on ? ch.color : '#4A5570') + ';letter-spacing:.05em;'
        btn.textContent = '- ' + ch.label
        btn.addEventListener('click', function() {
            logChannels[i].on = !logChannels[i].on
            if(scope.logData) renderLogChart(scope.logData.samples)
                renderLogLegend()
        })
        container.appendChild(btn)
    })
}

function renderLogModalLegend() {
    var container = document.getElementById('jtech-log-modal-legend')
    if(!container) return
    container.innerHTML = ''
    logChannels.forEach(function(ch, i) {
        var btn = document.createElement('button')
        btn.style.cssText = 'font-size:10px;padding:2px 8px;border-radius:2px;cursor:pointer;border:1px solid ' + ch.color + ';background:' + (ch.on ? ch.color + '22' : 'transparent') + ';color:' + (ch.on ? ch.color : '#4A5570') + ';letter-spacing:.05em;'
        btn.textContent = '- ' + ch.label
        btn.addEventListener('click', function() {
            logChannels[i].on = !logChannels[i].on
            if(scope.logData) {
                renderLogModalChart(scope.logData.samples)
                renderLogChart(scope.logData.samples)
            }
            renderLogModalLegend()
            renderLogLegend()
        })
        container.appendChild(btn)
    })
}

function renderLogModalChart(samples) {
    var canvas = document.getElementById('jtech-log-modal-chart')
    if(!canvas || !samples || samples.length === 0) return
    var ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    var w = canvas.width, h = canvas.height
    var pad = { top: 10, right: 10, bottom: 20, left: 40 }
    var chartW = w - pad.left - pad.right
    var chartH = h - pad.top - pad.bottom

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#0e1116'
    ctx.fillRect(0, 0, w, h)

    var duration = samples[samples.length - 1].time || 1
    logChannels.forEach(function(ch) {
        if(!ch.on) return
        ctx.beginPath()
        ctx.strokeStyle = ch.color
        ctx.lineWidth = 1.5
        samples.forEach(function(s, i) {
            var x = pad.left + (s.time / duration) * chartW
            var y = pad.top + chartH - ((s[ch.key] || 0) / ch.max) * chartH
            if(i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        })
        ctx.stroke()
    })

    ctx.strokeStyle = '#1E2229'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pad.left, pad.top + chartH)
    ctx.lineTo(pad.left + chartW, pad.top + chartH)
    ctx.stroke()

    ctx.fillStyle = '#4A5570'
    ctx.font = '8px JetBrains Mono'
    ctx.textAlign = 'center'
    for(var i = 0; i <= 4; i++) {
        var t = (duration / 4) * i
        var x = pad.left + (t / duration) * chartW
        ctx.fillText(formatLogTime(t), x, h - 4)
    }
}

function renderLogModalEvents(events) {
    var container = document.getElementById('jtech-log-modal-event-list')
    if(!container) return
    container.innerHTML = ''
    if(!events || events.length === 0) {
        var empty = document.createElement('div')
        empty.style.cssText = 'font-size:10px;color:var(--dim);text-align:center;padding:16px 0;'
        empty.textContent = 'NO EVENTS'
        container.appendChild(empty)
        return
    }
    events.forEach(function(ev) {
        var row = document.createElement('div')
        row.style.cssText = 'display:flex;gap:12px;align-items:center;padding:3px 0;border-bottom:1px solid var(--border);'
        var time = document.createElement('span')
        time.style.cssText = 'font-size:9px;color:var(--dim);flex-shrink:0;'
        time.textContent = formatLogTime(ev.time)
        var tag = document.createElement('span')
        tag.style.cssText = 'font-size:10px;font-weight:700;color:' + getEventColor(ev.tag) + ';'
        tag.textContent = formatEventTag(ev.tag)
        row.appendChild(time)
        row.appendChild(tag)
        container.appendChild(row)
    })
}

function renderLogModalLegend() {
    var container = document.getElementById('jtech-log-modal-legend')
    if(!container) return
    container.innerHTML = ''
    getModalLogChannels().forEach(function(ch, i) {
        var btn = document.createElement('button')
        btn.style.cssText = 'font-size:10px;padding:2px 8px;border-radius:2px;cursor:pointer;border:1px solid ' + ch.color + ';background:' + (ch.on ? ch.color + '22' : 'transparent') + ';color:' + (ch.on ? ch.color : '#4A5570') + ';letter-spacing:.05em;'
        btn.textContent = '- ' + ch.label
        btn.addEventListener('click', function() {
            ch.on = !ch.on
            if(scope.logData) renderLogModalChart(scope.logData.samples)
            renderLogModalLegend()
        })
        container.appendChild(btn)
    })
}
                        
// --- INIT ---

            var slowTimer = setInterval(function() {
                bngApi.engineLua('be:getPlayerVehicle(0):getID()', function(vehId) {
                    if (vehId !== currentVehicleId) {
                        currentVehicleId = vehId
                        mapDataInitialized = false
                        timingMapDataInitialized = false
                        boostOffsetMapDataInitialized = false
                        boostFuelTrimMapDataInitialized = false
                        settingsLoaded = false
                        mapData = []
                        timingMapData = []
                        boostOffsetMapData = []
                        boostFuelTrimMapData = []
                        selected.clear()
                        timingSelected.clear()
                        boostSelected.clear()
                    }
                })
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
                            scope.status = data
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
                            if(!mapDataInitialized && data.fuelMap) {
                                mapDataInitialized = true
                                initMapData(data.fuelMap)
                            }
                            if(!timingMapDataInitialized && data.timingMap) {
                                timingMapDataInitialized = true
                                initTimingMapData(data.timingMap)
                            }
                            if(!boostOffsetMapDataInitialized && data.boostOffsetMap) {
                                boostOffsetMapDataInitialized = true
                                initBoostOffsetMapData(data.boostOffsetMap)
                            }
                            if(!boostFuelTrimMapDataInitialized && data.boostFuelTrimMap) {
                                boostFuelTrimMapDataInitialized = true
                                initBoostFuelTrimMapData(data.boostFuelTrimMap)
                            }
                            if(data.boostBreaks) boostBreaksLocal = data.boostBreaks
                            if(data.boostMax) boostMaxLocal = data.boostMax
                            if(data.safeSettings) scope.safeSettings = data.safeSettings
                            if(data.limiterSettings) scope.limiterSettings = data.limiterSettings
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
                var shell = document.querySelector('.jt-shell')
                var hdr = document.querySelector('.hdr')
                var sstrip = document.querySelector('.sstrip')
                var collapsed = document.getElementById('jtech-collapsed-pill')
                if(shell) shell.style.display = 'none'
                if(hdr) hdr.style.display = 'none'
                if(sstrip) sstrip.style.display = 'none'
                if(collapsed) collapsed.style.display = 'flex'
                if(btn) { btn.textContent = '▼'; btn.setAttribute('data-collapsed', '1') }
            }

            window.jtechExpand = function() {
                var shell = document.querySelector('.jt-shell')
                var hdr = document.querySelector('.hdr')
                var sstrip = document.querySelector('.sstrip')
                var collapsed = document.getElementById('jtech-collapsed-pill')
                if(shell) shell.style.display = ''
                if(hdr) hdr.style.display = ''
                if(sstrip) sstrip.style.display = ''
                if(collapsed) collapsed.style.display = 'none'
            }
        }
    }
}])