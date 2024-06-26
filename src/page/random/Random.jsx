import React, { useState, useEffect } from 'react';
import '@kfonts/neodgm-code';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import usePokemonData from './components/hook/usePokemonData';
// import useTickets from './components/hook/useTickets';
import Modal from './components/Modal';
import './Random.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { myInfoActions } from '../../redux/reducers/Slice';
import { useNavigate } from 'react-router-dom';
import PokemonInfo from './components/PokemonInfo';

const Random = () => {
	const dispatch = useDispatch();
	const myPokemons = useSelector((state) => state.myInfo.MyPokeMons);
	const ticketNum = useSelector((state) => state.myInfo.Ticket);
	const candyNum = useSelector((state) => state.myInfo.RareCandy);
	const [selectedPokemon, setSelectedPokemon] = useState(null);

	const handleSelectPokemon = () => {
		const isDuplicate = myPokemons.some((pokemon) => {
			const urlParts = pokemon.data.url.split('/');
			const pokemonId = parseInt(urlParts[urlParts.length - 2], 10); // URL에서 추출된 ID를 숫자로 변환
			const selectedId = parseInt(selectedPokemon.id, 10); // 선택된 포켓몬의 ID를 숫자로 변환
			return pokemonId === selectedId; // 숫자 타입으로 통일하여 비교
		});

		if (isDuplicate) {
			setTimeout(() => {
				alert('이미 내가 포획한 포켓몬입니다! 이상한 사탕 1개를 얻었습니다.');
				dispatch(myInfoActions.addRandomCandy(1)); // 이상한 사탕 1개 추가
			}, 1000);
		} else {
			dispatch(
				myInfoActions.addPokemon({
					id: selectedPokemon.id,
					name: selectedPokemon.name,
				})
			);
		}
	};

	const { pokemonData, loading, error } = usePokemonData();
	// const { tickets, setTickets } = useTickets();
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
			// 가중치 설정: 뮤(ID 151)와 뮤츠(ID 150)는 가중치 1, 나머지는 2
			const weights = pokemonData.map((pokemon) => {
				if (pokemon.id === 150 || pokemon.id === 151) {
					return 1; // 뮤츠와 뮤의 가중치를 낮춤
				} else {
					return 2; // 다른 포켓몬은 기본 가중치
				}
			});

			const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
			let random = Math.floor(Math.random() * totalWeight);

			for (let i = 0; i < weights.length; i++) {
				random -= weights[i];
				if (random < 0) {
					setSelectedPokemon(pokemonData[i]);
					return;
				}
			}
		}
	};

	useEffect(() => {
		if (selectedPokemon && currentTextIndex === 4) {
			handleSelectPokemon();
			// 모든 스탯 바를 0%로 초기화
			setProgressWidths(Array(6).fill(0));
			dispatch(myInfoActions.removeTicket());

			setTimeout(() => {
				// 실제 값으로 설정
				const newWidths = [selectedPokemon.hp, selectedPokemon.attack, selectedPokemon.defense, selectedPokemon.special_attack, selectedPokemon.special_defense, selectedPokemon.speed].map((stat) =>
					((stat / 255) * 100).toFixed(1)
				);

				setProgressWidths(newWidths);
			}, 100); // 100ms 후에 실제 값으로 업데이트
		}
	}, [currentTextIndex, selectedPokemon, dispatch]);

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
					if (ticketNum > 0) {
						newTexts[9] = `오늘 뽑을 수 있는 기회는 ${ticketNum}번 남아있어!`;
					} else {
						newTexts[9] = '아쉽지만 티켓을 다 썼단다!';
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
		let newIndex = (currentTextIndex + 1) % texts.length;

		if (newIndex === 1 && ticketNum === 0) {
			setTexts((prevTexts) => {
				const newTexts = [...prevTexts];
				newTexts[1] = '아쉽지만 티켓을 다 썼단다! ';
				return newTexts;
			});
		} else {
		}

		setCurrentTextIndex(newIndex);
		setShowModal(newIndex === 4);
	};

	const handleGoBack = () => {
		navigate('/battle'); //	배틀로 돌아가기
	};

	// 포켓몬 다시 뽑기
	const handleReroll = () => {
		if (ticketNum > 0) {
			selectRandomPokemon(); // 새로운 포켓몬 랜덤 선택
			setCurrentTextIndex(3); // 랜덤 이미지 뽑기 화면으로 이동
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
			<div className={`random_page ${selectedPokemon ? `${selectedPokemon.type}_page` : ''}`}>
				<div className='inner'>
					<div className={`top_cont ${showPokemon ? 'visible' : ''}`}>
						<div className='pokemon_cont'>
							<div className='battle-ticket-candy-container'>
								<div>
									<img style={{ width: 40, marginRight: 10 }} src='https://cdn-icons-png.flaticon.com/128/4533/4533935.png' />
									{/* <FontAwesomeIcon icon={faTicket} style={{ color: "#DC0A2D", marginRight: 10 }} /> */}
									{ticketNum}
								</div>
								<div style={{ marginLeft: 15 }}>
									<img style={{ width: 40, marginRight: 10 }} src='https://www.serebii.net/itemdex/sprites/sv/rarecandy.png' />
									{candyNum}
								</div>
							</div>

							{currentTextIndex === 3 && (
								<div className='random_pokemon_img_cont'>
									<img src={`/img/random/pokemon${randomImgIndex.toString().padStart(2, '0')}.png`} alt='포켓몬 이미지' className='dark_pokemon_img' />
								</div>
							)}
							<PokemonInfo pokemon={selectedPokemon} statKeys={statKeys} progressWidths={progressWidths} />
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
								{showButton && currentTextIndex !== 9 && !(currentTextIndex === 1 && ticketNum === 0) && (
									<button type='button' className='next_btn ft' onClick={handleNextClick}>
										{buttonText}
									</button>
								)}
								{currentTextIndex === 1 && ticketNum === 0 && (
									<div className='button_box'>
										<button type='button' className='next_btn ft' onClick={handleGoBack}>
											배틀로 티켓얻기
										</button>
									</div>
								)}
								{currentTextIndex === 9 && (
									<div className='button_box'>
										<button type='button' className='next_btn ft' onClick={handleGoBack}>
											배틀로 티켓얻기
										</button>
										{ticketNum > 0 && (
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
