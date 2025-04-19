import { Express } from 'express'
import subjectRoutes from './subject-routes'
import examRoutes from './exam-routes'
import homeworkRoutes from './homework-routes'

/**
 * Register all API routes with the Express app
 * @param app Express application instance
 */
export function registerRoutes(app: Express): void {
  app.use('/api/subjects', subjectRoutes)
  app.use('/api/exams', examRoutes)
  app.use('/api/homework', homeworkRoutes)

  // Add health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })
}
