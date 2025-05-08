import { useState, useEffect } from 'react'
import { useCalendar, CalendarEvent, FREE_PERIOD } from '@renderer/context/CalendarContext'
import { SUBJECTS } from '@renderer/components/utils/mockData'
import { X, Trash2 } from 'lucide-react'

interface EventFormProps {
  onClose: () => void
  selectedDate?: Date
  eventToEdit?: CalendarEvent
}

export default function EventForm({
  onClose,
  selectedDate,
  eventToEdit
}: EventFormProps): JSX.Element {
  const { addEvent, updateEvent, deleteEvent } = useCalendar()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate ? selectedDate : new Date(),
    startTime: '09:00',
    endTime: '10:00',
    color: '#5FA0C2',
    subject: '',
    repeatWeekly: false
  })

  const [isEditing, setIsEditing] = useState(false)

  // Initialize form with event data when editing
  useEffect(() => {
    if (selectedDate && !eventToEdit) {
      setFormData((prev) => ({ ...prev, date: selectedDate }))
    }

    if (eventToEdit) {
      setIsEditing(true)
      setFormData({
        title: eventToEdit.title || '',
        description: eventToEdit.description || '',
        date: eventToEdit.date || selectedDate || new Date(),
        startTime: eventToEdit.startTime || '09:00',
        endTime: eventToEdit.endTime || '10:00',
        color: eventToEdit.color || '#5FA0C2',
        subject: eventToEdit.subject?.name || '',
        repeatWeekly: eventToEdit.repeatWeekly || false
      })
    }
  }, [selectedDate, eventToEdit])

  // Handle all form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target
    const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: updatedValue }))

    // If subject is selected, update the color
    if (name === 'subject' && value) {
      if (value === 'Free Period') {
        setFormData((prev) => ({ ...prev, color: FREE_PERIOD.color }))
      } else {
        const subject = Object.values(SUBJECTS).find((s) => s.name === value)
        if (subject) {
          setFormData((prev) => ({ ...prev, color: subject.color }))
        }
      }
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let subject = undefined
    if (formData.subject) {
      if (formData.subject === 'Free Period') {
        subject = {
          name: FREE_PERIOD.name,
          color: FREE_PERIOD.color
        }
      } else {
        const subjectData = Object.values(SUBJECTS).find((s) => s.name === formData.subject)
        if (subjectData) {
          subject = {
            name: subjectData.name,
            color: subjectData.color,
            teacher: subjectData.teacher
          }
        }
      }
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      color: formData.color,
      subject,
      repeatWeekly: formData.repeatWeekly
    }

    if (isEditing && eventToEdit) {
      // Update existing event
      updateEvent(eventToEdit.id, eventData)
    } else {
      // Add new event
      addEvent(eventData)
    }

    onClose()
  }

  // Handle event deletion
  const handleDeleteEvent = () => {
    if (eventToEdit) {
      deleteEvent(eventToEdit.id)
      onClose()
    }
  }

  // Format date for input field
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="primary-card w-[500px] p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Class' : 'Add New Class'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="tertiary-card w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#5FA0C2]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="tertiary-card w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#5FA0C2]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formatDateForInput(formData.date as Date)}
                onChange={(e) => {
                  const newDate = e.target.value ? new Date(e.target.value) : new Date()
                  setFormData((prev) => ({ ...prev, date: newDate }))
                }}
                className="tertiary-card w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#5FA0C2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="tertiary-card w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#5FA0C2]"
              >
                <option value="">Select Subject</option>
                {Object.values(SUBJECTS).map((subject) => (
                  <option key={subject.name} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
                <option value="Free Period">Free Period</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="tertiary-card w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#5FA0C2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="tertiary-card w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#5FA0C2]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="repeatWeekly"
              id="repeatWeekly"
              checked={formData.repeatWeekly}
              onChange={handleChange}
              className="h-4 w-4 rounded text-[#5FA0C2] focus:ring-[#5FA0C2]"
            />
            <label htmlFor="repeatWeekly" className="text-sm font-medium text-gray-300">
              Repeat weekly (for timetable)
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="h-8 w-8 rounded cursor-pointer bg-transparent border-none"
              />
              <span className="text-sm text-gray-400">Class color</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDeleteEvent}
                className="flex items-center secondary-card px-4 py-2 hover:bg-[#42485f] text-red-300 transition-colors"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="secondary-card px-4 py-2 hover:bg-[#42485f] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5FA0C2] text-white px-4 py-2 rounded-md hover:bg-[#4a8eaf] transition-colors"
            >
              {isEditing ? 'Update' : 'Add Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
