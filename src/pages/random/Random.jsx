import React, { useState, useEffect } from 'react';
import './Random.css';
import FloatingCursor from '../common/FloatingCursor';
import '@kfonts/neodgm-code';
import usePokemonData from '../hook/usePokemonData';

// -랜덤으로 뽑은 포켓몬은 나의 포켓몬에 저장된다
// -랜덤 포켓몬은 진화되지 않은 포켓몬만 나온다?
// -랜덤 뽑기시 오박사의 오늘의 포켓몬은 뭘까요?처럼 검은색 그림자로 먼저 포켓몬이 나온다
// -뽑기는 티켓을 사용해서 뽑느다
// -티켓은 1분에 하나씩 차오른다
// -티켓의 최대치는 20개이다
// -나의 포켓몬에 저장되어있는 포켓몬이 나오면 이상한사탕으로 변한다
// -랜덤 뽑기시 뮤,뮤츠 같은 종류의 확률은 낮게 설정한다
// -테스트 용으로 티켓 최대치를 채우는 버튼을 숨겨둔다

const Random = () => {
	const { pokemonData, loading, error } = usePokemonData();
	const [selectedPokemon, setSelectedPokemon] = useState(null); // 선택된 포켓몬의 상태를 관리

	useEffect(() => {
		if (pokemonData) {
			const randomIndex = Math.floor(Math.random() * pokemonData.length);
			setSelectedPokemon(pokemonData[randomIndex]);
		}
	}, [pokemonData]); // pokemonData에 의존성을 가짐

	if (loading) {
		return <div>로딩중...</div>;
	}

	if (error) {
		return <div>에러 발생: {error.message}</div>;
	}

	console.log(selectedPokemon);

	return (
		<>
			<FloatingCursor imgSrc='/img/random/pokeball.svg' altText='Pokeball' />
			<div className='random_page'>
				<div className='inner'>
					<div className='top_cont'>
						<div className='pokemon_cont'>
							{selectedPokemon && (
								<>
									<div className='img_box'>
										<img src={selectedPokemon.image} alt={selectedPokemon.korean_name} />
									</div>
									<div className='txt_box'>
										<p className='name'>{selectedPokemon.korean_name}</p>
									</div>
								</>
							)}
						</div>
					</div>
					<div className='bottom_box'>
						<div className='img_box'>
							<img src='img/random/img01.jpg' alt='오박사님' />
						</div>
						<div className='cont_box'>
							<div className='speech_bubble'>
								<div className='n1'>
									<p>난 오박사란다! 오늘의 포켓몬은?</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Random;
