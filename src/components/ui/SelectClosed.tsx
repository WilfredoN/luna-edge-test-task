import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { SelectOption } from '../../types'

interface SelectClosedProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  value: SelectOption[]
  placeholder: string
  error?: string
  removeSelection: (option: SelectOption, e: React.MouseEvent) => void
}

export const SelectClosed = ({
  isOpen,
  setIsOpen,
  value,
  placeholder,
  error,
  removeSelection,
}: SelectClosedProps) => {
  return (
    <div
      className={`border bg-gray-700 ${
        error ? 'border-red-500' : 'border-gray-600'
      } flex min-h-[2.5rem] cursor-pointer flex-wrap items-center gap-2 rounded-md p-2`}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      role="combobox"
      aria-haspopup="listbox"
    >
      {value.length === 0 ? (
        <span className="text-gray-400">{placeholder}</span>
      ) : (
        value.map((option) => (
          <motion.div
            key={option.uniqueId || option.value}
            className="flex h-12 items-center gap-4 rounded-full bg-blue-600 px-2 text-lg font-semibold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {option.imageUrl && (
              <img
                src={option.imageUrl}
                alt={option.label}
                className="max-h-15 max-w-15 object-cover"
              />
            )}
            {option.label}
            <button
              onClick={(e) => removeSelection(option, e)}
              className="text-white hover:text-gray-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </motion.div>
        ))
      )}
      <div className="ml-auto">
        <ChevronDownIcon
          className={`h-5 w-5 transform text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
    </div>
  )
}
