import { useState, useEffect } from 'react'
import { useCalendar, CalendarEvent } from '@renderer/context/CalendarContext'
import WeekView from './WeekView'
import DayView from './DayView'
import EventForm from './EventForm'
import { CalendarDays, Clock, PlusCircle } from 'lucide-react'

export default function CalanderComponent(): JSX.Element {
  const { view, setView, selectedDate } = useCalendar()
  const [showEventForm, setShowEventForm] = useState<boolean>(false)
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | undefined>(undefined)

  // Listen for edit event requests from the views
  useEffect(() => {
    // Event listener for edit requests
    const handleEditEvent = (event: CustomEvent) => {
      setEventToEdit(event.detail)
      setShowEventForm(true)
    }

    window.addEventListener('editCalendarEvent', handleEditEvent as EventListener)

    return () => {
      window.removeEventListener('editCalendarEvent', handleEditEvent as EventListener)
    }
  }, [])

  const handleOpenEventForm = () => {
    setEventToEdit(undefined)
    setShowEventForm(true)
  }

  const handleCloseEventForm = () => {
    setShowEventForm(false)
    setEventToEdit(undefined)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setView('day')}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              view === 'day' ? 'bg-[#5FA0C2] text-white' : 'secondary-card hover:bg-[#42485f]'
            }`}
          >
            <Clock size={20} />
            <span className="font-medium">Day</span>
          </button>

          <button
            onClick={() => setView('week')}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              view === 'week' ? 'bg-[#5FA0C2] text-white' : 'secondary-card hover:bg-[#42485f]'
            }`}
          >
            <CalendarDays size={20} />
            <span className="font-medium">Week</span>
          </button>
        </div>

        <button
          onClick={handleOpenEventForm}
          className="flex items-center gap-2 bg-[#5FA0C2] text-white py-2 px-4 rounded-lg hover:bg-[#4a8eaf] transition-colors"
        >
          <PlusCircle size={20} />
          <span className="font-medium">Add Class</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">{view === 'week' ? <WeekView /> : <DayView />}</div>

      {showEventForm && (
        <EventForm
          onClose={handleCloseEventForm}
          selectedDate={selectedDate}
          eventToEdit={eventToEdit}
        />
      )}
    </div>
  )
}
