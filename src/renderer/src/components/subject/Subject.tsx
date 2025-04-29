import LineChart from './LineChart'
import { LAYOUT } from '../utils/constants'
import DefaultHeading from '../shared/DefaultHeading'
import SubjectItem from './SubjectItem'
import AddSubjectModal from './AddSubjectModal'
import { useState, useEffect } from 'react'
import SubjectDetail from '../subject-detail/SubjectDetail'
import { fetchSubjects } from '../utils/fetchData'
import { Subject as SubjectSchema } from '../../utils/dataAccess'

interface SubjectWithDetails {
  id: number
  name: string
  color: string
  teacher: string
  average: number | null
  development: 'up' | 'down' | null
  hoursAWeek: number
}

// Component
export default function Subject(): JSX.Element {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [subjects, setSubjects] = useState<SubjectWithDetails[]>([])
  const [selectedSubject, setSelectedSubject] = useState<SubjectWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getSubjects = async (): Promise<void> => {
    setLoading(true)
    try {
      // const subjects: SubjectSchema[] = await fetchSubjects()
      const subjects: SubjectSchema[] = await window.api.getAllSubjects()

      const subjectsWithDetails: SubjectWithDetails[] = subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
        color: subject.color,
        teacher: subject.teacherName || 'No teacher assigned',
        average: Math.round(Math.random() * 10) + 0.5,
        development: Math.random() > 0.5 ? 'up' : 'down',
        hoursAWeek: 0
      }))

      if (subjectsWithDetails) {
        setSubjects(subjectsWithDetails)
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

  const handleSelectedSubjectChange = (
    subjectName: string,
    subjectColor: string,
    teacher: string,
    subjectId: number
  ): void => {
    setSelectedSubject({
      id: subjectId,
      name: subjectName,
      color: subjectColor,
      teacher: teacher || 'No teacher assigned',
      average: Math.random() * 100,
      development: Math.random() > 0.5 ? 'up' : 'down',
      hoursAWeek: 0
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
                  openDetail={handleSelectedSubjectChange}
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

      {isDetailOpen && selectedSubject && (
        <SubjectDetail
          subjectColor={selectedSubject.color}
          subjectName={selectedSubject.name}
          teacher={selectedSubject.teacher}
          subjectId={selectedSubject.id}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  )
}
