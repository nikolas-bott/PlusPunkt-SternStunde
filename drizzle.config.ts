import type { Config } from 'drizzle-kit'
import path from 'path'

// Determine the userData path conditionally
// When running via Electron, use app.getPath('userData')
// When running drizzle-kit generate, app will be undefined, use a relative path
let dbPathUrl: string
try {
  // Dynamically import electron only if needed and available
  const electron = await import('electron')
  const { app } = electron
  dbPathUrl = path.join(app.getPath('userData'), 'app.db')
} catch (err) {
  console.log(
    'Electron app module not found, assuming running drizzle-kit generate. Using relative path for DB.',
    err
  )
  dbPathUrl = './app.db' // Use a relative path for generation
}

export default {
  schema: './src/main/db/schema.ts',
  out: './drizzle', // Ensure this directory exists or is created
  dialect: 'sqlite', // Specify the dialect
  dbCredentials: {
    url: dbPathUrl
  }
} satisfies Config
