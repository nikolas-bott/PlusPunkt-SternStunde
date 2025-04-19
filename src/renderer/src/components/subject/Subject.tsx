import LineChart from './LineChart'
import { LAYOUT } from '../utils/constants'
import { MOCK_DATA } from '../utils/mockData'
import DefaultHeading from '../shared/DefaultHeading'
import SubjectItem from './SubjectItem'
import AddSubjectModal from './AddSubjectModal'
import { useState } from 'react'
import SubjectDetail from '../subject-detail/SubjectDetail'

export default function Subject(): JSX.Element {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [subjectDetials, setSubjectDetails] = useState({
    subjectName: '',
    subjectColor: '',
    teacher: ''
  })

  const handleCloseDetail = (): void => {
    setIsDetailOpen(false)
  }

  const handleOpenModal = (): void => {
    console.log('Test')
    setIsModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
  }

  function openDetail(subjectName: string, subjectColor: string, teacher: string): void {
    console.log('Test')
    setSubjectDetails({
      subjectName: subjectName,
      subjectColor: subjectColor,
      teacher: teacher
    })
    setIsDetailOpen(true)
  }

  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Subjects" />
      <div className="flex w-full justify-end">
        <button
          onClick={handleOpenModal}
          className="mr-10 active:border-0 bg-[#2e3346] text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#3a4056] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          <span className="text-xl">+</span> Add Subject
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 xl:gap-x-20 p-4 lg:p-8 overflow-y-auto custom-scrollbar">
        <div className={`md:col-span-2 lg:col-span-2 lg:row-span-1`}>
          <LineChart></LineChart>
        </div>

        {MOCK_DATA.GRADES_SUBJECTS.map((subject, index) => (
          <div key={index} className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
            <SubjectItem
              subjectColor={subject.subject.color}
              teacher={subject.subject.teacher}
              average={subject.average}
              development={subject.development}
              hoursAWeek={subject.hoursAWeek}
              subjectName={subject.subject.name}
              openDetail={openDetail}
            />
          </div>
        ))}
      </div>

      {isModalOpen && <AddSubjectModal onClose={handleCloseModal} />}
      {isDetailOpen && (
        <SubjectDetail
          subjectColor={subjectDetials.subjectColor}
          subjectName={subjectDetials.subjectName}
          teacher={subjectDetials.teacher}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  )
}
