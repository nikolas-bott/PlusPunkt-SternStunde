import LineChart from './LineChart'
import { LAYOUT } from '../utils/constants'
import { MOCK_DATA } from '../utils/mockData'
import DefaultHeading from '../shared/DefaultHeading'
import SubjectItem from './SubjectItem'

export default function Subject(): JSX.Element {
  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Subjects" />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-12 xl:gap-x-20 column p-4 lg:p-8 flex-grow">
        <div className={`md:col-span-2 lg:col-span-2 lg:row-span-1`}>
          <LineChart></LineChart>
        </div>
        {MOCK_DATA.GRADES_SUBJECTS.map((subject, index) => (
          <div key={index} className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
            <SubjectItem
              subjectColor={subject.subject.color}
              teacher={subject.subject.teacher}
              average={subject.average}
              development={subject.development}
              hoursAWeek={subject.hoursAWeek}
              subjectName={subject.subject.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
