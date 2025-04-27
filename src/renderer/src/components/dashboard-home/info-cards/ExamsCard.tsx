import { FilePenLine } from 'lucide-react'
import { SubjectInstance } from '../SubjectInstance'
import { SUBJECTS } from '@renderer/components/utils/mockData'
import { useState, useEffect, useCallback } from 'react'
import { Exam as ExamsInterface } from '../../../utils/dataAccess'

export default function ExamsCard(): JSX.Element {
  const [isLoading, setLoading] = useState(false)
  const [examsData, setExamsData] = useState<ExamsInterface[]>([])

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      const data = await window.api.getAllExams()
      setExamsData(data)
    } catch (error) {
      console.error('Error fetching exams:', error)
      setExamsData([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="primary-card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <FilePenLine className="w-10 h-10 md:w-14 md:h-14 text-secondary" />
          <h1>Exams</h1>
        </div>
        <div className="flex flex-col gap-4 flex-grow pl-3 justify-evenly">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-400">Loading exams...</div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[15vh] flex-grow pl-3 justify-evenly transition-transform duration-300 group-hover:translate-x-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
              {examsData?.length <= 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-lg text-gray-400">No exams available</div>
                </div>
              ) : (
                examsData
                  ?.filter((exam) => exam.status === 'open')
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 8)
                  .map((exam) => (
                    <SubjectInstance
                      key={exam.id}
                      subjectId={exam.subjectId}
                      content={exam.title}
                      date={new Date(exam.date)}
                    />
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
