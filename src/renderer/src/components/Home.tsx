import { House, GraduationCap, BookMarked, Calendar1 } from 'lucide-react'
import DonutChartExample from './DonutChart'
import SubjectBadge from './SubjectBadge'
import TimeStamp from './TimeStamp'

export default function Home(): JSX.Element {
  return (
    <div className="h-[calc(100vh-50px)] m-5 w-full flex flex-col">
      <div className="m-5">
        <h1 className="text-6xl font-bold">Home</h1>
      </div>
      <div className="grid grid-cols-12 grid-rows-5 gap-4 flex-grow p-5 pt-10 pb-25">
        <div className="col-span-7 h-[100%] row-span-3">
          <GradesCard />
        </div>
        <div className="col-span-5 row-span-3">
          <HomeworkCard />
        </div>
        <div className="col-span-4 row-span-2">
          <ExamsCard />
        </div>
        <div className="col-span-3 row-span-2">
          <HolidayCard />
        </div>
        <div className="col-span-5 row-span-2">
          <StatsCard />
        </div>
      </div>
    </div>
  )
}

export function GradesCard(): JSX.Element {
  return (
    <div className="bg-[#15243B] h-full rounded-3xl box-border flex">
      <div className="p-6 flex w-full flex-col md:flex-row">
        <div className="md:flex-1">
          <div className="flex text-5xl gap-4 items-center mb-5">
            <GraduationCap className="w-16 h-16"></GraduationCap>
            <h1>Grades</h1>
          </div>
          <div className="flex flex-col gap-4 flex-grow pl-3">
            <div className="flex-[2]">
              <p className="text-lg font-semibold">Average:</p>
              <h1 className="text-4xl font-bold">Ø12.54</h1>
            </div>
            <div className="flex-[2]">
              <p className="text-lg font-semibold">Exams with grade:</p>
              <h1 className="text-4xl font-bold">23/25</h1>
            </div>
            <div className="flex-[2]">
              <p className="text-lg font-semibold">Development (last Month):</p>
              <h1 className="text-4xl font-bold text-green-300">+1.24</h1>
            </div>
          </div>
        </div>
        <div className="md:flex-2 flex items-center justify-center h-full">
          <DonutChartExample />
        </div>
      </div>
    </div>
  )
}

export function HomeworkCard(): JSX.Element {
  return (
    <div className="bg-[#15243B] h-full rounded-3xl box-border flex">
      <div className="p-6 flex w-full flex-col">
        <div className="flex text-5xl gap-4 items-center mb-5">
          <BookMarked className="w-16 h-16"></BookMarked>
          <h1>Homework</h1>
        </div>
        <div className="flex flex-col gap-6 flex-grow pl-3 justify-evenly">
          <HomeworkInstance
            name="Math"
            color="blue"
            content="Buch S.12 nr.2"
            date="today"
          ></HomeworkInstance>
          <HomeworkInstance
            name="BIO"
            color="green"
            content="Buch S.12 nr.2"
            date="1 day"
          ></HomeworkInstance>
          <HomeworkInstance
            name="INF"
            color="purple"
            content="Buch S.12 nr.2"
            date="1 week"
          ></HomeworkInstance>
        </div>
      </div>
    </div>
  )
}

export function ExamsCard(): JSX.Element {
  return (
    <div className="bg-[#15243B] h-full rounded-3xl box-border">
      <h2>Exams:</h2>
    </div>
  )
}

export function HolidayCard(): JSX.Element {
  return (
    <div className="bg-[#15243B] h-full rounded-3xl box-border">
      <h2>Easter Holidays</h2>
    </div>
  )
}

export function StatsCard(): JSX.Element {
  return (
    <div className="bg-[#15243B] h-full rounded-3xl box-border">
      <h2>Stats</h2>
    </div>
  )
}

interface HomeworkInstanceProps {
  name: string
  color: string
  content: string
  date: string
}
export function HomeworkInstance({
  name,
  color,
  content,
  date
}: HomeworkInstanceProps): JSX.Element {
  return (
    <div className="flex w-full gap-4">
      <div className="bg-[#353C52] h-full rounded-3xl box-border flex items-center p-2 flex-grow">
        <SubjectBadge name={name} color={color}></SubjectBadge>
        <h2 className="text-xl font-medium">{content}</h2>
      </div>
      <TimeStamp date={date}></TimeStamp>
    </div>
  )
}
