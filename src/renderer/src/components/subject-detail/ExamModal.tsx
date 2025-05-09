import { Exam } from '../../utils/dataAccess'
import { useEffect, useState } from 'react'
import SubjectBadge from '../shared/SubjectBadge'
import { Trash2, X } from 'lucide-react'
import ExamForm from '@renderer/components/subject-detail/ExamForm'
import { Spin } from 'antd'
import Loading from '../shared/Loading'

interface EditExamModalProps {
  examId?: number
  subjectId: number
  onClose: () => void
  onExamUpdated: () => void
  onDeleteExam: (examId: number) => void
  isEditingExam: boolean
  onExamAdded?: () => void
}

export default function EditExamModal({
  examId,
  subjectId,
  onClose,
  onExamUpdated,
  onDeleteExam,
  isEditingExam,
  onExamAdded
}: EditExamModalProps): JSX.Element {
  const [exam, setExamDetails] = useState<Exam | null>({
    title: '',
    date: new Date().getTime(),
    status: 'open'
  } as Exam)
  const [isExamOpen, setIsExamOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchDetails = async (): Promise<void> => {
    if (!examId) return
    console.log('Fetching exam details for ID:', examId)
    const loadingTimeout = setTimeout(() => setIsLoading(true), 1000)
    try {
      const response = await window.api.getExamById(examId)

      console.log('Exam details:', response)

      setExamDetails(response)
    } catch (error) {
      console.error('Error fetching exam details:', error)
      setError('Failed to fetch exam details')
    } finally {
      clearTimeout(loadingTimeout)
      setIsLoading(false)
    }
  }

  const handleUpdate = (field: string, value: string): void => {
    try {
      console.log('Field:', field)
      if (field === 'grade') {
        if (!isEditingExam) setIsExamOpen(false)

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

  const handleSubmit = async (): Promise<void> => {
    if (!isEditingExam && (!exam?.title || !exam.date)) {
      console.log('Exam details are incomplete:', exam)
      setError('Exam title and date are required')
      return
    }
    const loadingTimeout = setTimeout(() => setIsLoading(true), 1000)

    try {
      setError('')

      if (isEditingExam) {
        const result = await window.api.updateData(`/api/exams/${examId}`, exam)
        console.log('Update result:', `/api/exams/${examId}`, exam, result)

        if (!result) {
          const freshExam = await window.api.fetchData(`/api/exams/${examId}`)
          setExamDetails(freshExam)
        }
      } else {
        const examToSave = {
          ...exam,
          title: String(exam?.title),
          grade: Number(exam?.grade),
          date: Number(exam?.date),
          subjectId: Number(subjectId),
          status: isExamOpen ? 'open' : 'done',
          type: 'exam'
        }

        console.log('Saving exam:', examToSave)

        const result = await window.api.postData('/api/exams', examToSave)
        console.log('Exam saved:', result)

        if (onExamAdded) {
          onExamAdded()
        }
      }

      onClose()
    } catch (error) {
      console.error('Error updating subject:', error)
    } finally {
      clearTimeout(loadingTimeout)
      setIsLoading(false)
      onExamUpdated()
    }
  }

  useEffect(() => {
    if (isEditingExam) fetchDetails()
  }, [examId, subjectId])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000075] overflow-hidden"
      onClick={() => onClose()}
    >
      <div
        className="primary-card w-[800px] pb-20 pt-10 overflow-hidden p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {error && (
          <div className="bg-red-500 text-white p-4 rounded">
            <p>{error}</p>
          </div>
        )}
        {isLoading && <Loading onClose={() => onClose()}></Loading>}
        <div className="flex items-center justify-between">
          <div className="flex">
            <SubjectBadge subjectId={subjectId}></SubjectBadge>
            <h2 className="text-3xl font-bold">{isEditingExam ? 'Edit Exam' : 'Add Exam'}</h2>
          </div>
          <div className="ml-30">
            <button
              onClick={() => {
                if (isEditingExam && examId) onDeleteExam(examId)
                onClose()
              }}
              className="flex items-center gap-2 bg-[#7C5556] text-[#F4A6A7] px-4 py-2 rounded-lg hover:bg-[#8c6263] transition-colors"
            >
              {isEditingExam ? (
                <>
                  <Trash2 size={20} />
                  <span className="font-medium">Delete Exam</span>{' '}
                </>
              ) : (
                <X size={24} />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] mt-10">
          <ExamForm examData={isEditingExam ? exam : null} onFieldChange={handleUpdate} />
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
            onClick={handleSubmit}
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
