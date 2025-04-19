import { db } from '../client'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'

// Get the inferred types from schema
type Exam = typeof schema.exams.$inferSelect
type NewExam = Omit<typeof schema.exams.$inferInsert, 'id'>
type ExamUpdate = Partial<typeof schema.exams.$inferInsert>

export class ExamRepository {
  async findAll(): Promise<Exam[]> {
    return await db.select().from(schema.exams)
  }

  async findById(id: number): Promise<Exam | null> {
    const results = await db.select().from(schema.exams).where(eq(schema.exams.id, id))
    return results.length > 0 ? results[0] : null
  }

  async findBySubjectId(subjectId: number): Promise<Exam[]> {
    return await db.select().from(schema.exams).where(eq(schema.exams.subjectId, subjectId))
  }

  async create(examData: NewExam): Promise<Exam[]> {
    return await db.insert(schema.exams).values(examData).returning()
  }

  async update(id: number, examData: ExamUpdate): Promise<Exam[]> {
    return await db.update(schema.exams).set(examData).where(eq(schema.exams.id, id)).returning()
  }

  async delete(id: number): Promise<Exam[]> {
    return await db.delete(schema.exams).where(eq(schema.exams.id, id)).returning()
  }

  async deleteBySubjectId(subjectId: number): Promise<void> {
    await db.delete(schema.exams).where(eq(schema.exams.subjectId, subjectId))
  }
}

export const examRepository = new ExamRepository()
