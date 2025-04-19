import express, { Router } from 'express'
import { homeworkRepository } from '../db/repositories'

const router: Router = express.Router()

// Get all homework
router.get('/', async (_req, res) => {
  try {
    const homeworks = await homeworkRepository.findAll()
    res.json(homeworks)
  } catch (error) {
    console.error('Error fetching homework:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get homework by subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const subjectId = parseInt(req.params.subjectId)
    const homeworks = await homeworkRepository.findBySubjectId(subjectId)
    res.json(homeworks)
  } catch (error) {
    console.error('Error fetching homework by subject:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a single homework by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const homework = await homeworkRepository.findById(id)

    if (!homework) {
      return res.status(404).json({ error: 'Homework not found' })
    }

    res.json(homework)
  } catch (error) {
    console.error('Error fetching homework:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add a new homework
router.post('/', async (req, res) => {
  try {
    const newHomework = await homeworkRepository.create(req.body)
    res.status(201).json(newHomework)
  } catch (error) {
    console.error('Error creating homework:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update a homework
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await homeworkRepository.update(id, req.body)

    if (result.length === 0) {
      return res.status(404).json({ error: 'Homework not found' })
    }

    res.json(result[0])
  } catch (error) {
    console.error('Error updating homework:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete a homework
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await homeworkRepository.delete(id)

    if (result.length === 0) {
      return res.status(404).json({ error: 'Homework not found' })
    }

    res.json({ message: 'Homework deleted successfully' })
  } catch (error) {
    console.error('Error deleting homework:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
