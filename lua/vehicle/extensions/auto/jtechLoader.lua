local M = {}

local engineDeviceName = nil

local function loadAdvancedEngine()
    if not v or not v.data or not v.data.powertrain then return end

    local hasEngine = false
    local needsReinit = false

    for _, device in pairs(v.data.powertrain) do
        if device.type == "combustionEngine" then
            device.type = "combustionEngineAdvanced"
            device.turbochargerLuaFileName = "powertrain/jtechTurbo"
            engineDeviceName = device.name
            electrics.values.jtechEngineDeviceName = device.name
            hasEngine = true
            needsReinit = true
        elseif device.type == "combustionEngineAdvanced" then
            engineDeviceName = device.name
            electrics.values.jtechEngineDeviceName = device.name
            hasEngine = true
        end
    end

    if hasEngine and needsReinit then
        local savedSoundsInit = sounds.init
        sounds.init = nop
        initSystems()
        sounds.init = savedSoundsInit
        log('I', 'auto_jtechLoader', 'JTECH advanced engine simulation activated - device: ' .. tostring(engineDeviceName))
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
    log('I', 'jtechLoader', 'onInit fired')
    loadAdvancedEngine()
    detectHardwareTiers()
    controller.unloadControllerExternal('twoStepLaunch')
end

local function onReset()
    log('I', 'jtechLoader', 'onReset fired')
    loadAdvancedEngine()
    detectHardwareTiers()
end

M.onInit = onInit
M.onReset = onReset
M.tick = tick

return M