import React, { useEffect, useState } from 'react';
import './RaisePage.style.css';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePokemonInfoQuery } from '../../hook/usePokemonInfoQuery';
import { useDispatch, useSelector } from 'react-redux';
import { playPoke, levelUp, eat, evolve, levelUpCandy } from '../../redux/actions/raiseActions';
import { useNavigate } from 'react-router-dom/dist';
import axios from 'axios';
import Modal from 'react-modal';

const RaisePage = () => {
	const [artWork, setArtWork] = useState('')
	const [pokeName, setPokeName] = useState('')
	const [evolveId, setEvolveId] = useState('')
	const { id } = useParams()
	const { data } = usePokemonInfoQuery({ id })
	const candy = useSelector(state => state.myInfo.RareCandy)
	const raiseInfoFiltered = useSelector(state => state.myInfo.MyPokeMons.filter(pokemon => pokemon.data.name === id || pokemon.data.name === evolveId));
	const raiseInfo = raiseInfoFiltered.length > 0 ? raiseInfoFiltered[0] : null;
	const maxExp = (raiseInfo.Lv * 10) * 2;
	const dispatch = useDispatch()
	const [readyEvolve, setReadyEvolve] = useState(false)
	const [readyCompleteEvolve, setReadyCompleteEvolve] = useState(false)
	const [modalIsOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();



	const ClickPlayPoke = () => {
		dispatch(playPoke(id, evolveId))
	}

	const ClickEat = () => {
		dispatch(eat(id, evolveId))
	}

	const clickRareCandy = () => {
		if (candy > 0) {
			dispatch(levelUpCandy(id, evolveId))
		} else {
			return alert("캔디가 부족합니다")
		}
	}

	useEffect(() => {
		const fetchName = async () => {
			try {
				if (data) {
					const speciesResponse = await axios.get(data.species.url);
					const koreanName = speciesResponse.data.names.find(
						(name) => name.language.name === "ko"
					);
					setPokeName(koreanName ? koreanName.name : 'unknown')
					setArtWork(data.sprites.other["official-artwork"].front_default)
				}
			} catch (error) {
				console.error('Error fetching Pokemon data:', error);
			}
		}
		const fetchEvolve = async () => {
			setReadyEvolve(true)
			try {
				const speciesResponse = await axios.get(data.species.url);
				const evolveChainResponse = await axios.get(speciesResponse.data.evolution_chain.url)
				const evolveChain = evolveChainResponse.data.chain
				setEvolveId(evolveChain.evolves_to[0].species.name)
				if (data.species.name === evolveChain.species.name && evolveChain.evolves_to.length > 0) {
					const nextEvolve = await axios.get(evolveChain.evolves_to[0].species.url)
					const nextEvolveOrigin = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextEvolve.data.id}`)
					const koreanName = nextEvolve.data.names.find((name) => name.language.name === "ko")
					setPokeName(koreanName ? koreanName.name : 'unknown')
					setArtWork(nextEvolveOrigin.data?.sprites.other["official-artwork"].front_default)
					dispatch(evolve(data.species.name, nextEvolve.data.name, `https://pokeapi.co/api/v2/pokemon/${nextEvolve.data.id}`))
					openModal()
				}
			} catch (error) {
				console.error('Error fetching Pokemon data:', error);
			}
		}
		const fetchCompleteEvolve = async () => {
			setReadyCompleteEvolve(true)
			try {
				const speciesResponse = await axios.get(data.species.url);
				const evolveCompleteChainResponse = await axios.get(speciesResponse.data.evolution_chain.url)
				const evolveCompleteChain = evolveCompleteChainResponse.data.chain
				setEvolveId(evolveCompleteChain.evolves_to[0].evolves_to[0].species.name)
				console.log('evolveId', evolveId)
				if (data.species.name === evolveCompleteChain.evolves_to[0].species.name && evolveCompleteChain.evolves_to[0].evolves_to.length > 0) {
					const nextCompleteEvolve = await axios.get(evolveCompleteChain.evolves_to[0].evolves_to[0].species.url)
					const nextCompleteEvolveOrigin = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextCompleteEvolve.data.id}`)
					const koreanName = nextCompleteEvolve.data.names.find((name) => name.language.name === "ko")
					setPokeName(koreanName ? koreanName.name : 'unknown')
					setArtWork(nextCompleteEvolveOrigin.data?.sprites.other["official-artwork"].front_default)
					dispatch(evolve(data.species.name, nextCompleteEvolve.data.name, `https://pokeapi.co/api/v2/pokemon/${nextCompleteEvolve.data.id}`))
					openModal()
				}
			} catch (error) {
				console.error('Error fetching Pokemon data:', error);
			}
		}
		if (raiseInfo && raiseInfo.Lv >= 10 && !readyEvolve) {
			fetchEvolve()
		} else if (raiseInfo && raiseInfo.Lv >= 30 && !readyCompleteEvolve) {
			fetchCompleteEvolve()
		} else {
			fetchName()
		}
	}, [data, raiseInfo.Lv])

	useEffect(() => {
		if (maxExp <= raiseInfo.Exp) {
			dispatch(levelUp(id, evolveId))
		}
	}, [raiseInfo.Exp])

	const customStyles = {
		overlay: {
			backgroundColor: " rgba(0, 0, 0, 0.4)",
			width: "100%",
			height: "100vh",
			position: "fixed",
			top: "0",
			left: "0",
		},
		content: {
			width: "400px",
			height: "180px",
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			borderRadius: "10px",
			boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
			backgroundColor: "white",
			justifyContent: "center",
			overflow: "auto",
		},
	}


	function openModal() {
		setIsOpen(true);
	}

	// 도망칠 경우, run 페이지로 navigate
	function battleRun() {
		setIsOpen(false);

		// 확인 버튼 누르면 도망 감
		navigate(`/mypokemon/${evolveId}`);
	}
	return (
		<Container  className='mb-1'>
			<div className='py-3'>
				<h1 className='headline'>포켓몬 성장</h1>
			</div>

			<Row>
				<Col lg={6}>
					<img className='img-fluid' src={artWork ? artWork : data?.sprites?.other["official-artwork"].front_default} alt='pokemon' />
					<div>{pokeName}</div>
					<div>{`LV.${raiseInfo.Lv}`}</div>
					<div>
						<div>{`Exp ${raiseInfo.Exp}/${maxExp}`}</div>
						<ProgressBar now={raiseInfo.Exp} max={maxExp} variant='warning' />
					</div>
				</Col>
				<Col lg={6} className='d-flex flex-column'>
					<Button onClick={clickRareCandy} variant='warning' className='mb-1'>
						{`이상한 사탕 주기(LV 1+) 남은갯수:${candy}`}
					</Button>
					<Button onClick={ClickEat} variant='outline-success' className='mb-1'>
						밥먹기(Exp 5+)
					</Button>
					<Button onClick={ClickPlayPoke} variant='outline-success'>놀아주기(Exp 1+)</Button>
				</Col>
			</Row>

			<Modal
				isOpen={modalIsOpen}
				style={customStyles}
				contentLabel="알림"
				className="battle-modal"
			>
				<div className='battle-modal-content'>

					<h2 style={{ color: "#DC0A2D", marginTop: 30 }}>어라랏?</h2>
					<p style={{ margin: 10 }}>{`${id}가 ${pokeName}으로 진화했다!!!!`}</p>
					<div className='battle-btns'>
						<button onClick={battleRun} className='battle-modal-ok-btn' style={{ marginRight: 20 }}>확인</button>
					</div>

				</div>

			</Modal>

		</Container>
	);
};

export default RaisePage;
