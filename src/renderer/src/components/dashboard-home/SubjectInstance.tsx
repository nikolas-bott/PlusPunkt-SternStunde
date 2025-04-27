import SubjectBadge from '../shared/SubjectBadge'
import TimeStamp from '../shared/TimeStamp'
import { useState, useEffect } from 'react'
import { Homework as HomeworkInterface, Subject } from '../../../utils/dataAccess'

interface InstanceProps {
  subjectId: number
  content: string
  date: Date
}

export function SubjectInstance({ subjectId, content, date }: InstanceProps): JSX.Element {
  const [subject, setSubject] = useState<Subject | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSubjectData = async (): Promise<void> => {
      try {
        setLoading(true)
        const subjects = await window.api.getAllSubjects()
        const foundSubject = subjects.find((s: Subject) => s.id === subjectId)
        setSubject(foundSubject || null)
      } catch (error) {
        console.error(`Error fetching subject (ID: ${subjectId}):`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjectData()
  }, [subjectId])

  // Default values if subject is not found
  const subjectName = subject ? subject.abbreviation : '???'
  const subjectColor = subject ? subject.color : '#787878'

  return (
    <div className="flex w-full flex-col sm:flex-row gap-2">
      <div
        className="secondary-card flex items-center p-3 flex-grow
        hover:bg-primary-light hover:translate-x-1 transition-all duration-300"
      >
        <SubjectBadge name={subjectName} color={subjectColor} subjectId={subjectId} />
        <h2 className="text-lg font-medium ml-1 truncate">{content}</h2>
      </div>
      <TimeStamp date={date} />
    </div>
  )
}

export default SubjectInstance
