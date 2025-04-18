import { LAYOUT } from '../utils/constants'
import CalanderComponent from './CalanderCoponent'
import DefaultHeading from '../shared/DefaultHeading'
import { CalendarProvider } from '@renderer/context/CalendarContext'

export default function Calander(): JSX.Element {
  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Calendar" />

      {/* Fixed height container to ensure calendar doesn't push content */}
      <div className="h-[calc(100%-100px)] px-4 overflow-hidden">
        <CalendarProvider>
          <CalanderComponent />
        </CalendarProvider>
      </div>
    </div>
  )
}
