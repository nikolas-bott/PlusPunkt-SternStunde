import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Exam } from '../../utils/dataAccess'
import ExamForm from './ExamForm'
import { set } from 'date-fns'

interface AddExamModalProps {
  onClose: () => void
  sujectId: number
  onExamAdded?: () => void
}

export default function AddExamModal({
  onClose,
  onExamAdded,
  sujectId
}: AddExamModalProps): JSX.Element {
  const [exam, setExamDetails] = useState<Exam | null>({
    title: '',
    date: new Date().getTime(),
    status: 'open'
  } as Exam)

  const [isExamOpen, setIsExamOpen] = useState(true)

  const handleSave = (field: string, value: string): void => {
    console.log('Field:', field)
    if (field === 'grade') {
      setIsExamOpen(false)
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

    setExamDetails((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
    console.log('Exam details updated:', exam)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (): Promise<void> => {
    if (!exam?.title || !exam.date) {
      console.log('Exam details are incomplete:', exam)
      setError('Exam title and date are required')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Ensure proper data types before sending to API
      const examToSave = {
        ...exam,
        title: String(exam.title),
        grade: Number(exam.grade),
        date: Number(exam.date),
        subjectId: Number(sujectId),
        status: isExamOpen ? 'open' : 'done',
        type: 'exam'
      }

      console.log('Saving exam:', examToSave)

      const result = await window.api.postData('/api/exams', examToSave)
      console.log('Exam saved:', result)

      if (onExamAdded) {
        onExamAdded()
      }

      onClose()
    } catch (err) {
      console.error('Failed to save exam:', err)
      setError('Failed to save exam. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000075] overflow-hidden"
      onClick={() => onClose()}
    >
      <div
        className="primary-card w-[800px] h-[95vh] overflow-hidden p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Add New Exam</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#283249] rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}
        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] mt-10">
          <ExamForm onFieldChange={handleSave} />
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
              {isLoading ? 'Saving...' : 'Add Exam'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
