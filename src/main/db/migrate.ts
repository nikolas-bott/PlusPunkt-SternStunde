import { sql } from 'drizzle-orm'
import { db } from './client'

// Run migrations
export async function runMigrations(): Promise<void> {
  console.log('Running database migrations...')
  try {
    // Instead of using migration files, create tables directly from schema
    console.log('Creating database schema...')

    // Drop existing tables if they exist (for clean migration)
    await db.run(sql`DROP TABLE IF EXISTS homework;`)
    await db.run(sql`DROP TABLE IF EXISTS done_exams;`)
    await db.run(sql`DROP TABLE IF EXISTS subjects;`)
    await db.run(sql`DROP TABLE IF EXISTS teacher;`)

    // Create subjects table with updated schema (including teacher information)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        abbreviation TEXT NOT NULL,
        room TEXT NOT NULL,
        category TEXT NOT NULL,
        color TEXT NOT NULL,
        teacher_name TEXT,
        teacher_email TEXT
      );
    `)

    // Create exams table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS done_exams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date INTEGER NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        grade INTEGER,
        subject_id INTEGER NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
      );
    `)

    // Create homework table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS homework (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date INTEGER NOT NULL,
        status TEXT NOT NULL,
        subject_id INTEGER NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
      );
    `)

    console.log('Database schema created successfully')

    // Insert sample data if needed
  } catch (error) {
    console.error('Migration failed:', error)
  }
}
