import HomeWorkHeader from './HomeworkHeader'
import DefaultHeading from '../shared/DefaultHeading'
import { LAYOUT } from '../utils/constants'
import { HomeWorkGroup } from './HomeworkGroup'
import { useState, useEffect, useCallback } from 'react'
import { Homework as HomeworkInterface } from '../../../utils/dataAccess'

export default function Homework(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [homeworkData, setHomeworkData] = useState<HomeworkInterface[]>([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [wasCalled, setWasCalled] = useState(false)

  const fetchHomework = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
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
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const handleHomeworkAdded = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1)
    fetchHomework()
  }, [fetchHomework])

  const getUniqueDates = (homework: HomeworkInterface[]): Date[] => {
    const uniqueDates = new Set<Date>()
    let prevDate = new Date(0)

    homework.forEach((item) => {
      const date = new Date(item.dueDate)
      if (isSameDay(date, prevDate)) return

      uniqueDates.add(date)
      prevDate = date
    })
    console.log('uniqueDates', uniqueDates)
    return Array.from(uniqueDates)
  }

  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Homework" />
      <div className="flex flex-col gap-4 h-full overflow-y-hidden">
        <HomeWorkHeader onHomeworkAdded={handleHomeworkAdded} />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-400">Loading homework...</div>
          </div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar pl-5">
            {getUniqueDates(homeworkData)
              .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
              .map((date, index) => (
                <HomeWorkGroup key={index} date={new Date(date)} refreshTrigger={refreshTrigger} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
