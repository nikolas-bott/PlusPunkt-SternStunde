import { FilePenLine } from 'lucide-react'
import { SubjectInstance } from '../SubjectInstance'
import { SUBJECTS } from '@renderer/components/utils/mockData'

export default function ExamsCard(): JSX.Element {
  return (
    <div className="primary-card h-full group">
      <div className="p-4 w-full h-full flex flex-col">
        <div className="card-title">
          <FilePenLine className="w-10 h-10 md:w-14 md:h-14 text-secondary" />
          <h1>Exams</h1>
        </div>
        <div className="flex flex-col gap-4 flex-grow pl-3 justify-evenly">
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <div className="transition-transform duration-300 group-hover:translate-x-2">
              <SubjectInstance
                name={SUBJECTS.MATH.nameAbbreviation}
                color={SUBJECTS.MATH.color}
                content="Algebra"
                date="2 weeks"
              />
            </div>
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <SubjectInstance
              name={SUBJECTS.BIOLOGY.nameAbbreviation}
              color={SUBJECTS.BIOLOGY.color}
              content="Ökologie"
              date="1 month"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
