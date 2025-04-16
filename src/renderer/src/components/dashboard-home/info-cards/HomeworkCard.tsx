import SubjectInstance from '../SubjectInstance'
import { BookMarked, ChevronRight } from 'lucide-react'
import { MOCK_DATA } from '@renderer/components/utils/mockData'

export default function HomeworkCard(): JSX.Element {
  return (
    <div className="primary-card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <BookMarked className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
          <h1>Homework</h1>
        </div>
        <div className="flex flex-col gap-4 max-h-[31vh] flex-grow pl-3 justify-evenly transition-transform duration-300 group-hover:translate-x-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {MOCK_DATA.HOMEWORK.filter((subject) => subject.status === 'open')
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 8)
            .map((subject) => (
              <SubjectInstance
                key={subject.id}
                name={subject.subject.nameAbbreviation}
                color={subject.subject.color}
                content={subject.title}
                date={subject.dueDate}
              />
            ))}
        </div>
        <button
          className="self-end mt-5 bg-[#283249] hover:bg-[#3a4c75] px-4 py-2 rounded-lg
            hover:text-yellow-200 hover:translate-x-0.5 transition-all duration-300 flex items-center gap-2"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
