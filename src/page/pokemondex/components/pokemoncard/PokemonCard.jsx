import React, { useState, useEffect } from 'react';
// import './PokemonCard.style.css';
import styles from './PokemonCard.module.css';
// import { useDispatch, useSelector } from 'react-redux';

const PokemonCard = ({ pokemonData, movePokemonInfo, filtered, search, clicked }) => {
  const [catchPokemon, setCatchPokemon] = useState(false);
  const [typeFiltered, setTypeFiltered] = useState("");

  // const dispatch = useDispatch();
  // const pokemonCatch = useSelector( state=>state.catch );
  // const toCatchButton = () => {
  //   dispatch({ type: "CATCH" });
    // setCatchPokemon(true);
  // }
  // const toUnCatchButton = () => {
  //   dispatch({ type: "UN_CATCH"});
    // setCatchPokemon(false);
  // }
  const catchToggle = () => {
    setCatchPokemon(!catchPokemon);
  };

  useEffect(() => {
    const typeFilter = () => {
      const a = pokemonData?.filter((val) => {
        if( clicked === "" ) {
          return val
        } else if ( val?.types.map((a) => a.type.name).includes(clicked)) {
          return val
        }
      }).map((data) => {
        return data;
      })
      setTypeFiltered(a);
    };
    typeFilter();
    // eslint-disable-next-line
  }, [clicked]);

  const translateType = (englishType) => {
    switch (englishType) {
      case "normal":
        return "노멀";
      case "fire":
        return "불";
      case "water":
        return "물";
      case "electric":
        return "전기";
      case "grass":
        return "풀";
      case "ice":
        return "얼음";
      case "fighting":
        return "격투";
      case "poison":
        return "독";
      case "ground":
        return "땅";
      case "flying":
        return "비행";
      case "psychic":
        return "에스퍼";
      case "bug":
        return "벌레";
      case "rock":
        return "바위";
      case "ghost":
        return "고스트";
      case "dragon":
        return "드래곤";
      case "dark":
        return "악";
      case "steel":
        return "강철";
      case "fairy":
        return "페어리";
      default:
        return "알 수 없음";
    }
  };

  return (
    <>
    {
      search === "" && clicked === ""
      ?
      pokemonData?.map((pokemon, index) => (
        <div className={ `${styles.card} drop_shadow_2` } key={index} onClick={ () => movePokemonInfo(pokemon.id) }>
          <div className={ styles.card_type_group } >
          { 
            pokemon.types.map((item, index) => 
            <span className={`type ${item.type.name}`} key={index}>
              { translateType(item.type.name) }
            </span>
            )
          }
          </div>
          <div className={ styles.card_number }>
            <span>#{ pokemon.id }</span>
          </div>
          <div className={ `${styles.card_img} ${styles.is_exist}` }>
            {
              catchPokemon
              // pokemonCatch
              ?
              <img src={ pokemon.image } alt="" className={ styles.catch } />
              :
              <img src={ pokemon.image } alt="" className={ styles.non_catch } />
            }
            {
              // pokemonCatch
              catchPokemon === true
              ?
              // <button type="button" className={ styles.catch_button } onClick={ () => toUnCatchButton() }>
              <button type="button" className={ styles.catch_button } onClick={ () => catchToggle(!catchPokemon) }>
                <img src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-pokemon-game-symbol-pikachu-play-picture-image_8234794.png" alt="" />
              </button>
              :
              // <button type="button" className={ styles.uncatch_button } onClick={ () => toCatchButton() }>
              <button type="button" className={ styles.uncatch_button } onClick={ () => catchToggle(!catchPokemon) }>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z" fill="#1D1D1D"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.0001 48C36.0909 48 46.0934 39.0593 47.7571 27.4286H33.7006C32.2885 31.4235 28.4786 34.2857 24.0001 34.2857C19.5217 34.2857 15.7117 31.4235 14.2997 27.4286H0.243164C1.90681 39.0593 11.9094 48 24.0001 48ZM14.2997 20.5714H0.243164C1.90681 8.94071 11.9094 0 24.0001 0C36.0909 0 46.0934 8.94071 47.7571 20.5714H33.7006C32.2885 16.5765 28.4786 13.7143 24.0001 13.7143C19.5217 13.7143 15.7117 16.5765 14.2997 20.5714ZM29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z" fill="#1D1D1D"/>
                </svg>
              </button>
            }
          </div>
          <div className={ styles.card_name }>{ pokemon.korean_name }</div>
        </div>
      ))
      :
        clicked 
        ?
        typeFiltered?.map((pokemon, index) => (
          <div className={ `${styles.card} ${styles.drop_shadow_2}` } key={index} onClick={ () => movePokemonInfo(pokemon.id) }>
              <div className={ styles.card_type_group } >
            { 
              pokemon.types.map((item) => 
              <span className={`${item.type.name} type`}>
                { translateType(item.type.name) }
              </span>
              )
            }
            </div>
            <div className={ styles.card_number }>
              <span>#{ pokemon.id }</span>
            </div>
            <div className={ `${styles.card_img} ${styles.is_exist}` }>
              {
                catchPokemon === true
                ?
                <img src={ pokemon.image } alt="" className={ styles.catch } />
                :
                <img src={ pokemon.image } alt="" className={ styles.non_catch } />
              }
            </div>
            <div className={ styles.card_name }>{ pokemon.korean_name }</div>
          </div>
        ))
        :
        pokemonData?.map((pokemon, index) => (
          <div className={ `${styles.card} drop_shadow_2` } key={index} onClick={ () => movePokemonInfo(pokemon.id) }>
              <div className={ styles.card_type_group } >
            { 
              pokemon.types.map((item, index) => 
              <span className={`type ${item.type.name}`} key={index}>
                { translateType(item.type.name) }
              </span>
              )
            }
            </div>
            <div className={ styles.card_number }>
              <span>#{ pokemon.id }</span>
            </div>
            <div className={ `${styles.card_img} ${styles.is_exist}` }>
              {
                catchPokemon === true
                ?
                <img src={ pokemon.image } alt="" className={ styles.catch } />
                :
                <img src={ pokemon.image } alt="" className={ styles.non_catch } />
              }
            </div>
            <div className={ styles.card_name }>{ pokemon.korean_name }</div>
          </div>
        ))
          ?
          search !== ""
          ?
          filtered?.map((pokemon, index) => (
            <div className={ `${styles.card} ${styles.drop_shadow_2}` } key={index} onClick={ () => movePokemonInfo(pokemon.id) }>
                <div className={ styles.card_type_group } >
              { 
                pokemon.types.map((item) => 
                <span className={`${item.type.name} type`}>
                  { translateType(item.type.name) }
                </span>
                )
              }
              </div>
              <div className={ styles.card_number }>
                <span>#{ pokemon.id }</span>
              </div>
              <div className={ `${styles.card_img} ${styles.is_exist}` }>
                {
                  catchPokemon === true
                  ?
                  <img src={ pokemon.image } alt="" className={ styles.catch } />
                  :
                  <img src={ pokemon.image } alt="" className={ styles.non_catch } />
                }
              </div>
              <div className={ styles.card_name }>{ pokemon.korean_name }</div>
            </div>
          ))
          :
          null
          :
          typeFiltered?.map((pokemon, index) => (
            <div className={ `${styles.card} ${styles.drop_shadow_2}` } key={index} onClick={ () => movePokemonInfo(pokemon.id) }>
                <div className={ styles.card_type_group } >
              { 
                pokemon.types.map((item, index) => 
                <span className={`${item.type.name} type`} key={index}>
                  { translateType(item.type.name) }
                </span>
                )
              }
              </div>
              <div className={ styles.card_number }>
                <span>#{ pokemon.id }</span>
              </div>
              <div className={ `${styles.card_img} ${styles.is_exist}` }>
                {
                  catchPokemon === true
                  ?
                  <img src={ pokemon.image } alt="" className={ styles.catch } />
                  :
                  <img src={ pokemon.image } alt="" className={ styles.non_catch } />
                }
              </div>
              <div className={ styles.card_name }>{ pokemon.korean_name }</div>
            </div>
          ))
    }
    </>
  )
}

export default PokemonCard;
