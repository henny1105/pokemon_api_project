import React, { useEffect,useState } from 'react';
import './RaisePage.style.css';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePokemonInfoQuery, usePokemonEvolutionQuery } from '../../hook/usePokemonInfoQuery';
import { useDispatch, useSelector } from 'react-redux';
import { playPoke, levelUp, eat } from '../../redux/actions/raiseActions';
import axios from 'axios';

const RaisePage = () => {
	const [artWork,setArtWork]=useState('')
	const [pokeName,setPokeName]=useState('')
	const { id } = useParams()
	const { data } = usePokemonInfoQuery({ id })
	const raiseInfoFiltered = useSelector(state => state.myInfo.MyPokeMons.filter(pokemon => pokemon.data.name === id));
	const raiseInfo = raiseInfoFiltered.length > 0 ? raiseInfoFiltered[0] : null;
	const maxExp = (raiseInfo.Lv * 10) * 2;
	const dispatch = useDispatch()
	
	// const { data: evolve } = usePokemonEvolutionQuery(data?.id);

	// console.log("다음진화",evolve)
	console.log(data)

	const ClickPlayPoke = () => {
		dispatch(playPoke(id))
	}

	const ClickEat = () => {
		dispatch(eat(id))
	}

	const clickRareCandy = () => {
		dispatch(levelUp(id))
	}
	
	useEffect(()=>{
		const fetchName = async()=>{
			try{
				const speciesResponse = await axios.get(data.species.url);
				const koreanName = speciesResponse.data.names.find(
					(name) => name.language.name === "ko"
				  );
				  setPokeName(koreanName ? koreanName.name :'unknown')
				  setArtWork(data?.sprites.other["official-artwork"].front_default)
			}catch(error){
				console.error('Error fetching Pokemon data:', error);
			}
		}
		const fetchEvolve =async ()=>{
			try{
				// const response = await axios.get(evolve?.chain?.evolves_to[0].species.url);
				const speciesResponse = await axios.get(data.species.url);
				const evolveChainResponse = await axios.get(speciesResponse.data.evolution_chain.url)
				const evolveChain = evolveChainResponse.data.chain
				if(data.species.name === evolveChain.species.name && evolveChain.evolves_to.length > 0){
					const nextEvolve = await axios.get(evolveChain.evolves_to[0].species.url)
					const nextEvolveOrigin = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextEvolve.data.id}`)
					const koreanName =nextEvolve.data.names.find((name)=> name.language.name==="ko")
					setPokeName(koreanName ? koreanName.name :'unknown')
					setArtWork(nextEvolveOrigin.data?.sprites.other["official-artwork"].front_default)
					console.log("진화최최종",nextEvolveOrigin)
				}
				// const responseOrigin = await axios.get(`https://pokeapi.co/api/v2/pokemon/${response.data.id}`);
				// const originData = responseOrigin.data;
				// const koreanName = data.names.find(
				// 	(name) => name.language.name === "ko"
				//   );
				console.log("진화 최종 데이터",evolveChain)
				// console.log("진화 찐최종",responseOrigin)
				// console.log(data.id)
				// setPokeName(koreanName ? koreanName.name :'unknown')
				// setArtWork(originData?.sprites.other["official-artwork"].front_default)
			}catch(error){
				console.error('Error fetching Pokemon data:', error);
			}
		}
		if(raiseInfo.Lv >= 10){
			fetchEvolve()
		}else if(raiseInfo.Lv <= 9){
			fetchName()
		}
	},[data,raiseInfo.Lv])

	useEffect(() => {
		if (maxExp <= raiseInfo.Exp) {
			dispatch(levelUp(id))
		}
	}, [raiseInfo.Exp])

	return (
		<Container>
			<div className='py-3'>
				<h1 className='headline'>포켓몬 성장</h1>
			</div>

			<Row>
				<Col lg={6}>
					<img className='img-fluid' src={artWork} alt='pokemon' />
					<div>{pokeName}</div>
					<div>{`LV.${raiseInfo.Lv}`}</div>
					<div>
						<div>{`Exp ${raiseInfo.Exp}/${maxExp}`}</div>
						<ProgressBar now={raiseInfo.Exp} max={maxExp} variant='warning' />
					</div>
				</Col>
				<Col lg={6} className='d-flex flex-column'>
					<Button onClick={clickRareCandy} variant='warning' className='mb-1'>
						이상한 사탕 주기(LV 1+)
					</Button>
					<Button onClick={ClickEat} variant='outline-success' className='mb-1'>
						밥먹기(Exp 5+)
					</Button>
					<Button onClick={ClickPlayPoke} variant='outline-success'>놀아주기(Exp 1+)</Button>
					{/* <Button onClick={onEvolve}>진화</Button> */}
				</Col>
			</Row>
		</Container>
	);
};

export default RaisePage;
