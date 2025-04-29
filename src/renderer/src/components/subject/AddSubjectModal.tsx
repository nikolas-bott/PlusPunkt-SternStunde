import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import InfoCard from '../subject-detail/InfoCard'

interface AddSubjectModalProps {
  onClose: () => void
  onSubjectAdded?: () => void
}

export default function AddSubjectModal({
  onClose,
  onSubjectAdded
}: AddSubjectModalProps): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    teacherName: '',
    teacherEmail: '',
    room: '',
    category: 'Grundkurs',
    color: '#5FA0C2'
  })

  const handleSave = (field: string, value: string): void => {
    if (field === 'teacher') {
      setFormData((prev) => ({ ...prev, teacherName: value }))
    } else if (field === 'email') {
      setFormData((prev) => ({ ...prev, teacherEmail: value }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const teacherCardRef = useRef<HTMLDivElement>(null)
  const roomCardRef = useRef<HTMLDivElement>(null)
  const categoryCardRef = useRef<HTMLDivElement>(null)
  
  const handleSubmit = async (): Promise<void> => {
    if (!formData.name || !formData.abbreviation || !formData.room) {
      setError('Subject name, room and abbreviation are required')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Convert data to match schema - teacher name & email are now stored directly in the subject
      const subjectData = {
        name: formData.name,
        abbreviation: formData.abbreviation,
        room: formData.room,
        category: formData.category,
        color: formData.color,
        teacherName: formData.teacherName || null,
        teacherEmail: formData.teacherEmail || null
      }

      console.log('Saving subject:', subjectData)

      const result = await window.api.postData('/api/subjects', subjectData)
      console.log('Subject saved:', result)

      if (onSubjectAdded) {
        onSubjectAdded()
      }

      onClose()
    } catch (err) {
      console.error('Failed to save subject:', err)
      setError('Failed to save subject. Please try again.')
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

  // Functions to focus each card's first editable field
  const focusTeacherCard = () => {
    if (teacherCardRef.current) {
      const editableDiv = teacherCardRef.current.querySelector('div.flex-grow')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click()
      }
    }
  }

  const focusRoomCard = () => {
    if (roomCardRef.current) {
      const editableDiv = roomCardRef.current.querySelector('div.flex-grow')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click()
      }
    }
  }

  const focusCategoryCard = () => {
    if (categoryCardRef.current) {
      const editableDiv = categoryCardRef.current.querySelector('div.flex-grow')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click()
      }
    }
  }

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
          <h2 className="text-3xl font-bold">Add New Subject</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#283249] rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-6 mb-8">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <input
                color={formData.color}
                type="color"
                value={formData.color}
                onChange={(e) => handleSave('color', e.target.value)}
                className="h-10 w-10 rounded-full cursor-pointer border-0 active:"
              />
              <p className="text-gray-300">{formData.color}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] ">
          <InfoCard
            heading="Subject name"
            field="name"
            value={formData.name}
            onSave={handleSave}
            heading1="Abbreviation / Color"
            field1="abbreviation"
            value1={formData.abbreviation || '—'}
            autoFocus={true}
            onFieldSubmit={focusTeacherCard}
            length1={4}
          />
          <div ref={teacherCardRef}>
            <InfoCard
              heading="Teacher / Prof"
              field="teacher"
              value={formData.teacherName}
              onSave={handleSave}
              heading1="Email"
              field1="email"
              value1={formData.teacherEmail || ''}
              type1="email"
              onFieldSubmit={focusRoomCard}
            />
          </div>
          <div ref={roomCardRef}>
            <InfoCard
              heading="Room"
              field="room"
              value={formData.room}
              onSave={handleSave}
              onFieldSubmit={focusCategoryCard}
            />
          </div>
          <div ref={categoryCardRef}>
            <InfoCard
              heading="Category"
              field="category"
              value={formData.category}
              onSave={handleSave}
            />
          </div>
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
            {isLoading ? 'Saving...' : 'Add Subject'}
          </button>
        </div>
      </div>
    </div>
  )
}
