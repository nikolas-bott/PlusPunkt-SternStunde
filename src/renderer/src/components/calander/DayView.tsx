import { useCalendar } from '@renderer/context/CalendarContext'
import { format, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useState } from 'react'
import EventForm from './EventForm'

export default function DayView(): JSX.Element {
  const { currentDate, setCurrentDate, selectedDate, setSelectedDate, getEventsForDate } =
    useCalendar()

  const [selectedEvent, setSelectedEvent] = useState<any>(null)
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

  // Navigate to previous day
  const goToPreviousDay = (): void => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 1)
    setCurrentDate(newDate)
    setSelectedDate(newDate)
  }

  // Navigate to next day
  const goToNextDay = (): void => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 1)
    setCurrentDate(newDate)
    setSelectedDate(newDate)
  }

  // Get events for the selected day
  const events = getEventsForDate(selectedDate)

  // Handle event click
  const handleEventClick = (event: any): void => {
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

  return (
    <div className="primary-card h-full p-4">
      {/* Header with navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousDay}
            className="secondary-card p-2 hover:bg-[#42485f] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-bold text-2xl cursor-pointer">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h2>
          <button
            onClick={goToNextDay}
            className="secondary-card p-2 hover:bg-[#42485f] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex flex-col h-[calc(100%-56px)] border border-[#353C52] rounded-lg">
        {/* Header */}
        <div className="flex border-b border-[#353C52]">
          <div className="w-16 bg-[#283249] p-2 border-r border-[#353C52]"></div>
          <div
            className={`flex-1 p-2 text-center bg-[#283249] ${isSameDay(selectedDate, new Date()) ? 'bg-[#354054] font-bold' : ''}`}
          >
            <div className="font-semibold">{format(selectedDate, 'EEE')}</div>
            <div
              className={`text-sm ${isSameDay(selectedDate, new Date()) ? 'text-[#5FA0C2]' : ''}`}
            >
              {format(selectedDate, 'MMM d')}
            </div>
            <div className="text-xs text-gray-300">
              {events.length > 0 ? `${events.length} classes` : ''}
            </div>
          </div>
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
                    {timeSlot}
                  </div>
                ))}
              </div>

              {/* Day column with hour guide lines */}
              <div className="flex-1 relative">
                <div className="absolute w-full h-full">
                  {/* Time slot lines - every 30 minutes */}
                  {timeSlots.map((_, index) => (
                    <div
                      key={index}
                      className={`absolute w-full border-t ${index % 2 === 0 ? 'border-[#353C52]' : 'border-[#353C52] border-dashed opacity-50'}`}
                      style={{ top: `${index * INTERVAL_MINUTES}px` }}
                    />
                  ))}
                </div>

                {/* Events */}
                <div className="absolute w-full h-full">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        ...getEventStyle(event),
                        backgroundColor: event.color,
                        borderLeft: `4px solid ${event.color}`,
                        opacity: 0.75
                      }}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90 shadow-md"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="text-sm font-semibold truncate text-white">{event.title}</div>
                      <div className="text-xs text-white">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.subject && (
                        <div className="text-xs text-white opacity-80 truncate">
                          {event.subject.teacher && `Teacher: ${event.subject.teacher}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event detail modal */}
      {showEventDetail && selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowEventDetail(false)}
        >
          <div
            className="primary-card p-5 relative max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              <button
                onClick={() => setShowEventDetail(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              {selectedEvent.subject && (
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-2"
                  style={{ backgroundColor: selectedEvent.color }}
                >
                  {selectedEvent.subject.name}
                </div>
              )}
              <div className="flex items-center text-gray-300 mb-1">
                <Clock size={16} className="mr-2" />
                <span>
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </span>
              </div>
              {selectedEvent.subject?.teacher && (
                <div className="text-gray-300 mb-2">Teacher: {selectedEvent.subject.teacher}</div>
              )}
              {selectedEvent.description && (
                <p className="text-gray-300 mt-2">{selectedEvent.description}</p>
              )}
              <div className="text-gray-300 mt-1">
                {selectedEvent.repeatWeekly ? 'Repeats weekly' : 'One-time event'}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleEditClick}
                className="bg-[#5FA0C2] text-white px-4 py-2 rounded-md hover:bg-[#4a8eaf] transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit form */}
      {showEditForm && selectedEvent && (
        <EventForm onClose={handleCloseEditForm} eventToEdit={selectedEvent} />
      )}
    </div>
  )
}
