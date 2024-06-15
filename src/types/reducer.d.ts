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

export interface SET_COMPLETE_POKEMON {
  type: 'SET_COMPLETE_POKEMON';
  args: AllPokemonData;
}

export type Actions = SET_POKEMON | SET_POKEMON_DETAILS | SET_PAGINATED_POKEMON | SET_COMPLETE_POKEMON_BY_NAME;