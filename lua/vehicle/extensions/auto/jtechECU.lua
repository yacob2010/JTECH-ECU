local M = {}

local fuelMap = {
    --           0%      20%     40%     60%     80%     100%
    [1000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [2000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [3000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [4000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [5000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [6000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [7000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [8000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [9000]  = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
    [10000] = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0},
}

local timingMap = {
    --           0%    20%   40%   60%   80%   100%
    [1000]  = {10.0, 12.0, 14.0, 16.0, 18.0, 20.0},
    [2000]  = {12.0, 14.0, 16.0, 18.0, 22.0, 26.0},
    [3000]  = {14.0, 16.0, 20.0, 24.0, 28.0, 30.0},
    [4000]  = {16.0, 20.0, 24.0, 28.0, 30.0, 32.0},
    [5000]  = {18.0, 22.0, 26.0, 30.0, 32.0, 34.0},
    [6000]  = {20.0, 24.0, 28.0, 32.0, 34.0, 36.0},
    [7000]  = {20.0, 24.0, 28.0, 32.0, 34.0, 36.0},
    [8000]  = {20.0, 24.0, 28.0, 32.0, 34.0, 36.0},
    [9000]  = {20.0, 24.0, 28.0, 32.0, 34.0, 36.0},
    [10000] = {20.0, 24.0, 28.0, 32.0, 34.0, 36.0},
}

-- Boost offset map. 10 gears; higher gears use column 10
local boostOffsetMap = {
    [1000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [2000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [3000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [4000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [5000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [6000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [7000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [8000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [9000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [10000] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
}

local boostFuelTrimMap = {
    [1000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [2000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [3000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [4000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [5000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [6000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [7000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [8000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [9000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [10000] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
}

local boostTimingTrimMap = {
    [1000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [2000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [3000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [4000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [5000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [6000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [7000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [8000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [9000]  = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
    [10000] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
}

local rpmBreaks = {1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000}
local loadBreaks = {0, 20, 40, 60, 80, 100}
local RAD_TO_DEG = 180 / math.pi
local currentMultiplier = 1.0
local engineDevice = nil
local debugTimer = 0
local boostBreaks = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
local gearBreaks = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
local boostMax = 0
local hasTurbo = false
local hasSupercharger = false
local currentBoostOffset = 0.0
local boostInitialized = false

-- SAFE Tab State
local safeSettings = {
    launchRpm = 3500,
    softLimitRpm = 6500,
    hardCutRpm = 6800,
    waterTempLimit = 100,
    oilTempLimit = 130,
    timingPullDeg = 5.0,
    fuelPullPct = 10.0,
    launchEnabled = false
}

local isManual = nil  -- nil = not yet detected
local launchArmed = false
local launchActive = false
local softLimitActive = false
local hardCutActive = false
local waterTempWarning = false
local oilTempWarning = false
local tractionSlip = false
local ignCutTimer = 0

local settings = {
    maxGears = 6,
    maxRpm = 7000,
    boostMaxOverride = 0,
    revLimiterBaseline = 6800,
    ecuName = 'JTECH R2'
}

local currentTuneName = 'Default'

local function findIndex(breaks, value)
    for i = #breaks, 1, -1 do
        if value >= breaks[i] then return i end
    end
    return 1
end

local function getGearIndex()
    local gearIndex = electrics.values.gearIndex or 1
    if gearIndex < 1 then gearIndex = 1 end
    return math.min(gearIndex, math.min(settings.maxGears, 10))
end

local function onInit()
    log('I', 'auto_jtechECU', 'JTECH ECU onInit fired')
    obj:queueGameEngineLua("extensions.load('jtechSave')")
    obj:queueGameEngineLua("extensions.jtechSave.pushTuneToVehicle(" .. obj:getId() ..")")
end

local function getTuneData()
    return {
        fuelMap = fuelMap
    }
end

M.getTuneData = getTuneData


local function onUpdate(dt)
    local ok, err = pcall(function()
        debugTimer = debugTimer + dt
        if not engineDevice then
            engineDevice = powertrain.getDevice("mainEngine")
            if not engineDevice then return end
        end

        if not boostInitialized then
            local jBoostMax = electrics.values.jtechBoostMax
            if not jBoostMax or jBoostMax <= 0 then
                if not M._boostInitLogged then
                    M._boostInitLogged = true
                    log('I', 'auto_jtechECU', 'boost init waiting - jtechBoostMax: ' .. tostring(jBoostMax))
                end
                return
            end

            hasTurbo = electrics.values.jtechHasTurbo == 1 or false
            hasSupercharger = electrics.values.jtechHasSupercharger == 1 or false
            boostMax = jBoostMax
            if boostMax <= 0 then boostMax = 10.0 end
            for i = 1, 10 do
                boostBreaks[i] = math.floor((boostMax * (i - 1) / 9) * 10) / 10
            end
            log('I', 'auto_jtechECU', 'boost axis: ' .. table.concat(boostBreaks, ', ') .. ' PSI')
            boostInitialized = true
        end

        -- Detect manual vs automatic (one time)
        if isManual == nil then
            local hpat = controller.getController("hPattern")
            isManual = hpat ~= nil
            log('I', 'auto_jtechECU', 'transmission: ' .. (isManual and 'MANUAL' or 'AUTOMATIC'))
        end

        local boost = electrics.values.turboBoost or electrics.values.boost or 0
        local rpm = electrics.values.rpm or 0
        local tps = (electrics.values.throttle or 0) * 100
        local watertemp = electrics.values.watertemp or 0
        local oiltemp = electrics.values.oiltemp or 0
        local clutch = electrics.values.clutchRatio or 1
        local brake = electrics.values.brake or 0
        local speed = electrics.values.wheelspeed or 0
        local avgWheelAV = electrics.values.avgWheelAV or 0

        local rpmIdx = findIndex(rpmBreaks, rpm)
        local loadIdx = findIndex(loadBreaks, tps)
        local boostIdx = findIndex(boostBreaks, boost)
        local gearIdx = getGearIndex()

        -- Base Fuel Map
        currentMultiplier = fuelMap[rpmBreaks[rpmIdx]][loadIdx]
        local stockAfr = 14.7
        local baseFuelAfr = stockAfr / currentMultiplier

        -- Boost Fuel Trim
        local fuelTrimPct = boostFuelTrimMap[rpmBreaks[rpmIdx]][boostIdx]
        local finalAfr = baseFuelAfr * (1 - fuelTrimPct / 100)

        -- Base Timing Map
        local baseTimingDeg = timingMap[rpmBreaks[rpmIdx]][loadIdx]

        -- Boost Timing Trim
        local timingTrimPct = boostTimingTrimMap[rpmBreaks[rpmIdx]][boostIdx]
        local finalTimingDeg = baseTimingDeg * (1 + timingTrimPct / 100)

        -- ENGINE PROTECTION
        waterTempWarning = watertemp > safeSettings.waterTempLimit
        oilTempWarning = oiltemp > safeSettings.oilTempLimit
        if waterTempWarning then
            finalTimingDeg = finalTimingDeg - safeSettings.timingPullDeg
        end
        if oilTempWarning then
            finalAfr = finalAfr * (1 + safeSettings.fuelPullPct / 100)
        end

        -- TRACTION SLIP DETECTION
        local speedFromWheels = avgWheelAV * 0.3  -- rough wheel radius estimate
        tractionSlip = speed > 2 and (speedFromWheels - speed) > 2.0

        -- LAUNCH CONTROL
        if safeSettings.launchEnabled and isManual ~= nil then
            local armCondition = isManual and (clutch < 0.1) or (brake > 0.5 and speed < 2)
            local releaseCondition = isManual and (clutch > 0.5) or (brake < 0.1 and speed > 2)

            if armCondition and not launchActive then
                launchArmed = true
            end

            if launchArmed and tps > 50 then
                launchActive = true
                launchArmed = false
            end

            if launchActive then
                if releaseCondition then
                    launchActive = false
                    engineDevice:resetTempRevLimiter()
                elseif rpm > safeSettings.launchRpm then
                    local limitAV = safeSettings.launchRpm * math.pi / 30
                    engineDevice:setTempRevLimiter(limitAV, limitAV * 1.05)
                end
            end
        else
            launchActive = false
            launchArmed = false
        end

        -- REV LIMITER
        softLimitActive = false
        hardCutActive = false
        if not launchActive then
            if rpm >= safeSettings.hardCutRpm then
                hardCutActive = true
                engineDevice:cutIgnition(0.05)
            elseif rpm >= safeSettings.softLimitRpm then
                softLimitActive = true
                finalAfr = finalAfr * 1.25  -- lean out to soft limit
            end
        end

        -- APPLY
        engineDevice.targetAfr = finalAfr
        engineDevice.timing = finalTimingDeg / RAD_TO_DEG

        -- Boost Offset Map
        currentBoostOffset = boostOffsetMap[rpmBreaks[rpmIdx]][gearIdx]
        if hasTurbo then
            engineDevice.turbocharger.setWastegateOffset(currentBoostOffset)
        end
        if hasSupercharger then
            engineDevice.supercharger.setBypassPressure(boostMax + currentBoostOffset)
        end

    end)
    if not ok then
        log('E', 'auto_jtechECU', 'error: ' .. tostring(err))
    end
end

local function getOilPressure()
    local fromElectrics = electrics.values.oil or electrics.values.oilpressure
    if fromElectrics and fromElectrics > 0 then
        return fromElectrics
    end
    local rpm = electrics.values.rpm or 0
    local lub = 1
    if engineDevice and engineDevice.thermals and engineDevice.thermals.debugData then
        lub = engineDevice.thermals.debugData.engineThermalData.oilLubricationCoef or 1
    end
    return math.floor((rpm / 6000) * 60 * lub)
end

local function getStatus()
    local eng = engineDevice or powertrain.getDevice("mainEngine")
    return {
        settings = settings,
        currentTuneName = currentTuneName,
        ignitionLevel = electrics.values.ignitionLevel or 0,
        boost = electrics.values.turboBoost or electrics.values.boost or 0,
        afr = engineDevice and engineDevice.lastAfr or 0,
        effAfr = engineDevice and engineDevice.lastEffAfr or 0,
        gear = electrics.values.gear or 'N',
        watertemp = electrics.values.watertemp or 0,
        oiltemp = electrics.values.oiltemp or 0,
        oilpressure = getOilPressure(),
        fuel = electrics.values.fuel or 0,
        engineLoad = eng and eng.engineLoad or 0,
        hasAdvancedEngine = eng and eng.targetAfr ~= nil or false,
        fuelMap = fuelMap,
        rpm = electrics.values.rpm or 0,
        tps = (electrics.values.throttle or 0) * 100,
        multiplier = currentMultiplier,
        wheelspeed = electrics.values.wheelspeed or 0,
        ignAdv = eng and eng.timing and (eng.timing * RAD_TO_DEG) or 0,
        timingError = eng and eng.timingError or 0,
        revLimiterRPM = eng and eng.revLimiterRPM or 0,
        maxRPM = eng and eng.maxRPM or 0,
        timingMap = timingMap,
        boostOffsetMap = boostOffsetMap,
        boostFuelTrimMap = boostFuelTrimMap,
        boostTimingTrimMap = boostTimingTrimMap,
        boostBreaks = boostBreaks,
        boostMax = boostMax,
        hasTurbo = hasTurbo,
        hasSupercharger = hasSupercharger,
        currentBoostOffset = currentBoostOffset,
        liveBoost = electrics.values.turboBoost or electrics.values.boost or 0,
        safeSettings = safeSettings,
        launchArmed = launchArmed,
        launchActive = launchActive,
        softLimitActive = softLimitActive,
        hardCutActive = hardCutActive,
        waterTempWarning = waterTempWarning,
        oilTempWarning = oilTempWarning,
        tractionSlip = tractionSlip,
        isManual = isManual,
        rTier = electrics.values.jtechRTier or 0,
    }
end

local function setFuelMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if fuelMap[rpmKey] then
            for i, v in ipairs(vals) do
                fuelMap[rpmKey][i] = v
            end
        end
    end
    log('I', 'auto_jtechECU', 'fuel map updated from UI')
end

local function setTimingMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if timingMap[rpmKey] then
            for i, v in ipairs(vals) do
                timingMap[rpmKey][i] = v
            end
        end
    end
    log('I', 'auto_jtechECU', 'timing map updated from UI')
end

local function setBoostOffsetMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if boostOffsetMap[rpmKey] then
            for i, v in ipairs(vals) do
                boostOffsetMap[rpmKey][i] = v
            end
        end
    end
    log('I', 'auto_jtechECU', 'boost offset map updated from UI')
end

local function setBoostFuelTrimMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if boostFuelTrimMap[rpmKey] then
            for i, v in ipairs(vals) do
                boostFuelTrimMap[rpmKey][i] = v
            end
        end
    end
    log('I', 'auto_jtechECU', 'boost fuel trim map updated from UI')
end

local function setBoostTimingTrimMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if boostTimingTrimMap[rpmKey] then
            for i, v in ipairs(vals) do
                boostTimingTrimMap[rpmKey][i] = v
            end
        end
    end
    log('I', 'auto_jtechECU', 'boost timing trim map updated from UI')
end

local function getCurrentTune()
    return {
        meta = {
            name = currentTuneName,
            ecuName = settings.ecuName,
            savedAt = 0
        },
        settings = {
            maxGears = settings.maxGears,
            maxRpm = settings.maxRpm,
            boostMaxOverride = settings.boostMaxOverride,
            revLimiterBaseline = settings.revLimiterBaseline,
            ecuName = settings.ecuName
        },
        maps = {
            fuel = fuelMap,
            timing = timingMap,
            boostOffset = boostOffsetMap,
            boostFuelTrim = boostFuelTrimMap,
            boostTimingTrim = boostTimingTrimMap
        }
    }
end

local function applyTune(data)
    local rTier = electrics.values.jtechRTier or 0
    local skippedMaps = false

    if data.settings then
        for k, v in pairs(data.settings) do
            settings[k] = v
        end
    end
    if data.meta then
        currentTuneName = data.meta.name or currentTuneName
    end
    if data.maps then
        if rTier < 2 and (data.maps.fuel or data.maps.boostOffset or data.maps.boostFuelTrim) then
            skippedMaps = true
        end
        if rTier < 3 and (data.maps.timing or data.maps.boostTimingTrim) then
            skippedMaps = true
        end

        if rTier >= 2 then
            if data.maps.fuel then
                for rpm, vals in pairs(data.maps.fuel) do
                    local rpmKey = tonumber(rpm)
                    if fuelMap[rpmKey] then
                        for i, v in ipairs(vals) do fuelMap[rpmKey][i] = v end
                    end
                end
            end
            if data.maps.boostOffset then
                for rpm, vals in pairs(data.maps.boostOffset) do
                    local rpmKey = tonumber(rpm)
                    if boostOffsetMap[rpmKey] then
                        for i, v in ipairs(vals) do boostOffsetMap[rpmKey][i] = v end
                    end
                end
            end
            if data.maps.boostFuelTrim then
                for rpm, vals in pairs(data.maps.boostFuelTrim) do
                    local rpmKey = tonumber(rpm)
                    if boostFuelTrimMap[rpmKey] then
                        for i, v in ipairs(vals) do boostFuelTrimMap[rpmKey][i] = v end
                    end
                end
            end
        end

        if rTier >= 3 then
            if data.maps.timing then
                for rpm, vals in pairs(data.maps.timing) do
                    local rpmKey = tonumber(rpm)
                    if timingMap[rpmKey] then
                        for i, v in ipairs(vals) do timingMap[rpmKey][i] = v end
                    end
                end
            end
            if data.maps.boostTimingTrim then
                for rpm, vals in pairs(data.maps.boostTimingTrim) do
                    local rpmKey = tonumber(rpm)
                    if boostTimingTrimMap[rpmKey] then
                        for i, v in ipairs(vals) do boostTimingTrimMap[rpmKey][i] = v end
                    end
                end
            end
        end
    end

    if skippedMaps then
        obj:queueGameEngineLua("guihooks.trigger('toastrMsg',{type='warning',title='JTECH — Tune Partially Loaded',msg='Some maps were skipped. Upgrade your R-Series ECU to unlock full tune loading.'})")
    end

    local function serializeToLua(val)
        local t = type(val)
        if t == 'number' then return tostring(val)
        elseif t == 'boolean' then return tostring(val)
        elseif t == 'string' then return string.format('%q', val)
        elseif t == 'table' then
            local parts = {}
            for k2, v2 in pairs(val) do
                local key = type(k2) == 'number' and '[' .. k2 .. ']' or k2
                table.insert(parts, key .. '=' .. serializeToLua(v2))
            end
            return '{' .. table.concat(parts, ',') .. '}'
        else return 'nil' end
    end
    local payload = serializeToLua({settings = settings, tuneName = currentTuneName})
    obj:queueGameEngineLua("guihooks.trigger('jtechTuneApplied'," .. payload .. ")")
    log('I', 'auto_jtechECU', 'Tune applied: ' .. currentTuneName)
end

local function onTuneSaved(result)
    obj:queueGameEngineLua("guihooks.trigger('jtechTuneSaved',{success=true})")
end

local function updateSettings(newSettings)
    log('I', 'auto_jtechECU', 'updateSettings called')
    for k, v in pairs(newSettings) do
        settings[k] = v
    end
    if settings.maxGears > 10 then settings.maxGears = 10 end
    if settings.maxRpm > 10000 then settings.maxRpm = 10000 end
    local function serializeToLua(val)
        local t = type(val)
        if t == 'number' then return tostring(val)
        elseif t == 'boolean' then return tostring(val)
        elseif t == 'string' then return string.format('%q', val)
        elseif t == 'table' then
            local parts = {}
            for k2, v2 in pairs(val) do
                local key = type(k2) == 'number' and '[' .. k2 .. ']' or k2
                table.insert(parts, key .. '=' .. serializeToLua(v2))
            end
            return '{' .. table.concat(parts, ',') .. '}'
        else return 'nil' end
    end
    obj:queueGameEngineLua("guihooks.trigger('jtechSettingsUpdated'," .. serializeToLua(settings) .. ")")
    log('I', 'auto_jtechECU', 'settings updated')
end

local function getSettings()
    return settings
end

local function updateSafeSettings(newSettings)
    for k, v in pairs(newSettings) do
        safeSettings[k] = v
    end
    log('I', 'auto_jtechECU', 'safe settings: launchRpm=' .. tostring(safeSettings.launchRpm) .. ' soft=' .. tostring(safeSettings.softLimitRpm) .. ' hard=' .. tostring(safeSettings.hardCutRpm))
    log('I', 'auto_jtechECU', 'safeSettings.launchEnabled=' .. tostring(safeSettings.launchEnabled))
end

local function saveCurrentTuneNamed(name)
    local data = getCurrentTune()
    data.meta.name = name
    currentTuneName = name
    local function serializeToLua(val)
        local t = type(val)
        if t == 'number' then return tostring(val)
        elseif t == 'boolean' then return tostring(val)
        elseif t == 'string' then return string.format('%q', val)
        elseif t == 'table' then
            local parts = {}
            if #val > 0 then
                for _, v in ipairs(val) do table.insert(parts, serializeToLua(v)) end
            else
                for k, v in pairs(val) do
                    local key = type(k) == 'number' and '[' .. k .. ']' or '["' .. k .. '"]'
                    table.insert(parts, key .. '=' .. serializeToLua(v))
                end
            end
            return '{' .. table.concat(parts, ',') .. '}'
        else return 'nil' end
    end
    obj:queueGameEngineLua('extensions.jtechSave.saveTune(' .. obj:getId() .. ',' .. serializeToLua(data) .. ')')
    obj:queueGameEngineLua('extensions.jtechSave.pushTuneListToUI()')
end

M.saveCurrentTuneNamed = saveCurrentTuneNamed
M.onInit = onInit
M.updateGFX = onUpdate
M.getStatus = getStatus
M.setFuelMap = setFuelMap
M.setTimingMap = setTimingMap
M.setBoostOffsetMap = setBoostOffsetMap
M.setBoostFuelTrimMap = setBoostFuelTrimMap
M.setBoostTimingTrimMap = setBoostTimingTrimMap
M.getCurrentTune = getCurrentTune
M.applyTune = applyTune
M.onTuneSaved = onTuneSaved
M.updateSettings = updateSettings
M.getSettings = getSettings
M.updateSafeSettings = updateSafeSettings

return M