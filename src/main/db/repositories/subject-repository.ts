import { db } from '../client'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'

// Get the inferred types from schema
type Subject = typeof schema.subject.$inferSelect
type NewSubject = Omit<typeof schema.subject.$inferInsert, 'id'>
type SubjectUpdate = Partial<typeof schema.subject.$inferInsert>

export class SubjectRepository {
  async findAll(): Promise<Subject[]> {
    return await db.select().from(schema.subject)
  }

  async findById(id: number): Promise<Subject | null> {
    const results = await db.select().from(schema.subject).where(eq(schema.subject.id, id))
    return results.length > 0 ? results[0] : null
  }

  async create(subjectData: NewSubject): Promise<Subject[]> {
    return await db.insert(schema.subject).values(subjectData).returning()
  }

  async update(id: number, subjectData: SubjectUpdate): Promise<Subject[]> {
    return await db
      .update(schema.subject)
      .set(subjectData)
      .where(eq(schema.subject.id, id))
      .returning()
  }

  async delete(id: number): Promise<Subject[]> {
    // First delete related exams and homework
    await db.delete(schema.exams).where(eq(schema.exams.subjectId, id))
    await db.delete(schema.homework).where(eq(schema.homework.subjectId, id))

    // Then delete the subject
    return await db.delete(schema.subject).where(eq(schema.subject.id, id)).returning()
  }
}

export const subjectRepository = new SubjectRepository()
