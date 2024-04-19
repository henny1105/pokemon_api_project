import React, { useEffect } from 'react';
import './PokemonBattlePage.style.css';
import PokemonBattleCard from './components/PokemonBattleCard';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import usePokemonData from './hook/usePokemonData';

const PokemonBattlePage = () => {
	const { pokemonData, loading, error } = usePokemonData(); // Pokemon 데이터 불러오기
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [myBattlePokemon, setMyBattlePokemon] = useState({ name: 'my', hp: 30 }); // 배틀 포켓몬
	const [enemyBattlePokemon, setEnemyBattlePokemon] = useState({ name: 'enemy', hp: 70 });
	const [SelectedBattlePokemon, setSelectedBattlePokemon] = useState('');
	const myPokemonList = useSelector((state) => state.myInfo.MyPokeMons); // 내가 가진 포켓몬리스트
	console.log('내가 가진 포켓몬 리스트 ', myPokemonList);
	const ticketNum = useSelector((state) => state.myInfo.Ticket); // 내가 가진 티켓 수

	useEffect(() => {
		if (pokemonData) {
			const randomIndex = Math.floor(Math.random() * pokemonData.length);
			setSelectedBattlePokemon(pokemonData[randomIndex]);
			console.log('지금 배틀 포켓몬', SelectedBattlePokemon);
			//setEnemyBattlePokemon({ name: SelectedBattlePokemon.korean_name, hp: 70 })
		}
	}, [pokemonData]);

	// 공격 버튼 클릭 시, 결과를 보여줌 -> 이기면 티켓 획득
	const showResult = () => {};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function battleRun() {
		setIsOpen(false);

		// 확인 버튼 누르면 도망 감
	}

	const customStyles = {
		overlay: {
			backgroundColor: ' rgba(0, 0, 0, 0.4)',
			width: '100%',
			height: '100vh',
			position: 'fixed',
			top: '0',
			left: '0',
		},
		content: {
			width: '400px',
			height: '180px',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			borderRadius: '10px',
			boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
			backgroundColor: 'white',
			justifyContent: 'center',
			overflow: 'auto',
		},
	};

	return (
		<div
			className='battle-backgorund'
			style={{
				backgroundImage: 'url(' + `https://podic.kr/images/misc/Natural_Green_Berry_Tree.png` + ')',
			}}
		>
			<div className='battle-ticket'>
				<FontAwesomeIcon icon={faTicket} style={{ color: '#DC0A2D', marginRight: 10 }} />
				{ticketNum}
			</div>
			<div className='battle-cards'>
				<div className='battle-enemy-card'>
					<PokemonBattleCard BattlePokemon={enemyBattlePokemon} />
				</div>
				<div className='battle-my-card'>
					<PokemonBattleCard BattlePokemon={myBattlePokemon} />
				</div>
			</div>

			<div className='battle-message-container'>
				<div className='battle-message'>
					<div style={{ marginBottom: 10 }}>야생의 "랜덤 포켓몬"을/를 마주쳤다.</div>
					<div className='battle-btns'>
						<button className='battle-attack-btn' onClick={() => showResult()}>
							공격한다.
						</button>
						<button className='battle-run-btn' onClick={openModal}>
							도망간다.
						</button>
					</div>
				</div>
			</div>

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='알림'>
				<div className='battle-modal-content'>
					<h2 style={{ color: '#DC0A2D' }}>주의</h2>
					<p style={{ marginTop: 10, marginBottom: 10 }}>도망칠 경우 배틀에서 "패배"로 인정되며 티켓을 획득하실 수 없습니다.</p>
					<div className='battle-btns'>
						<button onClick={battleRun} className='battle-modal-ok-btn' style={{ marginRight: 20 }}>
							확인
						</button>
						<button onClick={closeModal} className='battle-modal-cancel-btn'>
							취소
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default PokemonBattlePage;
