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
  onSave: (field: string, value: string) => void
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
  onSave
}: InfoCardProps): JSX.Element {
  return (
    <div className="secondary-card p-4">
      <div className="divide-y divide-[#42485f]">
        <EditableField label={heading} field={field} value={value} onSave={onSave} type={type} />
        {heading1 && field1 && value1 ? (
          <EditableField
            label={heading1}
            field={field1}
            value={value1}
            onSave={onSave}
            type={type1}
          />
        ) : null}
      </div>
    </div>
  )
}
