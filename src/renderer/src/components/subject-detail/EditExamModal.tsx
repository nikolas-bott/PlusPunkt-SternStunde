import { Exam, Subject } from '../../utils/dataAccess'
import { useEffect, useState } from 'react'
import SubjectBadge from '../shared/SubjectBadge'
import { Trash2, Clock } from 'lucide-react'
import InfoCard from './InfoCard'
import { InputNumber } from 'antd'
import { Input, ConfigProvider, Switch, DatePicker, Radio, Select } from 'antd'
import dayjs from 'dayjs'
import TextArea from 'antd/es/input/TextArea'

interface EditExamModalProps {
  examId: number
  subjectId: number
  onClose: () => void
  onExamUpdated: () => void
}

export default function EditExamModal({
  examId,
  subjectId,
  onClose,
  onExamUpdated
}: EditExamModalProps): JSX.Element {
  const [exam, setExamDetails] = useState<Exam | null>(null)
  const [subject, setSubject] = useState<Subject | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [isExamOpen, setIsExamOpen] = useState(true)
  const [examType, setExamType] = useState()
  const [error, setError] = useState('')

  const fetchDetails = async (): Promise<void> => {
    console.log('Fetching exam details for ID:', examId)
    try {
      const response = await window.api.getExamById(examId)
      const subjectResponse = await window.api.getSubjectById(subjectId)

      console.log('Exam details:', response)

      setSubject(subjectResponse)

      setExamDetails(response)
    } catch (error) {
      console.error('Error fetching exam details:', error)
      setError('Failed to fetch exam details')
    }
  }

  const handleSave = async (field: string, value: string): Promise<void> => {
    try {
      setExamDetails((prev) => (prev ? ({ ...prev, [field]: value } as Exam) : null))

      const updateData = { [field]: value }

      const result = await window.api.updateData(`/api/exams/${examId}`, updateData)
      console.log('Update result:', `/api/exams/${examId}`, updateData, result)

      if (!result) {
        const freshExam = await window.api.fetchData(`/api/exams/${examId}`)
        setExamDetails(freshExam)
      }
    } catch (error) {
      console.error('Error updating subject:', error)
    } finally {
      // Clear the message after 3 seconds
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [examId, subjectId])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-[#00000075] overflow-hidden">
      <div className="primary-card shadow-lg p-6 rounded-2xl">
        {error && (
          <div className="bg-red-500 text-white p-4 rounded">
            <p>{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="bg-gray-200 p-4 rounded">
            <p>Loading...</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex">
            <SubjectBadge subjectId={subjectId}></SubjectBadge>
            <h2 className="text-3xl font-bold">Edit Exam</h2>
          </div>
          <div className="ml-30">
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-[#7C5556] text-[#F4A6A7] px-4 py-2 rounded-lg hover:bg-[#8c6263] transition-colors"
            >
              <Trash2 size={20} />
              <span className="font-medium">Delete Exam</span>
            </button>
          </div>
        </div>
        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] mt-10">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold">Grade Type:</h3>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    colorBgContainer: '#323e5a',
                    colorText: '#ffffff',
                    colorBorder: 'transparent'
                  }
                }
              }}
            >
              <Radio.Group
                onChange={(value) => setExamType(value.target.value)}
                value={examType}
                size="large"
              >
                <Radio.Button value="option1">Option 1</Radio.Button>
                <Radio.Button value="option2">Option 2</Radio.Button>
                <Radio.Button value="other">Other</Radio.Button>
              </Radio.Group>
            </ConfigProvider>
            {examType === 'other' && (
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorBgContainer: '#323e5a',
                      colorText: '#ffffff',
                      colorBorder: 'transparent',
                      colorTextPlaceholder: '#ffffff',

                      colorBgElevated: '#323e5a',
                      optionSelectedBg: '#14532D'
                    }
                  }
                }}
              >
                <Select
                  size="large"
                  style={{ width: 200 }}
                  placeholder="Select an option"
                  value={undefined}
                  onChange={(value) => console.log('Selected:', value)}
                  options={[
                    { label: 'Custom Option 1', value: 'custom1' },
                    { label: 'Custom Option 2', value: 'custom2' },
                    { label: 'Custom Option 3', value: 'custom3' }
                  ]}
                ></Select>
              </ConfigProvider>
            )}
          </div>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: '#323e5a',
                  colorText: '#ffffff',
                  colorBorder: 'transparent',
                  colorTextPlaceholder: '#ffffff'
                }
              }
            }}
          >
            <Input
              placeholder="Exam Title"
              value={exam?.title}
              size="large"
              onChange={(e) => handleSave('title', e.target.value)}
              maxLength={35}
              prefix={<div className="mr-2">{/* <Paperclip></Paperclip> */}</div>}
            ></Input>

            <div className="relative w-full">
              <div className="absolute top-3 left-3 z-10 text-white">
                {/* <LetterText size={20} /> */}
              </div>
              <TextArea
                size="large"
                maxLength={100}
                onChange={(e) => handleSave('description', e.target.value)}
                placeholder="Description / Notes"
                style={{ height: 120, paddingLeft: '40px', maxHeight: 360, minHeight: 45 }}
              />
            </div>
          </ConfigProvider>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  DatePicker: {
                    colorBgContainer: '#323e5a',
                    colorText: '#ffffff',
                    activeBg: '#323e5a',
                    colorTextPlaceholder: 'gray',

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
                prefix={
                  <div className="mr-2">
                    <Clock></Clock>
                  </div>
                }
                className="transition-colors"
                defaultValue={dayjs(new Date(exam?.date || Date.now()))}
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
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold">Grade in points (0-15):</h3>
              <ConfigProvider
                theme={{
                  components: {
                    InputNumber: {
                      colorBgContainer: '#323e5a',

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
                  style={{
                    border: 'none',
                    color: '#ffffff',
                    width: '15%',
                    height: '50px',
                    textAlign: 'center'
                  }}
                  min={0}
                  max={15}
                  value={exam?.grade || 0}
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
          <div className={`flex items-center gap-5 justify-start`}>
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
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onExamUpdated}>
          Save Changes
        </button>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
