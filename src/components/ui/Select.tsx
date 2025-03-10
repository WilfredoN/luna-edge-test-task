import { useRef } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useSelect } from '../../hooks/useSelect'
import { SelectOption } from '../../types'
import { SelectClosed } from './SelectClosed'
import { SelectOpen } from './SelectOpen'

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
        <SelectClosed
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          value={value}
          placeholder={placeholder}
          error={error}
          removeSelection={removeSelection}
        />

        {isOpen && (
          <SelectOpen
            options={options}
            value={value}
            search={search}
            handleSearchChange={handleSearchChange}
            handleSelect={handleSelect}
            handleScroll={handleScroll}
            loading={loading}
            listRef={listRef}
          />
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
