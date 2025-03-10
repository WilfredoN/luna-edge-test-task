import axios from 'axios'
import { PaginatedResponse, Pokemon, PokemonType } from '../types'

const API_URL = import.meta.env.VITE_API_POKEAPI_URL

export const fetchPokemonList = async (
  limit = 20,
  offset = 0,
): Promise<PaginatedResponse<{ name: string; url: string }>> => {
  try {
    const response = await axios.get(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`)

    return {
      results: response.data.results,
      pagination: {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      },
    }
  } catch (error) {
    console.error('Error fetching Pokemon list:', error)
    return {
      results: [],
      pagination: {
        count: 0,
        next: null,
        previous: null,
      },
    }
  }
}

export const fetchPokemonDetails = async (nameOrId: string | number): Promise<Pokemon | null> => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${nameOrId}`)
    console.log(response.data)
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      types: response.data.types.map((type: PokemonType) => type.type.name),
    }
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${nameOrId}:`, error)
    return null
  }
}
