import { AllPokemonData, Pokemon } from '../types/pokemon';

const baseURL = "https://pokeapi.co/api/v2/";

export const getAllPokemons = async (page = 0, limit = 20): Promise<AllPokemonData> => {
  const fixedPagination = page * limit;
  const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${fixedPagination}`);
  const data = await res.json();
  // const pokemonList = await Promise.all(
  //   data.results.map(async (pokemon: singlePokemonData) => {
  //     const res = await fetch(pokemon.url);
  //     return res.json();
  //   })
  // );

  return {
    results: data.results,
    count: data.count,
  };
};


export const getPokemonByName = async (name: string | undefined): Promise<Pokemon> => {
  const res = await fetch(`${baseURL}pokemon/${name}`);
  const data = await res.json();
  return data;
};