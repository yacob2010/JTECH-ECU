local M = {}

local isPrimaryInstance = false

-- SAFE tab AFR fault thresholds
local SAFE_AFR_LEAN = 15.5
local SAFE_AFR_RICH = 10.5

-- dynamic map dimension constants
local MAP_RPM_ROWS  = 10
local MAP_LOAD_COLS = 6
local RPM_STEP      = 1000

M.mapRpmRows  = {}
M.mapLoadCols = {}
for i = 1, MAP_RPM_ROWS do M.mapRpmRows[i] = i * RPM_STEP end
M.mapLoadCols = {0, 20, 40, 60, 80, 100}

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
local engineDeviceName = nil
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
    waterTempLimit = 100,
    oilTempLimit = 130,
    timingPullDeg = 5.0,
    fuelPullPct = 10.0,
    egtLimitC = 1050,
    knockThreshold = 0.55,
    knockRetardDeg = 4.0,
    boostCeilingPsi = 0.0,
}

-- LIMITERS Tab State
local limiterSettings = {
    launchRpm = 3500,
    softLimitRpm = 6500,
    hardCutRpm = 6800,
    launchEnabled = false,
    threeStepEnabled = false,
    threeStepRpm = 4500,
    boostThresholdPsi = 8.0
}

-- EGT + Knock Phase 1 state
M.jtechEGT = 0
M.jtechKnockLevel = 0

local isManual = nil
local launchArmed = false
local launchActive = false
local softLimitActive = false
local hardCutActive = false
local waterTempWarning = false
local oilTempWarning = false
local egtWarning = false
local knockWarning = false
local boostOverrunWarning = false
local afrLeanWarning = false
local afrRichWarning = false
local tractionSlip = false
local ignCutTimer = 0
local smoothedAfr = 0

