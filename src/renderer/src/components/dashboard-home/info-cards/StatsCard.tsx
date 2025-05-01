import { useEffect, useState } from 'react'
import { Flame } from 'lucide-react'
import DropDown from '../../shared/CostumDropDown'
import { Exam, Homework } from '../../../utils/dataAccess'

export function StatsCard(): JSX.Element {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week')
  const [isOpen, setIsOpen] = useState(false)
  const [examsWritten, setExamsWritten] = useState(0)
  const [homeworkDone, setHomeworkDone] = useState('0/0')

  const handleTimeFrameChange = (option: 'week' | 'month' | 'year'): void => {
    setTimeFrame(option)
    setIsOpen(false)
  }

  useEffect(() => {
    getExamsWritten(timeFrame)
    getHomeworkDone(timeFrame)
  }, [timeFrame])

  const getTimeFrameInMs = (timeFrame: 'week' | 'month' | 'year'): number => {
    switch (timeFrame) {
      case 'week':
        return 7 * 24 * 60 * 60 * 1000
      case 'month':
        return 30 * 24 * 60 * 60 * 1000
      case 'year':
        return 365 * 24 * 60 * 60 * 1000
      default:
        return 0
    }
  }

  const getExamsWritten = async (timeFrame: 'week' | 'month' | 'year'): Promise<void> => {
    const exams = await window.api.getAllExams()
    const examsWritten: Exam[] = []

    exams.forEach((exam) => {
      if (exam.date > Date.now() - getTimeFrameInMs(timeFrame) && exam.status === 'done')
        examsWritten.push(exam)
    })

    setExamsWritten(examsWritten.length)
  }

  const getHomeworkDone = async (timeFrame: 'week' | 'month' | 'year'): Promise<void> => {
    const homework = await window.api.getAllHomework()
    const homeworkDone: Homework[] = []
    homework.forEach((homework) => {
      if (homework.dueDate > Date.now() - getTimeFrameInMs(timeFrame) && homework.status === 'done')
        homeworkDone.push(homework)
    })
    setHomeworkDone(`${homeworkDone.length}/${homework.length}`)
  }

  return (
    <div className="primary-card h-full group">
      <div className="p-6 flex flex-col hover:text-[#5FA0C2]">
        <div className="flex justify-between items-center mb-5">
          <div className="flex text-4xl gap-4 items-center">
            <Flame className="w-14 h-14" />
            <h1>Stats</h1>
          </div>

          <DropDown
            options={['week', 'month', 'year']}
            handleChange={(option: string) =>
              handleTimeFrameChange(option as 'week' | 'month' | 'year')
            }
            defaultOption="week"
          />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <div>
            <h3 className="text-2xl text-gray-300">Homework done:</h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2">
              {homeworkDone}
            </h1>
          </div>
          <div>
            <h3 className="text-2xl text-gray-300">
              {timeFrame === 'week' ? 'Weekly' : timeFrame === 'month' ? 'Monthly' : 'Yearly'}{' '}
              hours:
            </h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2">
              {timeFrame === 'week' ? '32' : timeFrame === 'month' ? '128' : '1560'}
            </h1>
          </div>
          <div>
            <h3 className="text-2xl text-gray-300">Exams written:</h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2">
              {examsWritten}
            </h1>
          </div>
          <div>
            <h3 className="text-2xl text-gray-300">Mood: </h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2 group-hover:-rotate-5">
              {timeFrame === 'week' ? '😀' : timeFrame === 'month' ? '😎' : '🤯'}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
