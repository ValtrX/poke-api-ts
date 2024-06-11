import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";
import { usePoke } from "../context/PokemonProvider";
import { getAllPokemons } from '../sdk/pokeApi';
import { Pokemon } from '../types/pokemon';

export const SearchPage = () => {
  const { dispatch, completeList } = usePoke();
  const [searchParams] = useSearchParams();
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPokemons = async () => {
    setLoading(true);
    try {
      const allPokemons = await getAllPokemons(0, 100000);
      dispatch({ type: 'SET_COMPLETE_POKEMON', args: allPokemons.results });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (completeList.length === 0) {
      fetchAllPokemons();
    }
  }, [completeList]);

  useEffect(() => {
    const nameFilter = searchParams.get("name");
    if (completeList.length > 0 && nameFilter) {
      const filteredPokemons = completeList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setFilteredPokemons(filteredPokemons);
    } else {
      setFilteredPokemons([]);
    }
  }, [searchParams, completeList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <p className='p-search'>
        Se encontraron <span>{filteredPokemons.length}</span> resultados:
      </p>
      <div className='card-list-pokemon container'>
        {filteredPokemons.map(pokemon => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </div>
  );
};