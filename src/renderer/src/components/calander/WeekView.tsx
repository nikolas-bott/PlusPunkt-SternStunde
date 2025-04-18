import { useCalendar, CalendarEvent } from '@renderer/context/CalendarContext'
import { format, addDays, startOfWeek, isSameDay, isWeekend } from 'date-fns'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useState } from 'react'
import EventForm from './EventForm'

interface EventDetailProps {
  event: CalendarEvent
  onEdit: () => void
  onClose: () => void
}

// Component for displaying event details when clicked
function EventDetail({ event, onEdit, onClose }: EventDetailProps): JSX.Element {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="primary-card p-5 relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="mb-4">
          {event.subject && (
            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-2"
              style={{ backgroundColor: event.color }}
            >
              {event.subject.name}
            </div>
          )}
          <div className="flex items-center text-gray-300 mb-1">
            <Clock size={16} className="mr-2" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          {event.subject?.teacher && (
            <div className="text-gray-300 mb-2">Teacher: {event.subject.teacher}</div>
          )}
          {event.description && <p className="text-gray-300 mt-2">{event.description}</p>}
          <div className="text-gray-300 mt-1">
            {event.repeatWeekly ? 'Repeats weekly' : 'One-time event'}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onEdit}
            className="bg-[#5FA0C2] text-white px-4 py-2 rounded-md hover:bg-[#4a8eaf] transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default function WeekView(): JSX.Element {
  const { currentDate, setCurrentDate, getEventsForDate, setSelectedDate, setView } = useCalendar()
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventDetail, setShowEventDetail] = useState<boolean>(false)
  const [showEditForm, setShowEditForm] = useState<boolean>(false)

  // School day settings
  const START_HOUR = 8
  const END_HOUR = 18
  const INTERVAL_MINUTES = 30

  // Generate time slots (30 min intervals from 8AM to 6PM)
  const timeSlots = []
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    timeSlots.push(hour + ':00')
    if (hour < END_HOUR) {
      timeSlots.push(hour + ':30')
    }
  }

  // Get the start of the week (Monday instead of Sunday)
  const weekStart = (() => {
    const start = startOfWeek(currentDate)
    // Skip Sunday, start from Monday
    return addDays(start, 1)
  })()

  // Generate array of days for the week (Mon-Fri)
  const daysOfWeek = Array.from({ length: 5 }).map((_, i) => addDays(weekStart, i))

  // Navigate to previous week
  const goToPreviousWeek = (): void => {
    setCurrentDate(addDays(currentDate, -7))
  }

  // Navigate to next week
  const goToNextWeek = (): void => {
    setCurrentDate(addDays(currentDate, 7))
  }

  // Handle day click to switch to day view
  const handleDayClick = (day: Date): void => {
    setSelectedDate(day)
    setView('day')
  }

  // Handle event click to show details
  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent): void => {
    e.stopPropagation()
    setSelectedEvent(event)
    setShowEventDetail(true)
  }

  // Handle edit button click
  const handleEditClick = (): void => {
    setShowEventDetail(false)
    setShowEditForm(true)
  }

  // Handle closing the edit form
  const handleCloseEditForm = (): void => {
    setShowEditForm(false)
    setSelectedEvent(null)
  }

  // Get the pixel position for a given time
  const getTimePosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return ((hours - START_HOUR) * 60 + minutes) * (60 / INTERVAL_MINUTES)
  }

  // Handle event positioning
  const getEventStyle = (event: { startTime: string; endTime: string }): React.CSSProperties => {
    // Parse hours and minutes and calculate position
    const startPosition = getTimePosition(event.startTime)
    const endPosition = getTimePosition(event.endTime)
    const height = endPosition - startPosition

    return {
      position: 'absolute',
      top: `${startPosition}px`,
      height: `${height}px`,
      width: '90%',
      left: '5%',
      borderRadius: '0.5rem',
      padding: '0.25rem',
      overflow: 'hidden'
    }
  }

  // Format time in 24-hour format
  const formatTimeSlot = (timeSlot: string): string => {
    return timeSlot
  }

  return (
    <div className="primary-card h-full p-4">
      {/* Header with navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousWeek}
            className="secondary-card p-2 hover:bg-[#42485f] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-bold text-2xl">
            {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 4), 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={goToNextWeek}
            className="secondary-card p-2 hover:bg-[#42485f] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex flex-col h-[calc(100%-56px)] border border-[#353C52] rounded-lg">
        {/* Day headers */}
        <div className="flex border-b border-[#353C52]">
          <div className="w-16 bg-[#283249] p-2 border-r border-[#353C52]"></div>
          {daysOfWeek.map((day, index) => {
            const isToday = isSameDay(day, new Date())
            const dayEvents = getEventsForDate(day)
            return (
              <div
                key={index}
                className={`flex-1 p-2 text-center bg-[#283249] cursor-pointer hover:bg-[#354054] transition-colors
                  ${isToday ? 'bg-[#354054] font-bold' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="font-semibold">{format(day, 'EEE')}</div>
                <div className={`text-sm ${isToday ? 'text-[#5FA0C2]' : ''}`}>
                  {format(day, 'MMM d')}
                </div>
                <div className="text-xs text-gray-300">
                  {dayEvents.length > 0 ? `${dayEvents.length} classes` : ''}
                </div>
              </div>
            )
          })}
        </div>

        {/* Time slots and events */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div
            className="relative"
            style={{
              height: `${(END_HOUR - START_HOUR) * (60 / INTERVAL_MINUTES) * INTERVAL_MINUTES}px`
            }}
          >
            {/* Time markers */}
            <div className="flex h-full">
              <div className="w-16 relative border-r border-[#353C52]">
                {timeSlots.map((timeSlot, index) => (
                  <div
                    key={index}
                    className="absolute w-full text-center text-xs text-gray-400"
                    style={{
                      top: `${index * INTERVAL_MINUTES}px`,
                      display: timeSlot.endsWith(':00') ? 'block' : 'none'
                    }}
                  >
                    {formatTimeSlot(timeSlot)}
                  </div>
                ))}
              </div>

              {/* Days columns with time guide lines */}
              <div className="flex-1 relative">
                <div className="absolute w-full h-full grid grid-cols-5">
                  {/* Time slot lines - every 30 minutes */}
                  {timeSlots.map((_, index) => (
                    <div
                      key={index}
                      className={`absolute w-full border-t ${index % 2 === 0 ? 'border-[#353C52]' : 'border-[#353C52] border-dashed opacity-50'}`}
                      style={{ top: `${index * INTERVAL_MINUTES}px` }}
                    />
                  ))}

                  {/* Day columns */}
                  {Array(5)
                    .fill(0)
                    .map((_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="relative h-full border-r last:border-r-0 border-[#353C52]"
                        onClick={() => handleDayClick(daysOfWeek[dayIndex])}
                      />
                    ))}
                </div>

                {/* Events */}
                {daysOfWeek.map((day, dayIndex) => {
                  const dayEvents = getEventsForDate(day)
                  return (
                    <div key={dayIndex} className="absolute grid grid-cols-5 w-full h-full">
                      <div className="relative" style={{ gridColumnStart: dayIndex + 1 }}>
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            style={{
                              ...getEventStyle(event),
                              backgroundColor: event.color,
                              borderLeft: `4px solid ${event.color}`,
                              opacity: 0.75
                            }}
                            className="cursor-pointer transition-all duration-300 hover:opacity-90 shadow-md"
                            onClick={(e) => handleEventClick(event, e)}
                          >
                            <div className="text-sm font-semibold truncate text-white">
                              {event.title}
                            </div>
                            <div className="text-xs text-white">
                              {event.startTime} - {event.endTime}
                            </div>
                            {event.subject?.teacher && (
                              <div className="text-xs text-white opacity-80 truncate">
                                {event.subject.teacher}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event detail modal */}
      {showEventDetail && selectedEvent && (
        <EventDetail
          event={selectedEvent}
          onEdit={handleEditClick}
          onClose={() => setShowEventDetail(false)}
        />
      )}

      {/* Edit form */}
      {showEditForm && selectedEvent && (
        <EventForm onClose={handleCloseEditForm} eventToEdit={selectedEvent} />
      )}
    </div>
  )
}
