import { singlePokemonData } from '../types/pokemon';

const baseURL = "https://pokeapi.co/api/v2/";

export const getAllPokemons = async (page = 0, limit = 20) => {
  const fixedPagination = page * limit
  const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${fixedPagination}`);
  const data = await res.json();
  const pokemonList = await Promise.all(
    data.results.map(async (pokemon: singlePokemonData) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

 return pokemonList
};

export const getPokemonByName = async (name: string | undefined) => {
  const res = await fetch(`${baseURL}pokemon/${name}`);
  const data = await res.json();
  return data;
};
// const listPokemon = async (page = 0) => {
//   const response = await fetch(
//     https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page}
//   );
//   const dataPokemon = await response.json();

//   const massiveConsult = await Promise.all(
//     dataPokemon.results.map(async ({ url }) => {
//       const dataFetch = await fetch(url);
//       const dataJson = await dataFetch.json();
//       return dataJson;
//     })
//   );

//   return massiveConsult;
// };