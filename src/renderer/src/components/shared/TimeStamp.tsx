import { Clock } from 'lucide-react'

import { useState } from 'react'
import { differenceInCalendarDays, formatDistanceToNow, format } from 'date-fns'
import { tz } from '@date-fns/tz'
import { Tooltip } from 'antd'

interface TimeStampProps {
  date: Date
}

function isToday(date: Date): boolean {
  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}

function formatDate(date: Date): string {
  if (isToday(date)) return 'today'
  if (date.getTime() < Date.now()) return 'due'

  const differenceInDays = differenceInCalendarDays(date, new Date(), {
    in: tz('Europe/Berlin')
  })

  if (differenceInDays === 1) return '1 day'
  if (differenceInDays > 1 && differenceInDays < 61) return `${differenceInDays} days`

  console.log('Other format')
  return formatDistanceToNow(date, { addSuffix: false })
}

export default function TimeStamp({ date }: TimeStampProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState('scale(1)')

  const formatedDate = formatDate(date)

  const displayDate = formatedDate.length > 7 ? `${formatedDate.substring(0, 7)}...` : formatedDate
  const fullDate = formatedDate

  return (
    <Tooltip title={'Due by: ' + format(date, 'dd/MM/yyyy')} placement="top" color="#1e1e2f">
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
