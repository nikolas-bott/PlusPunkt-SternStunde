import SubjectBadge from '../shared/SubjectBadge'
import { ChevronDown } from 'lucide-react'
import { MOCK_DATA } from '../utils/mockData'
import { useState, useEffect } from 'react'
import SubjectBadgeDropDown from '../shared/SubjectBadgeDropDown'
import { fetchSubjects } from '../utils/fetchData'
import { sub } from 'date-fns'

interface SubjectWithDetails {
  id: number
  name: string
  color: string
  teacher: string
  abbreviation: string
  average: number | null
  development: 'up' | 'down' | null
  hoursAWeek: number
}

interface HomeworkAddSelectionProps {
  updateSelectedSubject: (subjectId: number) => void
}

export default function HomeworkAddSelection({
  updateSelectedSubject
}: HomeworkAddSelectionProps): JSX.Element {
  const [selectedSubject, setSelectedSubject] = useState<[string, string]>(['???', '#353C52'])
  const [subjects, setSubjects] = useState<SubjectWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('TODAY')

  useEffect(() => {
    getSubjects()
  }, [])

  // Add a separate useEffect to handle subject selection when data is loaded
  useEffect(() => {
    if (subjects.length > 0) {
      setSelectedSubject([subjects[0].abbreviation, subjects[0].color])
      updateSelectedSubject(subjects[0].id)
    }
  }, [subjects, updateSelectedSubject])

  const getSubjects = async (): Promise<void> => {
    setLoading(true)
    try {
      const subjects: SubjectWithDetails[] = await fetchSubjects()

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

  const handleSubjectChange = (
    subjectAbbreviaton: string,
    subjectColor: string,
    subjectId: number
  ): void => {
    console.log('Selected subject:', subjectAbbreviaton, subjectColor, subjectId)
    updateSelectedSubject(subjectId)

    setSelectedSubject([subjectAbbreviaton, subjectColor])
  }

  const getSubjectsAsBadge = (): JSX.Element[] => {
    console.log('Subjects:', subjects)
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
          color={selectedSubject[1]}
          name={selectedSubject[0]}
          data={getSubjectsAsBadge()}
          raiseEvent={() => handleSubjectChange}
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
