import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePoke } from '../context/PokemonProvider';
import { getAllPokemons } from '../sdk/pokeApi';
import { PokemonCard } from './PokemonCard';


export const PokemonList = (): JSX.Element => {
  const { dispatch, pokemonList, pokemonCount } = usePoke();
  const[searchParams, setSearchParams] = useSearchParams({pokePagination: ''})
  // const [nextPage, setNextPage] = useState('');
  // const [prevPage, setPrevPage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const getPokemon = async () => {
    const data = await getAllPokemons(currentPage);
    dispatch({ type: 'SET_POKEMON', args: data });
  };

  const handlePageChange = (page: number) => {
    if (page < 1) {
      setSearchParams((params) => {
        params.delete('pokePagination');
        return params;
      });
      setCurrentPage(page)
    } else {
      setSearchParams((prev) => {
        prev.set("pokePagination", page.toString());
        return prev;
    }, { replace: true });
      setCurrentPage(page)
     }
    }


  useEffect(() => {
    getPokemon();
    console.log(pokemonCount);
  }, [currentPage]);

  return (
    <>
      <h1>PokemonList</h1>

      <ul>
        {pokemonList.map((pokemon) => (
          <PokemonCard pokemon={pokemon} />
        ))}
      </ul>

      <div>
      <h1>PAGINATION HERE: ${searchParams && searchParams.get("pokePagination") ? searchParams.get("pokePagination") : null}</h1>
        <ul>
          <li>
          <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        > anterior
        </button>
          </li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>
          <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= pokemonCount}
        >
          Siguiente
        </button>
          </li>
        </ul>
      </div>
    </>
  );
};
