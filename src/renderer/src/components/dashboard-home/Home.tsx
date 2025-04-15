import { LAYOUT } from '../utils/constants'
import { GradesCard } from './info-cards/GradesCard'
import HomeworkCard from './info-cards/HomeworkCard'
import ExamsCard from './info-cards/ExamsCard'
import HolidayCard from './info-cards/HolidayCard'
import StatsCard from './info-cards/StatsCard'
import DefaultHeading from '../shared/DefaultHeading'

export default function Home(): JSX.Element {
  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Home" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 p-4 md:p-6 flex-grow">
        <div className={`md:col-span-2 lg:col-span-7 lg:row-span-3`}>
          <GradesCard />
        </div>
        <div className={`md:col-span-2 lg:col-span-5 lg:row-span-3`}>
          <HomeworkCard />
        </div>
        <div className={`md:col-span-1 lg:col-span-4 lg:row-span-2`}>
          <ExamsCard />
        </div>
        <div className={`md:col-span-1 lg:col-span-3 lg:row-span-2`}>
          <HolidayCard />
        </div>
        <div className={`md:col-span-2 lg:col-span-5 lg:row-span-2`}>
          <StatsCard />
        </div>
      </div>
    </div>
  )
}
