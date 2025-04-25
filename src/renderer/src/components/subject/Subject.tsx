import LineChart from './LineChart'
import { LAYOUT } from '../utils/constants'
import DefaultHeading from '../shared/DefaultHeading'
import SubjectItem from './SubjectItem'
import AddSubjectModal from './AddSubjectModal'
import { useState, useEffect } from 'react'
import SubjectDetail from '../subject-detail/SubjectDetail'
import { fetchSubjects } from '../utils/fetchData'

interface Subject {
  id: number
  name: string
  abbreviation: string
  room: string
  category: string
  color: string
  teacherName: string | null
  teacherEmail: string | null
}

interface SubjectWithDetails {
  id: number
  name: string
  color: string
  teacher: string
  average: number | null
  development: 'up' | 'down' | null
  hoursAWeek: number
}

interface SubjectDetailState {
  subjectName: string
  subjectColor: string
  teacher: string
  subjectId: number
}

// Component
export default function Subject(): JSX.Element {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [subjects, setSubjects] = useState<SubjectWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [subjectDetails, setSubjectDetails] = useState<SubjectDetailState>({
    subjectName: '',
    subjectColor: '',
    teacher: '',
    subjectId: 0
  })

  // Fetch subjects with statistics data

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

  // Initial data loading
  useEffect(() => {
    getSubjects()
  }, [])

  // Event handlers remain the same
  const handleCloseDetail = (): void => {
    setIsDetailOpen(false)
    getSubjects() // Refresh data after closing detail view
  }

  const handleOpenModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    getSubjects() // Refresh data after adding new subject
  }

  const openDetail = (
    subjectName: string,
    subjectColor: string,
    teacher: string,
    subjectId: number
  ): void => {
    setSubjectDetails({
      subjectName,
      subjectColor,
      teacher,
      subjectId
    })
    setIsDetailOpen(true)
  }

  // Render remains mostly the same
  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Subjects" />
      <div className="flex w-full justify-end">
        <button
          onClick={handleOpenModal}
          className="mr-10 active:border-0 bg-[#2e3346] text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#3a4056] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          <span className="text-xl">+</span> Add Subject
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-400">Loading subjects...</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 xl:gap-x-20 p-4 lg:p-8 overflow-y-auto custom-scrollbar">
          <div className={`md:col-span-2 lg:col-span-2 lg:row-span-1`}>
            <LineChart />
          </div>

          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <div key={subject.id} className={`md:col-span-1 lg:col-span-1 lg:row-span-1`}>
                <SubjectItem
                  subjectId={subject.id}
                  subjectColor={subject.color}
                  teacher={subject.teacher}
                  average={subject.average ?? 0}
                  development={subject.development ?? 'up'}
                  hoursAWeek={subject.hoursAWeek}
                  subjectName={subject.name}
                  openDetail={openDetail}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-400">
              No subjects found. Add your first subject!
            </div>
          )}
        </div>
      )}

      {isModalOpen && <AddSubjectModal onClose={handleCloseModal} onSubjectAdded={getSubjects} />}

      {isDetailOpen && (
        <SubjectDetail
          subjectColor={subjectDetails.subjectColor}
          subjectName={subjectDetails.subjectName}
          teacher={subjectDetails.teacher}
          onClose={handleCloseDetail}
          subjectId={subjectDetails.subjectId}
        />
      )}
    </div>
  )
}
