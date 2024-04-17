import React from 'react';
import './App.css';
import AppLayout from './page/AppLayout/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/home/Home';
import Random from './page/random/Random';
import PokemonDex from './page/pokemondex/PokemonDex';
import PokemonInfo from './page/pokemondex/components/pokemoninfo/PokemonInfo';
import RaisePage from './page/raisepage/RaisePage';
import MyPokemonPage from './page/mypokemonpage/MyPokemonPage';
import PokemonBattle from './page/PokemonBattle/PokemonBattlePage';
import './App.css';
import PokemonBattlePage from './page/PokemonBattle/PokemonBattlePage';
import { Routes, Route } from 'react-router-dom/dist';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/random' element={<Random />} />
        <Route path="/pokemondex">
          <Route index element={<PokemonDex />} />
          <Route path="pokemoninfo/:id" element={<PokemonInfo />} />
        </Route>
        <Route path="/mypokemon" element={ <MyPokemonPage /> }>
          <Route path=":id" element={ <RaisePage />}/>
        </Route>
        <Route path="/battle" element={ <PokemonBattle />} />
      </Route>
      {/* <Route path="*" element={<NotFoundPage/>}/> */}
    </Routes>
  )

}

export default App;