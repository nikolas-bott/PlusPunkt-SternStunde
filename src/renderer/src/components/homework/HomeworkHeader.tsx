import { useState, useRef, RefObject } from 'react'
import DropDown from '../shared/CostumDropDown'
import { Plus, ChevronDown } from 'lucide-react'
import HomeworkModal from './HomeworkModal'
import SubjectBadge from '../shared/SubjectBadge'
import { MOCK_DATA } from '../utils/mockData'
import { set } from 'date-fns'

export default function HomeWorkHeader(): JSX.Element {
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false)
  const [inputClicked, setInputClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onHomeWorkModalClose = (): void => {
    setIsHomeworkModalOpen(false)
  }
  const onHomeWorkModalSubmit = (): void => {
    console.log('Submitted...')
    setIsHomeworkModalOpen(false)
  }

  const handleTimeFrameChange = (): void => {
    /* Keine Lust */
  }

  const handleSubmit = async (): Promise<void> => {
    /* Keine Lust */
  }

  return (
    // <header className="flex w-full items-center justify-between p-10">
    <header className="grid grid-cols-6 grid-rows-2">
      <section
        className={`flex items-center gap-5 col-span-4 ${inputClicked ? 'row-span-2' : 'row-span-1'} primary-card flex-col`}
      >
        <div
          className={`flex min-w-[400px] flex-col w-[95%] ${!inputClicked && 'rounded-b-2xl'} w-full`}
        >
          <div className="flex justify-end row-span-1 w-full">
            <input
              type="text"
              className="placeholder:text-2xl w-full px-5 focus:outline-none text-white text-2xl font-bold"
              placeholder="Insert new Homework"
              onFocus={() => {
                setInputClicked(true)
              }}
              onChange={(e) => {
                e.target.value.length > 0 ? setInputClicked(true) : setInputClicked(false)
                console.log(e.target.value)
              }}
            />
            <button className="bg-[#353C52] rounded-3xl flex justify-center items-center p-3">
              <Plus className="w-12 h-12" onClick={() => setIsHomeworkModalOpen(true)} />
            </button>
          </div>
          {inputClicked && (
            <div className="flex p-2 items-center pb-6">
              <h2 className="text-[#353C52] text-2xl font-bold px-5">Subject:</h2>
              <div className="pl-4 pr-4 flex justify-center ">
                <SubjectBadge color={MOCK_DATA.SUBJECTS.MATH.color} name="MATH"></SubjectBadge>
                <SubjectBadge color={MOCK_DATA.SUBJECTS.BIOLOGY.color} name="BIO"></SubjectBadge>
                <SubjectBadge color={'#353C52'} name="..." dropdown={true}></SubjectBadge>
              </div>
              <h2 className="text-[#353C52] text-2xl font-bold">Until:</h2>
              <span
                className={`pos-card text-lg items-center p-2 font-bold ml-2 rounded-full whitespace-nowrap overflow-hidden text-ellipsis text-center gap-2 flex`}
                title="Last Month"
              >
                TODAY
                <ChevronDown size={32}> </ChevronDown>
              </span>
            </div>
          )}
        </div>
      </section>
      <section
        className="flex col-span-2 justify-between items-center ml-6 mr-6"
        onClick={() => setInputClicked(false)}
      >
        <h2 className="text-3xl font-bold">2 open</h2>

        <div className="bg-[#15243B] p-2 rounded-3xl">
          <DropDown
            options={['All', 'Day', 'Week']}
            handleChange={handleTimeFrameChange}
            defaultOption="week"
          />
        </div>
      </section>
      <section className="col-span-2 row-span-2" onClick={() => setInputClicked(false)}></section>
      {isHomeworkModalOpen && (
        <HomeworkModal
          onClose={() => onHomeWorkModalClose()}
          onHomeworkAdded={() => onHomeWorkModalSubmit()}
        ></HomeworkModal>
      )}
    </header>
  )
}
