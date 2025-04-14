import { getDate } from '@renderer/assets/helperMethod'

export default function Subject(): JSX.Element {
  return (
    <div className="h-[calc(100vh-50px)] w-full flex flex-col overflow-y-auto md:overflow-visible">
      <div className={`p-4 md:p-6 lg:p-8 flex items-center justify-between`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Subject</h1>
        <div className="bg-primary-dark px-4 py-2 rounded-full">
          <span>{getDate()}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 grid-rows-3 gap-4 p-4 md:p-6 flex-grow">
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem color="#49A283" teacher="Herr Dreyer" />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem color="#49A283" teacher="Herr Dreyer" />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem color="#49A283" teacher="Herr Dreyer" />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem color="#49A283" teacher="Herr Dreyer" />
        </div>
      </div>
    </div>
  )
}

interface SubjectItemProps {
  color: string
  teacher: string
  development?: string
  average?: string
  teacherName?: string
  hoursAWeek?: number
}

export function SubjectItem({
  color,
  teacher
  // development,
  // average,
  // teacherName,
  // hoursAWeek
}: SubjectItemProps): JSX.Element {
  return (
    <div className="bg-[#15243B] rounded-3xl shadow-lg transition-all flex hover:shadow-xl hover:shadow-blue-900/20 h-full">
      <div style={{ backgroundColor: color }} className="rounded-3xl w-[17%] h-full"></div>
      <div className="p-4 flex flex-col items-end">
        <h2 className="text-3xl font-bold">Subject Name</h2>
        <div className="flex gap-4 items-center justify-end">
          <p className="text-gray-400 font-bold">3 hours aweek</p>
          <p className="text-gray-400 font-bold">{teacher}</p>
        </div>
      </div>
    </div>
  )
}
