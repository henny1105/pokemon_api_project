import React, { useState, useEffect } from 'react';
import '@kfonts/neodgm-code';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingCursor from './FloatingCursor';
import usePokemonData from './hook/usePokemonData';
import './Random.style.css';
import Modal from './Modal';

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
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [randomImgIndex, setRandomImgIndex] = useState(3);
	const [showPokemon, setShowPokemon] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const initialTexts = ['나는 오박사라네!', '자 오늘의 포켓몬은 뭘까요~~?', '오늘의 포켓몬은~~~~~!', '랜덤으로 포켓몬 불러오는 중.....', ''];
	const [texts, setTexts] = useState(initialTexts);
	const [buttonText, setButtonText] = useState('넘어가기 >');
	const [showButton, setShowButton] = useState(true);

	// 포켓몬 데이터 랜덤으로 가져오기
	useEffect(() => {
		if (pokemonData) {
			const randomIndex = Math.floor(Math.random() * pokemonData.length);
			setSelectedPokemon(pokemonData[randomIndex]);
		}
	}, [pokemonData]);

	useEffect(() => {
		let interval;
		if (currentTextIndex === 3) {
			// 3번째 컨텐츠에서
			setShowPokemon(true);
			interval = setInterval(() => {
				const newRandomImgIndex = Math.floor(Math.random() * 20);
				setRandomImgIndex(newRandomImgIndex);
			}, 100); // 0.1초마다 이미지 랜덤 변경
		} else {
			setShowPokemon(false);
			clearInterval(interval); // 컨텐츠가 바뀌면 interval 초기화
		}

		return () => clearInterval(interval);
	}, [currentTextIndex]);

	useEffect(() => {
		if (currentTextIndex === 3) {
			// 3번째 컨텐츠에서
			setShowButton(false);
			const timer = setTimeout(() => {
				setButtonText('포켓몬 확인하기 >');
				setShowButton(true);
			}, 3000); // 3초 후 버튼 보이기

			return () => clearTimeout(timer);
		} else {
			setButtonText('넘어가기 >');
			setShowButton(true); // 컨텐츠가 바뀌면 버튼 보이기
		}
	}, [currentTextIndex]);

	useEffect(() => {
		if (currentTextIndex === 3) {
			// 3번째 컨텐츠에서
			setShowPokemon(true); // 포켓몬 보이기
		} else {
			setShowPokemon(false);
		}
	}, [currentTextIndex]);

	useEffect(() => {
		if (selectedPokemon && currentTextIndex === 4) {
			setTexts((prevTexts) => {
				const newTexts = [...prevTexts];
				newTexts[4] = `오늘의 포켓몬은 바로 '${selectedPokemon.korean_name}' 포켓몬이다!`; // 4번째 컨텐츠에서 포켓몬 이름 보여주기
				return newTexts;
			});
			setShowPokemon(true);
		} else {
			setShowPokemon(false);
		}
	}, [selectedPokemon, currentTextIndex]);

	const handleNextClick = () => {
		const newIndex = (currentTextIndex + 1) % texts.length; // 다음 컨텐츠로 이동
		setCurrentTextIndex(newIndex); // 컨텐츠 변경
		setShowPokemon(newIndex === 4); // 4번째 컨텐츠에서 포켓몬 상세정보 보이기
		setShowModal(newIndex === 4); // 4번째 컨텐츠에서 빵빠레 모션 보이기
	};

	if (loading) {
		return (
			<div className='spinner-area' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<Spinner animation='border' variant='danger' className='spinner_circle' style={{ width: '5rem', height: '5rem' }} />
				<p className='loading_txt ft'>오박사님 만나러 가는 중.....</p>
			</div>
		);
	}
	if (error) {
		return <div>에러 발생: {error.message}</div>;
	}

	const statKeys = {
		HP: 'hp',
		ATK: 'attack',
		DEF: 'defense',
		SATK: 'special_attack',
		SDEF: 'special_defense',
		SPD: 'speed',
	};
	return (
		<>
			<FloatingCursor imgSrc='/img/random/pokeball.svg' altText='Pokeball' />
			<div className={`random_page ${selectedPokemon ? `${selectedPokemon.type}_page` : ''}`}>
				<div className='inner'>
					<div className={`top_cont ${showPokemon ? 'visible' : ''}`}>
						<div className='pokemon_cont'>
							{currentTextIndex === 3 && (
								<div className='random_pokemon_img_cont'>
									<img src={`/img/random/pokemon${randomImgIndex.toString().padStart(2, '0')}.png`} alt='포켓몬 이미지' className='dark_pokemon_img' />
								</div>
							)}
							<div className='random_pokemon_cont'>
								{selectedPokemon && (
									<>
										<div className='img_box'>
											<img src={selectedPokemon.image} alt={selectedPokemon.korean_name} />
										</div>
										<div className='txt_box'>
											<p className={`type ${selectedPokemon ? `${selectedPokemon.type}` : ''}`}>
												<span>{selectedPokemon.type}</span>
											</p>
											<p className='id'>No. {selectedPokemon.id}</p>
											<p className='name'>{selectedPokemon.korean_name}</p>
											<p className='height'>키 : {selectedPokemon.height}m</p>
											<p className='weight'>몸무게 : {selectedPokemon.weight}kg</p>
											<ul className='spec'>
												{['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'].map((statLabel) => (
													<li key={statLabel}>
														<span>{statLabel}</span>
														<span>{selectedPokemon[statKeys[statLabel]]}</span>
														<div className='progress'>
															<div
																className={`progress-bar progress-bar-striped progress-bar-animated ${selectedPokemon ? selectedPokemon.type : ''}`}
																role='progressbar'
																aria-valuenow={selectedPokemon[statKeys[statLabel]]}
																aria-valuemin='0'
																aria-valuemax='255'
																style={{ width: `${((selectedPokemon[statKeys[statLabel]] / 255) * 100).toFixed(1)}%` }}
															></div>
														</div>
													</li>
												))}
											</ul>
											<p className='desc'>{selectedPokemon.korean_flavor_text}</p>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
					<div className='bottom_box'>
						<div className='cont_box'>
							<div className='speech_bubble'>
								<div className='img_box'>
									<img src='img/random/img01.jpg' alt='오박사님' />
								</div>
								<div className='txt_box'>
									{texts.map((text, index) => (
										<div key={index} className={index === currentTextIndex ? 'txt_desc' : 'txt_desc dn'}>
											<p className='typing ft'>{text}</p>
										</div>
									))}
								</div>
								{showButton && (
									<button type='button' className='next_btn ft' onClick={handleNextClick}>
										{buttonText}
									</button>
								)}
								{showModal && <Modal />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Random;
