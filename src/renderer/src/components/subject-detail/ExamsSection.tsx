import TimeRangeBadge from '../shared/TimeRangeBadge'

interface Exam {
  id: string | number
  title: string
  date: string
  type: string
  status: 'upcoming' | 'done'
  grade?: string | number
  subject: {
    name: string
  }
}

interface ExamsSectionProps {
  exams: Exam[]
}

export default function ExamsSection({ exams }: ExamsSectionProps): JSX.Element {
  const upcomingExams = exams.filter((exam) => exam.status === 'upcoming')
  const completedExams = exams.filter((exam) => exam.status === 'done')

  return (
    <div className="secondary-card p-4 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Grades/Exams</h2>
        <div className="flex gap-2">
          <button className="text-sm bg-[#5FA0C2] text-white px-4 py-2 rounded-lg hover:bg-[#4a8eaf] transition-colors">
            Statistics
          </button>
          <button className="text-sm bg-[#5FA0C2] text-white px-4 py-2 rounded-lg hover:bg-[#4a8eaf] transition-colors">
            + Add Exam
          </button>
        </div>
      </div>

      <div className="overflow-y-auto custom-scrollbar p-2 flex-grow">
        {/* Coming up section */}
        <div className="mb-5">
          <TimeRangeBadge
            startDate="Coming up..."
            state="neg"
            fontSize="text-xl"
            padding="py-2 px-4"
          />
        </div>

        {/* Upcoming exams */}
        <div className="space-y-3 mb-6">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="tertiary-card p-4 hover:bg-[#323e5a] transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{exam.title}</h3>
                  <p className="text-gray-400">{exam.date}</p>
                </div>
                <TimeRangeBadge startDate={exam.type} state="pos" />
              </div>
            </div>
          ))}
        </div>

        {/* Done section */}
        <div className="mb-5">
          <TimeRangeBadge startDate="Done" state="pos" fontSize="text-xl" padding="py-2 px-5" />
        </div>

        {/* Completed exams */}
        <div className="space-y-3">
          {completedExams.map((exam) => (
            <div key={exam.id} className="tertiary-card p-4 hover:bg-[#323e5a] transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{exam.title}</h3>
                  <p className="text-gray-400">{exam.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{exam.grade}P</span>
                  <TimeRangeBadge startDate={exam.type} state="pos" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
