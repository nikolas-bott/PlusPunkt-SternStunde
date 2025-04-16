import { Calendar1 } from 'lucide-react'

interface HolidayCounterProps {
  date: string
}

export default function HolidayCounter({ date }: HolidayCounterProps): JSX.Element {
  return (
    <div className="tertiary-card flex items-center gap-4 justify-center p-5 text-xl font-bold">
      <Calendar1 className="w-10 h-10" />
      {date}
    </div>
  )
}
