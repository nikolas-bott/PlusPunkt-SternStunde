import { useState } from 'react'
import { MOCK_DATA } from '../utils/mockData'
import { ChevronDown } from 'lucide-react'
import { SubjectBadge } from './SubjectBadge'

interface subject {
  name: string
  color: string
  data: JSX.Element[]
  raiseEvent?: (subjectId: number) => void
  disable?: boolean
}

export default function SubjectBadgeDropDown({
  name,
  color,
  data,
  disable = false
}: subject): JSX.Element {
  const [transform, setTransform] = useState('scale(1)')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center relative">
      <div
        className={`rounded-3xl px-4 w-30 py-2 mr-2 text-center transition-all duration-500 hover:shadow-lg overflow-hidden relative group smooth-scale ${disable ? 'cursor-not-allowed' : ''} ${disable && isOpen ? 'border-amber-600 border-2' : ''}`}
        style={{
          backgroundColor: color,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transform: transform
        }}
        onMouseEnter={() => setTransform('scale(1.1)')}
        onMouseLeave={() => setTransform('scale(1)')}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <span className="text-white text-lg font-bold block truncate " title={name}>
          {name.toUpperCase()}

          <ChevronDown
            size={24}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
          />
        </span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      {isOpen && !disable && (
        <div className="absolute left-0 top-full mt-2 bg-primary-dark text-gray-300 rounded-lg shadow-lg overflow-hidden z-10 pl-2 pr-2 transform origin-top transition-all duration-200 ease-out scale-100 custom-scrollbar">
          <button className="bg-[#353C52] rounded-3xl flex justify-center items-center p-3">
            <div className="h-32 w-64 overflow-y-auto custom-scrollbar flex flex-wrap items-baseline gap-2 p-2">
              {data.map((subject) => subject)}
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
