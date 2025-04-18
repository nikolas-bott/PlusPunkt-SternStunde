import { useState } from 'react'
import { Pencil, Save } from 'lucide-react'

interface EditableFieldProps {
  label: string
  field: string
  value: string
  type?: string
  onSave: (field: string, value: string) => void
}

export default function EditableField({
  label,
  field,
  value,
  type = 'text',
  onSave
}: EditableFieldProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)

  const toggleEditMode = (): void => {
    setIsEditing((prev) => !prev)
  }

  const handleInputChange = (value: string): void => {
    setEditedValue(value)
  }

  const handleSave = (): void => {
    onSave(field, editedValue)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#42485f] last:border-0">
      <div className="flex-grow">
        <div className="text-xl font-bold text-gray-400">{label}</div>
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              type={type}
              value={editedValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="bg-transparent w-full px-0 py-1 text-white font-bold text-3xl focus:outline-none border-b border-[#5FA0C2]"
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
              }}
            />
          ) : (
            <div
              className="font-bold text-3xl cursor-pointer hover:text-[#5FA0C2] transition-colors"
              onClick={toggleEditMode}
            >
              {value}
            </div>
          )}
          <button
            onClick={() => (isEditing ? handleSave() : toggleEditMode())}
            className="p-1 hover:bg-[#283249] rounded transition-colors cursor-pointer"
            title={isEditing ? 'Save' : 'Edit'}
          >
            {isEditing ? <Save size={16} /> : <Pencil size={16} className="hover:text-[#5FA0C2]" />}
          </button>
        </div>
      </div>
    </div>
  )
}
