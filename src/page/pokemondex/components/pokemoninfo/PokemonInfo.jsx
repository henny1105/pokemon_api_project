import React, { useState } from 'react';
// > style
import styles from './PokemonInfo.module.css';
// > router
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// > hooks
import { usePokemonInfoQuery } from '../../../../hook/usePokemonInfoQuery';
import { usePokemonSpeciesQuery, usePokemonEvolutionQuery } from '../../../../hook/usePokemonInfoQuery';

const PokemonInfo = () => {
  const [catchPokemon, setCatchPokemon] = useState(false); // redux 처리
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = usePokemonInfoQuery({ id });
  const { data:species } = usePokemonSpeciesQuery({ id });
  const { data:evolution } = usePokemonEvolutionQuery();

  const catchToggle = () => {
    setCatchPokemon(!catchPokemon);
  };
  
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
    <div className={ `${styles.info} ${data?.types[0].type.name}` }>
      <div className={ styles.info_background }>
        <img src={ process.env.PUBLIC_URL + '/images/Pokeball.png' } alt="" />
      </div>
      <div className={ styles.info_head }>
        <div className={ styles.info_header }>
          <button type="button" onClick={ () => navigate(-1) }>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.35 38.95L8.45 25.05C8.28333 24.8833 8.16667 24.7167 8.1 24.55C8.03333 24.3833 8 24.2 8 24C8 23.8 8.03333 23.6167 8.1 23.45C8.16667 23.2833 8.28333 23.1167 8.45 22.95L22.4 9C22.6667 8.73333 23 8.6 23.4 8.6C23.8 8.6 24.15 8.75 24.45 9.05C24.75 9.35 24.9 9.7 24.9 10.1C24.9 10.5 24.75 10.85 24.45 11.15L13.1 22.5H37.9C38.3333 22.5 38.6917 22.6417 38.975 22.925C39.2583 23.2083 39.4 23.5667 39.4 24C39.4 24.4333 39.2583 24.7917 38.975 25.075C38.6917 25.3583 38.3333 25.5 37.9 25.5H13.1L24.5 36.9C24.7667 37.1667 24.9 37.5 24.9 37.9C24.9 38.3 24.75 38.65 24.45 38.95C24.15 39.25 23.8 39.4 23.4 39.4C23 39.4 22.65 39.25 22.35 38.95Z" fill="#fff"/>
            </svg>
          </button>
          { 
            species?.names.map((pokemonName, index) => (
              pokemonName.language.name === "ko"
              ?
              <h1 key={ index }>{ pokemonName.name }</h1>
              :
              null
            ))
          }
          <span>#{ data?.id }</span>
        </div>
        <div className={ styles.info_image }>
          {
            catchPokemon
            ?
            <img src={ data?.sprites.other["official-artwork"].front_default } alt="" />
            :
            <img src={ data?.sprites.other["official-artwork"].front_default } alt="" className={ styles.non_catch } />
          }
          {
            catchPokemon
            ?
            <button type="button" className={ styles.catch_button } onClick={ catchToggle }>
              <img src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-pokemon-game-symbol-pikachu-play-picture-image_8234794.png" alt="" />
            </button>
            :
            <button type="button" className={ styles.uncatch_button } onClick={ catchToggle }>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z" fill="#1D1D1D"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M24.0001 48C36.0909 48 46.0934 39.0593 47.7571 27.4286H33.7006C32.2885 31.4235 28.4786 34.2857 24.0001 34.2857C19.5217 34.2857 15.7117 31.4235 14.2997 27.4286H0.243164C1.90681 39.0593 11.9094 48 24.0001 48ZM14.2997 20.5714H0.243164C1.90681 8.94071 11.9094 0 24.0001 0C36.0909 0 46.0934 8.94071 47.7571 20.5714H33.7006C32.2885 16.5765 28.4786 13.7143 24.0001 13.7143C19.5217 13.7143 15.7117 16.5765 14.2997 20.5714ZM29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z" fill="#1D1D1D"/>
              </svg>
            </button>
          }
        </div>
      </div>
      <div className={ styles.info_body }>
        <ul className={ styles.type_group }>
          {
            data?.types.map((typeArr, index) => (
              <li className={ `type ${typeArr.type.name}` } key={ index }>{ translateType(typeArr.type.name) }</li>
            ))
          }
        </ul>
        <strong className={ styles.sub_title }>About</strong>
        <ul className={ styles.attribute_list }>
          <li className={ styles.attribute_item }>
            <strong className={ `${styles.body_3} black`}>{ data?.weight } kg</strong>
            <span className={ `${styles.body_caption} medium` }>weight</span>
          </li>
          <li className={ styles.attribute_item }>
            <strong className={ `${styles.body_3} black` }>{ data?.height } m</strong>
            <span className={ `${styles.body_caption} medium` }>Height</span>
          </li>
          <li className={ styles.attribute_item }>
            <strong className={ `${styles.body_3} black` }>{ data?.abilities[0].ability.name }</strong>
            <span className={ `${styles.body_caption} medium` }>Ability</span>
          </li>
        </ul>
        { 
          species?.flavor_text_entries.map((item, index) => (
            item.language.name === "ko" && item.version.name === "lets-go-pikachu"
            ?
            <div key={ index }>
              <p className={ `${styles.desc} body_3 black` }>{ item.flavor_text }</p>
            </div>
            :
            null
          ))
        }
        <strong className={ styles.sub_title }>Base Stats</strong>
        <div className={ styles.stats }>
          <dl className={ styles.stats_list }>
            {
              data?.stats.map((statContent, index) => (
                <div className={ styles.stats_item } key={ index }>
                  <strong>{ statContent.stat.name }</strong>
                  <dt>{ statContent.base_stat }</dt>
                  <dd>
                    <div className={ styles.bar_graph }>
                      <div className={ styles.bar_graph_active } style={{ width: `${ statContent.base_stat }` / 180 * 100 +'%'}}></div>
                    </div>
                  </dd>
                </div>
              ))
            }
          </dl>
        </div>
        <strong className={ styles.sub_title }>Evolution</strong>
        <div className={ styles.evolution }>
          <ul className={ styles.evolution_list }>
            <li className={ styles.evolution_item }>
              <strong>이미지</strong>
              <span>{evolution?.chain.species.name}</span>
            </li>
            <li className={ styles.evolution_item }>
              <strong>이미지</strong>
              <span>{evolution?.chain.evolves_to[0]?.species.name}</span>
            </li>
            <li className={ styles.evolution_item }>
              <strong>이미지</strong>
              <span>{evolution?.chain.evolves_to[0].evolves_to[0].species.name}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PokemonInfo;
