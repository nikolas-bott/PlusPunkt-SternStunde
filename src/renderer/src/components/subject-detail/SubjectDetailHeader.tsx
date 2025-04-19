import { ArrowLeft, Trash2 } from 'lucide-react'
import SubjectBadge from '../shared/SubjectBadge'

interface SubjectDetailHeaderProps {
  title: string
  abbreviation: string
  color: string
  onBack: () => void
  onDelete: () => void
}

export default function SubjectDetailHeader({
  title,
  abbreviation,
  color,
  onBack,
  onDelete
}: SubjectDetailHeaderProps): JSX.Element {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 secondary-card px-4 py-2 rounded-lg hover:bg-[#42485f] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 bg-[#7C5556] text-[#F4A6A7] px-4 py-2 rounded-lg hover:bg-[#8c6263] transition-colors"
        >
          <Trash2 size={20} />
          <span className="font-medium">Delete Subject</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SubjectBadge name={abbreviation} color={color} />
      </div>
    </div>
  )
}
