import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './page/layout/AppLayout';
import Home from './page/home/Home';
import NotFoundPage from './page/not/NotFoundPage';
import Main from './page/home/components/Main';
import './page/home/components/style.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<Main/>}/>
        {/* <Route path="pokemon">
          <Route index element={<pokemon/>}/>
          <Route path=":id" element={<pokeDetail/>}/>
          <Route path=":id" element={<pokeDetail/>}/>
        </Route> */}
      </Route>

      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
