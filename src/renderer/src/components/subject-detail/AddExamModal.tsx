import React, { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import InfoCard from './InfoCard'
import { Exam } from '../../utils/dataAccess'
import { ConfigProvider, InputNumber, DatePicker } from 'antd'
import dayjs from 'dayjs'

import { format } from 'date-fns'
import { Switch } from 'antd'

interface AddExamModalProps {
  onClose: () => void
  sujectId: number
  onExamAdded?: () => void
}

export default function AddExamModal({
  onClose,
  onExamAdded,
  sujectId
}: AddExamModalProps): JSX.Element {
  const [exam, setExamDetails] = useState<Exam | null>({
    title: '',
    date: new Date().getTime(),
    status: 'open',
    subjectId: sujectId
  } as Exam)

  const [isExamOpen, setIsExamOpen] = useState(true)

  const handleSave = (field: string, value: string): void => {
    console.log('Field:', field)
    if (field === 'grade') {
      console.log('Grade field updated:', value, exam?.grade)

      setExamDetails((prev) => {
        if (!prev) return prev
        return { ...prev, [field]: Number(value) }
      })
      return
    }
    if (field === 'date') {
      console.log('Date field updated:', value)
      setExamDetails((prev) => {
        if (!prev) return prev
        return { ...prev, [field]: value }
      })
      console.log(exam)
      return
    }

    setExamDetails((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
    console.log('Exam details updated:', exam)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const dateCardRef = useRef<HTMLDivElement>(null)
  const gradeCardRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (): Promise<void> => {
    if (!exam?.title || !exam.date) {
      console.log('Exam details are incomplete:', exam)
      setError('Exam title and date are required')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Ensure proper data types before sending to API
      const examToSave = {
        ...exam,
        title: String(exam.title),
        grade: Number(exam.grade),
        date: Number(exam.date),
        status: isExamOpen ? 'open' : 'done',
        type: 'exam'
      }

      console.log('Saving exam:', examToSave)

      const result = await window.api.postData('/api/exams', examToSave)
      console.log('Exam saved:', result)

      if (onExamAdded) {
        onExamAdded()
      }

      onClose()
    } catch (err) {
      console.error('Failed to save exam:', err)
      setError('Failed to save exam. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Functions to focus each card's first editable field
  const focusDateCard = () => {
    if (dateCardRef.current) {
      const editableDiv = dateCardRef.current.querySelector('div.flex-grow')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click()
      }
    }
  }

  const focusGradeCard = () => {
    if (gradeCardRef.current) {
      const editableDiv = gradeCardRef.current.querySelector('div.flex-grow')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click()
      }
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000075] overflow-hidden"
      onClick={() => onClose()}
    >
      <div
        className="primary-card w-[800px] h-[95vh] overflow-hidden p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Add New Exam</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#283249] rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] ">
          <InfoCard
            heading="Exam Title"
            field="title"
            value={exam?.title || ''}
            onSave={handleSave}
            autoFocus={true}
            onFieldSubmit={focusDateCard}
          />
          <div ref={dateCardRef}>
            <ConfigProvider
              theme={{
                components: {
                  DatePicker: {
                    colorBgContainer: '#323e5a',
                    colorText: '#ffffff',
                    colorBorder: 'transparent',
                    hoverBg: '#323e5a',
                    hoverBorderColor: 'transparent',
                    activeBg: '#323e5a',

                    // --- Popup Calendar Styles ---
                    colorBgElevated: '#323e5a', // Background of the popup calendar
                    colorTextHeading: '#ffffff', // Color for "Jan 2025", "Su Mo Tu..."
                    colorTextDisabled: 'gray', // Color for dates outside the current month

                    // --- Day Cell Styles ---
                    cellHoverBg: '#2a344d', // Background of day cell on hover
                    colorPrimary: '#14532D' // Background color for the selected day
                  }
                }
              }}
            >
              <DatePicker
                className="secondary-card transition-colors"
                defaultValue={dayjs('01/01/2025', 'DD/MM/YYYY')}
                format={'DD/MM/YYYY'}
                size={'large'}
                style={{
                  width: '100%',
                  height: '70px',
                  border: 'none',
                  color: '#ffffff'
                }}
                onSubmit={(date) => {
                  handleSave('date', date.valueOf().toString())
                }}
                onChange={(date) => {
                  handleSave('date', date.valueOf().toString())
                }}
              />
            </ConfigProvider>
          </div>

          {!isExamOpen && (
            <div ref={gradeCardRef}>
              <ConfigProvider
                theme={{
                  components: {
                    InputNumber: {
                      hoverBg: '#323e5a',
                      hoverBorderColor: 'transparent',
                      handleBg: '#323e5a',
                      handleBorderColor: '#323e5a',
                      handleHoverColor: '#ffffff',
                      activeBg: '#323e5a',
                      colorText: '#ffffff',
                      fontSize: 30
                    }
                  }
                }}
              >
                <InputNumber
                  className="secondary-card transition-colors"
                  style={{
                    border: 'none',
                    color: '#ffffff',
                    width: '15%',
                    height: '50px',
                    textAlign: 'center'
                  }}
                  min={0}
                  max={15}
                  // value={exam?.grade || 8}
                  onSubmit={(grade) => {
                    console.log('Grade submitted:', grade)
                    handleSave('grade', String(grade))
                  }}
                  onChange={(grade) => {
                    console.log('Grade submitted:', grade)
                    handleSave('grade', String(grade))
                  }}
                  placeholder="Enter grade (0-15)"
                  formatter={(value) => (value !== undefined && value !== null ? `${value}P` : '')}
                  parser={(displayValue) => (displayValue ? displayValue.replace('P', '') : '')}
                />
              </ConfigProvider>
            </div>
          )}
          <div className="flex gap-5 items-center h-[80px] ml-3">
            <h3 className="font-bold text-2xl">Exam open: </h3>
            <Switch
              checked={isExamOpen}
              onChange={() => setIsExamOpen(!isExamOpen)}
              className="w-10"
              style={{
                backgroundColor: isExamOpen ? '#5FA0C2' : '#42485f',
                borderRadius: '12px',
                transition: 'background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isExamOpen ? 'flex-end' : 'flex-start',
                transform: 'scale(1.5)'
              }}
            ></Switch>
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#283249] hover:bg-[#323e5a] rounded-lg transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#5FA0C2] hover:bg-[#4a8eaf] rounded-lg transition-colors active:border-0 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Add Exam'}
          </button>
        </div>
      </div>
    </div>
  )
}
