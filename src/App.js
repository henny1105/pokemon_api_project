import React from 'react';
// > router
import { Routes, Route } from 'react-router-dom';
// > components
// import Home from './pages/Home';
import PokemonDex from './pages/pokemondex/PokemonDex';
import PokemonInfo from './pages/pokemondex/components/pokemoninfo/PokemonInfo';
import PokeApi from './page/PokeApi';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <PokeApi /> }/>
        <Route path="pokemondex">
          <Route index element={<PokemonDex />} />
          <Route path="pokemoninfo/:id" element={<PokemonInfo />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;