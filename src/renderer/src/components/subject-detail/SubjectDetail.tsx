import { useState, useMemo } from 'react'
import { useApp } from '@renderer/AppProvider'
import { EXAMS } from '../utils/mockData'

import SubjectDetailHeader from './SubjectDetailHeader'

import ExamsSection from './ExamsSection'
import InfoCard from './InfoCard'

interface SubjectDetailProps {
  subjectName: string
  subjectColor: string
  teacher: string
}

export default function SubjectDetail({
  subjectName,
  subjectColor,
  teacher
}: SubjectDetailProps): JSX.Element {
  const { closeFullScreenView } = useApp()

  // State for editable fields
  const [editValues, setEditValues] = useState({
    name: subjectName,
    abbreviation: subjectName.slice(0, 3),
    teacher,
    email: `${teacher.toLowerCase().replace(' ', '.')}@...`,
    room: '201',
    category: 'Grundkurs'
  })

  // Filter exams for the current subject
  const subjectExams = useMemo(() => {
    return EXAMS.filter((exam) => exam.subject.name === subjectName)
  }, [subjectName])

  const handleUpdateField = (field: string, value: string): void => {
    setEditValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleDeleteSubject = (): void => {
    closeFullScreenView()
  }

  return (
    <div className="bg-[#1e1e1e] h-[calc(100vh-50px)] w-full overflow-hidden flex justify-center">
      <div className="xl:w-7xl lg:w-5xl flex h-full overflow-hidden primary-card">
        <div className="w-16 h-full">
          <div className="h-full rounded-3xl" style={{ backgroundColor: subjectColor }}></div>
        </div>
        <div className="p-6 flex flex-col w-full overflow-hidden">
          <SubjectDetailHeader
            title={editValues.name}
            abbreviation={editValues.abbreviation}
            color={subjectColor}
            onBack={closeFullScreenView}
            onDelete={handleDeleteSubject}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden h-[calc(100%-120px)]">
            <div className="space-y-6 overflow-auto pr-2 custom-scrollbar">
              <InfoCard
                heading="Subject name"
                field="name"
                value={editValues.name}
                onSave={handleUpdateField}
                heading1="Abbreviation / Color"
                field1="abbreviation"
                value1={editValues.abbreviation}
              ></InfoCard>
              <InfoCard
                heading="Teacher / Prof"
                field="teacher"
                value={editValues.teacher}
                onSave={handleUpdateField}
                heading1="Email"
                field1="email"
                value1={editValues.email}
                type1="email"
              ></InfoCard>
              <InfoCard
                heading="Room"
                field="room"
                value={editValues.room}
                onSave={handleUpdateField}
              ></InfoCard>
              <InfoCard
                heading="Category"
                field="category"
                value={editValues.category}
                onSave={handleUpdateField}
              ></InfoCard>
            </div>
            <div className="overflow-hidden flex flex-col">
              <ExamsSection exams={subjectExams} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
