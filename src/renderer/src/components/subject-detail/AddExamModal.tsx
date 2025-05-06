import { useState, useEffect, useRef } from 'react'
import { X, Paperclip, LetterText, Clock } from 'lucide-react'
import { Exam, Subject } from '../../utils/dataAccess'
import { ConfigProvider, InputNumber, DatePicker, Radio, Select, Switch } from 'antd'
import dayjs from 'dayjs'

import Input from 'antd/es/input/Input'
import TextArea from 'antd/es/input/TextArea'
import SubjectBadge from '../shared/SubjectBadge'

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
    status: 'open'
  } as Exam)

  const [isExamOpen, setIsExamOpen] = useState(true)
  const [examType, setExamType] = useState()
  const [subjects, setSubjects] = useState<Subject[] | null>(null)

  const setSubjectsDetails = async (): Promise<void> => {
    const response: Subject[] = await window.api.getAllSubjects()

    if (response) {
      setSubjects(response)
    } else {
      console.error('Failed to fetch subject details')
      setSubjects(null)
    }
  }
  useEffect(() => {
    setSubjectsDetails()
  })

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
        return { ...prev, [field]: Number(value) }
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
        subjectId: Number(sujectId),
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
              <Select optionLabelProp="label" size="large" onChange={(value) => console.log(value)}>
                {subjects?.map((subject) => (
                  <Select.Option
                    key={subject.id}
                    value={subject.id}
                    label={<SubjectBadge subjectId={subject.id} size="sm" />}
                    size="large"
                  >
                    <SubjectBadge size="sm" subjectId={subject.id} />{' '}
                  </Select.Option>
                ))}
              </Select>
            </ConfigProvider>
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
              size="large"
              onChange={(e) => handleSave('title', e.target.value)}
              maxLength={35}
              prefix={
                <div className="mr-2">
                  <Paperclip></Paperclip>
                </div>
              }
            ></Input>

            <div className="relative w-full">
              <div className="absolute top-3 left-3 z-10 text-white">
                <LetterText size={20} />
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
          <div ref={dateCardRef}>
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

          <div className="flex justify-between w-full">
            {!isExamOpen && (
              <div ref={gradeCardRef} className="flex items-center gap-3 justify-start">
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
                    formatter={(value) =>
                      value !== undefined && value !== null ? `${value}P` : ''
                    }
                    parser={(displayValue) =>
                      displayValue ? Number(displayValue.replace('P', '')) : 0
                    }
                  />
                </ConfigProvider>
              </div>
            )}
            <div
              className={`flex gap-5 items-center h-[80px] ml-3 ${isExamOpen ? 'w-full' : 'w-[35%]'} justify-end mr-10`}
            >
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
