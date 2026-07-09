local M = {}

local function startLog(duration)
    local vehId = be:getPlayerVehicleID(0)
    local veh = be:getObjectByID(vehId)
    if veh then
        veh:queueLuaCommand("extensions.jtechLogger.startLog(" .. duration .. ")")
    end
end

local function stopLog()
    local vehId = be:getPlayerVehicleID(0)
    local veh = be:getObjectByID(vehId)
    if veh then
        veh:queueLuaCommand("extensions.jtechLogger.stopLog()")
    end
end

local function fetchLogData()
    local vehId = be:getPlayerVehicleID(0)
    local veh = be:getObjectByID(vehId)
    if veh then
        veh:queueLuaCommand("extensions.jtechLogger.pushLogData()")
    end
end

local lastLogData = nil

local function receiveLogData(jsonStr)
    local data = jsonDecode(jsonStr)
    lastLogData = data
    guihooks.trigger('jtechLogData', data)
    guihooks.trigger('jtechLogStopped', {})
end

local function exportLog()
    if not lastLogData or not lastLogData.samples or #lastLogData.samples == 0 then
        guihooks.trigger('toastrMsg', {type='warning', title='JTECH — Export Failed', msg='No log data to export.'})
        return
    end

    local logDir = FS:getUserPath() .. "jtech_logs\\"
    os.execute('mkdir "' .. logDir .. '" 2>nul')

    local timestamp = os.date("%Y%m%d_%H%M%S")
    local filename = logDir .. "jtech_log_" .. timestamp .. ".csv"

    local file = io.open(filename, "w")
    if not file then
        guihooks.trigger('toastrMsg', {type='error', title='JTECH — Export Failed', msg='Could not write to: ' .. filename})
        return
    end

    -- Header row
    file:write("time,rpm,tps,boost,afr,afrTarget,gear,clutch,speed,waterTemp,oilTemp,oilPressure,transBrake,launchActive,load,timingAdv,fuelCellRPM,fuelCellLoad,egt,knockLevel\n")

    -- Data rows
    for _, s in ipairs(lastLogData.samples) do
        file:write(string.format("%.2f,%d,%.1f,%.2f,%.2f,%.2f,%s,%.1f,%.2f,%.1f,%.1f,%.1f,%d,%d,%.1f,%.1f,%d,%d,%.0f,%.1f\n",
            s.time or 0,
            s.rpm or 0,
            s.tps or 0,
            s.boost or 0,
            s.afr or 0,
            s.afrTarget or 0,
            tostring(s.gear or 'N'),
            s.clutch or 0,
            s.speed or 0,
            s.waterTemp or 0,
            s.oilTemp or 0,
            s.oilPressure or 0,
            s.transBrake or 0,
            s.launchActive or 0,
            s.load or 0,
            s.timingAdv or 0,
            s.fuelCellRPM or 0,
            s.fuelCellLoad or 0,
            s.egt or 0,
            s.knockLevel or 0
        ))
    end

    file:close()
    guihooks.trigger('toastrMsg', {type='success', title='JTECH — Log Exported', msg='Saved to jtech_logs/' .. "jtech_log_" .. timestamp .. ".csv"})
end


-- Suggestion scan bridge (VE -> GE -> UI)
local function sendSuggestions(jsonStr)
    local results = jsonDecode(jsonStr) or {}
    guihooks.trigger('JtechSuggestions', results)
end

M.startLog = startLog
M.stopLog = stopLog
M.fetchLogData = fetchLogData
M.receiveLogData = receiveLogData
M.exportLog = exportLog
M.sendSuggestions = sendSuggestions

return M