import HolidayCounter from '../HolidayCounter'

export function HolidayCard(): JSX.Element {
  return (
    <div className="primary-card h-full group">
      <div className="p-4 flex flex-col h-full">
        <div className="card-title ">
          <span className="text-4xl">🎈</span>
          <h1>Easter Holiday</h1>
        </div>
        <div className="flex-grow group-hover:rotate-5 flex items-center justify-center group-hover:scale-105 group-hover:text-yellow-200 transition-transform duration-300">
          <HolidayCounter date="12 days left..." />
        </div>
      </div>
    </div>
  )
}

export default HolidayCard
