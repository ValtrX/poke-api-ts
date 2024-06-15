import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { PokemonArray, Pokemon } from '../types/pokemon';
import { Actions } from '../types/reducer';
import { getAllPokemons } from '../sdk/pokeApi';
import LoadingBar from '../components/LoadingBar';

interface Props {
  children: React.ReactNode;
}

interface AppState {
  paginatedList: PokemonArray;
  completeList: PokemonArray;
  pokemonDetail: Pokemon | undefined;
  pokemonCount: number;
  dispatch: React.Dispatch<Actions>;
}

const defaultState: AppState = {
  paginatedList: [],
  completeList: [],
  pokemonDetail: undefined,
  pokemonCount: 1302,
  dispatch: (_value: Actions) => {},
};

const reducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case 'SET_PAGINATED_POKEMON': {
      const { pokemons, count } = action.args;
      return {
        ...state,
        paginatedList: pokemons,
        pokemonCount: count,
      };
    }
    case 'SET_COMPLETE_POKEMON_BY_NAME': {
      return {
        ...state,
        completeList: action.args,
      };
    }
    case 'SET_POKEMON_DETAILS': {
      return {
        ...state,
        pokemonDetail: action.args,
      };
    }
    default:
      return state;
  }
};

export const PokeContext = createContext(defaultState);
export const usePoke = () => useContext(PokeContext);
export const usePokeReducer = () => useReducer(reducer, defaultState);

const ProviderPoke = ({ children }: Props) => {
  const [state, dispatch] = usePokeReducer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const allPokemons = await getAllPokemons(0, 100000);
        dispatch({ type: 'SET_COMPLETE_POKEMON_BY_NAME', args: allPokemons.results });
          setLoading(false);
        
      } catch (error) {
        console.error('Error fetching all Pokémon:', error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchAllPokemons();
  }, []);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <PokeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PokeContext.Provider>
  );
};

export default ProviderPoke;