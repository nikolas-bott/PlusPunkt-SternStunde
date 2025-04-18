import { ReactNode, createContext, useContext, useState } from 'react'
import { format, addDays, isSameDay } from 'date-fns'

// Types for calendar events
export interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: Date
  startTime: string
  endTime: string
  color: string
  subject?: {
    name: string
    color: string
    teacher?: string
  }
  repeatWeekly?: boolean
  dayOfWeek?: number // 0-6 (Sunday-Saturday)
}

// Type for the context
interface CalendarContextType {
  events: CalendarEvent[]
  view: 'week' | 'day'
  currentDate: Date
  selectedDate: Date
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  setView: (view: 'week' | 'day') => void
  setCurrentDate: (date: Date) => void
  setSelectedDate: (date: Date) => void
  getEventsForDate: (date: Date) => CalendarEvent[]
  getEventsForWeek: (startDate: Date) => CalendarEvent[]
}

// Default context value
const defaultContextValue: CalendarContextType = {
  events: [],
  view: 'week',
  currentDate: new Date(),
  selectedDate: new Date(),
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
  setView: () => {},
  setCurrentDate: () => {},
  setSelectedDate: () => {},
  getEventsForDate: () => [],
  getEventsForWeek: () => []
}

// Create context
export const CalendarContext = createContext<CalendarContextType>(defaultContextValue)

// Custom hook to use calendar context
export const useCalendar = () => useContext(CalendarContext)

// Add free period option to subjects
export const FREE_PERIOD = {
  name: 'Free Period',
  nameAbbreviation: 'Free',
  color: '#777777',
  teacher: 'None'
}

// Calendar provider component
export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [view, setView] = useState<'week' | 'day'>('week')
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Add a new event
  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(), // Simple ID generation
      dayOfWeek: event.repeatWeekly ? new Date(event.date).getDay() : undefined
    }
    setEvents([...events, newEvent])
  }

  // Update an existing event
  const updateEvent = (id: string, updatedFields: Partial<CalendarEvent>) => {
    setEvents(
      events.map((event) => {
        if (event.id === id) {
          const updated = {
            ...event,
            ...updatedFields,
            dayOfWeek:
              updatedFields.repeatWeekly || event.repeatWeekly
                ? updatedFields.date
                  ? new Date(updatedFields.date).getDay()
                  : event.dayOfWeek
                : undefined
          }
          return updated
        }
        return event
      })
    )
  }

  // Delete an event
  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  // Get events for a specific date - including weekly repeating events
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dayOfWeek = date.getDay()
    const dateStr = format(date, 'yyyy-MM-dd')

    return events.filter((event) => {
      // One-time events that match the date
      if (!event.repeatWeekly && format(event.date, 'yyyy-MM-dd') === dateStr) {
        return true
      }

      // Weekly repeating events that match the day of week
      if (event.repeatWeekly && event.dayOfWeek === dayOfWeek) {
        return true
      }

      return false
    })
  }

  // Get events for an entire week
  const getEventsForWeek = (startDate: Date): CalendarEvent[] => {
    let weekEvents: CalendarEvent[] = []

    // For each day of the week
    for (let i = 0; i < 7; i++) {
      const currentDay = addDays(startDate, i)
      const eventsForDay = getEventsForDate(currentDay)

      // Add each event for this day to our week array
      weekEvents = [...weekEvents, ...eventsForDay]
    }

    return weekEvents
  }

  return (
    <CalendarContext.Provider
      value={{
        events,
        view,
        currentDate,
        selectedDate,
        addEvent,
        updateEvent,
        deleteEvent,
        setView,
        setCurrentDate,
        setSelectedDate,
        getEventsForDate,
        getEventsForWeek
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
