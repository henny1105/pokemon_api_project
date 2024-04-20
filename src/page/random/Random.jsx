import React, { useState, useEffect } from 'react';
import '@kfonts/neodgm-code';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingCursor from './components/FloatingCursor';
import usePokemonData from './components/hook/usePokemonData';
import useTickets from './components/hook/useTickets';
import Modal from './components/Modal';
import './Random.style.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
	const { tickets, setTickets } = useTickets();
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [randomImgIndex, setRandomImgIndex] = useState(3);
	const [showPokemon, setShowPokemon] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [progressWidths, setProgressWidths] = useState(Array(6).fill(0));
	const navigate = useNavigate();
	const statKeys = {
		HP: 'hp',
		ATK: 'attack',
		DEF: 'defense',
		SATK: 'special_attack',
		SDEF: 'special_defense',
		SPD: 'speed',
	};

	const initialTexts = [
		'나는 오박사라네!',
		'자 오늘의 포켓몬은 뭘까요~~?',
		'오늘의 포켓몬은~~~~~!',
		'랜덤으로 포켓몬 불러오는 중.....',
		'그래 ㅇㅇ (이)로군',
		'ㅇㅇ 포켓몬은 ㅇㅇ타입이지.',
		'그리고 대표적인 기술은...',
		'ㅇㅇㅇ 이로구나!',
		'다시 한번 포켓몬을 뽑아볼까?',
		'오늘 뽑을 수 있는 기회는 5번 남아있어!',
	];
	const [texts, setTexts] = useState(initialTexts);
	const [buttonText, setButtonText] = useState('넘어가기 >');
	const [showButton, setShowButton] = useState(true);

	// 포켓몬 데이터 랜덤으로 가져오기
	useEffect(() => {
		selectRandomPokemon();
	}, [pokemonData]);

	const selectRandomPokemon = () => {
		if (pokemonData && pokemonData.length > 0) {
			const randomIndex = Math.floor(Math.random() * pokemonData.length);
			setSelectedPokemon(pokemonData[randomIndex]);
		}
	};

	useEffect(() => {
		if (selectedPokemon && currentTextIndex === 4) {
			// 모든 스탯 바를 0%로 초기화
			setProgressWidths(Array(6).fill(0));

			setTimeout(() => {
				// 실제 값으로 설정
				const newWidths = [selectedPokemon.hp, selectedPokemon.attack, selectedPokemon.defense, selectedPokemon.special_attack, selectedPokemon.special_defense, selectedPokemon.speed].map((stat) =>
					((stat / 255) * 100).toFixed(1)
				);

				setProgressWidths(newWidths);
			}, 100); // 100ms 후에 실제 값으로 업데이트
		}
	}, [currentTextIndex, selectedPokemon]);

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
			}, 2000); // 3초 후 버튼 보이기

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
		if (selectedPokemon) {
			if (currentTextIndex === 4) {
				// 랜덤으로 뽑은 포켓몬이 있고, 4번째 컨텐츠일 때
				setTexts((prevTexts) => {
					const newTexts = [...prevTexts];
					newTexts[4] = `그래 '${selectedPokemon.korean_name}' (이)로군`; // 포켓몬 이름 보여주기
					return newTexts;
				});
				setShowPokemon(true);
			} else if (currentTextIndex === 5) {
				// 5번째 컨텐츠일 때, 특징 보여주기
				setTexts((prevTexts) => {
					const newTexts = [...prevTexts];
					newTexts[5] = `${selectedPokemon.korean_name} 포켓몬은 ${selectedPokemon.types}타입이지.`; // 포켓몬 특징 시작
					return newTexts;
				});
				setShowPokemon(true);
			} else if (currentTextIndex === 6) {
				// 6번째 컨텐츠일 때, 특징 보여주기
				setTexts((prevTexts) => {
					const newTexts = [...prevTexts];
					newTexts[6] = `그리고 대표적인 기술은...`; // 포켓몬 특징 끝
					return newTexts;
				});
				setShowPokemon(true);
			} else if (currentTextIndex === 7) {
				// 7번째 컨텐츠일 때, 특징 보여주기
				setTexts((prevTexts) => {
					const newTexts = [...prevTexts];
					newTexts[7] = `${selectedPokemon.abilities} 이로구나!`; // 포켓몬 특징 끝
					return newTexts;
				});
				setShowPokemon(true);
			} else if (currentTextIndex === 9) {
				// 9번째 컨텐츠일 때, 특징 보여주기
				setTexts((prevTexts) => {
					const newTexts = [...prevTexts];
					if (tickets > 0) {
						newTexts[9] = `오늘 뽑을 수 있는 기회는 ${tickets}번 남아있어!`;
					} else {
						newTexts[9] = '아쉽지만 티켓을 다 썼단다! 내일 다시 찾아다오!';
					}
					return newTexts;
				});
				setShowPokemon(true);
			} else {
				setShowPokemon(false);
			}
		}
	}, [selectedPokemon, currentTextIndex]);

	useEffect(() => {
		setShowPokemon(currentTextIndex >= 4);
	}, [currentTextIndex]);

	const handleNextClick = () => {
		const newIndex = (currentTextIndex + 1) % texts.length; // 다음 컨텐츠로 이동
		setCurrentTextIndex(newIndex); // 컨텐츠 변경
		setShowModal(newIndex === 4); // 4번째 컨텐츠에서 빵빠레 모션 보이기
	};

	const handleGoBack = () => {
		navigate('/'); //	메인으로 돌아가기
	};

	// 포켓몬 다시 뽑기
	const handleReroll = () => {
		if (tickets > 0) {
			selectRandomPokemon(); // 새로운 포켓몬 랜덤 선택
			setCurrentTextIndex(3); // 랜덤 이미지 뽑기 화면으로 이동
			setTickets(tickets - 1); // 티켓 1개 차감
		} else {
			alert('티켓이 부족합니다!');
		}
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

	return (
		<>
			<FloatingCursor imgSrc='/img/random/pokeball.svg' altText='Pokeball' />
			<div className={`random_page ${selectedPokemon ? `${selectedPokemon.type}_page` : ''}`}>
				<div className='inner'>
					<div className={`top_cont ${showPokemon ? 'visible' : ''}`}>
						<div className='pokemon_cont'>
							<div className='battle-ticket'>
								<img style={{ width: 40, marginRight: 10 }} src='https://cdn-icons-png.flaticon.com/128/4533/4533935.png' />
								{/* <FontAwesomeIcon icon={faTicket} style={{ color: '#DC0A2D', marginRight: 10 }} /> */}
								{tickets}
							</div>

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
												{['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'].map((statLabel, index) => (
													<li key={statLabel}>
														<span className='stats'>{statLabel}</span>
														<span className='stats_num'>{selectedPokemon ? selectedPokemon[statKeys[statLabel].toLowerCase()] : ''}</span>
														<div className='progress'>
															<div
																className={`progress-bar progress-bar-striped progress-bar-animated ${selectedPokemon ? selectedPokemon.type : ''}`}
																role='progressbar'
																aria-valuenow={selectedPokemon[statLabel.toLowerCase()]}
																aria-valuemin='0'
																aria-valuemax='255'
																style={{ width: `${progressWidths[index]}%`, transition: 'width 0.5s ease-in-out' }}
															></div>
														</div>
													</li>
												))}
											</ul>

											<p className='desc'>{selectedPokemon.korean_flavor_text}</p>
											{/* <p>{selectedPokemon.abilities}</p> */}
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
								{showButton && currentTextIndex !== 9 && (
									<button type='button' className='next_btn ft' onClick={handleNextClick}>
										{buttonText}
									</button>
								)}
								{currentTextIndex === 9 && (
									<div className='button_box'>
										<button type='button' className='next_btn ft' onClick={handleGoBack}>
											메인으로 돌아가기
										</button>
										{tickets > 0 && (
											<button type='button' className='next_btn ft' onClick={handleReroll}>
												포켓몬 다시 뽑기
											</button>
										)}
									</div>
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
