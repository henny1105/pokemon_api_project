import React, { useEffect, useState } from 'react'
import './MyPokeCard.style.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyPokeCard = ({myPoke}) => {
    const [pokeImg, setPokeImg] = useState('');
    const [pokeId,setPokeId] = useState('')
    const [pokeName,setPokeName] = useState('')
    const [eName,setEName]=useState('')
    useEffect(() => {
      const fetchPokeData = async () => {
        try {
          const response = await axios.get(myPoke.data.url);
          const speciesResponse = await axios.get(response.data.species.url);
          const data = response.data;
          const koreanName = speciesResponse.data.names.find(
            (name) => name.language.name === "ko"
          );
  
          const imageUrl = data.sprites?.versions['generation-v']['black-white'].animated.front_default;
  
          setPokeImg(imageUrl);
          setPokeId(data.id)
          setPokeName(koreanName ? koreanName.name :'unknown')
          setEName(speciesResponse?.data.name)
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
        }
      };
  
      fetchPokeData();
    }, [myPoke.url]);

    const raiseInfoFiltered = useSelector(state => state.myInfo.MyPokeMons.filter(pokemon => pokemon.data.name === eName));
    const raiseInfo = raiseInfoFiltered.length > 0 ? raiseInfoFiltered[0] : null;


    return (
        <div className='sun-pokemon-card-area body_3'>
          <div className='sun-card-number'>{`no.${pokeId}`}</div>
          <img className='sun-my-pokemon-img' src={pokeImg} alt="pokemon" />
          <div className='sun-pokemon-name'>{`LV.${raiseInfo?.Lv}`} {pokeName}</div>
        </div>
    )
}

export default MyPokeCard