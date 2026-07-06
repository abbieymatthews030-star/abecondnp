import Dexie from 'dexie'

const db = new Dexie('BecondMPDatabase')

db.version(1).stores({
  files: '++id, path, language, created',
  terminalHistory: '++id, timestamp',
  extensions: '++id, name',
  settings: 'key',
  deviceConfig: 'deviceId',
})

// File operations
export const saveFile = async (path, content, language = 'plaintext', userId = null) => {
  const file = {
    path,
    content,
    language,
    userId,
    created: new Date(),
    modified: new Date(),
    size: new Blob([content]).size,
  }
  return await db.files.add(file)
}

export const getFile = async (fileId) => {
  return await db.files.get(fileId)
}

export const updateFile = async (fileId, content) => {
  return await db.files.update(fileId, {
    content,
    modified: new Date(),
    size: new Blob([content]).size,
  })
}

export const deleteFile = async (fileId) => {
  return await db.files.delete(fileId)
}

export const getAllFiles = async () => {
  return await db.files.toArray()
}

export const getFilesByPath = async (pathPattern) => {
  return await db.files.where('path').startsWithIgnoreCase(pathPattern).toArray()
}

// Terminal history
export const addTerminalHistory = async (command, output, status = 'success') => {
  return await db.terminalHistory.add({
    command,
    output,
    status,
    timestamp: new Date(),
  })
}

export const getTerminalHistory = async (limit = 50) => {
  return await db.terminalHistory.orderBy('timestamp').reverse().limit(limit).toArray()
}

// Extensions
export const addExtension = async (name, config) => {
  return await db.extensions.add({
    name,
    config,
    installed: new Date(),
    enabled: true,
  })
}

export const getExtensions = async () => {
  return await db.extensions.toArray()
}

// Settings
export const saveSetting = async (key, value) => {
  return await db.settings.put({ key, value })
}

export const getSetting = async (key) => {
  const setting = await db.settings.get(key)
  return setting?.value
}

export const getAllSettings = async () => {
  return await db.settings.toArray()
}

// Device configuration
export const saveDeviceConfig = async (deviceId, config) => {
  return await db.deviceConfig.put({
    deviceId,
    ...config,
    updated: new Date(),
  })
}

export const getDeviceConfig = async (deviceId) => {
  return await db.deviceConfig.get(deviceId)
}

export default db