import { db } from '../client'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'

// Get the inferred types from schema
type Homework = typeof schema.homework.$inferSelect
type NewHomework = Omit<typeof schema.homework.$inferInsert, 'id'>
type HomeworkUpdate = Partial<typeof schema.homework.$inferInsert>

export class HomeworkRepository {
  async findAll(): Promise<Homework[]> {
    return await db.select().from(schema.homework)
  }

  async findById(id: number): Promise<Homework | null> {
    const results = await db.select().from(schema.homework).where(eq(schema.homework.id, id))
    return results.length > 0 ? results[0] : null
  }

  async findBySubjectId(subjectId: number): Promise<Homework[]> {
    return await db.select().from(schema.homework).where(eq(schema.homework.subjectId, subjectId))
  }

  async create(homeworkData: NewHomework): Promise<Homework[]> {
    return await db.insert(schema.homework).values(homeworkData).returning()
  }

  async update(id: number, homeworkData: HomeworkUpdate): Promise<Homework[]> {
    return await db
      .update(schema.homework)
      .set(homeworkData)
      .where(eq(schema.homework.id, id))
      .returning()
  }

  async delete(id: number): Promise<Homework[]> {
    return await db.delete(schema.homework).where(eq(schema.homework.id, id)).returning()
  }

  async deleteBySubjectId(subjectId: number): Promise<void> {
    await db.delete(schema.homework).where(eq(schema.homework.subjectId, subjectId))
  }
}

export const homeworkRepository = new HomeworkRepository()
