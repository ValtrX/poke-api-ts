import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";
import { usePoke } from "../context/PokemonProvider";
import { getAllPokemons } from '../sdk/pokeApi';
import { Pokemon } from '../types/pokemon';

export const SearchPage = () => {
  const { dispatch, pokemonList } = usePoke();
  const [searchParams] = useSearchParams();
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPokemons = async () => {
    setLoading(true);
    try {
      const allPokemons = await getAllPokemons(0, 100000);
      dispatch({ type: 'SET_POKEMON', args: allPokemons });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  
  useEffect(() => {
    
    const typeFilter = searchParams.get("name");
    
    if (pokemonList.length > 0 && typeFilter) {
      
			const filteredPokemons = pokemonList.filter(pokemon =>
        pokemon.name.includes(typeFilter ?? "")
      );
      setFilteredPokemons(filteredPokemons);
    }
    
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <p className='p-search'>
        Se encontraron <span>{filteredPokemons.length}</span>{' '}
        resultados:
      </p>
      <div className='card-list-pokemon container'>
        {filteredPokemons.map(pokemon => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </div>
  );
};