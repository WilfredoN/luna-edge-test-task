import axios from 'axios';

export const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_API_POKEAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// FIXME: Typization of the response data
export const pokemonService = {

  getPokemonList: async (limit: number = 100, offset: number = 0): Promise<any> => {
    const response = await pokeApi.get<any>(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  },
};
