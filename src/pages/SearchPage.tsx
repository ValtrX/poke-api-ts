import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";
import { usePoke } from "../context/PokemonProvider";
import { getAllPokemons } from '../sdk/pokeApi';

export const SearchPage = (): JSX.Element =>{
  const { dispatch, pokemonList } = usePoke();
	const [searchParams] = useSearchParams()

  const fetchAllPokemons = async () => {
    const allPokemons = await getAllPokemons();
    dispatch({ type: 'SET_POKEMON', args: allPokemons });
  };

  const typeFilter = searchParams.get("name")

  useEffect(() => {
    fetchAllPokemons().catch(console.error);
  }, []);


	console.log(typeFilter);

    const filteredPokemons = pokemonList.filter(pokemon =>
		pokemon.name.includes(typeFilter ?? "")
	);



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

}