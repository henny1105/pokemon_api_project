import './App.css';
import PokemonBattlePage from './page/PokemonBattle/PokemonBattlePage';
import { Routes, Route } from 'react-router-dom/dist';

function App() {
  return (
    <Routes>
      <Route path='/'>
        {/* <Route path='random' element={<Random />} /> */}
        <Route path='battle' element={<PokemonBattlePage />} />
      </Route>
    </Routes>
  );
}

export default App;
