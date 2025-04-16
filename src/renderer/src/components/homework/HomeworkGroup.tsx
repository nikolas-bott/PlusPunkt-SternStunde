import HomeworkItem from './HomeworkItem'
import { formatDate, dateAsText } from '../utils/helperMethod'
import { MOCK_DATA } from '../utils/mockData'
interface HomeworkGroupProps {
  date: Date
}
export function HomeWorkGroup({ date }: HomeworkGroupProps): JSX.Element {
  return (
    <div className="pl-10 pr-80 mt-8">
      <h2 className="text-5xl text-gray-400 font-semibold">
        {formatDate(date) +
          ' - ' +
          dateAsText(date) +
          ' | ' +
          getOpenHomeworkForDate(date).length +
          ' open'}
      </h2>
      {getOpenHomeworkForDate(date).length > 0 ? (
        <div className="grid grid-cols-2 gap-10 mt-10 mb-10">
          {getOpenHomeworkForDate(date).map((homework) => (
            <HomeworkItem
              key={homework.id}
              subjectColor={homework.subject.color}
              content={homework.title}
              subjectName={homework.subject.name}
              teacher={homework.subject.teacher}
              hoursAWeek={homework.hoursAWeek}
              date={new Date(homework.dueDate)}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-3xl text-gray-400 font-bold">No homework</h2>
      )}
    </div>
  )
}

function getOpenHomeworkForDate(date: Date): Array<any> {
  const openHomework = MOCK_DATA.HOMEWORK.filter((homework) => {
    const homeworkDate = new Date(homework.dueDate)
    return (
      homeworkDate.getDate() === date.getDate() &&
      homeworkDate.getMonth() === date.getMonth() &&
      homeworkDate.getFullYear() === date.getFullYear()
    )
  })
  return openHomework
}
