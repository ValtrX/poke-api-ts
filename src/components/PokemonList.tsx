import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePoke } from '../context/PokemonProvider';
import { getAllPokemons } from '../sdk/pokeApi';
import { PokemonCard } from './PokemonCard';

export const PokemonList = () => {
  const { dispatch, pokemonList, pokemonCount } = usePoke();
  const [searchParams, setSearchParams] = useSearchParams({ pokePagination: '' });
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const totalPages = Math.ceil(pokemonCount / pokemonsPerPage);
  const [currentPage, setCurrentPage] = useState(0); // Inicializa en 0

  const getPokemon = async () => {
    const data = await getAllPokemons(currentPage, pokemonsPerPage);
    dispatch({ type: 'SET_POKEMON', args: data });
  };

  const handlePageChange = (page: number) => {
    const zeroBasedPage = page - 1; // Convertir 1-basado a 0-basado
    if (zeroBasedPage < 0) {
      setSearchParams((params) => {
        params.delete('pokePagination');
        return params;
      });
      setCurrentPage(0);
    } else if (zeroBasedPage >= totalPages) {
      setSearchParams((prev) => {
        prev.set('pokePagination', (totalPages - 1).toString());
        return prev;
      }, { replace: true });
      setCurrentPage(totalPages - 1);
    } else {
      setSearchParams((prev) => {
        if (page === 1) {
          prev.delete('pokePagination'); // Eliminar el parámetro para la página 1
        } else {
          prev.set('pokePagination', page.toString());
        }
        return prev;
      }, { replace: true });
      setCurrentPage(zeroBasedPage);
    }
  };
  const renderPagination = () => {
    const pages = [];
    const delta = 2; // Número de páginas a mostrar a cada lado del número actual

    for (let i = 0; i < totalPages; i++) {
      // Si la página está dentro del rango visible o es la primera/última página
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i + 1); // Convertir 0-basado a 1-basado para mostrar
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages.map((page, index) => (
      <li key={index}>
        {typeof page === 'number' ? (
          <button
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page - 1} // Comparar con 0-basado
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
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>

      <div>
        <h1>PAGINATION HERE: {searchParams && searchParams.get("pokePagination") ? searchParams.get("pokePagination") : null}</h1>
        <ul>
          <li>
            <button
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage === 0}
            >
              anterior
            </button>
          </li>
          {renderPagination()}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 2)}
              disabled={currentPage >= totalPages - 1}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};