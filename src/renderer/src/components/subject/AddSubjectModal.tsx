import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import InfoCard from '../subject-detail/InfoCard'
import { Paperclip, LetterText, AtSign, GraduationCap, CircleEllipsis, School } from 'lucide-react'
import { ConfigProvider, Input, ColorPicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'

interface AddSubjectModalProps {
  onClose: () => void
  onSubjectAdded?: () => void
}

export default function AddSubjectModal({
  onClose,
  onSubjectAdded
}: AddSubjectModalProps): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    teacherName: '',
    teacherEmail: '',
    room: '',
    category: 'Grundkurs',
    color: '#5FA0C2'
  })

  const handleSave = (field: string, value: string): void => {
    if (field === 'teacher') {
      setFormData((prev) => ({ ...prev, teacherName: value }))
    } else if (field === 'email') {
      setFormData((prev) => ({ ...prev, teacherEmail: value }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
    console.log('Form data updated:', formData)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const teacherCardRef = useRef<HTMLDivElement>(null)
  const roomCardRef = useRef<HTMLDivElement>(null)
  const categoryCardRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (): Promise<void> => {
    if (!formData.name || !formData.abbreviation || !formData.room) {
      setError('Subject name, room and abbreviation are required')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Convert data to match schema - teacher name & email are now stored directly in the subject
      const subjectData = {
        name: formData.name,
        abbreviation: formData.abbreviation,
        room: formData.room,
        category: formData.category,
        color: formData.color,
        teacherName: formData.teacherName || null,
        teacherEmail: formData.teacherEmail || null
      }

      console.log('Saving subject:', subjectData)

      const result = await window.api.postData('/api/subjects', subjectData)
      console.log('Subject saved:', result)

      if (onSubjectAdded) {
        onSubjectAdded()
      }

      onClose()
    } catch (err) {
      console.error('Failed to save subject:', err)
      setError('Failed to save subject. Please try again.')
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
  const focusTeacherCard = () => {
    if (teacherCardRef.current) {
      const editableDiv = teacherCardRef.current.querySelector('div.flex-grow')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click()
      }
    }
  }

  const focusRoomCard = () => {
    if (roomCardRef.current) {
      const editableDiv = roomCardRef.current.querySelector('div.flex-grow')
      if (editableDiv instanceof HTMLElement) {
        editableDiv.click()
      }
    }
  }

  const focusCategoryCard = () => {
    if (categoryCardRef.current) {
      const editableDiv = categoryCardRef.current.querySelector('div.flex-grow')
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
          <h2 className="text-3xl font-bold">Add New Subject</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#283249] rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-6 mb-8">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-5">
              <h2 className="text-2xl text-gray-400 font-bold">Subject Color:</h2>

              <ConfigProvider
                theme={{
                  components: {
                    ColorPicker: {
                      colorText: '#ffffff',
                      colorTextPlaceholder: 'gray',
                      colorBgElevated: '#323e5a',
                      colorBorder: 'transparent'
                    }
                  }
                }}
              >
                <ColorPicker
                  defaultValue={'#1677ff'}
                  size="large"
                  showText
                  onChange={(e) => handleSave('color', e.toHexString())}
                ></ColorPicker>
              </ConfigProvider>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] ">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: '#323e5a',
                  colorText: '#ffffff',
                  colorBorder: 'transparent',
                  colorTextPlaceholder: '#9CA3AF'
                }
              }
            }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-gray-400 font-bold">Exam Title:</h2>
              <Input
                placeholder="Subject Title"
                size="large"
                onChange={(e) => handleSave('name', e.target.value)}
                maxLength={35}
                style={{ height: '60px', fontSize: '1.2rem' }}
                prefix={
                  <div className="mr-2">
                    <Paperclip></Paperclip>
                  </div>
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-gray-400 font-bold">Abbreviation:</h2>
              <Input
                placeholder="Abbreviation"
                size="large"
                onChange={(e) => handleSave('abbreviation', e.target.value.toUpperCase())}
                value={formData.abbreviation.toUpperCase()}
                style={{ height: '60px', fontSize: '1.2rem' }}
                maxLength={4}
                prefix={
                  <div className="mr-2">
                    <CircleEllipsis></CircleEllipsis>
                  </div>
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-gray-400 font-bold">Teacher/Prof:</h2>
              <Input
                placeholder="Teacher Name"
                size="large"
                onChange={(e) => handleSave('teacher', e.target.value)}
                style={{ height: '60px', fontSize: '1.2rem' }}
                maxLength={35}
                prefix={
                  <div className="mr-2">
                    <GraduationCap></GraduationCap>
                  </div>
                }
              ></Input>
              <Input
                placeholder="Teacher E-Mail"
                size="large"
                onChange={(e) => handleSave('email', e.target.value)}
                style={{ height: '60px', fontSize: '1.2rem' }}
                maxLength={35}
                prefix={
                  <div className="mr-2">
                    <AtSign></AtSign>
                  </div>
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-gray-400 font-bold">Room:</h2>
              <Input
                placeholder="Room"
                size="large"
                style={{ height: '60px', fontSize: '1.2rem' }}
                onChange={(e) => handleSave('room', e.target.value)}
                maxLength={35}
                prefix={
                  <div className="mr-2">
                    <School></School>
                  </div>
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-gray-400 font-bold">Category:</h2>
              <Input
                placeholder="Category"
                size="large"
                style={{ height: '60px', fontSize: '1.2rem' }}
                onChange={(e) => handleSave('category', e.target.value)}
                maxLength={35}
                prefix={
                  <div className="mr-2">
                    <GraduationCap></GraduationCap>
                  </div>
                }
              ></Input>
            </div>
          </ConfigProvider>
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
            {isLoading ? 'Saving...' : 'Add Subject'}
          </button>
        </div>
      </div>
    </div>
  )
}
