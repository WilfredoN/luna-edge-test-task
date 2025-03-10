import { useState } from 'react';
import { fetchPokemonDetails } from '../services/pokemonAPI';
import { Pokemon, SelectOption } from '../types';

export const usePokemonSelection = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);

  const handlePokemonSelection = async (selected: SelectOption[]) => {
    const pokemonTeam: Pokemon[] = [];
    
    for (const option of selected) {
      const pokemon = await fetchPokemonDetails(option.value);
      if (pokemon) {
        pokemonTeam.push(pokemon);
      }
    }
    
    setSelectedPokemon(pokemonTeam);
  };

  return {
    selectedPokemon,
    handlePokemonSelection
  };
};
