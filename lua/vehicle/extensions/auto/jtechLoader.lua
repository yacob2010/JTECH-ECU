local M = {}

local function loadAdvancedEngine()
    if not v or not v.data or not v.data.powertrain then return end
    
    local hasEngine = false
    for _, device in pairs(v.data.powertrain) do
        if device.type == "combustionEngine" then
            device.type = "combustionEngineAdvanced"
            device.turbochargerLuaFileName = "powertrain/jtechTurbo"
            hasEngine = true
        end
    end
    
    if hasEngine then
        local savedSoundsInit = sounds.init
        sounds.init = nop
        initSystems()
        sounds.init = savedSoundsInit
        log('I', 'auto_jtechLoader', 'JTECH advanced engine simulation activated')
    end
end

local function detectHardwareTiers()
    local rTier = 0
    for path, partName in pairs(v.data.slotPartMap) do
        local tier = partName:match("^jtech_r(%d)")
        if tier then
            rTier = tonumber(tier)
        end
    end
    electrics.values.jtechRTier = rTier
    log('I', 'jtechLoader', 'Hardware detection: rTier=' .. rTier)
end


local function tick()
    onUpdate(0.016)
end

local function onInit()
    loadAdvancedEngine()
    detectHardwareTiers()
    extensions.load('auto_jtechECU')
    local twoStep = controller.getController("twoStepLaunch")
    controller.unloadControllerExternal('twoStepLaunch')
end


local function onReset()
    loadAdvancedEngine()
    detectHardwareTiers()
    extensions.load('auto_jtechECU')
end

M.onInit = onInit
M.onReset = onReset
M.tick = tick

return M