// src/main/backend/db/client.ts
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import path from 'path'
import { app } from 'electron'
import * as schema from './schema'

const dbPath = path.join(app.getPath('userData'), 'app.db')
const sqlite = new Database(dbPath)
export const db = drizzle(sqlite, { schema })
