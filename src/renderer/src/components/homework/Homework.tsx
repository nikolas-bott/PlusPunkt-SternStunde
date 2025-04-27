import HomeWorkHeader from './HomeworkHeader'
import DefaultHeading from '../shared/DefaultHeading'
import { LAYOUT } from '../utils/constants'
import { HomeWorkGroup } from './HomeworkGroup'
import { useState, useEffect, useCallback } from 'react'
import { Homework as HomeworkInterface } from '../../../utils/dataAccess'

export default function Homework(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [homeworkData, setHomeworkData] = useState<HomeworkInterface[]>([])
  // Added a refresh trigger state to force re-renders when needed
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Convert to useCallback so we can pass this to child components
  const fetchHomework = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      // Use the new direct data access method to get homework
      const data = await window.api.getAllHomework()
      setHomeworkData(data)
    } catch (error) {
      console.error('Error fetching homework:', error)
      setHomeworkData([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHomework()
  }, [fetchHomework, refreshTrigger])

  // Handler to trigger data refresh
  const handleHomeworkAdded = useCallback(() => {
    // Increment refresh trigger to cause effects to re-run
    setRefreshTrigger((prev) => prev + 1)
    fetchHomework()
  }, [fetchHomework])

  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Homework" />
      <div className="flex flex-col gap-4 h-full overflow-y-hidden">
        {/* Pass the refresh handler to HomeworkHeader */}
        <HomeWorkHeader onHomeworkAdded={handleHomeworkAdded} />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-400">Loading homework...</div>
          </div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar pl-5">
            {homeworkData
              .filter(
                (() => {
                  const seenDates = new Set()
                  return (item) => {
                    const dateString = new Date(item.dueDate).toDateString()
                    if (seenDates.has(dateString)) return false
                    seenDates.add(dateString)
                    return true
                  }
                })()
              )
              .sort((a, b) => b.dueDate - a.dueDate)
              .map((homework, index) => (
                <HomeWorkGroup
                  key={`${homework.id}-${refreshTrigger}`}
                  date={new Date(homework.dueDate)}
                  refreshTrigger={refreshTrigger}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
