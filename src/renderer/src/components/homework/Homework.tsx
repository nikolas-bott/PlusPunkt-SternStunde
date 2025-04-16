import HomeWorkHeader from './HomeworkHeader'
import DefaultHeading from '../shared/DefaultHeading'
import { LAYOUT } from '../utils/constants'
import { HomeWorkGroup } from './HomeworkGroup'
import { MOCK_DATA } from '../utils/mockData'

export default function Homework(): JSX.Element {
  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Homework" />
      <div className="flex flex-col gap-4 h-full overflow-y-hidden">
        <HomeWorkHeader></HomeWorkHeader>
        <div className="overflow-y-auto custom-scrollbar pl-5">
          {MOCK_DATA.HOMEWORK.sort(
            (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
          ).map((homework, index) => (
            <HomeWorkGroup key={index} date={homework.dueDate}></HomeWorkGroup>
          ))}
        </div>
      </div>
    </div>
  )
}
