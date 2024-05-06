import { createContext, useContext, useReducer } from 'react';
import { PokemonArray, Pokemon } from '../types/pokemon';
import { SET_POKEMON, SET_POKEMON_DETAILS } from '../types/reducer';

interface Props {
  children: React.ReactNode
}

type Actions = SET_POKEMON | SET_POKEMON_DETAILS

interface AppState {
  pokemonList: PokemonArray
  pokemonDetail: Pokemon | undefined
  pokemonCount: number
  dispatch: React.Dispatch<Actions>
}

const defaultState: AppState = {
  pokemonList: [],
  pokemonDetail: undefined,
  pokemonCount: 1302,
  dispatch: (_value: Actions) => {}
}

const reducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case 'SET_POKEMON': {
      const args = action.args ?? [];
      return {
        ...state,
        pokemonList: args
      }
    }
    case 'SET_POKEMON_DETAILS': {
      const args = action.args ?? {}

      return {
        ...state,
        pokemonDetail: args
      }
    }


    default:
      return state
  }
}

export const PokeContext = createContext(defaultState)
export const usePoke = () => useContext(PokeContext)
export const usePokeReducer = () => useReducer(reducer, defaultState)

const ProviderPoke  = ({ children }: Props) => {
  const [state, dispatch] = usePokeReducer()


  return (
    <PokeContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </PokeContext.Provider>
  )
}

export default ProviderPoke
