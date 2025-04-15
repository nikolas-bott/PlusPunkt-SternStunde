import { FilePenLine } from 'lucide-react'
import { SubjectInstance } from '../SubjectInstance'

export function ExamsCard(): JSX.Element {
  return (
    <div className="card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <FilePenLine className="w-10 h-10 md:w-14 md:h-14 text-secondary" />
          <h1>Exams</h1>
        </div>
        <div className="flex flex-col gap-4 flex-grow pl-3 justify-evenly">
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="Math" color="#3B82F6" content="Algebra" date="2 weeks" />
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance name="BIO" color="#10B981" content="Ökologie" date="1 month" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamsCard
