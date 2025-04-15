import { useState } from 'react'

interface DropDownProps {
  handleChange: (option: string) => void
  options: string[]
  defaultOption?: string
}

export default function DropDown({
  handleChange,
  options,
  defaultOption
}: DropDownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultOption || options[0] || '')

  const handleOptionChange = (option: string): void => {
    setSelectedOption(option)
    handleChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-dark hover:bg-primary-light/70 rounded-full px-4 py-2 flex items-center gap-2 transition-colors duration-300"
      >
        <span className="text-gray-300 font-bold">{selectedOption}</span>
        <div
          className={`w-4 h-4 border-t-2 border-r-2 border-white transform transition-transform duration-300 ${isOpen ? 'rotate-135 translate-y-1' : 'rotate-45 -translate-y-0.5'}`}
        ></div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-primary-dark text-gray-300 rounded-lg shadow-lg overflow-hidden z-10 pl-2 pr-2 transform origin-top transition-all duration-200 ease-out scale-100">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionChange(option)}
              className={`w-full text-left px-4 py-3 transition-colors duration-200
                      ${
                        selectedOption === option
                          ? 'bg-secondary text-primary-dark font-medium'
                          : 'hover:bg-primary-light/30'
                      }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
