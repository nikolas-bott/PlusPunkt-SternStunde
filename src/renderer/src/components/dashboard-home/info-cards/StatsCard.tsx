import { useState } from 'react'
import { Flame } from 'lucide-react'
import DropDown from '../../shared/CostumDropDown'

export function StatsCard(): JSX.Element {
  const [timeFrame, setTimeFrame] = useState('week')
  const [isOpen, setIsOpen] = useState(false)

  const handleTimeFrameChange = (option: string): void => {
    setTimeFrame(option)
    setIsOpen(false)
  }

  return (
    <div className="card h-full group">
      <div className="p-6 flex flex-col hover:text-[#5FA0C2]">
        <div className="flex justify-between items-center mb-5">
          <div className="flex text-4xl gap-4 items-center">
            <Flame className="w-14 h-14" />
            <h1>Stats</h1>
          </div>

          <DropDown
            options={['week', 'month', 'year']}
            handleChange={handleTimeFrameChange}
            defaultOption="week"
          />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <div>
            <h3 className="text-2xl text-gray-300">Homework done:</h3>
            <h1 className="text-4xl font-bold transition-transform duration-300 group-hover:translate-x-2">
              {timeFrame === 'week' ? '3/5' : timeFrame === 'month' ? '12/15' : '45/60'}
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
              {timeFrame === 'week' ? '1' : timeFrame === 'month' ? '4' : '25'}
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
