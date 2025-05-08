import SubjectInstance from '../SubjectInstance'
import { BookMarked, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { Homework as HomeworkInterface } from '../../../utils/dataAccess'
import NoData from '../../shared/NoData'

export default function HomeworkCard(): JSX.Element {
  const [isLoading, setLoading] = useState(false)
  const [homeworkData, setHomeworkData] = useState<HomeworkInterface[]>([])

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
  }, [])

  return (
    <div className="primary-card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-400">Loading homework...</div>
          </div>
        )}
        <div className="card-title">
          <BookMarked className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
          <h1>Homework</h1>
        </div>
        <div className="flex flex-col gap-4 max-h-[31vh] flex-grow pl-3 transition-transform duration-300 group-hover:translate-x-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {homeworkData.length === 0 ? (
            <NoData></NoData>
          ) : (
            homeworkData
              .filter((homework) => homework.status === 'open')
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 8)
              .map((homework) => (
                <SubjectInstance
                  key={homework.id}
                  subjectId={homework.subjectId}
                  content={homework.title}
                  date={new Date(homework.dueDate)}
                />
              ))
          )}
        </div>
        <button
          className="self-end mt-5 bg-[#283249] hover:bg-[#3a4c75] px-4 py-2 rounded-lg
            hover:text-yellow-200 hover:translate-x-0.5 transition-all duration-300 flex items-center gap-2"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
