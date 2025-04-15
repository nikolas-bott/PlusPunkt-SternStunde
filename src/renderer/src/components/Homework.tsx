import { getDate } from '@renderer/assets/helperMethod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import DropDown from './CostumDropDown'

export default function Homework(): JSX.Element {
  const [label, setLabel] = useState('week')
  const [isOpen, setIsOpen] = useState(false)

  const handleTimeFrameChange = (option: string): void => {
    setLabel(option)
    setIsOpen(false)
  }

  return (
    <div className="h-[calc(100vh-50px)] w-full flex flex-col overflow-y-auto md:overflow-visible">
      <div className={`p-4 md:p-6 lg:p-8 flex items-center justify-between`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Homework</h1>
        <div className="bg-primary-dark px-4 py-2 rounded-full">
          <span>{getDate()}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 h-full ]">
        <div className="flex w-full items-center justify-between p-10">
          <div className="flex items-center gap-5 w-[80%]">
            <div className="bg-[#15243B] flex h-15 rounded-3xl min-w-[400px] w-[60%] ">
              <div className="bg-[#353C52] w-15 rounded-3xl">
                <span className="flex justify-center items-center h-full text-6xl">
                  <Plus className="w-12 h-12"></Plus>
                </span>
              </div>
              <input
                type="text"
                className="bg-[#15243B] placeholder:text-2xl w-full pl-5 pr-5 active:outline-none focus:outline-none text-white text-2xl font-bold h-full rounded-3xl"
                placeholder="Insert new Homework"
              ></input>
            </div>
            <h2 className="text-3xl font-bold">2 open</h2>
          </div>
          <div className="bg-[#15243B] p-2 rounded-3xl flex items-center">
            <DropDown
              options={['All', 'Day', 'Week']}
              handleChange={handleTimeFrameChange}
              defaultOption="week"
            ></DropDown>
          </div>
        </div>
      </div>
    </div>
  )
}
