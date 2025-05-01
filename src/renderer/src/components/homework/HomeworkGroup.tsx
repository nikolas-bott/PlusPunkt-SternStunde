import HomeworkItem from './HomeworkItem'
import { formatDate, dateAsText } from '../utils/helperMethod'
import { useState, useEffect } from 'react'
import { Homework as HomeworkInterface, Subject } from '../../../utils/dataAccess'

interface HomeworkGroupProps {
  date: Date
  refreshTrigger?: number
}

export function HomeWorkGroup({ date, refreshTrigger = 0 }: HomeworkGroupProps): JSX.Element {
  const [homeworkData, setHomeworkData] = useState<HomeworkInterface[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      const [homeworkItems, subjectItems] = await Promise.all([
        window.api.getAllHomework(),
        window.api.getAllSubjects()
      ])

      setHomeworkData(homeworkItems)
      setSubjects(subjectItems)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to load homework data')
      // Set empty array to prevent further errors
      setHomeworkData([])
      setSubjects([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch data initially and when refreshTrigger changes
  useEffect(() => {
    fetchData()
  }, [refreshTrigger])

  // Helper function to find subject details for a given subjectId
  const getSubjectDetails = (subjectId: number) => {
    const subject = subjects.find((s) => s.id === subjectId)
    return {
      name: subject?.name || 'Unknown Subject',
      color: subject?.color || '#ccc',
      teacherName: subject?.teacherName || 'Unknown Teacher'
    }
  }

  const getOpenHomeworkForDate = (date: Date): Array<HomeworkInterface> => {
    if (!date || !Array.isArray(homeworkData)) return []

    const openHomework = homeworkData.filter((homework: HomeworkInterface) => {
      try {
        if (!homework.dueDate) return false

        // Create a Date object from the timestamp
        const homeworkDate = new Date(homework.dueDate)

        return (
          homeworkDate.getDate() === date.getDate() &&
          homeworkDate.getMonth() === date.getMonth() &&
          homeworkDate.getFullYear() === date.getFullYear()
        )
      } catch (e) {
        console.error('Error parsing homework date', e)
        return false
      }
    })
    return openHomework
  }

  const openHomeworkItems = getOpenHomeworkForDate(date)
  const formattedDate =
    date instanceof Date && !isNaN(date.getTime())
      ? `${formatDate(date)} - ${dateAsText(date)} | ${openHomeworkItems.length} open`
      : 'Invalid date'

  return (
    <div className="pl-10 pr-80 mt-8">
      <h2 className="text-5xl text-gray-400 font-semibold">{formattedDate}</h2>

      {isLoading && <p className="text-3xl text-gray-400">Loading homework...</p>}

      {error && <p className="text-3xl text-red-500">{error}</p>}

      {!isLoading && !error && openHomeworkItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-10 mt-10 mb-10">
          {openHomeworkItems.map((homework) => {
            const subjectDetails = getSubjectDetails(homework.subjectId)
            return (
              <HomeworkItem
                key={homework.id}
                subjectColor={subjectDetails.color}
                content={homework.title || 'No title'}
                subjectName={subjectDetails.name}
                teacher={subjectDetails.teacherName}
                hoursAWeek={0} // This field might not be in your database schema
                date={new Date(homework.dueDate)}
              />
            )
          })}
        </div>
      ) : (
        !isLoading && !error && <h2 className="text-3xl text-gray-400 font-bold">No homework</h2>
      )}
    </div>
  )
}
