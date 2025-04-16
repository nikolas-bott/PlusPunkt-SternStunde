import SubjectBadge from '../shared/SubjectBadge'
import TimeStamp from '../shared/TimeStamp'

interface InstanceProps {
  name: string
  color: string
  content: string
  date: string
}

export function SubjectInstance({ name, color, content, date }: InstanceProps): JSX.Element {
  return (
    <div className="flex w-full flex-col sm:flex-row gap-2">
      <div
        className="secondary-card flex items-center p-3 flex-grow
        hover:bg-primary-light hover:translate-x-1 transition-all duration-300"
      >
        <SubjectBadge name={name} color={color} />
        <h2 className="text-lg font-medium ml-1 truncate">{content}</h2>
      </div>
      <TimeStamp date={date} />
    </div>
  )
}

export default SubjectInstance
