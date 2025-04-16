import { Clock } from 'lucide-react'
import { useState } from 'react'

interface TimeStampProps {
  date: string
}

export default function TimeStamp({ date }: TimeStampProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState('scale(1)')

  // Truncate date to max 7 characters if needed
  const displayDate = date.length > 7 ? `${date.substring(0, 7)}...` : date
  const fullDate = date // Keep original date for tooltip

  return (
    <div
      className="tertiary-card flex items-center justify-center p-5 w-36 transition-all duration-500 hover:bg-[#323e5a] hover:shadow-lg group relative smooth-scale"
      onMouseEnter={() => {
        setIsHovered(true)
        setTransform('scale(1.05)')
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setTransform('scale(1)')
      }}
      title={fullDate}
      style={{ transform: transform }}
    >
      <Clock
        className={`mr-2 transition-all duration-500 ${isHovered ? 'text-yellow-300' : 'text-gray-400'} ${isHovered ? 'rotate-12' : ''} group-hover:animate-pulse`}
        size={18}
      />
      <span className="text-lg font-bold truncate group-hover:text-yellow-200 transition-colors duration-300">
        {displayDate}
      </span>
      {isHovered && (
        <div className="absolute -bottom-1 left-1/2 w-10 h-1 bg-yellow-300 rounded-full transform -translate-x-1/2 animate-pulse" />
      )}
    </div>
  )
}
