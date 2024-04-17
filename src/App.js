import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './page/AppLayout/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokeApi from './page/PokeApi';
import Home from './page/home/Home';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<Home/>}/>
        {/* <Route path="pokemon">
          <Route index element={<pokemon/>}/>
          <Route path=":id" element={<pokeDetail/>}/>
          <Route path=":id" element={<pokeDetail/>}/>
        </Route> */}
      </Route>

      {/* <Route path="*" element={<NotFoundPage/>}/> */}
    </Routes>
  )
}

export default App;
