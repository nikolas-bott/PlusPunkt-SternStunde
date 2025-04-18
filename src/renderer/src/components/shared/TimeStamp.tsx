import { Clock } from 'lucide-react'
import { useState } from 'react'
import { dateAsText, formatDate } from '../utils/helperMethod'
import { Tooltip } from 'antd'

interface TimeStampProps {
  date: Date
}

export default function TimeStamp({ date }: TimeStampProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState('scale(1)')

  const formatedDate = dateAsText(date)

  const displayDate = formatedDate.length > 7 ? `${formatedDate.substring(0, 7)}...` : formatedDate
  const fullDate = formatedDate

  return (
    <Tooltip title={'Due by: ' + formatDate(date)} placement="top" color="#1e1e2f">
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
    </Tooltip>
  )
}
