import { usePoke } from '../context/PokemonProvider';
import { PokemonCard } from './PokemonCard';

export const PokemonList = () => {
  const { pokemonNames, pagination, currentPage, ...data } = usePoke();
  console.log({pokemonNames, pagination, currentPage, ...data});
  //const [pokemonsPerPage] = useState(20);
 


  return (
    <>
      <h1>PokemonList</h1>
      <ul>
        {pokemonNames.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>
      <button onClick={() => data.dispatch({ type: 'SET_PAGES', args: data.prevPages  })}>Previous</button>
      { pagination.map((page, index) => (
      <li key={index}>
        {typeof page === 'number' ? (
          <button
            onClick={() => data.dispatch({ type: 'SET_PAGES', args: page  })}
            disabled={currentPage === page - 1} // Comparar con 0-basado
          >
            {page}
          </button>
        ) : (
          <span>{page}</span>
        )}
      </li>
    )) 
    }
      <button onClick={() => data.dispatch({ type: 'SET_PAGES', args: data.nextPages  })}>Next</button>
    </>
  );
};