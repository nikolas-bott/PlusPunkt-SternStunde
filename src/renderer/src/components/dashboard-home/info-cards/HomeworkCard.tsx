import SubjectInstance from '../SubjectInstance'
import { BookMarked, ChevronRight } from 'lucide-react'

export default function HomeworkCard(): JSX.Element {
  return (
    <div className="card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <BookMarked className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
          <h1>Homework</h1>
        </div>
        <div className="flex flex-col gap-4 flex-grow pl-3 justify-evenly">
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="Math" color="#3B82F6" content="Buch S.12 nr.2" date="today" />
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="BIO" color="#10B981" content="Buch S.12 nr.2" date="1 day" />
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="INF" color="#8B5CF6" content="Buch S.12 nr.2" date="1 week" />
          </div>

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
