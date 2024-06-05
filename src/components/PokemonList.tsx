import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePoke } from '../context/PokemonProvider';
import { getAllPokemons } from '../sdk/pokeApi';
import { PokemonCard } from './PokemonCard';


export const PokemonList = () => {
  const { dispatch, pokemonList, pokemonCount } = usePoke();
  const[searchParams, setSearchParams] = useSearchParams({pokePagination: ''})
  // const [nextPage, setNextPage] = useState('');
  // const [prevPage, setPrevPage] = useState('');
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20)
  const totalPages = Math.ceil(pokemonCount/pokemonsPerPage)
  const [currentPage, setCurrentPage] = useState(1);

  const getPokemon = async () => {
    const data = await getAllPokemons(currentPage, pokemonsPerPage);
    dispatch({ type: 'SET_POKEMON', args: data });
  };

  const handlePageChange = (page: number) => {
    if (page <= 1) {
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

    const renderPagination = () => {
      const pages = [];
      const delta = 2; // Número de páginas a mostrar a cada lado del número actual

      for (let i = 1; i <= totalPages; i++) {
        // Si la página está dentro del rango visible o es la primera/última página
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - delta && i <= currentPage + delta)
      ) {
          pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
      }

      }

      return pages.map((page, index) => (
        <li key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ) : (
            <span>{page}</span>
          )}
        </li>
      ));
    };



  useEffect(() => {
    getPokemon();
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
          disabled={currentPage === 1}
        > anterior
        </button>
          </li>
          {renderPagination()}
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
