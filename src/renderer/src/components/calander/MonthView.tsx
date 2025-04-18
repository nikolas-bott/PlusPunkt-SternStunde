import { useCalendar } from '@renderer/context/CalendarContext'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Tooltip } from 'antd'

export default function MonthView(): JSX.Element {
  const { currentDate, setCurrentDate, getEventsForDate, deleteEvent } = useCalendar()
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  // Calculate calendar days for current month view
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Function to navigate to previous month
  const goToPreviousMonth = (): void => {
    setCurrentDate(addMonths(currentDate, -1))
  }

  // Function to navigate to next month
  const goToNextMonth = (): void => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  // Create calendar grid with weeks
  const calendarRows = []
  let days = []

  // Add empty cells for days before the first of the month
  const firstDayOfMonth = monthStart.getDay()
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }

  // Add the days of the month
  monthDays.forEach((day) => {
    days.push(day)
    if (days.length === 7) {
      calendarRows.push(days)
      days = []
    }
  })

  // Add empty cells for the remaining days to complete the last week
  if (days.length > 0) {
    while (days.length < 7) {
      days.push(null)
    }
    calendarRows.push(days)
  }

  // Days of the week headers
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="primary-card h-full p-4">
      {/* Header with navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="secondary-card p-2 hover:bg-[#42485f] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-bold text-2xl">{format(currentDate, 'MMMM yyyy')}</h2>
          <button
            onClick={goToNextMonth}
            className="secondary-card p-2 hover:bg-[#42485f] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 rounded-lg overflow-hidden border border-[#353C52]">
        <table className="w-full h-full">
          <thead>
            <tr className="bg-[#283249]">
              {daysOfWeek.map((day) => (
                <th key={day} className="py-2 font-semibold text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarRows.map((week, weekIndex) => (
              <tr key={weekIndex} className="h-1/6">
                {week.map((day, dayIndex) => {
                  if (!day) {
                    // Empty cell
                    return (
                      <td
                        key={`empty-${dayIndex}`}
                        className="bg-[#1d2a3d] opacity-50 border border-[#353C52]"
                      ></td>
                    )
                  }

                  const isCurrentMonth = isSameMonth(day, currentDate)
                  const isCurrentDay = isToday(day)
                  const events = getEventsForDate(day)

                  return (
                    <td
                      key={dayIndex}
                      className={`relative p-1 border border-[#353C52] align-top
                        ${isCurrentDay ? 'bg-[#2d3c54]' : 'hover:bg-[#223046]'}
                        ${!isCurrentMonth ? 'opacity-50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div
                          className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                            ${isCurrentDay ? 'bg-[#5FA0C2] text-white' : ''}`}
                        >
                          {format(day, 'd')}
                        </div>
                      </div>

                      {/* Events for this day */}
                      <div className="mt-1 max-h-[95%] overflow-y-auto custom-scrollbar">
                        {events.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 mb-1 rounded overflow-hidden text-white relative"
                            style={{
                              backgroundColor: event.color,
                              opacity: hoveredEvent === event.id ? 0.9 : 0.75
                            }}
                            onMouseEnter={() => setHoveredEvent(event.id)}
                            onMouseLeave={() => setHoveredEvent(null)}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-[10px]">
                              {event.startTime} - {event.endTime}
                            </div>

                            {hoveredEvent === event.id && (
                              <Tooltip title="Delete Event">
                                <button
                                  onClick={() => deleteEvent(event.id)}
                                  className="absolute top-0.5 right-0.5 bg-red-500 rounded-full p-0.5 opacity-90 hover:opacity-100"
                                >
                                  <Trash2 size={10} />
                                </button>
                              </Tooltip>
                            )}
                          </div>
                        ))}

                        {events.length > 3 && (
                          <div className="text-xs text-center text-gray-400">
                            +{events.length - 3} more
                          </div>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
