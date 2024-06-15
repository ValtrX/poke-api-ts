import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { PokemonArray, Pokemon, SinglePokemonData } from '../types/pokemon';
import { Actions } from '../types/reducer';
import { getAllPokemons } from '../sdk/pokeApi';
import LoadingBar from '../components/LoadingBar';
import { useNavigate, useSearchParams } from 'react-router-dom';


interface AppState {
  defaultData: SinglePokemonData[]
  pokemonNames: SinglePokemonData[];
  pokemonNamesCount: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  dispatch: React.Dispatch<Actions>;
  prevPages: number;
  nextPages: number;
  search: string | null;
}

const defaultState: AppState = {
  //no mutable data
  defaultData: [],
  //mutable data
  pokemonNames: [],
  pokemonNamesCount: 0,
  prevPages: 0,
  nextPages: 0,
  currentPage: 0,
  totalPages: 0,
  limit: 5,
  search: null,
  dispatch: (_value: Actions) => { },
};

const reducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case 'SET_POKEMON_BY_NAMES': {
      const data = action.args;
      const pokemonNames = data.slice(0, state.limit);

      return {
        ...state,
        pokemonNames,
        pokemonNamesCount: data.length,
        defaultData: data,
        currentPage: 0,
        prevPages: 0,
        nextPages: pokemonNames.length > 0 ? Math.ceil(pokemonNames.length / state.limit) : 0,
        totalPages: Math.ceil(data.length / state.limit),
      };
    }

    case 'SET_PAGES': {
      let data = state.defaultData;
      if (state.search) {
        data = state.defaultData.filter(pokemon => pokemon.name.toLowerCase().includes(state?.search?.toLowerCase() || ''));
      }
      return {
        ...state,
        currentPage: action.args,
        pokemonNames: data.slice(action.args * state.limit, (action.args + 1) * state.limit),
        pokemonNamesCount: data.slice(action.args * state.limit, (action.args + 1) * state.limit).length,
        prevPages: (action.args - 1) < 0 ? 0 : (action.args - 1),
        nextPages: (action.args + 1) > state.totalPages ? state.totalPages : (action.args + 1),
      };
    }

    case 'SET_SEARCH': {
      if (state.search?.length === 0) {
        return {
          ...state,
          pokemonNames: state.defaultData,
          pokemonNamesCount: state.defaultData.length,
          currentPage: 0,
          prevPages: 0,
          nextPages: state.defaultData.length > 0 ? Math.ceil(state.defaultData.length / state.limit) : 0,
          totalPages: Math.ceil(state.defaultData.length / state.limit),
        };
      }

      const data = state.defaultData.filter(pokemon => pokemon.name.toLowerCase().includes(action?.args?.toLowerCase() || ''));
      return {
        ...state,
        pokemonNames: data,
        pokemonNamesCount: data.length,
        currentPage: 0,
        prevPages: 0,
        nextPages: data.length > 0 ? Math.ceil(data.length / state.limit) : 0,
        totalPages: data.length > 0 ? Math.ceil(data.length / state.limit) : 0,
      };
    }

    default:
      return state;
  }
};

export const PokeContext = createContext(defaultState);
export const usePoke = () => useContext(PokeContext);
export const usePokeReducer = () => useReducer(reducer, defaultState);

const ProviderPoke = ({ children }: React.PropsWithChildren<any>) => {
  const [state, dispatch] = usePokeReducer();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // SET VALUES DEFAULT
  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const allPokemons = await getAllPokemons(0, 100000);
        dispatch({ type: 'SET_POKEMON_BY_NAMES', args: allPokemons.results });
        setLoading(false);

      } catch (error) {
        console.error('Error fetching all Pokémon:', error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchAllPokemons();
  }, []);

  useEffect(() => {
    const getPages = searchParams.get("currentPage")
    const getName = searchParams.get("name")

    if (getPages) {
      console.log(getPages);
      dispatch({ type: 'SET_PAGES', args: parseInt(getPages) });
    }

    if (getName) {
      dispatch({ type: 'SET_SEARCH', args: searchParams.get("name") });
    }
  }, [searchParams]);


  useEffect(() => {


    if (state.search?.length === 0) {
      navigate(`/`);
    } else if ((state.search?.length || 0) > 0) {
      navigate(`/search?name=${state.search}`);
    }

    
  }, [state.search]);

  useEffect(() => {
    if (state.currentPage) {
      setSearchParams((prev) => {
        prev.set("currentPage", state.currentPage.toString());
        return prev;
     })
    } else if ((state.search?.length || 0) > 0) {
      setSearchParams((prev) => {
        prev.set("currentPage", "1");
        return prev;
      })
    }

  }, [state.currentPage]);

  if (loading) {
    return <LoadingBar />;
  }


  return (
    <PokeContext.Provider value={{ ...state, dispatch, }}>
      {children}
    </PokeContext.Provider>
  );
};

export default ProviderPoke;