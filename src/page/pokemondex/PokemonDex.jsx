import React, { useState } from 'react';
// > style
import './PokemonDex.style.css';
// > components
import PokemonCard from './components/pokemoncard/PokemonCard';
import PokemonSearch from './components/pokemonSearch/PokemonSearch';
import PokemonFilter from './components/PokemonFilter/PokemonFilter';
// > router
import { useNavigate } from 'react-router-dom';
// > hooks
import { usePokemonInfoAllQuery } from '../../hook/usePokemonInfoQuery';

const PokemonDex = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  // const { id } = useParams();
  const navigate = useNavigate();
  const movePokemonInfo = (id) => {
    navigate(`pokemoninfo/${id}`);
  }
  const { data:all } = usePokemonInfoAllQuery();
  // const { data:species } = usePokemonSpeciesQuery({id});

  return (
    <>
      <div className="button_group">
        <button type="button" className="filter_button" onClick={ () => setFilterOpen(!filterOpen)}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 36H7.5C7.06667 36 6.70833 35.8583 6.425 35.575C6.14167 35.2917 6 34.9333 6 34.5C6 34.0667 6.14167 33.7083 6.425 33.425C6.70833 33.1417 7.06667 33 7.5 33H16.5C16.9333 33 17.2917 33.1417 17.575 33.425C17.8583 33.7083 18 34.0667 18 34.5C18 34.9333 17.8583 35.2917 17.575 35.575C17.2917 35.8583 16.9333 36 16.5 36ZM40.5 15H7.5C7.06667 15 6.70833 14.8583 6.425 14.575C6.14167 14.2917 6 13.9333 6 13.5C6 13.0667 6.14167 12.7083 6.425 12.425C6.70833 12.1417 7.06667 12 7.5 12H40.5C40.9333 12 41.2917 12.1417 41.575 12.425C41.8583 12.7083 42 13.0667 42 13.5C42 13.9333 41.8583 14.2917 41.575 14.575C41.2917 14.8583 40.9333 15 40.5 15ZM28.5 25.5H7.5C7.06667 25.5 6.70833 25.3583 6.425 25.075C6.14167 24.7917 6 24.4333 6 24C6 23.5667 6.14167 23.2083 6.425 22.925C6.70833 22.6417 7.06667 22.5 7.5 22.5H28.5C28.9333 22.5 29.2917 22.6417 29.575 22.925C29.8583 23.2083 30 23.5667 30 24C30 24.4333 29.8583 24.7917 29.575 25.075C29.2917 25.3583 28.9333 25.5 28.5 25.5Z" fill="#DC0A2D"/>
          </svg>
        </button>
        <button type="button" className="search_button" onClick={ () => setSearchOpen(!searchOpen)}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.7 40.85L26.65 28.8C25.65 29.6667 24.4833 30.3417 23.15 30.825C21.8167 31.3083 20.4 31.55 18.9 31.55C15.3 31.55 12.25 30.3 9.75 27.8C7.25 25.3 6 22.2833 6 18.75C6 15.2167 7.25 12.2 9.75 9.7C12.25 7.2 15.2833 5.95 18.85 5.95C22.3833 5.95 25.3917 7.2 27.875 9.7C30.3583 12.2 31.6 15.2167 31.6 18.75C31.6 20.1833 31.3667 21.5667 30.9 22.9C30.4333 24.2333 29.7333 25.4833 28.8 26.65L40.95 38.7C41.25 38.9667 41.4 39.3083 41.4 39.725C41.4 40.1417 41.2333 40.5167 40.9 40.85C40.6 41.15 40.2333 41.3 39.8 41.3C39.3667 41.3 39 41.15 38.7 40.85ZM18.85 28.55C21.55 28.55 23.85 27.5917 25.75 25.675C27.65 23.7583 28.6 21.45 28.6 18.75C28.6 16.05 27.65 13.7417 25.75 11.825C23.85 9.90833 21.55 8.95 18.85 8.95C16.1167 8.95 13.7917 9.90833 11.875 11.825C9.95833 13.7417 9 16.05 9 18.75C9 21.45 9.95833 23.7583 11.875 25.675C13.7917 27.5917 16.1167 28.55 18.85 28.55Z" fill="#DC0A2D"/>
          </svg>
        </button>
      </div>
      {
        searchOpen === true ? <PokemonSearch /> : null
      }
      {
        filterOpen === true ? <PokemonFilter /> : null
      }
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
    </>
  )
}

export default PokemonDex;
