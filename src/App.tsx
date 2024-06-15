import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import ProviderPoke from './context/PokemonProvider';
import { Berries } from './pages/Berries';
import { Home } from './pages/Home';
import { PokemonDetail } from './pages/PokemonDetail';
import { SearchPage } from './pages/SearchPage';
const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ProviderPoke>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="berries" element={<Berries />} /> */}
            {/* <Route path="pokemon/:name" element={<PokemonDetail />} /> */}
            {/* <Route path="search" element={<SearchPage />} /> */}
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ProviderPoke>
    </BrowserRouter>
  );
};

export default App;
