import { useCallback, useEffect, useState } from 'react';
import { fetchPokemonList } from '../services/pokemonAPI';
import { SelectOption } from '../types';
import { createPokemonOption } from '../utils/pokemonUtils';

interface UsePokemonListResult {
  pokemonOptions: SelectOption[];
  loading: boolean;
  loadMorePokemon: () => Promise<void>;
  searchPokemon: (query: string) => void;
  hasMore: boolean;
  searchQuery: string;
}

export const usePokemonList = (): UsePokemonListResult => {
  const [pokemonOptions, setPokemonOptions] = useState<SelectOption[]>([]);
  const [allPokemonOptions, setAllPokemonOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [processedIds] = useState<Set<string>>(new Set());

  const loadPokemon = useCallback(async (currentOffset: number) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await fetchPokemonList(20, currentOffset);
      
      const newOptions: SelectOption[] = [];
      for (const pokemon of response.results) {
        const option = createPokemonOption(pokemon);
        
        if (option.uniqueId && !processedIds.has(option.uniqueId)) {
          processedIds.add(option.uniqueId);
          newOptions.push(option);
        }
      }
      
      setAllPokemonOptions(prev => [...prev, ...newOptions]);
      
      if (!searchQuery) {
        setPokemonOptions(prev => [...prev, ...newOptions]);
      } else {
        // If we're searching, filter the new results too
        const filteredNewOptions = newOptions.filter(option => 
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPokemonOptions(prev => [...prev, ...filteredNewOptions]);
      }
      
      setOffset(currentOffset + response.results.length);
      setHasMore(!!response.pagination.next);
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, processedIds, searchQuery]);

  const loadMorePokemon = useCallback(async () => {
    if (hasMore && !loading) {
      await loadPokemon(offset);
    }
  }, [hasMore, loading, loadPokemon, offset]);

  const searchPokemon = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (query === '') {
      setPokemonOptions(allPokemonOptions);
      return;
    }
    
    const filteredOptions = allPokemonOptions.filter(option =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    
    setPokemonOptions(filteredOptions);
  }, [allPokemonOptions]);

  // Initial load
  useEffect(() => {
    loadPokemon(0);
  }, []);

  return {
    pokemonOptions,
    loading,
    loadMorePokemon,
    searchPokemon,
    hasMore,
    searchQuery
  };
};
