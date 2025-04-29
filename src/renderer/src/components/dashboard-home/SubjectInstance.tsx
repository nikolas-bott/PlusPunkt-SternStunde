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
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [subjectDetails, setSubjectDetails] = useState<{
    name: string
    color: string
    teacherName: string
  }>({
    name: 'Loading...',
    color: '#ccc',
    teacherName: 'Loading...'
  })

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true)

      // Use our new direct data access methods to get homework and subjects
      const subjectItems = await window.api.getAllSubjects()
      setSubjects(subjectItems)

      // Once we have subjects, find and set the details for this specific subjectId
      const subject = subjectItems.find((s) => s.id === subjectId)
      if (subject) {
        setSubjectDetails({
          name: subject.name || 'Unknown Subject',
          color: subject.color || '#ccc',
          teacherName: subject.teacherName || 'Unknown Teacher'
        })
      } else {
        setSubjectDetails({
          name: 'Unknown Subject',
          color: '#ccc',
          teacherName: 'Unknown Teacher'
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setSubjects([])
      setSubjectDetails({
        name: 'Error Loading',
        color: '#ff0000',
        teacherName: 'Error Loading'
      })
    } finally {
      setLoading(false)
    }
  }

  // Fetch data initially and when subjectId changes
  useEffect(() => {
    fetchData()
  }, [subjectId])

  return (
    <div className="flex w-full flex-col sm:flex-row gap-2">
      <div
        className="secondary-card flex items-center p-3 flex-grow
        hover:bg-primary-light hover:translate-x-1 transition-all duration-300"
      >
        <SubjectBadge subjectId={subjectId} />
        <h2 className="text-lg font-medium ml-1 truncate">{content}</h2>
      </div>
      <TimeStamp date={date} />
    </div>
  )
}

export default SubjectInstance
