import { useCallback } from 'react'
import {
  saveFile as dbSaveFile,
  getFile as dbGetFile,
  updateFile as dbUpdateFile,
  deleteFile as dbDeleteFile,
  getAllFiles,
  getFilesByPath,
} from '../services/indexdb'

export const useFileSystem = () => {
  const saveFile = useCallback(async (path, content, language) => {
    try {
      return await dbSaveFile(path, content, language)
    } catch (error) {
      console.error('Error saving file:', error)
      throw error
    }
  }, [])

  const getFile = useCallback(async (fileId) => {
    try {
      return await dbGetFile(fileId)
    } catch (error) {
      console.error('Error getting file:', error)
      throw error
    }
  }, [])

  const updateFile = useCallback(async (fileId, content) => {
    try {
      return await dbUpdateFile(fileId, content)
    } catch (error) {
      console.error('Error updating file:', error)
      throw error
    }
  }, [])

  const deleteFile = useCallback(async (fileId) => {
    try {
      return await dbDeleteFile(fileId)
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }, [])

  const listFiles = useCallback(async () => {
    try {
      return await getAllFiles()
    } catch (error) {
      console.error('Error listing files:', error)
      throw error
    }
  }, [])

  const searchFiles = useCallback(async (pathPattern) => {
    try {
      return await getFilesByPath(pathPattern)
    } catch (error) {
      console.error('Error searching files:', error)
      throw error
    }
  }, [])

  return { saveFile, getFile, updateFile, deleteFile, listFiles, searchFiles }
}

export default useFileSystem