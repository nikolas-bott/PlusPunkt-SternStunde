import { subjectRepository, examRepository, homeworkRepository } from '../db/repositories'
import * as schema from '../db/schema'

// Define types for our service responses
type Subject = typeof schema.subject.$inferSelect
type Exam = typeof schema.exams.$inferSelect
type Homework = typeof schema.homework.$inferSelect

interface SubjectWithDetails extends Subject {
  exams: Exam[]
  homework: Homework[]
}

interface SubjectStatistics {
  subjectId: number
  subjectName: string
  averageGrade: number | null
  totalExams: number
  completedExams: number
  totalHomework: number
  completedHomework: number
  homeworkCompletionRate: number | null
}

/**
 * Service class for subject-related business logic
 * Coordinates operations across multiple repositories
 */
export class SubjectService {
  /**
   * Get a subject with all related data (exams, homework)
   * @param id The subject ID
   */
  async getSubjectWithDetails(id: number): Promise<SubjectWithDetails | null> {
    const subject = await subjectRepository.findById(id)

    if (!subject) {
      return null
    }

    const exams = await examRepository.findBySubjectId(id)
    const homework = await homeworkRepository.findBySubjectId(id)

    return {
      ...subject,
      exams,
      homework
    }
  }

  /**
   * Delete a subject and all its related data
   * @param id The subject ID
   */
  async deleteSubjectWithAllRelatedData(id: number): Promise<Subject[]> {
    // First delete all related exams and homework
    await examRepository.deleteBySubjectId(id)
    await homeworkRepository.deleteBySubjectId(id)

    // Then delete the subject
    return await subjectRepository.delete(id)
  }

  /**
   * Calculate subject statistics
   * @param id The subject ID
   */
  async calculateSubjectStatistics(id: number): Promise<SubjectStatistics | null> {
    const subject = await subjectRepository.findById(id)

    if (!subject) {
      return null
    }

    const exams = await examRepository.findBySubjectId(id)

    // Calculate grade average if exams exist and have grades
    const gradesWithValues = exams.filter((exam) => exam.grade !== null)
    const averageGrade =
      gradesWithValues.length > 0
        ? gradesWithValues.reduce((sum, exam) => sum + (exam.grade || 0), 0) /
          gradesWithValues.length
        : null

    // Calculate completion statistics
    const homework = await homeworkRepository.findBySubjectId(id)
    const homeworkCompletionRate =
      homework.length > 0
        ? homework.filter((hw) => hw.status === 'done').length / homework.length
        : null

    return {
      subjectId: id,
      subjectName: subject.name,
      averageGrade,
      totalExams: exams.length,
      completedExams: exams.filter((exam) => exam.status === 'done').length,
      totalHomework: homework.length,
      completedHomework: homework.filter((hw) => hw.status === 'done').length,
      homeworkCompletionRate
    }
  }
}

export const subjectService = new SubjectService()
