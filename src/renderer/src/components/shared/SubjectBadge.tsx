import { useState } from 'react'
import { MOCK_DATA } from '../utils/mockData'

interface subject {
  name: string
  color: string
  dropdown?: boolean
}

export default function SubjectBadge({ name, color, dropdown = false }: subject): JSX.Element {
  const [transform, setTransform] = useState('scale(1)')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center relative">
      <div
        className="rounded-3xl px-4 py-2 mr-2 w-24 text-center transition-all duration-500 hover:shadow-lg overflow-hidden relative group smooth-scale"
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
        }}
      >
        <span className="text-white text-lg font-bold block truncate" title={name}>
          {name.toUpperCase()}
        </span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-primary-dark text-gray-300 rounded-lg shadow-lg overflow-hidden z-10 pl-2 pr-2 transform origin-top transition-all duration-200 ease-out scale-100 custom-scrollbar">
          <button className="bg-[#353C52] rounded-3xl flex justify-center items-center p-3">
            <div className="h-32 w-64 overflow-y-auto custom-scrollbar flex flex-wrap items-baseline gap-2 p-2">
              <SubjectBadge name="BIO" color={MOCK_DATA.SUBJECTS.BIOLOGY.color} />
              <SubjectBadge name="PHYS" color={MOCK_DATA.SUBJECTS.PHYSICS.color} />
              <SubjectBadge name="MATH" color={MOCK_DATA.SUBJECTS.MATH.color} />
              <SubjectBadge name="GER" color={MOCK_DATA.SUBJECTS.GERMAN.color} />
              <SubjectBadge name="GEO" color={MOCK_DATA.SUBJECTS.GEOGRAPHY.color} />
              <SubjectBadge name="INFO" color={MOCK_DATA.SUBJECTS.INFORMATICS.color} />
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
