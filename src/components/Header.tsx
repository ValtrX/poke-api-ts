import { useEffect, useState } from "react";
import { Form, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { usePoke } from "../context/PokemonProvider";

export default function Header() {

  const { dispatch, search } = usePoke();
  const [searchParams] = useSearchParams();
  

  //   // const[searchParams, setSearchParams] = useSearchParams({name: ""})
  const [query, setQuery] = useState(search || "");

  useEffect(() => {
    let timeout: any;
    if (query.length !== 0) {
      timeout = setTimeout(() => {
        
        dispatch({ type: 'SET_SEARCH', args: query });
      }, 1000);

    }

    return () => {
      clearTimeout(timeout);
    }
  }, [query]);


  // useEffect(() => {
  //   const getPages = searchParams.get("currentPage")

  //   if (getPages) {
  //     dispatch({ type: 'SET_PAGES', args: parseInt(getPages) });
  //   }

  // }, [searchParams]);

  //   // const urlPokemonName: string = searchParams.get("name")!
  //   const navigate = useNavigate();

  // function handleSubmit(event: React.FormEvent<) {
  //   console.log(event.target);
  //   event.preventDefault();
  //   //const query =;

  //  // dispatch({ type: 'SET_SEARCH', args: event.target });
  // }

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //       setQuery(event.target.value);
  // };

  // const debouncedValue = useDebounce(query, 400);

  //   useEffect(() => {

  //       if (query.length !== 0) {
  //         navigate(`/search?name=${query}`);
  //       }else{
  //         navigate(`/`);
  //       }

  // }, [debouncedValue]);

  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/berries">Berries</NavLink>
        {/* <NavLink to="/berries" style={({isActive})=> isActive ? "active-link" : null}>Berries</NavLink> */}
        {/* <NavLink to="/search" style={({isActive})=> isActive ? "active-link" : null}>Search</NavLink> */}
      </nav>

      <div className='form-group'>

        <input
          type='text'
          name='search'
          id='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Buscar nombre de pokemon'
        />
      </div>

      <button className='btn-search'>Buscar</button>


    </header>
  );
}
