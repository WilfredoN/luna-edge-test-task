import { RefObject } from 'react'
import { SelectOption } from '../../types'

interface SelectOpenProps {
  options: SelectOption[]
  value: SelectOption[]
  search: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelect: (option: SelectOption) => void
  handleScroll: () => void
  loading: boolean
  listRef: RefObject<HTMLDivElement>
}

export const SelectOpen = ({
  options,
  value,
  search,
  handleSearchChange,
  handleSelect,
  handleScroll,
  loading,
  listRef,
}: SelectOpenProps) => {
  return (
    <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-md border border-gray-600 bg-gray-700 shadow-lg">
      <div className="p-2">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search.."
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
  )
}
