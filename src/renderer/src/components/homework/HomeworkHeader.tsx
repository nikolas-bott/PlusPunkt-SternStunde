import { useState } from 'react'
import DropDown from '../shared/CostumDropDown'
import { Plus } from 'lucide-react'
import HomeworkAddSelection from './HomeworkAddSelection'

interface HomeWorkSchema {
  id: number
  title: string
  description: string
  dueDate: string
  status: 'open' | 'done'
  subjectId: number
}

interface HomeworkHeaderProps {
  onHomeworkAdded?: () => void
}

export default function HomeWorkHeader({ onHomeworkAdded }: HomeworkHeaderProps): JSX.Element {
  const [currentInput, setCurrentInput] = useState('')
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false)
  const [inputClicked, setInputClicked] = useState(false)
  const [formData, setFormData] = useState<HomeWorkSchema>()
  const [selectedSubject, setSelectedSubject] = useState<number>()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const onHomeWorkModalClose = (): void => {
    setIsHomeworkModalOpen(false)
  }

  const onHomeWorkModalSubmit = (): void => {
    console.log('Submitted...')
    setIsHomeworkModalOpen(false)
    // Call the callback to refresh the data
    if (onHomeworkAdded) {
      onHomeworkAdded()
    }
  }

  const handleTimeFrameChange = (): void => {
    /* Keine Lust */
  }

  const handleSubmit = async (value: string): Promise<void> => {
    if (!value) return
    console.log('Homework submitted')

    // Validate if a subject is selected
    if (!selectedSubject) {
      setError('Please select a subject for the homework')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Don't set the ID - let the backend generate it
      const homeworkData = {
        title: value,
        description: '',
        dueDate: new Date().toISOString(), // Format date as ISO string for API
        status: 'open',
        subjectId: selectedSubject
      }

      console.log('Saving homework:', homeworkData)

      const result = await window.api.postData('/api/homework', homeworkData)
      console.log('Homework saved:', result)

      // Clear input and reset UI state after successful submission
      setCurrentInput('')
      setInputClicked(false)

      // Call the callback to refresh the data
      if (onHomeworkAdded) {
        onHomeworkAdded()
      }
    } catch (err) {
      console.error('Failed to save homework:', err)
      setError('Failed to save homework. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateSelectedSubject = (subjectId: number): void => {
    console.log('Selected subject ID:', subjectId)
    setSelectedSubject(subjectId)
  }

  return (
    // <header className="flex w-full items-center justify-between p-10">
    <header className="grid grid-cols-6 grid-rows-2">
      <section
        className={`flex items-center gap-5 col-span-4 ${inputClicked ? 'row-span-2' : 'row-span-1'} primary-card flex-col`}
      >
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}
        <div
          className={`flex min-w-[400px] flex-col w-[95%] ${!inputClicked && 'rounded-b-2xl'} w-full`}
        >
          <div className="flex justify-end row-span-1 w-full">
            <input
              type="text"
              className="placeholder:text-2xl w-full px-5 focus:outline-none text-white text-2xl font-bold"
              placeholder="Insert new Homework"
              onFocus={() => {
                setInputClicked(true)
              }}
              onChange={(e) => {
                e.target.value.length > 0 ? setInputClicked(true) : setInputClicked(false)
                setCurrentInput(e.target.value)
              }}
              value={currentInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(currentInput)
                }
              }}
            />
            <button className="bg-[#353C52] rounded-3xl flex justify-center items-center p-3">
              <Plus className="w-12 h-12" onClick={() => setIsHomeworkModalOpen(true)} />
            </button>
          </div>
          {inputClicked && <HomeworkAddSelection updateSelectedSubject={updateSelectedSubject} />}
        </div>
      </section>
      <section
        className="flex col-span-2 justify-between items-center ml-6 mr-6"
        onClick={() => setInputClicked(false)}
      >
        <h2 className="text-3xl font-bold">2 open</h2>

        <div className="bg-[#15243B] p-2 rounded-3xl">
          <DropDown
            options={['All', 'Day', 'Week']}
            handleChange={handleTimeFrameChange}
            defaultOption="week"
          />
        </div>
      </section>
      <section className="col-span-2 row-span-2" onClick={() => setInputClicked(false)}></section>
    </header>
  )
}
