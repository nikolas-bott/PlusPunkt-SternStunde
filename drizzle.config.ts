import type { Config } from 'drizzle-kit'
import { app } from 'electron'
import path from 'path'

// If running outside of Electron context (like when generating migrations)
const userDataPath = app ? app.getPath('userData') : './data'

export default {
  schema: './src/main/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite3',
  dbCredentials: {
    url: path.join(userDataPath, 'app.db')
  }
} satisfies Config
