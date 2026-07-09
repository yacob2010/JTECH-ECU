local M = {}

local tuneSaveDir = '/settings/jtechECU/tunes/'

local function serializeToLua(val)
    local t = type(val)
    if t == 'number' then return tostring(val)
    elseif t == 'boolean' then return tostring(val)
    elseif t == 'string' then return string.format('%q', val)
    elseif t == 'table' then
        local parts = {}
        if #val > 0 then
            for _, v in ipairs(val) do
                table.insert(parts, serializeToLua(v))
            end
        else
            for k, v in pairs(val) do
                local key = type(k) == 'number' and '[' .. k .. ']' or '["' .. k .. '"]'
                table.insert(parts, key .. '=' .. serializeToLua(v))
            end
        end
        return '{' .. table.concat(parts, ',') .. '}'
    else return 'nil' end
end

local function ensureDir()
    FS:directoryCreate(tuneSaveDir)
end

local function getTuneList()
    ensureDir()
    local files = FS:findFiles(tuneSaveDir, '*.json', 0, false, false)
    local tunes = {}
    for _, f in ipairs(files) do
        local content = readFile(f)
        if content then
            local ok, data = pcall(jsonDecode, content)
            if ok and data and data.meta then
                table.insert(tunes, {
                    filename = f,
                    name = data.meta.name or 'Unnamed',
                    ecuName = data.meta.ecuName or '',
                    savedAt = data.meta.savedAt or 0
                })
            end
        end
    end
    table.sort(tunes, function(a, b) return a.savedAt > b.savedAt end)
    return tunes
end


local function saveTune(vehId, tuneData)
    ensureDir()
    local name = tuneData.meta and tuneData.meta.name or 'unnamed'
    local safeName = name:gsub('[^%w%s%-_]', ''):gsub('%s+', '_')
    if safeName == '' then safeName = 'tune' end
    local filename = tuneSaveDir .. safeName .. '.json'
    tuneData.meta.savedAt = Engine.Platform.getSystemTimeMS()
    local content = jsonEncode(tuneData)
    writeFile(filename, content)
    local veh = be:getObjectByID(vehId)
    if veh then
       -- veh:queueLuaCommand('extensions.auto_jtechECU.onTuneSaved(' .. jsonEncode({success=true, filename=filename}) .. ')')
    end
    return filename
end

local function loadTune(vehId, filename)
    local content = readFile(filename)
    if not content then
        log('E', 'jtechSave', 'Could not read tune file: ' .. tostring(filename))
        return
    end
    local ok, data = pcall(jsonDecode, content)
    if not ok or not data then
        log('E', 'jtechSave', 'Could not parse tune file: ' .. tostring(filename))
        return
    end
    local veh = be:getObjectByID(vehId)
    if veh then
        veh:queueLuaCommand('extensions.auto_jtechECU.applyTune(' .. serializeToLua(data) .. ')')
    end
end

local function deleteTune(filename)
    FS:removeFile(filename)
end

local function pushTuneListToUI()
    local tunes = getTuneList()
    guihooks.trigger('jtechTuneList', tunes)
end

local function pushTuneToVehicle(vehId)
    -- called on vehicle spawn to restore last active tune
    local lastFile = tuneSaveDir .. '_last.json'
    local content = readFile(lastFile)
    if not content then return end
    local ok, data = pcall(jsonDecode, content)
    if not ok or not data then return end
    local veh = be:getObjectByID(vehId)
    if veh then
        veh:queueLuaCommand('extensions.auto_jtechECU.applyTune(' .. serializeToLua(data) .. ')')
    end
end

local function saveLastActive(tuneData)
    ensureDir()
    writeFile(tuneSaveDir .. '_last.json', jsonEncode(tuneData))
end

M.saveTune = saveTune
M.loadTune = loadTune
M.deleteTune = deleteTune
M.getTuneList = getTuneList
M.pushTuneListToUI = pushTuneListToUI
M.pushTuneToVehicle = pushTuneToVehicle
M.saveLastActive = saveLastActive

return M