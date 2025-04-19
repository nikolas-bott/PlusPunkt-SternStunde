import express from 'express'
import cors from 'cors'
import { db } from './db/client'
import { sql } from 'drizzle-orm/sql'
import { registerRoutes } from './routes'

// Create Express app
const app = express()
const PORT = 3000

// Simplified CORS configuration to avoid path-to-regexp errors
app.use(
  cors({
    origin: true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
)

app.use(express.json())

// Register all routes
registerRoutes(app)

export function startServer(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    try {
      const server = app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)

        // Test database connection
        db.select({ test: sql`1` })
          .from(sql`sqlite_master`)
          .then(() => {
            console.log('Database connection successful')
            resolve(PORT)
          })
          .catch((err) => {
            console.error('Database connection failed:', err)
            reject(err)
          })
      })

      server.on('error', (err) => {
        console.error('Server failed to start:', err)
        reject(err)
      })
    } catch (error) {
      console.error('Failed to initialize server:', error)
      reject(error)
    }
  })
}
