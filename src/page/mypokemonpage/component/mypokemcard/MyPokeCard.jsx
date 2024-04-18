import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import './MyPokeCard.style.css'
import axios from 'axios';

const MyPokeCard = ({myPoke}) => {
    const [pokeImg, setPokeImg] = useState('');
    const [pokeId,setPokeId] = useState('')
    const [pokeName,setPokeName] = useState('')
    useEffect(() => {
      const fetchPokeData = async () => {
        try {
          const response = await axios.get(myPoke.url);
          const speciesResponse = await axios.get(response.data.species.url);
          const data = response.data;
          const koreanName = speciesResponse.data.names.find(
            (name) => name.language.name === "ko"
          );
  
          // 원하는 데이터로부터 이미지 URL을 추출하는 등의 작업 수행
          const imageUrl = data.sprites?.versions['generation-v']['black-white'].animated.front_default;
  
          // 추출한 이미지 URL을 상태에 설정
          setPokeImg(imageUrl);
          setPokeId(data.id)
          setPokeName(koreanName ? koreanName.name :'unknown')

          console.log('sp',speciesResponse)
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
        }
      };
  
      // myPoke.url이 변경될 때마다 데이터를 다시 가져옴
      fetchPokeData();
    }, [myPoke.url]);
    return (
        <div className='sun-pokemon-card-area body_3'>
          <div className='sun-card-number'>{`no.${pokeId}`}</div>
          <img className='sun-my-pokemon-img' src={pokeImg} alt="pokemon" />
          <div className='sun-pokemon-name'>{pokeName}</div>
        </div>
    )
}

export default MyPokeCard