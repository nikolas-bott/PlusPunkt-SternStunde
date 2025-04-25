import { sub } from 'date-fns'
import { useState } from 'react'

interface SubjectWithDetails {
  id: number
  name: string
  color: string
  teacher: string
  abbreviation: string
  average: number | null
  development: 'up' | 'down' | null
  hoursAWeek: number
}

export const fetchSubjects = async (): Promise<SubjectWithDetails[]> => {
  try {
    const data = await window.api.fetchData('/api/subjects')

    // Create an array to store subjects with their statistics
    const subjectsWithDetails: SubjectWithDetails[] = []

    // For each subject, fetch its statistics
    for (const subject of data) {
      try {
        const stats = await window.api.fetchData(`/api/subjects/${subject.id}/statistics`)

        // Determine development trend based on recent exams (could be improved with actual data)
        // This is just a placeholder logic - in a real app, you'd have more sophisticated trend detection
        let development: 'up' | 'down' | null = null
        if (stats.totalExams > 1) {
          development = Math.random() > 0.5 ? 'up' : 'down' // Placeholder until we have actual trend data
        }

        subjectsWithDetails.push({
          id: subject.id,
          name: subject.name,
          color: subject.color,
          teacher: subject.teacherName || 'No teacher assigned',
          abbreviation: subject.abbreviation,
          average: stats.averageGrade,
          development,
          hoursAWeek: 2 // Placeholder - this should come from a schedule in a real app
        })
      } catch (err) {
        console.error(`Failed to fetch statistics for subject ${subject.id}:`, err)
      }
    }

    return subjectsWithDetails
  } catch (err) {
    console.error('Failed to fetch subjects:', err)
    throw new Error('Failed to load subjects')
  }
}

interface HomeWorkSchema {
  id: number
  title: string
  description: string
  dueDate: string
  status: 'open' | 'done'
  subjectId: number
}

export const fetchHomework = async (): Promise<HomeWorkSchema[]> => {
  try {
    const data = await window.api.fetchData('/api/homework')

    // Create an array to store subjects with their statistics
    const homeworks: HomeWorkSchema[] = []

    // For each subject, fetch its statistics
    for (const homework of data) {
      try {
        homework.push({
          id: homework.id,
          title: homework.name,
          description: homework.description,
          dueDate: homework.dueDate,
          status: homework.status,
          subjectId: homework.subjectId
        })
      } catch (err) {
        console.error(`Failed to fetch statistics for subject ${homework.id}:`, err)
      }
    }

    return homeworks
  } catch (err) {
    console.error('Failed to fetch subjects:', err)
    throw new Error('Failed to load subjects')
  }
}
