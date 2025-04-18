import { ArrowRight } from 'lucide-react'
import TimeRangeBadge from '../shared/TimeRangeBadge'
import { useApp } from '@renderer/AppProvider'
import SubjectDetail from '../subject-detail/SubjectDetail'

interface SubjectItemProps {
  subjectName: string
  subjectColor: string
  teacher: string
  development: number
  average: number
  hoursAWeek?: number
}

export default function SubjectItem({
  subjectColor,
  teacher,
  development,
  average,
  hoursAWeek,
  subjectName
}: SubjectItemProps): JSX.Element {
  const { openFullScreenView } = useApp() // Use the app context for full screen views

  let state: 'neg' | 'pos' | 'neutral' = 'neutral'
  let developmentTextColor = '#FFFFFF'
  const formattedDevelopment = development.toFixed(1)

  if (development > 0) {
    state = 'pos'
    developmentTextColor = '#4ADE80'
  } else if (development < 0) {
    state = 'neg'
    developmentTextColor = '#F4A6A7'
  }

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return ''
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const truncatedSubjectName = truncateText(subjectName, 10)
  const truncatedTeacher = truncateText(teacher, 10)
  const hoursText = hoursAWeek ? `${hoursAWeek} hours a week` : ''
  const truncatedHoursText = truncateText(hoursText, 15)

  // Handle opening the subject detail view
  const handleOpenDetail = () => {
    openFullScreenView(
      <SubjectDetail subjectName={subjectName} subjectColor={subjectColor} teacher={teacher} />
    )
  }

  return (
    <div className="primary-card transition-all flex hover:shadow-xl hover:shadow-blue-900/20 h-full justify-between">
      <div style={{ backgroundColor: subjectColor }} className="rounded-3xl w-[17%] h-full"></div>
      <div className="p-4 flex flex-col items-end">
        <h2 className="text-[250%] font-bold truncate w-full text-right" title={subjectName}>
          {truncatedSubjectName}
        </h2>
        <div className="flex gap-4 items-center justify-end w-full">
          {hoursAWeek && (
            <p className="text-gray-400 font-bold truncate" title={`${hoursAWeek} hours a week`}>
              {truncatedHoursText}
            </p>
          )}
          <p className="text-gray-400 font-bold truncate" title={teacher}>
            {truncatedTeacher}
          </p>
        </div>
        <div className="flex flex-col justify-end items-end pt-5">
          <h2 className="text-4xl font-bold">Ø {average}</h2>
          <div className="flex items-center justify-end gap-4">
            <TimeRangeBadge startDate="Last month" state={state}></TimeRangeBadge>
            <h2
              className="text-3xl font-bold"
              style={{ color: developmentTextColor }}
            >{`${state === 'pos' ? '+' : ''}${formattedDevelopment}`}</h2>
          </div>
        </div>
        <div
          className="flex-grow items-center pl-10 bg-[#353C52] mt-3 rounded-3xl flex justify-end cursor-pointer hover:bg-[#424e6b] transition-colors"
          onClick={handleOpenDetail}
        >
          <h2 className="text-2xl font-bold">See More...</h2>
          <span className="text-8xl">
            <ArrowRight className="w-12 h-12" style={{ color: subjectColor }}></ArrowRight>
          </span>
        </div>
      </div>
    </div>
  )
}
