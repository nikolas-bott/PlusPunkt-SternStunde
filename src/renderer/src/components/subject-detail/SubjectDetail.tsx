import { useState, useMemo, useEffect } from 'react'
import { EXAMS } from '../utils/mockData'
import SubjectDetailHeader from './SubjectDetailHeader'
import ExamsSection from './ExamsSection'
import InfoCard from './InfoCard'
import { Subject } from '../../../utils/dataAccess'

interface SubjectDetailProps {
  subjectName: string
  subjectColor: string
  teacher: string
  onClose: () => void
  showGrade?: boolean
  subjectId: number
}

export default function SubjectDetail({
  subjectName,
  subjectColor,
  teacher,
  onClose,
  subjectId
}: SubjectDetailProps): JSX.Element {
  // State for editable fields
  const [editValues, setEditValues] = useState({
    name: subjectName,
    abbreviation: '',
    teacher: teacher,
    email: '',
    room: '',
    category: ''
  })

  // Add state to track saving status
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSubjectDetails = async (): Promise<void> => {
      try {
        setLoading(true)
        const subject: Subject = await window.api.getSubjectById(subjectId)
        console.log('Fetched subject details:', subject)

        setEditValues({
          name: subject.name,
          abbreviation: subject.abbreviation,
          teacher: subject.teacherName || 'No teacher assigned',
          email: subject.teacherEmail || '',
          room: subject.room,
          category: subject.category
        })
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
  }, [subjectId, teacher])

  // Filter exams for the current subject
  const subjectExams = useMemo(() => {
    return EXAMS.filter((exam) => exam.subject.name === subjectName)
  }, [subjectName])

  const handleUpdateField = async (field: string, value: string): Promise<void> => {
    try {
      setIsSaving(true)
      setSaveMessage('')

      // Update the local state first for immediate feedback
      setEditValues((prev) => ({ ...prev, [field]: value }))

      // Prepare data for API
      const updateData: Partial<Subject> = {}

      // Map the field names to the database schema fields
      switch (field) {
        case 'name':
          updateData.name = value
          break
        case 'abbreviation':
          updateData.abbreviation = value
          break
        case 'room':
          updateData.room = value
          break
        case 'category':
          updateData.category = value
          break
        case 'teacher':
          updateData.teacherName = value
          break
        case 'email':
          updateData.teacherEmail = value
          break
        default:
          console.warn(`Field ${field} not mapped to database schema`)
          break
      }

      if (Object.keys(updateData).length > 0) {
        // Send update to the server
        const result = await window.api.updateData(`/api/subjects/${subjectId}`, updateData)

        if (result) {
          setSaveMessage('Changes saved successfully')
        } else {
          setSaveMessage('Failed to save changes')
          // Revert the local state if the API call fails
          const subject = await window.api.fetchData(`/api/subjects/${subjectId}`)
          setEditValues((prev) => {
            // Map the field back from database to UI
            if (field === 'teacher') {
              return { ...prev, teacher: subject.teacherName || '' }
            } else if (field === 'email') {
              return { ...prev, email: subject.teacherEmail || '' }
            } else {
              return { ...prev, [field]: subject[field] }
            }
          })
        }
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
          <div className="h-full rounded-3xl" style={{ backgroundColor: subjectColor }}></div>
        </div>
        <div className="p-6 flex flex-col w-full overflow-hidden">
          <SubjectDetailHeader
            title={editValues.name}
            abbreviation={editValues.abbreviation}
            color={subjectColor}
            subjectId={subjectId}
            onBack={() => onClose()}
            onDelete={handleDeleteSubject}
          />

          {saveMessage && (
            <div
              className={`text-sm ${saveMessage.includes('Failed') || saveMessage.includes('Error') ? 'text-red-500' : 'text-green-500'} mb-2`}
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
                    value={editValues.name}
                    onSave={handleUpdateField}
                    heading1="Abbreviation / Color"
                    field1="abbreviation"
                    value1={editValues.abbreviation}
                    isLoading={isSaving}
                  ></InfoCard>
                  <InfoCard
                    heading="Teacher / Prof"
                    field="teacher"
                    value={editValues.teacher}
                    onSave={handleUpdateField}
                    heading1="Email"
                    field1="email"
                    value1={editValues.email}
                    type1="email"
                    isLoading={isSaving}
                  ></InfoCard>
                  <InfoCard
                    heading="Room"
                    field="room"
                    value={editValues.room}
                    onSave={handleUpdateField}
                    isLoading={isSaving}
                  ></InfoCard>
                  <InfoCard
                    heading="Category"
                    field="category"
                    value={editValues.category}
                    onSave={handleUpdateField}
                    isLoading={isSaving}
                  ></InfoCard>
                </>
              )}
            </div>
            <div className="overflow-hidden flex flex-col">
              <ExamsSection exams={subjectExams} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
