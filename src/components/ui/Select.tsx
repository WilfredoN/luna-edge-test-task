import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { SelectOption } from '../../types';

interface SelectProps {
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  onSearch?: (query: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  maxSelections?: number;
  loading?: boolean;
  name: string;
  onPaginationEnd?: () => void;
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
  onPaginationEnd
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || !onPaginationEnd) return;
  
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      
      if (scrollHeight - (scrollTop + clientHeight) < 50 && !loading) {
        onPaginationEnd();
      }
    };
  
    const listElement = listRef.current;
    if (isOpen && listElement && onPaginationEnd) {
      listElement.addEventListener('scroll', handleScroll);
      
      if (listElement.scrollHeight <= listElement.clientHeight && !loading && options.length > 0) {
        onPaginationEnd();
      }
      
      return () => {
        listElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [loading, onPaginationEnd, isOpen, options.length]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSelect = (option: SelectOption) => {
    if (value.some((item) => item.value === option.value)) {
      onChange(value.filter((item) => item.value !== option.value));
    } else {
      if (maxSelections && value.length >= maxSelections) {
        onChange([...value.slice(1), option]);
      } else {
        onChange([...value, option]);
      }
    }
  };

  const removeSelection = (option: SelectOption, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((item) => item.value !== option.value));
  };

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      
      <div ref={selectRef} className="relative">
        <div
          className={`bg-gray-700 border ${
            error ? 'border-red-500' : 'border-gray-600'
          } rounded-md p-2 min-h-[2.5rem] cursor-pointer flex flex-wrap items-center gap-2`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          role="combobox"
          aria-haspopup="listbox"
        >
          {value.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            value.map(option => (
              <div
                key={option.uniqueId || option.value}
                className="flex items-center gap-4 bg-blue-600 text-white text-lg font-semibold rounded-full px-2"
              >
                {option.imageUrl && (
                  <img 
                    src={option.imageUrl} 
                    alt={option.label} 
                    className="w-15 h-15 object-cover"
                  />
                )}
                {option.label}
                <button
                  onClick={(e) => removeSelection(option, e)}
                  className="text-white hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            ))
          )}
          <div className="ml-auto">
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transform transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute w-full z-10 top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
            <div className="p-2">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div 
              ref={listRef}
              className="max-h-60 overflow-y-auto"
              role="listbox"
            >
              {loading && <div className="p-2 text-center text-gray-400">Loading...</div>}
              
              {options.length === 0 && !loading ? (
                <div className="p-3 text-gray-400 text-center">No Pokémon found</div>
              ) : (
                options.map(option => (
                    <div
                    key={option.uniqueId || option.value}
                    className={`p-2 flex items-center text-white font-semibold hover:bg-gray-600 cursor-pointer ${
                      value.some(v => v.value === option.value) ? 'bg-gray-600' : ''
                    }`}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={value.some(v => v.value === option.value)}
                    >
                    {option.imageUrl && (
                      <img 
                      src={option.imageUrl} 
                      alt={option.label} 
                      className="mr-2 object-contain w-15 h-15"
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
  );
};
