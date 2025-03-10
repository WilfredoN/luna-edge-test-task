import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useSelect } from '../../hooks/useSelect'
import { SelectOption } from '../../types'

interface SelectProps {
  options: SelectOption[]
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
  onSearch?: (query: string) => void
  label: string
  placeholder?: string
  error?: string
  maxSelections?: number
  loading?: boolean
  name: string
  onPaginationEnd?: () => void
}

export const Select = ({
  options,
  value,
  onChange,
  onSearch,
  label,
  placeholder = 'Select...',
  error,
  maxSelections,
  loading = false,
  name,
  onPaginationEnd,
}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const {
    isOpen,
    setIsOpen,
    search,
    handleSearchChange,
    handleSelect,
    removeSelection,
    handleScroll,
  } = useSelect({
    options,
    value,
    onChange,
    onSearch,
    maxSelections,
    loading,
    onPaginationEnd,
    listRef,
  })

  useOutsideClick(selectRef, () => setIsOpen(false))

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-200">
        {label}
      </label>

      <div ref={selectRef} className="relative">
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

        {isOpen && (
          <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-gray-600 bg-gray-700 shadow-lg">
            <div className="p-2">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full rounded border border-gray-500 bg-gray-600 p-2 text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div
              ref={listRef}
              className="max-h-60 overflow-y-auto"
              role="listbox"
              onScroll={handleScroll}
            >
              {loading && <div className="p-2 text-center text-gray-400">Loading...</div>}

              {options.length === 0 && !loading ? (
                <div className="p-3 text-center text-gray-400">No Pokémon found</div>
              ) : (
                options.map((option) => (
                  <div
                    key={option.uniqueId || option.value}
                    className={`flex cursor-pointer items-center p-2 font-semibold text-white hover:bg-gray-600 ${
                      value.some((v) => v.value === option.value) ? 'bg-gray-600' : ''
                    }`}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={value.some((v) => v.value === option.value)}
                  >
                    {option.imageUrl && (
                      <img
                        src={option.imageUrl}
                        alt={option.label}
                        className="mr-2 h-15 w-15 object-contain"
                        loading="lazy"
                      />
                    )}
                    {option.label}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {maxSelections && (
        <p className="mt-1 text-sm text-gray-400">
          {value.length}/{maxSelections} Pokémon selected
        </p>
      )}
    </div>
  )
}