local settings = {
    ecuName = '',
    maxGears = 6,
    maxRpm = 7000,
    revLimiterBaseline = 6800,
    boostMaxOverride = 0
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
    obj:queueGameEngineLua("extensions.load('jtechLoggerGE')")
end

local function onReset()
    log('I', 'auto_jtechECU', 'onReset fired, clearing cached engineDevice')
    engineDevice = nil
    engineDeviceName = nil
    boostInitialized = false
    isManual = nil
end



local function getTuneData()
    return { fuelMap = fuelMap }
end

M.getTuneData = getTuneData

local function onUpdate(dt)
    local ok, err = pcall(function()
        debugTimer = debugTimer + dt

        if not engineDevice then
            if not engineDeviceName then
                engineDeviceName = electrics.values.jtechEngineDeviceName
            end
            if not engineDeviceName then return end
            engineDevice = powertrain.getDevice(engineDeviceName)
            if not engineDevice then return end
            log('I', 'auto_jtechECU', 'engineDevice acquired, type=' .. tostring(engineDevice.type)
            .. ', hasTargetAfr=' .. tostring(engineDevice.targetAfr ~= nil)
            .. ', turboExists=' .. tostring(engineDevice.turbocharger and engineDevice.turbocharger.isExisting))

        end
    
        if not boostInitialized then
            local jBoostMax = electrics.values.jtechBoostMax
            if not jBoostMax or jBoostMax <= 0 then
                -- NA engine — no boost hardware, initialize with defaults
                hasTurbo = false
                hasSupercharger = false
                boostMax = 0
                boostInitialized = true
                log('I', 'auto_jtechECU', 'NA engine detected, boost init skipped')
            else
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

        -- Base Fuel Map — clamp multiplier to prevent div/0
        currentMultiplier = fuelMap[rpmBreaks[rpmIdx]][loadIdx]
        local safeMultiplier = math.max(currentMultiplier, 0.01)
        local stockAfr = 14.7
        local baseFuelAfr = stockAfr / safeMultiplier

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
        egtWarning = (M.jtechEGT or 0) > safeSettings.egtLimitC
        knockWarning = (M.jtechKnockLevel or 0) > safeSettings.knockThreshold
        afrLeanWarning = smoothedAfr > SAFE_AFR_LEAN
        afrRichWarning = smoothedAfr > 0 and smoothedAfr < SAFE_AFR_RICH
        local boostCeil = safeSettings.boostCeilingPsi or 0
        boostOverrunWarning = boostCeil > 0 and boost > boostCeil

        if waterTempWarning then
            finalTimingDeg = finalTimingDeg - safeSettings.timingPullDeg
        end
        if oilTempWarning then
            finalAfr = finalAfr * (1 + safeSettings.fuelPullPct / 100)
        end
        if egtWarning then
            finalTimingDeg = finalTimingDeg - safeSettings.timingPullDeg
            finalAfr = finalAfr * (1 + safeSettings.fuelPullPct / 100)
        end
        if knockWarning then
            finalTimingDeg = finalTimingDeg - (safeSettings.knockRetardDeg or 4.0)
        end
        if afrLeanWarning then
            finalAfr = finalAfr * 0.94
        end
        if boostOverrunWarning then
            finalTimingDeg = finalTimingDeg - safeSettings.timingPullDeg
        end

        -- Engine Load
        electrics.values.jtechLoad = (engineDevice.engineLoad or 0) * 100

        -- Ignition Timing
        electrics.values.jtechTimingAdv = finalTimingDeg

        -- Fuel Map cell indices
        electrics.values.jtechFuelCellRPM = rpmIdx
        electrics.values.jtechFuelCellLoad = loadIdx

        -- TRACTION SLIP DETECTION
        local speedFromWheels = avgWheelAV * 0.3
        tractionSlip = speed > 2 and (speedFromWheels - speed) > 2.0

        -- LAUNCH CONTROL
        if limiterSettings.launchEnabled and isManual ~= nil then
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
                else
                    local boostPsi = electrics.values.turboBoost or electrics.values.boost or 0
                    local useThreeStep = limiterSettings.threeStepEnabled
                        and boostPsi < limiterSettings.boostThresholdPsi
                    local activeRpm = useThreeStep
                        and limiterSettings.threeStepRpm
                        or limiterSettings.launchRpm
                    local limitAV = activeRpm * math.pi / 30
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
            if rpm >= limiterSettings.hardCutRpm then
                hardCutActive = true
                engineDevice:cutIgnition(0.05)
            elseif rpm >= limiterSettings.softLimitRpm then
                softLimitActive = true
                finalAfr = finalAfr * 1.25
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

        -- EGT + Knock Phase 1 (R2+ only)
        local rTierNow = electrics.values.jtechRTier or 0
        M.rTier = rTierNow
        if rTierNow >= 2 then
            local eng = engineDevice
            local engineLoadVal = eng and eng.engineLoad or 0
            local targetAfrVal = eng and eng.targetAfr or finalAfr

            -- EGT
            local egtBase = 650
            local egtLoad = math.min(1, engineLoadVal) * 600
            local egtLean = math.min(150, (math.max(0, smoothedAfr - 15.0)) * 150)
            local egtBoost = math.max(0, boost) * 30
            local egtNoise = (math.random() * 30) - 15
            local egtCalc = egtBase + egtLoad + egtLean + egtBoost + egtNoise
            M.jtechEGT = egtCalc

            -- Knock
            local knockRaw = 0
            if engineLoadVal > 0.7 then
                knockRaw = knockRaw + (engineLoadVal - 0.7) / 0.3 * 0.4
            end
            if rpm > 5000 then
                knockRaw = knockRaw + math.min(1, (rpm - 5000) / 3000) * 0.3
            end
            if smoothedAfr > targetAfrVal + 0.5 then
                knockRaw = knockRaw + math.min(1, (smoothedAfr - targetAfrVal - 0.5) / 2) * 0.3
            end
            local timingRef = finalTimingDeg or 20
            if timingRef > 28 then
                knockRaw = knockRaw + math.min(1, (timingRef - 28) / 10) * 0.3
            end
            knockRaw = math.max(0, math.min(1, knockRaw))
            M.jtechKnockLevel = (M.jtechKnockLevel or 0) * (1 - 0.15) + knockRaw * 0.15

            electrics.values.jtechEGT = M.jtechEGT
            electrics.values.jtechKnockLevel = M.jtechKnockLevel
        end

    end)

    electrics.values.jtechHardCut = hardCutActive and 1 or 0
    electrics.values.jtechLaunchActive = launchActive and 1 or 0
    electrics.values.jtechWaterTempWarn = waterTempWarning and 1 or 0
    electrics.values.jtechOilTempWarn = oilTempWarning and 1 or 0
    electrics.values.jtechSoftLimit = softLimitActive and 1 or 0
    electrics.values.jtechEGTWarn = egtWarning and 1 or 0
    electrics.values.jtechKnockWarn = knockWarning and 1 or 0
    electrics.values.jtechAFRLeanWarn = afrLeanWarning and 1 or 0
    electrics.values.jtechAFRRichWarn = afrRichWarning and 1 or 0
    electrics.values.jtechBoostOverrun = boostOverrunWarning and 1 or 0
    local rawAfr = engineDevice and engineDevice.lastAfr or 0
    if rawAfr > 0 then
        smoothedAfr = smoothedAfr * 0.7 + rawAfr * 0.3
    elseif (electrics.values.ignitionLevel or 0) == 0 then
        smoothedAfr = 0
    end
    electrics.values.jtechAfr = smoothedAfr
    electrics.values.jtechAfrTarget = engineDevice and engineDevice.targetAfr or 0
    local transBrakeActive = electrics.values.transbrake and 1 or 0
    local inReverse = (electrics.values.gearIndex or 0) < 0 and 1 or 0
    local reverseLightOn = math.max(transBrakeActive, inReverse)
    electrics.values.reverse = reverseLightOn
    electrics.values.reverselight_filament = reverseLightOn
    electrics.values.jtechOilPressure = M.getOilPressure()

    if not ok then
        log('E', 'auto_jtechECU', 'error: ' .. tostring(err))
    end
end

-- Suggestion scan rule engine
local function runSuggestionScan()
    local rTierNow = electrics.values.jtechRTier or 0
    local findings = {}

    if rTierNow < 2 then
        findings[#findings + 1] = {
            severity = "info",
            title = "R2 required",
            body = "Tune suggestions require R2 hardware or higher.",
            fix = ""
        }
    else
        local afr = electrics.values.jtechAfr or 0
        local targetAfr = electrics.values.jtechAfrTarget or 0
        local eng = engineDevice or powertrain.getDevice(engineDeviceName)
        local engineLoadVal = eng and eng.engineLoad or 0
        local rpmVal = electrics.values.rpm or 0
        local boostPsi = electrics.values.turboBoost or electrics.values.boost or 0
        local boostTarget = boostMax or 0

        if afr > 0 and targetAfr > 0 and afr > targetAfr + 0.8 and engineLoadVal > 0.75 then
            findings[#findings + 1] = {
                severity = "warn",
                title = "Lean AFR at WOT",
                body = "AFR is running lean under wide-open-throttle, high-load conditions, which raises the risk of detonation and elevated exhaust gas temperatures.",
                fix = "Enrich the fuel VE in the high-load cells to bring AFR back toward target.",
                cells = "R5\226\128\147R8, C7\226\128\147C10"
            }
        end

        if afr > 0 and targetAfr > 0 and afr < targetAfr - 0.8 and rpmVal < 1500 then
            findings[#findings + 1] = {
                severity = "info",
                title = "Rich idle mixture",
                body = "The mixture is running rich at idle, which can foul plugs and hurt fuel economy at low load.",
                fix = "Reduce VE slightly in the idle cells to lean the mixture toward target."
            }
        end

        for rpmKey, row in pairs(timingMap) do
            for i = 1, #row - 1 do
                if math.abs(row[i + 1] - row[i]) > 8 then
                    findings[#findings + 1] = {
                        severity = "caution",
                        title = "Abrupt timing transition",
                        body = "Adjacent timing cells at " .. tostring(rpmKey) .. " RPM differ by more than 8\194\176, which can cause harsh torque transitions.",
                        fix = "Smooth the transition between adjacent load cells.",
                        cells = tostring(rpmKey) .. " RPM, cols " .. i .. "\226\128\147" .. (i + 1)
                    }
                    break
                end
            end
        end

        if (M.jtechEGT or 0) > 1400 then
            findings[#findings + 1] = {
                severity = "warn",
                title = "High EGT",
                body = "Exhaust gas temperature is sustained above a safe threshold, risking valve and turbo damage.",
                fix = "Richen the WOT cells to cool the exhaust charge."
            }
        end

        if (M.jtechKnockLevel or 0) > 0.5 then
            findings[#findings + 1] = {
                severity = "warn",
                title = "Knock detected",
                body = "Estimated knock activity is elevated, indicating the engine may be under detonation stress.",
                fix = "Pull timing in the high-load cells to reduce knock risk."
            }
        end

        if boostPsi > boostTarget + 3 and boostTarget > 0 then
            findings[#findings + 1] = {
                severity = "caution",
                title = "Boost exceeding target",
                body = "Measured boost is running more than 3 PSI over the configured target.",
                fix = "Adjust wastegate duty / boost offset map to bring boost back in line."
            }
        end
    end

    local json = jsonEncode(findings)
    obj:queueGameEngineLua("jtechLoggerGE.sendSuggestions('" .. json .. "')")
end

M.runSuggestionScan = runSuggestionScan

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
    local eng = engineDevice or powertrain.getDevice(engineDeviceName)
    return {
        settings = settings,
        currentTuneName = currentTuneName,
        ignitionLevel = electrics.values.ignitionLevel or 0,
        boost = electrics.values.turboBoost or electrics.values.boost or 0,
        afr = smoothedAfr,
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
        limiterSettings = limiterSettings,
        egtWarning = egtWarning,
        knockWarning = knockWarning,
        afrLeanWarning = afrLeanWarning,
        afrRichWarning = afrRichWarning,
        boostOverrunWarning = boostOverrunWarning,
        launchArmed = launchArmed,
        launchActive = launchActive,
        softLimitActive = softLimitActive,
        hardCutActive = hardCutActive,
        waterTempWarning = waterTempWarning,
        oilTempWarning = oilTempWarning,
        tractionSlip = tractionSlip,
        isManual = isManual,
        rTier = electrics.values.jtechRTier or 0,
        afrLeanFault = (smoothedAfr > SAFE_AFR_LEAN),
        afrRichFault = (smoothedAfr > 0 and smoothedAfr < SAFE_AFR_RICH),
        afrLeanThreshold = SAFE_AFR_LEAN,
        afrRichThreshold = SAFE_AFR_RICH,
        egt = M.jtechEGT,
        knockLevel = M.jtechKnockLevel,
        mapRpmRows = M.mapRpmRows,
        mapLoadCols = M.mapLoadCols,
    }
end

local function setFuelMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if fuelMap[rpmKey] then
            for i, v in ipairs(vals) do fuelMap[rpmKey][i] = v end
        end
    end
    log('I', 'auto_jtechECU', 'fuel map updated from UI')
end

local function setTimingMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if timingMap[rpmKey] then
            for i, v in ipairs(vals) do timingMap[rpmKey][i] = v end
        end
    end
    log('I', 'auto_jtechECU', 'timing map updated from UI')
end

local function setBoostOffsetMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if boostOffsetMap[rpmKey] then
            for i, v in ipairs(vals) do boostOffsetMap[rpmKey][i] = v end
        end
    end
    log('I', 'auto_jtechECU', 'boost offset map updated from UI')
end

local function setBoostFuelTrimMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if boostFuelTrimMap[rpmKey] then
            for i, v in ipairs(vals) do boostFuelTrimMap[rpmKey][i] = v end
        end
    end
    log('I', 'auto_jtechECU', 'boost fuel trim map updated from UI')
end

local function setBoostTimingTrimMap(newMap)
    for rpm, vals in pairs(newMap) do
        local rpmKey = tonumber(rpm)
        if boostTimingTrimMap[rpmKey] then
            for i, v in ipairs(vals) do boostTimingTrimMap[rpmKey][i] = v end
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
        for k, v in pairs(data.settings) do settings[k] = v end
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
    for k, v in pairs(newSettings) do settings[k] = v end
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
    for k, v in pairs(newSettings) do safeSettings[k] = v end
    log('I', 'auto_jtechECU', 'safe settings: waterLimit=' .. tostring(safeSettings.waterTempLimit) .. ' oilLimit=' .. tostring(safeSettings.oilTempLimit))
end

local function updateLimiterSettings(newSettings)
    for k, v in pairs(newSettings) do limiterSettings[k] = v end
    log('I', 'auto_jtechECU', 'limiter settings: launchRpm=' .. tostring(limiterSettings.launchRpm) .. ' soft=' .. tostring(limiterSettings.softLimitRpm) .. ' hard=' .. tostring(limiterSettings.hardCutRpm) .. ' 3step=' .. tostring(limiterSettings.threeStepEnabled))
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
M.onReset = onReset

local function updateGFX(dt)
    if M.__extensionName__ ~= 'auto_jtechECU' then return end
    onUpdate(dt)
end

M.updateGFX = updateGFX
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
M.updateLimiterSettings = updateLimiterSettings
M.getOilPressure = getOilPressure

return M