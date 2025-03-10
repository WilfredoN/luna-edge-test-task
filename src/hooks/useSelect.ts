import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { SelectOption } from '../types';

interface UseSelectProps {
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  onSearch?: (query: string) => void;
  maxSelections?: number;
  loading?: boolean;
  onPaginationEnd?: () => void;
  listRef: MutableRefObject<HTMLDivElement | null>;
}

interface UseSelectResult {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (option: SelectOption) => void;
  removeSelection: (option: SelectOption, e: React.MouseEvent) => void;
  handleScroll: () => void;
}

export const useSelect = ({
  options,
  value,
  onChange,
  onSearch,
  maxSelections,
  loading,
  onPaginationEnd,
  listRef
}: UseSelectProps): UseSelectResult => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

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

  const handleScroll = useCallback(() => {
    if (!listRef.current || !onPaginationEnd) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    if (scrollHeight - (scrollTop + clientHeight) < 50 && !loading) {
      onPaginationEnd();
    }
  }, [loading, onPaginationEnd, listRef]);

  useEffect(() => {
    const listElement = listRef.current;
    if (isOpen && listElement && onPaginationEnd) {
      handleScroll();
    }
  }, [isOpen, options.length, handleScroll, onPaginationEnd, listRef]);

  return {
    isOpen,
    setIsOpen,
    search,
    handleSearchChange,
    handleSelect,
    removeSelection,
    handleScroll
  };
};
