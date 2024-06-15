import { useState } from 'react';
import { usePoke } from '../context/PokemonProvider';
import { PokemonCard } from './PokemonCard';

export const PokemonList = () => {
  const { pokemonNames, ...data } = usePoke();
  console.log({pokemonNames,...data});
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
      <button onClick={() => data.dispatch({ type: 'SET_PAGES', args: data.nextPages  })}>Next</button>
    </>
  );
};