import { useState, useEffect, useRef } from 'react'
import { Pencil, Save } from 'lucide-react'

interface EditableFieldProps {
  label: string
  field: string
  value: string
  type?: string
  autoFocus?: boolean
  onSave: (field: string, value: string) => void
  onEnterPress?: () => void
}

export default function EditableField({
  label,
  field,
  value,
  type = 'text',
  autoFocus = false,
  onSave,
  onEnterPress
}: EditableFieldProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(autoFocus)
  const [editedValue, setEditedValue] = useState(value)

  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const fieldContainerRef = useRef<HTMLDivElement>(null)

  // Update local state when parent prop changes
  useEffect(() => {
    if (!isEditing) {
      setEditedValue(value)
    }
  }, [value, isEditing])

  // Auto-start editing if autoFocus is true
  useEffect(() => {
    if (autoFocus && !isEditing) {
      setIsEditing(true)
    }
  }, [autoFocus])

  const toggleEditMode = (): void => {
    const newIsEditing = !isEditing
    setIsEditing(newIsEditing)

    // Reset to current value if cancelling edit
    if (!newIsEditing) {
      setEditedValue(value)
    }
  }

  const handleInputChange = (value: string): void => {
    setEditedValue(value)
  }

  const handleSave = (): void => {
    if (editedValue !== value) {
      onSave(field, editedValue)
    }
    setIsEditing(false)
  }

  // Handle blur event properly to not interfere with clicking the save button
  const handleBlur = (e: React.FocusEvent): void => {
    // Only save on blur if we're not clicking the save button
    if (!buttonRef.current?.contains(e.relatedTarget as Node)) {
      handleSave()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSave()
      // If onEnterPress callback exists, call it to move focus to the next field
      if (onEnterPress) {
        e.preventDefault()
        onEnterPress()
      }
    } else if (e.key === 'Escape') {
      setEditedValue(value) // Reset to original value
      setIsEditing(false)
    }
  }

  // Handle click on the entire field area
  const handleFieldClick = (e: React.MouseEvent): void => {
    // Don't trigger if clicking on the button
    if (!buttonRef.current?.contains(e.target as Node)) {
      if (!isEditing) {
        toggleEditMode()
      }
    }
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#42485f] last:border-0">
      <div className="flex-grow" ref={fieldContainerRef} onClick={handleFieldClick}>
        <div className="text-xl font-bold text-gray-400">{label}</div>
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              ref={inputRef}
              type={type}
              value={editedValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="bg-transparent w-full px-0 py-1 text-white font-bold text-3xl focus:outline-none border-b border-[#5FA0C2]"
              autoFocus
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className="font-bold text-3xl cursor-pointer hover:text-[#5FA0C2] transition-colors w-full">
              {value || '—'}
            </div>
          )}
          <button
            ref={buttonRef}
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
