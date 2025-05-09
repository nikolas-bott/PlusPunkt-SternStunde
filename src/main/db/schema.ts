import { desc } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique()
// })

export const subject = sqliteTable('subjects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  abbreviation: text('abbreviation').notNull(),
  room: text('room').notNull(),
  category: text('category').notNull(),
  color: text('color').notNull(),
  teacherName: text('teacher_name'),
  teacherEmail: text('teacher_email')
})

export const exams = sqliteTable('done_exams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  date: integer('date').notNull(),
  type: text('type').notNull(),
  status: text('status', { enum: ['open', 'done'] }).notNull(),
  grade: integer('grade'),
  description: text('description'),
  subjectId: integer('subject_id')
    .notNull()
    .references(() => subject.id)
})

export const homework = sqliteTable('homework', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  dueDate: integer('date').notNull(),
  status: text('status', { enum: ['open', 'done'] }).notNull(),
  subjectId: integer('subject_id')
    .notNull()
    .references(() => subject.id)
})

export const relations = (relations): unknown => ({
  subjects: relations(subject, ({ many }) => ({
    exams: many(exams),
    homeworks: many(homework)
  })),
  exams: relations(exams, ({ one }) => ({
    subject: one(subject, {
      fields: [exams.subjectId],
      references: [subject.id]
    })
  })),
  homeworks: relations(homework, ({ one }) => ({
    subject: one(subject, {
      fields: [homework.subjectId],
      references: [subject.id]
    })
  }))
})
