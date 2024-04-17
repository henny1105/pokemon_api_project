import React from 'react';
// > style
import './PokemonDex.style.css';
// > components
import PokemonCard from './components/pokemoncard/PokemonCard';
// > router
import { useNavigate } from 'react-router-dom';
// > hooks
import { usePokemonInfoAllQuery } from '../../hook/usePokemonInfoQuery';

const PokemonDex = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const movePokemonInfo = (id) => {
    navigate(`pokemoninfo/${id}`);
  }
  const { data:all } = usePokemonInfoAllQuery();
  // const { data:species } = usePokemonSpeciesQuery({id});

  return (
    <div className="pokemondex">
      {
        all?.results.map((pokemon, index) => (
          <div onClick={ () => movePokemonInfo(index+1) } key={index}>
          {/* <div className="pokeDex" onClick={ movePokemonInfo } key={index}> */}
            <PokemonCard pokemon={ pokemon } />
          </div>
        ))
      }
    </div>
  )
}

export default PokemonDex;
