import { useCallback, useEffect, useState } from 'react'
import { saveSetting, getSetting, getAllSettings } from '../services/indexdb'

export const useDeviceConfig = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = useCallback(async () => {
    try {
      const settings = await getAllSettings()
      const configMap = {}
      settings.forEach((s) => {
        configMap[s.key] = s.value
      })
      setConfig(configMap)
      setLoading(false)
    } catch (error) {
      console.error('Error loading config:', error)
      setLoading(false)
    }
  }, [])

  const updateConfig = useCallback(async (key, value) => {
    try {
      await saveSetting(key, value)
      setConfig((prev) => ({ ...prev, [key]: value }))
      return true
    } catch (error) {
      console.error('Error updating config:', error)
      return false
    }
  }, [])

  const getConfig = useCallback((key, defaultValue = null) => {
    return config?.[key] ?? defaultValue
  }, [config])

  return { config, loading, updateConfig, getConfig }
}

export default useDeviceConfig