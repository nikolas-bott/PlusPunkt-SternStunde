import { subjectRepository, examRepository, homeworkRepository } from '../db/repositories'
import * as schema from '../db/schema'

// Define interfaces based on schema
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

export class DataService {
  /**
   * Get all subjects from the database
   * @returns Promise resolving to an array of all Subject objects
   */
  async getSubjects(): Promise<Subject[]> {
    return await subjectRepository.findAll()
  }

  /**
   * Get all exams from the database
   * @returns Promise resolving to an array of all Exam objects
   */
  async getExams(): Promise<Exam[]> {
    return await examRepository.findAll()
  }

  /**
   * Get all homework assignments from the database
   * @returns Promise resolving to an array of all Homework objects
   */
  async getHomework(): Promise<Homework[]> {
    return await homeworkRepository.findAll()
  }

  /**
   * Get all data combined (subjects, exams, homework)
   * @returns Promise resolving to an object with all data
   */
  async getAllData(): Promise<AllData> {
    const [subjects, exams, homework] = await Promise.all([
      this.getSubjects(),
      this.getExams(),
      this.getHomework()
    ])

    return {
      subjects,
      exams,
      homework
    }
 
 }
}

// Export a singleton instance
export const dataService = new DataService()