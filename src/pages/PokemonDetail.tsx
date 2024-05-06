import { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { usePoke } from "../context/PokemonProvider";
import { getPokemonByName } from "../sdk/pokeApi";

export const PokemonDetail = (): JSX.Element => {
    const { name } = useParams()
    const { dispatch, pokemonDetail } = usePoke();
    const getPokemonByNameData = async() => {
      dispatch({ type: 'SET_POKEMON_DETAILS', args: await getPokemonByName(name)});
    }

    useEffect(() => {
      getPokemonByNameData()
      }, []);

    return (
        <div className="pokemon-container">
            <Link
                to=".."
                className="back-button"
            >&larr; <span>Back to all pokemons</span></Link>

            {pokemonDetail ? (
                <div className="van-detail">
                   <h1>Pokemon name: {pokemonDetail.name}</h1>
                </div>
            ) : <h2>Cargando...</h2>}

          <Outlet />
        </div>

    )
}
