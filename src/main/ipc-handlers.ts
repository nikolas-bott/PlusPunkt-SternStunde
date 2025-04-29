import { ipcMain } from 'electron'
import { subjectRepository, examRepository, homeworkRepository } from './db/repositories'
import { dataService } from './services'

export function setupIpcHandlers(): void {
  // Data retrieval handlers
  ipcMain.handle('get-all-subjects', async () => {
    try {
      const subjects = await dataService.getSubjects()
      return { success: true, data: subjects }
    } catch (error: unknown) {
      console.error('Error fetching subjects:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  ipcMain.handle('get-all-exams', async () => {
    try {
      const exams = await dataService.getExams()
      return { success: true, data: exams }
    } catch (error: unknown) {
      console.error('Error fetching exams:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  ipcMain.handle('get-all-homework', async () => {
    try {
      const homework = await dataService.getHomework()
      return { success: true, data: homework }
    } catch (error: unknown) {
      console.error('Error fetching homework:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  ipcMain.handle('get-all-data', async () => {
    try {
      const allData = await dataService.getAllData()
      return { success: true, data: allData }
    } catch (error: unknown) {
      console.error('Error fetching all data:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

  // Subject handlers
  ipcMain.handle('get-subject-by-id', async (_, id) => {
    try {
      const subject = await subjectRepository.findById(id)
      if (!subject) {
        return { success: false, error: 'Subject not found' }
      }
      return { success: true, data: subject }
    } catch (error: unknown) {
      console.error('Error fetching subject:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

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
  ipcMain.handle('get-exam-by-id', async (_, id) => {
    try {
      const exam = await examRepository.findById(id)
      if (!exam) {
        return { success: false, error: 'Exam not found' }
      }
      return { success: true, data: exam }
    } catch (error: unknown) {
      console.error('Error fetching exam:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

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
  ipcMain.handle('get-homework-by-id', async (_, id) => {
    try {
      const homework = await homeworkRepository.findById(id)
      if (!homework) {
        return { success: false, error: 'Homework not found' }
      }
      return { success: true, data: homework }
    } catch (error: unknown) {
      console.error('Error fetching homework:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

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
