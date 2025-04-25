import HomeworkItem from './HomeworkItem'
import { formatDate, dateAsText } from '../utils/helperMethod'
import { useState, useEffect } from 'react'

// Move interfaces outside of component for cleaner code
interface Subject {
  name: string
  color: string
  teacher: string
}

interface HomeworkItem {
  id: string | number
  title: string
  subject: Subject
  dueDate: string
  hoursAWeek: number
}

interface HomeworkGroupProps {
  date: Date
}

export function HomeWorkGroup({ date }: HomeworkGroupProps): JSX.Element {
  const [homeworkData, setHomeworkData] = useState<HomeworkItem[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHomework = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      const data = await window.api.fetchData('/api/homework')

      // Validate and type the data
      if (Array.isArray(data)) {
        setHomeworkData(data as HomeworkItem[])
      } else {
        throw new Error('Invalid data format received')
      }
    } catch (error) {
      console.error('Error fetching homework:', error)
      setError('Failed to load homework data')
      // Set empty array to prevent further errors
      setHomeworkData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHomework()
  }, [])

  const getOpenHomeworkForDate = (date: Date): Array<HomeworkItem> => {
    if (!date || !Array.isArray(homeworkData)) return []

    const openHomework = homeworkData.filter((homework: HomeworkItem) => {
      try {
        if (!homework.dueDate) return false

        const homeworkDate = new Date(Date.parse(homework.dueDate))

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
          {openHomeworkItems.map((homework) => (
            <HomeworkItem
              key={homework.id}
              subjectColor={homework.subject?.color || '#ccc'}
              content={homework.title || 'No title'}
              subjectName={homework.subject?.name || 'Unknown Subject'}
              teacher={homework.subject?.teacher || 'Unknown Teacher'}
              hoursAWeek={homework.hoursAWeek || 0}
              date={new Date(homework.dueDate)}
            />
          ))}
        </div>
      ) : (
        !isLoading && !error && <h2 className="text-3xl text-gray-400 font-bold">No homework</h2>
      )}
    </div>
  )
}
