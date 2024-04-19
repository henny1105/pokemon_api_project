import React,{useEffect} from 'react';
import './RaisePage.style.css';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePokemonInfoQuery } from '../../hook/usePokemonInfoQuery';
import { useDispatch, useSelector } from 'react-redux';
import { playPoke,levelUp,eat } from '../../redux/actions/raiseActions';

const RaisePage = () => {
  const {id} = useParams()
  const {data} = usePokemonInfoQuery({id})
  const raiseInfoFiltered = useSelector(state => state.myInfo.MyPokeMons.filter(pokemon => pokemon.data.name === id));
  const raiseInfo = raiseInfoFiltered.length > 0 ? raiseInfoFiltered[0] : null;
  const maxExp = (raiseInfo.Lv*10)*2;
  const dispatch=useDispatch()

  const ClickPlayPoke = ()=>{
    dispatch(playPoke(id))
  }

  const ClickEat = ()=>{
    dispatch(eat(id))
  }

  const clickRareCandy = ()=>{
    dispatch(levelUp(id))
  }

  useEffect(() => {
    if(maxExp<=raiseInfo.Exp){
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
					<img className='img-fluid' src={ data?.sprites.other["official-artwork"].front_default } alt='pokemon' />
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
				</Col>
			</Row>
		</Container>
	);
};

export default RaisePage;
