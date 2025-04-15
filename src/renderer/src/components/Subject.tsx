import { getDate } from '@renderer/assets/helperMethod'
import { ArrowRight } from 'lucide-react'
import LineChart from './LineChart'
import { Line } from 'react-chartjs-2'

export default function Subject(): JSX.Element {
  return (
    <div className="h-[calc(100vh-50px)] w-full flex flex-col overflow-y-auto md:overflow-visible">
      <div className={`p-4 md:p-6 lg:p-8 flex items-center justify-between`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Subject</h1>
        <div className="bg-primary-dark px-4 py-2 rounded-full">
          <span>{getDate()}</span>
        </div>
      </div>
      {/* //      md:grid-cols-2 md-lg:grid-cols-3 xl:grid-cols-4 */}

      {/* <div className="grid grid-cols-2 mmd:grid-cols-4 grid-rows-3 gap-12 p-4 md:p-6 flex-grow"> */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-12 p-4 md:p-6 flex-grow">
        <div className={`md:col-span-2 lg:col-span-2 lg:row-span-1`}>
          <LineChart></LineChart>
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#49A283"
            teacher="Herr Dreyer"
            average={12.5}
            development={-2.5}
            hoursAWeek={3}
            subjectName="Biology"
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#4965A2"
            teacher="Frau Wes..."
            average={14.2}
            development={+1.14}
            hoursAWeek={6}
            subjectName="Math"
          />
        </div>

        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#49A283"
            teacher="Herr Dreyer"
            average={12.5}
            development={-12.5}
            hoursAWeek={3}
            subjectName="Biology"
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#A24955"
            teacher="Herr Dreyer"
            average={8.25}
            development={-2.14}
            hoursAWeek={3}
            subjectName="German"
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#969C46"
            teacher="Herr Polzin"
            average={9.5}
            hoursAWeek={3}
            development={0}
            subjectName="Geogr..."
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#49A283"
            teacher="Herr Dreyer"
            average={12.5}
            development={+1.5}
            hoursAWeek={3}
            subjectName="Biology"
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#49A283"
            teacher="Herr Dreyer"
            average={12.5}
            development={-12.5}
            hoursAWeek={3}
            subjectName="Biology"
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#49A283"
            teacher="Herr Dreyer"
            average={12.5}
            development={+1.5}
            hoursAWeek={3}
            subjectName="Biology"
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#2E6652"
            teacher="Herr Dreyer"
            average={13.33}
            development={1.14}
            hoursAWeek={3}
            subjectName="Physics"
          />
        </div>
        <div className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
          <SubjectItem
            subjectColor="#A24955"
            teacher="Herr Dreyer"
            average={8.25}
            development={-2.14}
            hoursAWeek={3}
            subjectName="German"
          />
        </div>
      </div>
    </div>
  )
}

interface SubjectItemProps {
  subjectName: string
  subjectColor: string
  teacher: string
  development: number
  average: number
  hoursAWeek: number
}

export function SubjectItem({
  subjectColor,
  teacher,
  development,
  average,
  hoursAWeek,
  subjectName
}: SubjectItemProps): JSX.Element {
  let developmentTextColor = '#FFFFFF'
  let developmentBackgroundColor = '#353C52'
  let developmentPrefix = '+'
  const formattedDevelopment = development.toFixed(1)

  if (development > 0) {
    developmentTextColor = '#4ADE80'
    developmentBackgroundColor = '#14532D'
    developmentPrefix = '+'
  } else if (development < 0) {
    developmentTextColor = '#F4A6A7'
    developmentBackgroundColor = '#7C5556'
    developmentPrefix = ''
  }

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return ''
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const truncatedSubjectName = truncateText(subjectName, 10)
  const truncatedTeacher = truncateText(teacher, 10)
  const hoursText = hoursAWeek ? `${hoursAWeek} hours a week` : ''
  const truncatedHoursText = truncateText(hoursText, 15)

  return (
    <div className="bg-[#15243B] rounded-3xl shadow-lg transition-all flex hover:shadow-xl hover:shadow-blue-900/20 h-full justify-between">
      <div style={{ backgroundColor: subjectColor }} className="rounded-3xl w-[17%] h-full"></div>
      <div className="p-4 flex flex-col items-end">
        <h2 className="text-[250%] font-bold truncate w-full text-right" title={subjectName}>
          {truncatedSubjectName}
        </h2>
        <div className="flex gap-4 items-center justify-end w-full">
          {hoursAWeek && (
            <p className="text-gray-400 font-bold truncate" title={`${hoursAWeek} hours a week`}>
              {truncatedHoursText}
            </p>
          )}
          <p className="text-gray-400 font-bold truncate" title={teacher}>
            {truncatedTeacher}
          </p>
        </div>
        <div className="flex flex-col justify-end items-end pt-5">
          <h2 className="text-4xl font-bold">Ø {average}</h2>
          <div className="flex items-center justify-end gap-4">
            <span
              className="text-sm font-bold ml-2 py-1 px-2 rounded-full whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                backgroundColor: developmentBackgroundColor,
                color: developmentTextColor,
                maxWidth: '100px'
              }}
              title="Last Month"
            >
              Last Month
            </span>
            <h2
              className="text-3xl font-bold"
              style={{ color: developmentTextColor }}
            >{`${developmentPrefix}${formattedDevelopment}`}</h2>
          </div>
        </div>
        <div className="flex-grow items-center pl-10 bg-[#353C52] mt-3 rounded-3xl flex justify-end">
          <h2 className="text-2xl font-bold">See More...</h2>
          <span className="text-8xl">
            <ArrowRight className="w-12 h-12" style={{ color: subjectColor }}></ArrowRight>
          </span>
        </div>
      </div>
    </div>
  )
}
