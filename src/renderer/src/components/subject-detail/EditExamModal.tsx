import { Exam } from '../../utils/dataAccess'
import { useEffect, useState } from 'react'
import SubjectBadge from '../shared/SubjectBadge'
import { Trash2 } from 'lucide-react'
import ExamForm from '@renderer/components/subject-detail/ExamForm'

interface EditExamModalProps {
  examId: number
  subjectId: number
  onClose: () => void
  onExamUpdated: () => void
  onDeleteExam: (examId: number) => void
}

export default function EditExamModal({
  examId,
  subjectId,
  onClose,
  onExamUpdated,
  onDeleteExam
}: EditExamModalProps): JSX.Element {
  const [exam, setExamDetails] = useState<Exam | null>(null)
  // const [subject, setSubject] = useState<Subject | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // const [isExamOpen, setIsExamOpen] = useState(true)
  const [error, setError] = useState('')

  const fetchDetails = async (): Promise<void> => {
    console.log('Fetching exam details for ID:', examId)
    setIsLoading(true)
    try {
      const response = await window.api.getExamById(examId)
      // const subjectResponse = await window.api.getSubjectById(subjectId)

      console.log('Exam details:', response)

      // setSubject(subjectResponse)

      setExamDetails(response)
    } catch (error) {
      console.error('Error fetching exam details:', error)
      setError('Failed to fetch exam details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = (field: string, value: string): void => {
    try {
      console.log('Field:', field)
      if (field === 'grade') {
        console.log('Grade field updated:', value, exam?.grade)
        setExamDetails((prev) => {
          if (!prev) return prev
          return { ...prev, [field]: Number(value) }
        })
        return
      }
      if (field === 'date') {
        console.log('Date field updated:', value)
        setExamDetails((prev) => {
          if (!prev) return prev
          return { ...prev, [field]: Number(value) }
        })
        console.log(exam)
        return
      }
      setExamDetails((prev) => (prev ? ({ ...prev, [field]: value } as Exam) : null))
    } catch (error) {
      console.error('Error updating subject:', error)
    }
  }

  const handleSave = async (): Promise<void> => {
    try {
      const result = await window.api.updateData(`/api/exams/${examId}`, exam)
      console.log('Update result:', `/api/exams/${examId}`, exam, result)

      if (!result) {
        const freshExam = await window.api.fetchData(`/api/exams/${examId}`)
        setExamDetails(freshExam)
      }

      onClose()
    } catch (error) {
      console.error('Error updating subject:', error)
    } finally {
      onExamUpdated()
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [examId, subjectId])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000075] overflow-hidden"
      onClick={() => onClose()}
    >
      <div className="primary-card shadow-lg rounded-2xl p-10" onClick={(e) => e.stopPropagation()}>
        {error && (
          <div className="bg-red-500 text-white p-4 rounded">
            <p>{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="bg-gray-200 p-4 rounded">
            <p>Loading...</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex">
            <SubjectBadge subjectId={subjectId}></SubjectBadge>
            <h2 className="text-3xl font-bold">Edit Exam</h2>
          </div>
          <div className="ml-30">
            <button
              onClick={() => {
                onDeleteExam(examId)
                onClose()
              }}
              className="flex items-center gap-2 bg-[#7C5556] text-[#F4A6A7] px-4 py-2 rounded-lg hover:bg-[#8c6263] transition-colors"
            >
              <Trash2 size={20} />
              <span className="font-medium">Delete Exam</span>
            </button>
          </div>
        </div>

        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] mt-10">
          <ExamForm examData={exam} onFieldChange={handleUpdate} />
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#283249] hover:bg-[#323e5a] rounded-lg transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#5FA0C2] hover:bg-[#4a8eaf] rounded-lg transition-colors active:border-0 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Exam'}
          </button>
        </div>
      </div>
    </div>
  )
}
