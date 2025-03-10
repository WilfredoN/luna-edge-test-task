import { SelectOption } from '../types'

export const extractPokemonIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\/?$/)
  return matches ? parseInt(matches[1], 10) : 0
}

export const getPokemonImageUrl = (pokemonId: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
}

export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const createPokemonOption = (pokemon: { name: string; url: string }): SelectOption => {
  const pokemonId = extractPokemonIdFromUrl(pokemon.url)
  return {
    value: pokemon.name,
    label: formatPokemonName(pokemon.name),
    url: pokemon.url,
    imageUrl: getPokemonImageUrl(pokemonId),
    uniqueId: `${pokemon.name}-${pokemonId}`,
  }
}
