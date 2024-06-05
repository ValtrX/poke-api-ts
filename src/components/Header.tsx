import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

export default function Header() {

  // const[searchParams, setSearchParams] = useSearchParams({name: ""})
  const [query, setQuery] = useState("");
  // const urlPokemonName: string = searchParams.get("name")!
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
};

const debouncedValue = useDebounce(query, 200);

  useEffect(() => {

      if (query.length !== 0) {
        navigate(`/search?name=${query}`);
      }else{
        navigate(`/`);
      }

}, [debouncedValue]);

  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/berries">Berries</NavLink>
        {/* <NavLink to="/berries" style={({isActive})=> isActive ? "active-link" : null}>Berries</NavLink> */}
        {/* <NavLink to="/search" style={({isActive})=> isActive ? "active-link" : null}>Search</NavLink> */}
      </nav>
      <form onSubmit={handleSubmit}>
					<div className='form-group'>

						<input
							type='search'
							name='valueSearch'
							id=''
							value={query}
							onChange={handleChange}
							placeholder='Buscar nombre de pokemon'
						/>
					</div>

					<button className='btn-search'>Buscar</button>
				</form>

    </header>
  );
}
