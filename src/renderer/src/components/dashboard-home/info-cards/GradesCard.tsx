import { GraduationCap } from 'lucide-react'
import DonutChartExample from '../DonutChart'

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
