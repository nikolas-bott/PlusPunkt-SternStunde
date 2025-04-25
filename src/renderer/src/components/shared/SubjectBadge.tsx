import { useState } from 'react'
import { MOCK_DATA } from '../utils/mockData'
import { ChevronDown } from 'lucide-react'

interface subject {
  name: string
  color: string
  subjectId: number
  dropdown?: boolean
  raiseEvent?: (subjectAbbreviaton: string, subjectColor: string, subjectId: number) => void
}

export default function SubjectBadge({
  name,
  color,
  dropdown = false,
  subjectId,
  raiseEvent
}: subject): JSX.Element {
  const [transform, setTransform] = useState('scale(1)')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center relative">
      <div
        className={`rounded-3xl px-4 w-24 py-2 mr-2  text-center transition-all duration-500 hover:shadow-lg overflow-hidden relative group smooth-scale`}
        style={{
          backgroundColor: color,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transform: transform
        }}
        onMouseEnter={() => setTransform('scale(1.1)')}
        onMouseLeave={() => setTransform('scale(1)')}
        onClick={() => {
          if (dropdown) {
            setIsOpen(!isOpen)
          }
          if (raiseEvent && !dropdown) {
            console.log('Raise event:', name)
            raiseEvent(name, color, subjectId)
          }
        }}
      >
        <span className="text-white text-lg font-bold block truncate " title={name}>
          {name.toUpperCase()}
        </span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}
