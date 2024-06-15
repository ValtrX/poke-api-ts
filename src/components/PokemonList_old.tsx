import { useEffect, useState } from 'react';
import { usePoke } from '../context/PokemonProvider';
import { getAllPokemons } from '../sdk/pokeApi';
import { PokemonCard } from './PokemonCard';
import { Pagination } from './Pagination';

export const PokemonList = () => {
  // const { dispatch, paginatedList, pokemonCount } = usePoke();
   const { dispatch, completeList } = usePoke();
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  // const getPokemon = async () => {
  //   const data = await getAllPokemons(currentPage, pokemonsPerPage);
  //   dispatch({ type: 'SET_PAGINATED_POKEMON', args: { pokemons: data.results, count: data.count } });
  // };

  // useEffect(() => {
  //   getPokemon();
  // }, [currentPage]);

  return (
    <>
      <h1>PokemonList</h1>
      <ul>
        {completeList.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>
      {/* <Pagination
        pokemonCount={pokemonCount}
        pokemonsPerPage={pokemonsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </>
  );
};