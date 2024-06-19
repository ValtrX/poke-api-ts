import { PokemonArray, Pokemon, AllPokemonData } from './pokemon';

export interface SET_POKEMON {
  type: 'SET_POKEMON';
  args: PokemonArray;
}

export interface SET_POKEMON_DETAILS {
  type: 'SET_POKEMON_DETAILS';
  args: Pokemon;
}

export interface SET_PAGINATED_POKEMON {
  type: 'SET_PAGINATED_POKEMON';
  args: { paginatedList: PokemonArray; pokemonCount: number };
}

export interface SET_POKEMON_BY_NAMES {
  type: 'SET_POKEMON_BY_NAMES';
  args: SinglePokemonData[];
}
export interface SET_PAGES {
  type: 'SET_PAGES';
  args: number;
}


export interface SET_SEARCH {
  type: 'SET_SEARCH';
  args: string | null;
}

export type Actions = SET_POKEMON_BY_NAMES | SET_PAGES | SET_SEARCH;