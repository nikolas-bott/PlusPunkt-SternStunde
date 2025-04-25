import { X } from 'lucide-react'
import InfoCard from '../subject-detail/InfoCard'
import { useState } from 'react'

interface HomeworkModalProps {
  onClose: () => void
  onHomeworkAdded: () => void
}

export default function HomeworkModal({
  onClose,
  onHomeworkAdded
}: HomeworkModalProps): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000075] overflow-hidden"
      onClick={() => onClose()}
    >
      <div
        className="primary-card w-[800px] h-[60vh] overflow-hidden p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Add New Homework</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#283249] rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] ">
          <InfoCard
            heading="Title"
            field="title"
            value={'temp'}
            onSave={handleSave}
            heading1="Abbreviation / Color"
            field1="abbreviation"
            value1={'—'}
            autoFocus={true}
            onFieldSubmit={() => {
              console.log('Submit')
            }}
          />
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#283249] hover:bg-[#323e5a] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onHomeworkAdded()}
            className="px-6 py-3 bg-[#5FA0C2] hover:bg-[#4a8eaf] rounded-lg transition-colors active:border-0 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
