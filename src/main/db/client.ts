// src/main/backend/db/client.ts
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import path from 'path'
import { app } from 'electron'
import * as schema from './schema'

const dbPath = path.join(app.getPath('userData'), 'app.db')
console.log(`Database path: ${dbPath}`)

// Create SQLite database connection
export const sqlite = new Database(dbPath)

// Enable foreign key constraint enforcement
sqlite.pragma('foreign_keys = ON')

// Create drizzle ORM instance with the schema
export const db = drizzle(sqlite, { schema })
