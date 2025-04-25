import HomeWorkHeader from './HomeworkHeader'
import DefaultHeading from '../shared/DefaultHeading'
import { LAYOUT } from '../utils/constants'
import { HomeWorkGroup } from './HomeworkGroup'
import { useState, useEffect } from 'react'
import { MOCK_DATA } from '../utils/mockData'
import { set } from 'date-fns'

export default function Homework(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [homeworkData, setHomeworkData] = useState<any[]>([])

  const fetchHomework = async (): Promise<void> => {
    try {
      setLoading(true)

      const data = await window.api.fetchData('/api/homework')
      setHomeworkData(data)
    } catch (error) {
      console.log('Error fetching homework:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHomework()
  }, [])

  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Homework" />
      <div className="flex flex-col gap-4 h-full overflow-y-hidden">
        <HomeWorkHeader></HomeWorkHeader>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-400">Loading subjects...</div>
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
              .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())

              .map((homework, index) => (
                <HomeWorkGroup key={index} date={homework.dueDate} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
