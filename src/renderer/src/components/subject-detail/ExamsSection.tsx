import TimeRangeBadge from '../shared/TimeRangeBadge'
import AddExamModal from './AddExamModal'
import { useEffect, useState } from 'react'
import { Exam } from '../../utils/dataAccess'
import { format } from 'date-fns'
import EditExamModal from './EditExamModal'
import dayjs from 'dayjs'

interface ExamsSectionProps {
  subjectId: number
}
export default function ExamsSection({ subjectId }: ExamsSectionProps): JSX.Element {
  const [exams, setExams] = useState<Exam[]>([])
  const [error, setError] = useState('')
  const [isEditingExam, setIsEditingExam] = useState(false)
  const [editExamId, setEditExamId] = useState<number | null>(null)

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

  const handleCloseModal = (): void => {
    setIsExamModalOpen(false)
  }

  const examUpdated = (): void => {
    console.log('Exam updated')
    setExamsBySubjectId(subjectId)
    setIsEditingExam(false)
  }

  const handleExamAdded = (): void => {
    setExamsBySubjectId(subjectId)
    setIsExamModalOpen(false)
  }

  const handleDeleteExam = async (examId: number): Promise<void> => {
    try {
      const confirmation = window.confirm(
        'Are you sure you want to delete this exam? This action cannot be undone.'
      )
      if (!confirmation) return

      const result = await window.api.deleteData(`/api/exams/${examId}`)

      if (result) {
        setExams((prevExams) => prevExams.filter((exam) => exam.id !== examId))
      } else {
        setError('Failed to delete exam')
      }
    } catch (error) {
      console.error('Error deleting exam:', error)
      setError('Failed to delete exam')
    }
  }

  return (
    <div className="secondary-card p-4 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <h2 className="text-xl font-bold">Grades/Exams</h2>
        <div className="flex gap-2">
          <button className="text-sm bg-[#5FA0C2] text-white px-4 py-2 rounded-lg hover:bg-[#4a8eaf] transition-colors">
            Statistics
          </button>
          <button
            className="text-sm bg-[#5FA0C2] text-white px-4 py-2 rounded-lg hover:bg-[#4a8eaf] transition-colors"
            onClick={() => setIsExamModalOpen(true)}
          >
            + Add Grade
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
              <div
                key={exam.id}
                className="tertiary-card p-4 hover:bg-[#323e5a] transition-colors"
                onClick={() => {
                  setIsEditingExam(true)
                  setEditExamId(exam.id)
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{exam.title}</h3>
                    <p className="text-gray-400">{format(exam.date, 'dd/MM/yyyy')}</p>
                  </div>
                  <div className="flex">
                    <TimeRangeBadge startDate={exam.type} state="pos" />
                    <div
                      onClick={(e) => {
                        handleDeleteExam(exam.id)
                        e.stopPropagation()
                      }}
                      className="cursor-pointer"
                    >
                      <TimeRangeBadge startDate={'Delete'} state="neg" />
                    </div>
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
              <div
                key={exam.id}
                className="tertiary-card p-4 hover:bg-[#323e5a] transition-colors"
                onClick={() => {
                  setEditExamId(exam.id)
                  setIsEditingExam(true)
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{exam.title}</h3>
                    <p className="text-gray-400">{format(exam.date, 'dd/MM/yyyy')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">{exam.grade}P</span>
                    <div className="flex">
                      <TimeRangeBadge startDate={exam.type} state="pos" />
                      <div
                        onClick={(e) => {
                          handleDeleteExam(exam.id)
                          e.stopPropagation()
                        }}
                        className="cursor-pointer"
                      >
                        <TimeRangeBadge startDate={'Delete'} state="neg" />
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isEditingExam && (
        <EditExamModal
          examId={editExamId!}
          subjectId={subjectId}
          onClose={() => setIsEditingExam(false)}
          onExamUpdated={() => examUpdated()}
          onDeleteExam={handleDeleteExam}
        />
      )}
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
