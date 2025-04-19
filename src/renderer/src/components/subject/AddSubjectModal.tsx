import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import InfoCard from '../subject-detail/InfoCard'

interface AddSubjectModalProps {
  onClose: () => void
}

export default function AddSubjectModal({ onClose }: AddSubjectModalProps): JSX.Element {
  // State for all form fields
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '???',
    teacher: '',
    email: '???',
    room: '',
    category: 'Grundkurs',
    color: '#5FA0C2'
  })

  const handleSave = (field: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (): void => {
    console.log('Saving subject:', formData)
    onClose()
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
        className="primary-card w-[800px] max-h-[90vh] overflow-hidden p-8 relative"
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
                className="h-16 w-16 rounded-full cursor-pointer border-0 active:"
              />
              <p className="text-gray-300">{formData.color}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar max-h-[40vh]">
          <InfoCard
            heading="Subject name"
            field="name"
            value={formData.name}
            onSave={handleSave}
            heading1="Abbreviation / Color"
            field1="abbreviation"
            value1={formData.abbreviation}
          ></InfoCard>
          <InfoCard
            heading="Teacher / Prof"
            field="teacher"
            value={formData.teacher}
            onSave={handleSave}
            heading1="Email"
            field1="email"
            value1={formData.email}
            type1="email"
          ></InfoCard>
          <InfoCard
            heading="Room"
            field="room"
            value={formData.room}
            onSave={handleSave}
          ></InfoCard>
          <InfoCard
            heading="Category"
            field="category"
            value={formData.category}
            onSave={handleSave}
          ></InfoCard>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#283249] hover:bg-[#323e5a] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#5FA0C2] hover:bg-[#4a8eaf] rounded-lg transition-colors active:border-0"
          >
            Add Subject
          </button>
        </div>
      </div>
    </div>
  )
}
