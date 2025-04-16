import { useState } from 'react'
import DropDown from '../shared/CostumDropDown'
import { Plus } from 'lucide-react'

export default function HomeWorkHeader(): JSX.Element {
  const [label, setLabel] = useState('week')
  const [isOpen, setIsOpen] = useState(false)

  const handleTimeFrameChange = (option: string): void => {
    setLabel(option)
    setIsOpen(false)
  }

  return (
    <header className="flex w-full items-center justify-between p-10">
      <section className="flex items-center gap-5 w-[80%]">
        <div className="primary-card flex min-w-[400px] w-[60%]">
          <button className="bg-[#353C52] rounded-3xl flex justify-center items-center p-3">
            <Plus className="w-12 h-12" />
          </button>
          <input
            type="text"
            className="primary-card placeholder:text-2xl w-full px-5 focus:outline-none text-white text-2xl font-bold"
            placeholder="Insert new Homework"
          />
        </div>
        <h2 className="text-3xl font-bold">2 open</h2>
      </section>
      <div className="bg-[#15243B] p-2 rounded-3xl">
        <DropDown
          options={['All', 'Day', 'Week']}
          handleChange={handleTimeFrameChange}
          defaultOption="week"
        />
      </div>
    </header>
  )
}
