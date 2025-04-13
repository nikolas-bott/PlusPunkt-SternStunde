import { useState, useEffect } from 'react'
import {
  Flame,
  GraduationCap,
  BookMarked,
  Calendar1,
  FilePenLine,
  ChevronRight
} from 'lucide-react'
import DonutChartExample from './DonutChart'
import SubjectBadge from './SubjectBadge'
import TimeStamp from './TimeStamp'
import { getDate } from '@renderer/assets/helperMethod'

export default function Home(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150)
    return (): void => clearTimeout(timer)
  }, [])

  return (
    <div className="h-[calc(100vh-50px)] w-full flex flex-col overflow-y-auto md:overflow-visible">
      <div className={`p-4 md:p-6 lg:p-8 flex items-center justify-between`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Home</h1>
        <div className="bg-primary-dark px-4 py-2 rounded-full">
          <span>{getDate()}</span>
        </div>
      </div>

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

export function GradesCard(): JSX.Element {
  return (
    <div className="card h-full group">
      <div className="p-4 flex flex-col lg:flex-row h-full hover:text-[#5FA0C2]">
        <div className="lg:flex-1">
          <div className="card-title">
            <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
            <h1>Grades</h1>
          </div>
          <div className="flex flex-col gap-6 pl-3">
            <div>
              <p className="text-gray-300 text-lg">Average:</p>
              <h1 className="text-3xl lg:text-4xl font-bold mt-1 transition-transform duration-300 group-hover:translate-x-2">
                Ø 12.54
              </h1>
            </div>
            <div>
              <p className="text-gray-300 text-lg">Exams with grade:</p>
              <h1 className="text-3xl lg:text-4xl font-bold mt-1 transition-transform duration-300 group-hover:translate-x-2">
                23/25
              </h1>
            </div>
            <div>
              <p className="text-gray-300 text-lg">Development:</p>
              <h1 className="text-3xl lg:text-4xl font-bold mt-1 text-green-400 flex items-center transition-transform duration-300 group-hover:translate-x-2">
                +1.24
                <span className="text-sm ml-2 bg-green-900/30 py-1 px-2 rounded-full">
                  Last Month
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div className="lg:flex-1 mt-6 lg:mt-0 flex items-center justify-center">
          <DonutChartExample />
        </div>
      </div>
    </div>
  )
}

export function HomeworkCard(): JSX.Element {
  return (
    <div className="card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <BookMarked className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
          <h1>Homework</h1>
        </div>
        <div className="flex flex-col gap-4 flex-grow pl-3 justify-evenly">
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="Math" color="#3B82F6" content="Buch S.12 nr.2" date="today" />
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="BIO" color="#10B981" content="Buch S.12 nr.2" date="1 day" />
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="INF" color="#8B5CF6" content="Buch S.12 nr.2" date="1 week" />
          </div>

          <button
            className="self-end mt-2 bg-[#283249] hover:bg-[#3a4c75] px-4 py-2 rounded-lg
            hover:text-yellow-200 hover:translate-x-1 transition-all duration-300 flex items-center gap-2"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ExamsCard(): JSX.Element {
  return (
    <div className="card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <FilePenLine className="w-10 h-10 md:w-14 md:h-14 text-secondary" />
          <h1>Exams</h1>
        </div>
        <div className="flex flex-col gap-4 flex-grow pl-3 justify-evenly">
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="Math" color="#3B82F6" content="Algebra" date="2 weeks" />
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="BIO" color="#10B981" content="Ökologie" date="1 month" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HolidayCard(): JSX.Element {
  return (
    <div className="card h-full group">
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

export function StatsCard(): JSX.Element {
  return (
    <div className="card h-full group">
      <div className="p-6 flex flex-col hover:text-[#5FA0C2]">
        <div className="flex text-4xl gap-4 mb-5 items-center">
          <Flame className="w-14 h-14" />
          <h1>Stats</h1>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <div>
            <h3 className="text-2xl text-gray-300 ">Homework done:</h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2">
              3/5
            </h1>
          </div>
          <div>
            <h3 className="text-2xl text-gray-300 ">Weekly hours:</h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2">
              32
            </h1>
          </div>
          <div>
            <h3 className="text-2xl text-gray-300 ">Exams written:</h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2">
              1
            </h1>
          </div>
          <div>
            <h3 className="text-2xl text-gray-300 ">Mood: </h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2 group-hover:-rotate-5">
              😀
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InstanceProps {
  name: string
  color: string
  content: string
  date: string
}

export function SubjectInstance({ name, color, content, date }: InstanceProps): JSX.Element {
  return (
    <div className="flex w-full flex-col sm:flex-row gap-2">
      <div
        className="bg-[#353C52] rounded-2xl flex items-center p-3 flex-grow
        hover:bg-primary-light hover:translate-x-1 transition-all duration-300"
      >
        <SubjectBadge name={name} color={color} />
        <h2 className="text-lg font-medium ml-1 truncate">{content}</h2>
      </div>
      <TimeStamp date={date} />
    </div>
  )
}

interface HolidayCounterProps {
  date: string
}

export function HolidayCounter({ date }: HolidayCounterProps): JSX.Element {
  return (
    <div className="bg-[#283249] rounded-3xl flex items-center gap-4 justify-center p-5 text-xl font-bold">
      <Calendar1 className="w-10 h-10" />
      {date}
    </div>
  )
}
