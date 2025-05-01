import { useState, useMemo, useEffect } from 'react'
import { EXAMS } from '../utils/mockData'
import SubjectDetailHeader from './SubjectDetailHeader'
import ExamsSection from './ExamsSection'
import InfoCard from './InfoCard'
import { Subject } from '../../utils/dataAccess'

interface SubjectDetailProps {
  onClose: () => void
  showGrade?: boolean
  subjectId: number
}

export default function SubjectDetail({ onClose, subjectId }: SubjectDetailProps): JSX.Element {
  // State for editable fields

  const [subjectById, setSubjectById] = useState<Subject | null>({
    id: subjectId,
    name: '',
    abbreviation: '',
    teacherName: '',
    teacherEmail: '',
    room: '',
    category: 'Grundkurs',
    color: '#5FA0C2'
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSubjectDetails = async (): Promise<void> => {
      try {
        setLoading(true)
        const subject: Subject | null = await window.api.getSubjectById(subjectId)
        console.log('Fetched subject details:', subject)

        if (!subject) {
          setError('Subject not found')
          return
        }
        setSubjectById(subject)
        setError('')
      } catch (err) {
        console.error('Failed to fetch subject details:', err)
        setError('Failed to load subject details')
      } finally {
        setLoading(false)
      }
    }

    if (subjectId) {
      fetchSubjectDetails()
    }
  }, [subjectId])

  // Filter exams for the current subject
  const subjectExams = useMemo(() => {
    return EXAMS.filter((exam) => exam.subject.name === subjectById?.name)
  }, [subjectById])

  const handleUpdateField = async (field: string, value: string): Promise<void> => {
    try {
      setIsSaving(true)
      setSaveMessage('')

      setSubjectById((prev) => (prev ? ({ ...prev, [field]: value } as Subject) : null))

      const dbField =
        field === 'teacher' ? 'teacherName' : field === 'email' ? 'teacherEmail' : field

      const updateData = { [dbField]: value }

      const result = await window.api.updateData(`/api/subjects/${subjectId}`, updateData)

      if (result) {
        setSaveMessage('Changes saved successfully')
      } else {
        setSaveMessage('Failed to save changes')
        // Fetch fresh data to restore correct state
        const freshSubject = await window.api.fetchData(`/api/subjects/${subjectId}`)
        setSubjectById(freshSubject)
      }
    } catch (error) {
      console.error('Error updating subject:', error)
      setSaveMessage('Error saving changes')
    } finally {
      setIsSaving(false)
      // Clear the message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleDeleteSubject = async (): Promise<void> => {
    try {
      // Confirm deletion
      const confirmation = window.confirm(
        'Are you sure you want to delete this subject? This action cannot be undone.'
      )

      if (!confirmation) return

      const result = await window.api.deleteData(`/api/subjects/${subjectId}`)

      if (result) {
        onClose() // Close the detail view after successful deletion
      } else {
        console.error('Failed to delete subject')
        alert('Failed to delete subject. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting subject:', error)
      alert('An error occurred while deleting the subject.')
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
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000085] overflow-hidden"
      onClick={() => onClose()}
    >
      <div
        className="xl:w-7xl lg:w-5xl flex overflow-hidden primary-card h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-full">
          <div className="h-full rounded-3xl" style={{ backgroundColor: subjectById?.color }}></div>
        </div>
        <div className="p-6 flex flex-col w-full overflow-hidden">
          <SubjectDetailHeader
            title={subjectById?.name || ''}
            abbreviation={subjectById?.abbreviation || ''}
            color={subjectById?.color || ''}
            subjectId={subjectId}
            onBack={() => onClose()}
            onDelete={handleDeleteSubject}
          />
          {saveMessage && (
            <div
              className={`text-sm font-semibold pl-3 ${saveMessage.includes('Failed') || saveMessage.includes('Error') ? 'text-red-500' : 'text-green-500'} mb-2`}
            >
              {saveMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden h-[calc(100%-120px)]">
            <div className="space-y-6 overflow-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-lg text-gray-400">Loading subject details...</div>
                </div>
              ) : (
                <>
                  <InfoCard
                    heading="Subject name"
                    field="name"
                    value={subjectById?.name || ''}
                    onSave={handleUpdateField}
                    heading1="Abbreviation / Color"
                    field1="abbreviation"
                    value1={subjectById?.abbreviation}
                    isLoading={isSaving}
                  ></InfoCard>
                  <InfoCard
                    heading="Teacher / Prof"
                    field="teacher"
                    value={subjectById?.teacherName || ''}
                    onSave={handleUpdateField}
                    heading1="Email"
                    field1="email"
                    value1={subjectById?.teacherEmail || ''}
                    type1="email"
                    isLoading={isSaving}
                  ></InfoCard>
                  <InfoCard
                    heading="Room"
                    field="room"
                    value={subjectById?.room || ''}
                    onSave={handleUpdateField}
                    isLoading={isSaving}
                  ></InfoCard>
                  <InfoCard
                    heading="Category"
                    field="category"
                    value={subjectById?.category || ''}
                    onSave={handleUpdateField}
                    isLoading={isSaving}
                  ></InfoCard>
                </>
              )}
            </div>
            <div className="overflow-hidden flex flex-col">
              <ExamsSection subjectId={subjectId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
