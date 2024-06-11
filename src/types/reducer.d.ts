import { PokemonArray, Pokemon } from './pokemon';

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
  args: { pokemons: PokemonArray; count: number };
}

export interface SET_COMPLETE_POKEMON {
  type: 'SET_COMPLETE_POKEMON';
  args: PokemonArray;
}

export type Actions = SET_POKEMON | SET_POKEMON_DETAILS | SET_PAGINATED_POKEMON | SET_COMPLETE_POKEMON;