import SubjectBadge from '../shared/SubjectBadge'
import { ChevronDown } from 'lucide-react'
import { MOCK_DATA } from '../utils/mockData'
import { useState, useEffect } from 'react'
import SubjectBadgeDropDown from '../shared/SubjectBadgeDropDown'
import { fetchSubjects } from '../utils/fetchData'
import { set, sub } from 'date-fns'
import { Subject } from '../../utils/dataAccess'

interface HomeworkAddSelectionProps {
  updateSelectedSubject: (subjectId: number) => void
}

export default function HomeworkAddSelection({
  updateSelectedSubject
}: HomeworkAddSelectionProps): JSX.Element {
  const [selectedSubject, setSelectedSubject] = useState<[string?, string?, number?]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSubjects()
  }, [])

  // Initialize selected subject once when subjects are first loaded
  useEffect(() => {
    if (subjects.length > 0 && selectedSubject.length === 0) {
      const initialSubject = subjects[0]
      setSelectedSubject([initialSubject.abbreviation, initialSubject.color, initialSubject.id])
      updateSelectedSubject(initialSubject.id)
    }
  }, [subjects]) // Only depend on subjects changing

  const getSubjectById = (subjectId: number): Subject | undefined => {
    return subjects.find((subject) => subject.id === subjectId)
  }

  const getSubjects = async (): Promise<void> => {
    setLoading(true)
    try {
      const subjects: Subject[] = await window.api.getAllSubjects()

      if (subjects) {
        setSubjects(subjects)
      } else {
        setError('No subjects found')
      }
    } catch (err) {
      console.error('Failed to fetch subjects:', err)
      setError('Failed to load subjects')
    } finally {
      setLoading(false)
    }
  }

  const handleSubjectChange = (subjectId: number): void => {
    console.log('Selected subject handleChange:' + subjectId)

    const subject = getSubjectById(subjectId)

    console.log('Settings selected subject to: ', subject)
    setSelectedSubject([subject?.abbreviation || '???', subject?.color || '#353C52', subjectId])
    updateSelectedSubject(subjectId)
  }

  const getSubjectsAsBadge = (): JSX.Element[] => {
    return subjects.map((subject) => (
      <SubjectBadge
        key={subject.id}
        name={subject.abbreviation}
        color={subject.color}
        subjectId={subject.id}
        raiseEvent={handleSubjectChange}
      />
    ))
  }

  return (
    <div className="flex p-2 items-center pb-6">
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}
      <h2 className="text-[#353C52] text-2xl font-bold px-5">Subject:</h2>
      <div className="pl-4 pr-4 flex justify-center ">
        <SubjectBadgeDropDown
          color={selectedSubject[1] || '#353C52'}
          name={selectedSubject[0] || '???'}
          data={getSubjectsAsBadge()}
          raiseEvent={handleSubjectChange}
          disable={subjects.length === 0}
        />
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
  )
}
