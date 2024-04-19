import React from 'react'
import './PokemonSearch.style.css';

const PokemonSearch = ({ setSearch, pokemonSearch }) => {
  return (
    <div className="pokemon_search">
      <form className="search_form inner_shadow" onSubmit={ pokemonSearch }>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.7 40.85L26.65 28.8C25.65 29.6667 24.4833 30.3417 23.15 30.825C21.8167 31.3083 20.4 31.55 18.9 31.55C15.3 31.55 12.25 30.3 9.75 27.8C7.25 25.3 6 22.2833 6 18.75C6 15.2167 7.25 12.2 9.75 9.7C12.25 7.2 15.2833 5.95 18.85 5.95C22.3833 5.95 25.3917 7.2 27.875 9.7C30.3583 12.2 31.6 15.2167 31.6 18.75C31.6 20.1833 31.3667 21.5667 30.9 22.9C30.4333 24.2333 29.7333 25.4833 28.8 26.65L40.95 38.7C41.25 38.9667 41.4 39.3083 41.4 39.725C41.4 40.1417 41.2333 40.5167 40.9 40.85C40.6 41.15 40.2333 41.3 39.8 41.3C39.3667 41.3 39 41.15 38.7 40.85ZM18.85 28.55C21.55 28.55 23.85 27.5917 25.75 25.675C27.65 23.7583 28.6 21.45 28.6 18.75C28.6 16.05 27.65 13.7417 25.75 11.825C23.85 9.90833 21.55 8.95 18.85 8.95C16.1167 8.95 13.7917 9.90833 11.875 11.825C9.95833 13.7417 9 16.05 9 18.75C9 21.45 9.95833 23.7583 11.875 25.675C13.7917 27.5917 16.1167 28.55 18.85 28.55Z" fill="#DC0A2D"/>
        </svg>
        <input className="search_input" type="text" placeholder='Search' onChange={ (e) => setSearch(e.target.value) } />
        <button type="reset" value="X" onClick={ () => setSearch("") }>X</button>
      </form>
    </div>
  )
}

export default PokemonSearch;
