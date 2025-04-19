import express, { Router } from 'express'
import { subjectRepository } from '../db/repositories'
import { subjectService } from '../services/subject-service'

const router: Router = express.Router()

// Get all subjects
router.get('/', async (_req, res) => {
  try {
    console.log('Fetching all subjects...')
    const subjects = await subjectRepository.findAll()
    console.log(`Found ${subjects.length} subjects`)
    res.json(subjects)
  } catch (error) {
    console.error('Error fetching subjects:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a single subject by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    console.log(`Fetching subject with ID: ${id}`)
    const subject = await subjectRepository.findById(id)

    if (!subject) {
      console.warn(`Subject with ID ${id} not found`)
      return res.status(404).json({ error: 'Subject not found' })
    }

    console.log(`Subject with ID ${id} found`)
    res.json(subject)
  } catch (error) {
    console.error('Error fetching subject:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a single subject with all details by ID
router.get('/:id/details', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    console.log(`Fetching detailed subject with ID: ${id}`)
    const subject = await subjectService.getSubjectWithDetails(id)

    if (!subject) {
      console.warn(`Subject with ID ${id} not found`)
      return res.status(404).json({ error: 'Subject not found' })
    }

    res.json(subject)
  } catch (error) {
    console.error('Error fetching subject details:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get subject statistics
router.get('/:id/statistics', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    console.log(`Fetching statistics for subject with ID: ${id}`)
    const statistics = await subjectService.calculateSubjectStatistics(id)

    if (!statistics) {
      console.warn(`Subject with ID ${id} not found`)
      return res.status(404).json({ error: 'Subject not found' })
    }

    res.json(statistics)
  } catch (error) {
    console.error('Error calculating subject statistics:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add a new subject
router.post('/', async (req, res) => {
  try {
    console.log('Creating a new subject...')
    const newSubject = await subjectRepository.create(req.body)
    console.log('New subject created:', newSubject)
    res.status(201).json(newSubject)
  } catch (error) {
    console.error('Error creating subject:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update a subject
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    console.log(`Updating subject with ID: ${id}`)
    const result = await subjectRepository.update(id, req.body)

    if (result.length === 0) {
      console.warn(`Subject with ID ${id} not found`)
      return res.status(404).json({ error: 'Subject not found' })
    }

    console.log(`Subject with ID ${id} updated`)
    res.json(result[0])
  } catch (error) {
    console.error('Error updating subject:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete a subject
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    console.log(`Deleting subject with ID: ${id}`)

    const result = await subjectRepository.delete(id)

    if (result.length === 0) {
      console.warn(`Subject with ID ${id} not found`)
      return res.status(404).json({ error: 'Subject not found' })
    }

    console.log(`Subject with ID ${id} deleted successfully`)
    res.json({ message: 'Subject deleted successfully' })
  } catch (error) {
    console.error('Error deleting subject:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
