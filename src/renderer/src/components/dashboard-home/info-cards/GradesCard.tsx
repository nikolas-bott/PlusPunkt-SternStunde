import { GraduationCap } from 'lucide-react'
import DonutChartExample from '../DonutChart'
import { calculateTotalAverageOf, getGradeAverage } from '@renderer/components/utils/helperMethod'
import TimeRangeBadge from '@renderer/components/shared/TimeRangeBadge'
import { MOCK_DATA } from '@renderer/components/utils/mockData'
import { useEffect, useState } from 'react'

export function GradesCard(): JSX.Element {
  let state: 'neg' | 'pos' | 'neutral' = 'neutral'
  let developmentTextColor = '#FFFFFF'

  const [totalGradeAverage, setTotalGradeAverage] = useState(0)
  const [examsWithGrade, setExamsWithGrade] = useState('')

  const developmentAverage = calculateTotalAverageOf(MOCK_DATA.GRADES_SUBJECTS, 'development')
  const formattedDevelopment = Number(developmentAverage.toFixed(1))

  useEffect(() => {
    gradeAverage()
    getExamsWithGrade()
  }, [])
  const gradeAverage = async (): Promise<void> => {
    const average = await getGradeAverage(-1, true)
    setTotalGradeAverage(Number(average))
  }

  const getExamsWithGrade = async (): Promise<void> => {
    const response = await window.api.getAllExams()
    const allGrades = response.map((exam) => exam.grade).filter((grade) => grade !== null)

    setExamsWithGrade(`${allGrades.length}/${response.length}`)
  }

  if (formattedDevelopment > 0) {
    state = 'pos'
    developmentTextColor = '#4ADE80'
  } else if (formattedDevelopment < 0) {
    state = 'neg'
    developmentTextColor = '#F4A6A7'
  }

  return (
    <div className="primary-card h-full group">
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
                {totalGradeAverage ? 'Ø ' + totalGradeAverage : 'No grades found!'}
              </h1>
            </div>
            <div>
              <p className="text-gray-300 text-lg">Exams with grade:</p>
              <h1 className="text-3xl lg:text-4xl font-bold mt-1 transition-transform duration-300 group-hover:translate-x-2">
                {examsWithGrade}
              </h1>
            </div>
            <div>
              <p className="text-gray-300 text-lg">Development:</p>
              <div className="flex items-center ">
                <h2
                  className="text-4xl font-bold"
                  style={{ color: developmentTextColor }}
                >{`${state === 'pos' ? '+' : ''}${formattedDevelopment}`}</h2>
                <TimeRangeBadge startDate="Last month" state={state}></TimeRangeBadge>
              </div>
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
