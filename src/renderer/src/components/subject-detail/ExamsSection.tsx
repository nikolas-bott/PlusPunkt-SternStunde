import TimeRangeBadge from '../shared/TimeRangeBadge'
import AddExamModal from './AddExamModal'
import { useEffect, useState } from 'react'
import { Exam } from '../../utils/dataAccess'
import { format } from 'date-fns'

interface ExamsSectionProps {
  subjectId: number
}

export default function ExamsSection({ subjectId }: ExamsSectionProps): JSX.Element {
  const [exams, setExams] = useState<Exam[]>([])
  const [error, setError] = useState('')

  const [isExamModalOpen, setIsExamModalOpen] = useState(false)

  const setExamsBySubjectId = async (subjectId: number): Promise<void> => {
    console.log('Fetching exams for subject ID:', subjectId)
    const response = await window.api.getExamsBySubjectId(subjectId)

    if (response && response.success && response.data) {
      console.log('Exams received:', response.data)
      setExams(response.data)
    } else {
      setError('No exams found')
    }
  }

  useEffect(() => {
    setExamsBySubjectId(subjectId)
  }, [subjectId])

  const handleCloseModal = () => {
    setIsExamModalOpen(false)
  }

  const handleExamAdded = () => {
    setExamsBySubjectId(subjectId)
    setIsExamModalOpen(false)
  }

  return (
    <div className="secondary-card p-4 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Grades/Exams</h2>
        <div className="flex gap-2">
          <button className="text-sm bg-[#5FA0C2] text-white px-4 py-2 rounded-lg hover:bg-[#4a8eaf] transition-colors">
            Statistics
          </button>
          <button
            className="text-sm bg-[#5FA0C2] text-white px-4 py-2 rounded-lg hover:bg-[#4a8eaf] transition-colors"
            onClick={() => setIsExamModalOpen(true)}
          >
            + Add Exam
          </button>
        </div>
      </div>

      <div className="overflow-y-auto custom-scrollbar p-2 flex-grow">
        {/* Coming up section */}
        <div className="mb-5">
          <TimeRangeBadge
            startDate="Coming up..."
            state="neg"
            fontSize="text-xl"
            padding="py-2 px-4"
          />
        </div>

        {/* Upcoming exams */}
        <div className="space-y-3 mb-6">
          {exams
            .filter((exam) => exam.status === 'open')
            .map((exam) => (
              <div key={exam.id} className="tertiary-card p-4 hover:bg-[#323e5a] transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{exam.title}</h3>
                    <p className="text-gray-400">{format(exam.date, 'dd/mm/yyyy')}</p>
                  </div>
                  <div>
                    <TimeRangeBadge startDate={exam.type} state="pos" />
                    <TimeRangeBadge startDate={'Delete'} state="neg" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Done section */}
        <div className="mb-5">
          <TimeRangeBadge startDate="Done" state="pos" fontSize="text-xl" padding="py-2 px-5" />
        </div>

        {/* Completed exams */}
        <div className="space-y-3">
          {exams
            .filter((exam) => exam.status === 'done')
            .map((exam) => (
              <div key={exam.id} className="tertiary-card p-4 hover:bg-[#323e5a] transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{exam.title}</h3>
                    <p className="text-gray-400">{format(exam.date, 'dd/MM/yyyy')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">{exam.grade}P</span>
                    <div>
                      <TimeRangeBadge startDate={exam.type} state="pos" />
                      <TimeRangeBadge startDate={'Delete'} state="neg" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isExamModalOpen && (
        <AddExamModal
          onClose={handleCloseModal}
          sujectId={subjectId}
          onExamAdded={handleExamAdded}
        ></AddExamModal>
      )}
    </div>
  )
}
