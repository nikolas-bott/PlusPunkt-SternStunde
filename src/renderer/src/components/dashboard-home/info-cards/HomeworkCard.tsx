import SubjectInstance from '../SubjectInstance'
import { BookMarked, ChevronRight } from 'lucide-react'
import { SUBJECTS } from '@renderer/components/utils/mockData'

export default function HomeworkCard(): JSX.Element {
  return (
    <div className="primary-card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <BookMarked className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
          <h1>Homework</h1>
        </div>
        <div className="flex flex-col gap-4 flex-grow pl-3 justify-evenly transition-transform duration-300 group-hover:translate-x-2">
          <SubjectInstance
            name={SUBJECTS.MATH.nameAbbreviation}
            color={SUBJECTS.MATH.color}
            content="Buch S.12 nr.2"
            date="today"
          />
          <SubjectInstance
            name={SUBJECTS.BIOLOGY.nameAbbreviation}
            color={SUBJECTS.BIOLOGY.color}
            content="Buch S.12 nr.2"
            date="1 day"
          />
          <SubjectInstance
            name={SUBJECTS.INFORMATICS.nameAbbreviation}
            color={SUBJECTS.INFORMATICS.color}
            content="Buch S.12 nr.2"
            date="1 week"
          />
          <button
            className="self-end mt-2 bg-[#283249] hover:bg-[#3a4c75] px-4 py-2 rounded-lg
            hover:text-yellow-200 hover:translate-x-1 transition-all duration-300 flex items-center gap-2"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
