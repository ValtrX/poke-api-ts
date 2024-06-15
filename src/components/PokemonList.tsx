import { useState } from 'react';
import { usePoke } from '../context/PokemonProvider';
import { PokemonCard } from './PokemonCard';

export const PokemonList = () => {
  const { completeList } = usePoke();
  //const [pokemonsPerPage] = useState(20);

  return (
    <>
      <h1>PokemonList</h1>
      <ul>
        {completeList.slice(0, 100000).map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>
    </>
  );
};