import { ipcMain } from 'electron'
import { subjectRepository, examRepository, homeworkRepository } from './db/repositories'

export function setupIpcHandlers(): void {
  // Subject handlers
  ipcMain.handle('update-subject', async (_, args) => {
    try {
      const { id, ...updates } = args
      const result = await subjectRepository.update(id, updates)
      return { success: true, data: result[0] }
    } catch (error: unknown) {
      console.error('Error updating subject:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  ipcMain.handle('delete-subject', async (_, id) => {
    try {
      await subjectRepository.delete(id)
      return { success: true }
    } catch (error: unknown) {
      console.error('Error deleting subject:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  // Exam handlers
  ipcMain.handle('update-exam', async (_, args) => {
    try {
      const { id, ...updates } = args
      const result = await examRepository.update(id, updates)
      return { success: true, data: result[0] }
    } catch (error: unknown) {
      console.error('Error updating exam:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  ipcMain.handle('delete-exam', async (_, id) => {
    try {
      await examRepository.delete(id)
      return { success: true }
    } catch (error: unknown) {
      console.error('Error deleting exam:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  // Homework handlers
  ipcMain.handle('update-homework', async (_, args) => {
    try {
      const { id, ...updates } = args
      const result = await homeworkRepository.update(id, updates)
      return { success: true, data: result[0] }
    } catch (error: unknown) {
      console.error('Error updating homework:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  ipcMain.handle('delete-homework', async (_, id) => {
    try {
      await homeworkRepository.delete(id)
      return { success: true }
    } catch (error: unknown) {
      console.error('Error deleting homework:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })
}
