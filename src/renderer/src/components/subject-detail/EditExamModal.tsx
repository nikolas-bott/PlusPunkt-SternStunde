import { Exam, Subject } from '../../utils/dataAccess'
import { useEffect, useState } from 'react'
import SubjectBadge from '../shared/SubjectBadge'
import { Trash2 } from 'lucide-react'
import InfoCard from './InfoCard'
import { InputNumber } from 'antd'

interface EditExamModalProps {
  examId: number
  subjectId: number
  onClose: () => void
  onExamUpdated: () => void
}

export default function EditExamModal({
  examId,
  subjectId,
  onClose,
  onExamUpdated
}: EditExamModalProps): JSX.Element {
  const [exam, setExamDetails] = useState<Exam | null>(null)
  const [subject, setSubject] = useState<Subject | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchDetails = async (): Promise<void> => {
    console.log('Fetching exam details for ID:', examId)
    try {
      const response = await window.api.getExamById(examId)
      const subjectResponse = await window.api.getSubjectById(subjectId)

      console.log('Exam details:', response)

      setSubject(subjectResponse)

      setExamDetails(response)
    } catch (error) {
      console.error('Error fetching exam details:', error)
      setError('Failed to fetch exam details')
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [examId, subjectId])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000075] overflow-hidden">
      <div className="primary-card shadow-lg p-6 rounded-2xl">
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
        <div className="flex items-center">
          <SubjectBadge subjectId={subjectId}></SubjectBadge>
          <h2 className="text-3xl font-bold">Edit Exam</h2>
          <div className="ml-30">
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-[#7C5556] text-[#F4A6A7] px-4 py-2 rounded-lg hover:bg-[#8c6263] transition-colors"
            >
              <Trash2 size={20} />
              <span className="font-medium">Delete Exam</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <InfoCard
              heading={'title'}
              field={'text'}
              value={'string'}
              onSave={() => console.log('saved')}
              size={'sm'}
            ></InfoCard>
          </div>
          <div className="col-span-1">
            <div className="flex items-center gap-3 py-3 border-b border-[#42485f] h-full w-full rounded-2xl"></div>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onExamUpdated}>
          Save Changes
        </button>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
