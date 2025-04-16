import { ArrowRight } from 'lucide-react'

interface HomeworkItemProps {
  subjectColor: string
  subjectName: string
  teacher: string
  content: string
  hoursAWeek?: number
  date?: Date
}

export default function HomeworkItem({
  subjectColor,
  subjectName,
  teacher,
  content,
  hoursAWeek
}: HomeworkItemProps): JSX.Element {
  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return ''
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const truncatedSubjectName = truncateText(subjectName, 15)
  const truncatedContent = truncateText(content, 20)
  const truncatedTeacher = truncateText(teacher, 20)
  const hoursText = hoursAWeek ? `${hoursAWeek} hours a week` : ''
  const truncatedHoursText = truncateText(hoursText, 25)

  return (
    <div className="primary-card transition-all flex hover:shadow-xl hover:shadow-blue-900/20 h-full">
      <div style={{ backgroundColor: subjectColor }} className="rounded-3xl w-[10%] h-full"></div>
      <div className="p-4 w-full pr-10">
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold truncate w-full pb-1" title={subjectName}>
            {truncatedSubjectName}
          </h2>
          <div className="flex gap-4 items-center w-full">
            {hoursAWeek && (
              <p className="text-gray-400 font-bold truncate" title={`${hoursAWeek} hours a week`}>
                {truncatedHoursText}
              </p>
            )}
            <p className="text-gray-400 font-bold truncate" title={teacher}>
              {truncatedTeacher}
            </p>
          </div>
        </div>
        <div className="secondary-card mt-5 p-5 w-full mb-5">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-4xl font-bold">{truncatedContent}</h2>
            <div className="flex-grow items-center pl-10 bg-[#353C52] mt-3 rounded-3xl flex justify-end self-end">
              <h2 className="text-2xl font-bold">See More...</h2>
              <span className="text-8xl">
                <ArrowRight className="w-12 h-12" style={{ color: subjectColor }}></ArrowRight>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
