import express, { Router } from 'express'
import { examRepository } from '../db/repositories'

const router: Router = express.Router()

// Get all exams
router.get('/', async (_req, res) => {
  try {
    const exams = await examRepository.findAll()
    res.json(exams)
  } catch (error) {
    console.error('Error fetching exams:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get exams by subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const subjectId = parseInt(req.params.subjectId)
    const exams = await examRepository.findBySubjectId(subjectId)
    res.json(exams)
  } catch (error) {
    console.error('Error fetching exams by subject:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a single exam by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const exam = await examRepository.findById(id)

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    res.json(exam)
  } catch (error) {
    console.error('Error fetching exam:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add a new exam
router.post('/', async (req, res) => {
  try {
    const newExam = await examRepository.create(req.body)
    res.status(201).json(newExam)
  } catch (error) {
    console.error('Error creating exam:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update an exam
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await examRepository.update(id, req.body)

    if (result.length === 0) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    res.json(result[0])
  } catch (error) {
    console.error('Error updating exam:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete an exam
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await examRepository.delete(id)

    if (result.length === 0) {
      return res.status(404).json({ error: 'Exam not found' })
    }

    res.json({ message: 'Exam deleted successfully' })
  } catch (error) {
    console.error('Error deleting exam:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
