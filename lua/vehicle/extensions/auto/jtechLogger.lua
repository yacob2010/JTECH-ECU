local M = {}

local recording = false
local duration = 60
local sampleTimer = 0
local sampleInterval = 0.1
local samples = {}
local events = {}
local elapsedTime = 0

local prevGear = nil
local prevHardCut = 0
local prevLaunchActive = 0
local prevWaterWarn = 0
local prevOilWarn = 0
local prevTransbrake = false

local function addEvent(tag)
    table.insert(events, {time = elapsedTime, tag = tag})
end

local function onUpdate(dt)
    if not recording then return end

    elapsedTime = elapsedTime + dt
     if elapsedTime >= duration then
        M.stopLog()
    end

    local cur = electrics.values.jtechHardCut or 0
    if cur == 1 and prevHardCut == 0 then
        addEvent("HARD_CUT")
    end
    prevHardCut = cur

    local curWater = electrics.values.jtechWaterTempWarn or 0
    if curWater == 1 and prevWaterWarn == 0 then
        addEvent("WATER_WARN")
    end
    prevWaterWarn = curWater

    local curOil = electrics.values.jtechOilTempWarn or 0
    if curOil == 1 and prevOilWarn == 0 then
        addEvent("OIL_WARN")
    end
    prevOilWarn = curOil

    local curLaunch = electrics.values.jtechLaunchActive or 0
    if curLaunch == 1 and prevLaunchActive == 0 then
        addEvent("LAUNCH_ACTIVE")
    end
    prevLaunchActive = curLaunch

    local curGear = electrics.values.gear or "N"
    if curGear ~= prevGear and prevGear ~= nil then
        addEvent("GEAR_CHANGE_" .. curGear)
    end
    prevGear = curGear

    local curTransbrake = electrics.values.transbrake or false
    if curTransbrake == true and prevTransbrake == false then
        addEvent("TRANSBRAKE_ACTIVE")
    elseif curTransbrake == false and prevTransbrake == true then
        addEvent("TRANSBRAKE_OFF")
    end
    prevTransbrake = curTransbrake

    sampleTimer = sampleTimer + dt
    if sampleTimer >= sampleInterval then
        sampleTimer = 0
        table.insert(samples, {
            time = elapsedTime,
            rpm = electrics.values.rpm or 0,
            tps = (electrics.values.throttle or 0) * 100,
            boost = electrics.values.turboBoost or electrics.values.boost or 0,
            afr = electrics.values.jtechAfr or 0,
            afrTarget = electrics.values.jtechAfrTarget or 0,
            gear = electrics.values.gear or "N",
            clutch = (electrics.values.clutchRatio or 1) * 100,
            speed = electrics.values.wheelspeed or 0,
            waterTemp = electrics.values.watertemp or 0,
            oilTemp = electrics.values.oiltemp or 0,
            transBrake = electrics.values.transbrake and 1 or 0,
            launchActive = electrics.values.jtechLaunchActive and 1 or 0,
            oilPressure = electrics.values.jtechOilPressure or 0,
            load = electrics.values.jtechLoad or 0,
            timingAdv = electrics.values.jtechTimingAdv or 0,
            fuelCellRPM = electrics.values.jtechFuelCellRPM or 0,
            fuelCellLoad = electrics.values.jtechFuelCellLoad or 0,
            egt = electrics.values.jtechEGT or 0,
            knockLevel = electrics.values.jtechKnockLevel or 0,
        })
    end

end

local function startLog(dur)
    log('I', 'jtechLogger', 'startLog called with dur=' .. tostring(dur))
    
    samples = {}
    events = {}
    elapsedTime = 0
    sampleTimer = 0
    duration = dur or 60
    recording = true
    addEvent("LOG_START")

end

local function stopLog()

    recording = false
    addEvent("LOG_STOP")
    M.pushLogData()

end

local function getLogData()
    return {
        samples = samples,
        events = events,
        duration = elapsedTime
    }
end

local function pushLogData()
    local data = getLogData()
    local json = jsonEncode(data)
    obj:queueGameEngineLua("extensions.jtechLoggerGE.receiveLogData('" .. json .. "')")
end

M.updateGFX = onUpdate
M.startLog = startLog
M.stopLog = stopLog
M.getLogData = getLogData
M.pushLogData = pushLogData

return M