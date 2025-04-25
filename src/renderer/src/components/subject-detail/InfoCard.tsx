import { useRef } from 'react'
import EditableField from '../shared/EditableField'

interface InfoCardProps {
  heading: string
  field: string
  value: string
  type?: string
  heading1?: string
  field1?: string
  value1?: string
  type1?: string
  isLoading?: boolean
  autoFocus?: boolean
  onSave: (field: string, value: string) => void
  onFieldSubmit?: () => void
}

export default function InfoCard({
  heading,
  field,
  value,
  type = 'text',
  heading1,
  field1,
  value1,
  type1 = 'text',
  isLoading = false,
  autoFocus = false,
  onSave,
  onFieldSubmit
}: InfoCardProps): JSX.Element {
  // Create refs for the second field
  const field1Ref = useRef<HTMLDivElement>(null)

  // Function to focus and trigger edit mode on the second field
  const focusField1 = (): void => {
    if (field1Ref.current) {
      // Find the div element that triggers edit mode in the second field
      const editableDiv = field1Ref.current.querySelector('div.text-3xl')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click() // Programmatically click to trigger edit mode
      }
    }
  }

  // Function to handle navigation after first field is completed
  const handleFirstFieldComplete = (): void => {
    if (heading1 && field1 && value1) {
      // If there's a second field in this card, move to it
      focusField1()
    } else if (onFieldSubmit) {
      // If no second field but we have onFieldSubmit, move to the next card
      onFieldSubmit()
    }
  }

  // Function to handle navigation after second field is completed
  const handleSecondFieldComplete = (): void => {
    if (onFieldSubmit) {
      onFieldSubmit()
    }
  }

  return (
    <div className="secondary-card p-4">
      {isLoading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="divide-y divide-[#42485f]">
          <EditableField
            label={heading}
            field={field}
            value={value}
            onSave={onSave}
            type={type}
            autoFocus={autoFocus}
            onEnterPress={handleFirstFieldComplete}
          />
          {heading1 && field1 && value1 ? (
            <div ref={field1Ref}>
              <EditableField
                label={heading1}
                field={field1}
                value={value1}
                onSave={onSave}
                type={type1}
                onEnterPress={handleSecondFieldComplete}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
