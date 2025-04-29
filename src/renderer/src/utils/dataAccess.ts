import { ipcRenderer } from 'electron'

// Define interfaces for data types
export interface Subject {
  id: number
  name: string
  abbreviation: string
  room: string
  category: string
  color: string
  teacherName: string | null
  teacherEmail: string | null
}

export interface Exam {
  id: number
  title: string
  date: number
  type: string
  status: 'open' | 'done'
  grade: number | null
  subjectId: number
}

export interface Homework {
  id: number
  title: string
  description: string
  dueDate: number
  status: 'open' | 'done'
  subjectId: number
}

export interface AllData {
  subjects: Subject[]
  exams: Exam[]
  homework: Homework[]
}

/**
 * Fetches all subjects from the database
 * @returns Promise resolving to an array of all subjects
 */
export async function getAllSubjects(): Promise<Subject[]> {
  try {
    const response = await ipcRenderer.invoke('get-all-subjects')
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch subjects')
    }
    return response.data
  } catch (error) {
    console.error('Error fetching subjects:', error)
    throw error
  }
}

/**
 * Fetches a subject by its ID from the database
 * @param id - The ID of the subject to fetch
 * @returns Promise resolving to the subject object or null if not found
 */
export async function getSubjectById(id: number): Promise<Subject | null> {
  try {
    const response = await ipcRenderer.invoke('get-subject-by-id', id)
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch subject')
    }
    return response.data
  } catch (error) {
    console.error('Error fetching subject:', error)
    throw error
  }

/**
 * Fetches all exams from the database
 * @returns Promise resolving to an array of all exams
 */
export async function getAllExams(): Promise<Exam[]> {
  try {
    const response = await ipcRenderer.invoke('get-all-exams')
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch exams')
    }
    return response.data
  } catch (error) {
    console.error('Error fetching exams:', error)
    throw error
  }
}

/**
 * Fetches all homework assignments from the database
 * @returns Promise resolving to an array of all homework assignments
 */
export async function getAllHomework(): Promise<Homework[]> {
  try {
    const response = await ipcRenderer.invoke('get-all-homework')
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch homework')
    }
    return response.data
  } catch (error) {
    console.error('Error fetching homework:', error)
    throw error
  }
}

/**
 * Fetches all data (subjects, exams, homework) from the database
 * @returns Promise resolving to an object containing arrays of all data
 */
export async function getAllData(): Promise<AllData> {
  try {
    const response = await ipcRenderer.invoke('get-all-data')
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch all data')
    }
    return response.data
  } catch (error) {
    console.error('Error fetching all data:', error)
    throw error
  }
}
