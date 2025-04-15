import { useState } from 'react'

interface subject {
  name: string
  color: string
}

export default function SubjectBadge({ name, color }: subject): JSX.Element {
  const [transform, setTransform] = useState('scale(1)')

  return (
    <div className="flex items-center">
      <div
        className="rounded-3xl px-4 py-2 mr-2 w-24 text-center transition-all duration-500 hover:shadow-lg overflow-hidden relative group smooth-scale"
        style={{
          backgroundColor: color,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transform: transform
        }}
        onMouseEnter={() => setTransform('scale(1.1)')}
        onMouseLeave={() => setTransform('scale(1)')}
      >
        <span className="text-white text-lg font-bold block truncate" title={name}>
          {name.toUpperCase()}
        </span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}
