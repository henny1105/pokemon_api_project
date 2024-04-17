import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './page/AppLayout/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/home/Home';
import Random from './page/random/Random';
import './App.css';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route path='/' element={<Home/>}/>
				<Route path='random' element={<Random />} />
      </Route>

      {/* <Route path="*" element={<NotFoundPage/>}/> */}
    </Routes>
  )

}

export default App;