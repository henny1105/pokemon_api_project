import React, { useEffect } from 'react'
import "./PokemonBattlePage.style.css"
import PokemonBattleCard from './components/PokemonBattleCard/PokemonBattleCard';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import usePokemonData from './hook/usePokemonData';
import '@kfonts/neodgm-code';
import { useNavigate } from 'react-router-dom/dist';
import BarLoader from "react-spinners/BarLoader";

const PokemonBattlePage = () => {
    const { pokemonData, loading, error } = usePokemonData();   // Pokemon 데이터 불러오기
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [myBattlePokemon, setMyBattlePokemon] = useState(null);     // 내가 선택한 배틀 포켓몬
    const [enemyBattlePokemon, setEnemyBattlePokemon] = useState(null);     // 랜덤 상대 배틀 포켓몬
    const [isAttack, setIsAttack] = useState(false);        // 현재 공격중인지?
    const myPokemonList = useSelector(state => state.myInfo.MyPokeMons);    // 내가 가진 포켓몬리스트
    //console.log("내가 가진 포켓몬 리스트 ", myPokemonList);
    const ticketNum = useSelector(state => state.myInfo.Ticket);    // 내가 가진 티켓 수
    const navigate = useNavigate();
    console.log("Is attack? 초기", isAttack);

    useEffect(() => {
        getRandomEnemyPokemonData();
        setMyBattlePokemon(pokemonData[0]);          // 임시로 내 포켓몬도 1번값으로 지정
    }, [pokemonData]);

    useEffect(() => {
        console.log("Is attack?", isAttack);
        
    }, [isAttack]);

    // 랜덤으로 포켓몬 데이터에서 하나 가져와서 적으로 지정
    const getRandomEnemyPokemonData = () => {
        if (pokemonData) {
            const randomIndex = Math.floor(Math.random() * pokemonData.length);
            console.log("지금 배틀 포켓몬", pokemonData[randomIndex]);
            console.log("지금 배틀 포켓몬 공격력", pokemonData[randomIndex]?.attack);
            setEnemyBattlePokemon(pokemonData[randomIndex]);       // 랜덤한 적 설정
        }
    }


    if (loading) {
        return (<div className="loader" style={{ margin: 10 }}>
            <div>걸어가는 중...</div>
            <BarLoader color="#DC0A2D" loading={loading} width={300} height={10} />
        </div>);
    }

    if (error) {
        return (<div>ERROR : {error.message}</div>);
    }

    // 공격 버튼 클릭 시, 결과를 보여줌 -> 이기면 티켓 획득
    const attack = () => {
        if(isAttack){
            setIsAttack(false);
        }
        else{
            setIsAttack(true);          // true일 경우 포켓몬 몸 흔들기
        }
        
        

        // 피 깎이는 모션
        // 내 포켓몬과 상대 포켓몬 공격력 비교
        // 더 공격력 큰 포켓몬이 승리! -> 내가 승리하면 티켓 획득
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // 도망칠 경우, run 페이지로 navigate
    function battleRun() {
        setIsOpen(false);

        // 확인 버튼 누르면 도망 감
        navigate("/battle/run");
    }

    // modal style
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

    return (
        <div id="battle" className='battle-backgorund' style={{
            backgroundImage: "url(" + `https://podic.kr/images/misc/Natural_Green_Berry_Tree.png` + ")"
        }}>
            <div className="battle-ticket">
                <img style={{ width: 40, marginRight: 10 }} src="https://cdn-icons-png.flaticon.com/128/4533/4533935.png" />
                {/* <FontAwesomeIcon icon={faTicket} style={{ color: "#DC0A2D", marginRight: 10 }} /> */}
                {ticketNum}</div>
            <div className='battle-cards'>
                {/* 포켓몬이 공격 중인 경운에는 애니메이션 수행 */}
                <div className={isAttack ? 'battle-enemy-card-atk' : 'battle-enemy-card'}>
                    <PokemonBattleCard BattlePokemon={enemyBattlePokemon} />
                </div>
                <div className={isAttack ? 'battle-my-card-atk' : 'battle-my-card'}>
                    <PokemonBattleCard BattlePokemon={myBattlePokemon} />
                </div>
            </div>

            <div className='battle-message-container'>
                <div className='battle-message'>
                    <div style={{ marginBottom: 10 }}>앗! 야생의 "{enemyBattlePokemon?.korean_name}"이/가 나타났다.</div>
                    <div className='battle-btns'>
                        <button className='battle-attack-btn' onClick={() => attack()}>공격한다.</button>
                        <button className='battle-run-btn' onClicke={openModal}>도망간다.</button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="알림"
                className="battle-modal"
            >
                <div className='battle-modal-content'>

                    <h2 style={{ color: "#DC0A2D", marginTop: 30 }}>주의</h2>
                    <p style={{ margin: 10 }}>도망칠 경우 배틀에서 "패배"로 인정되며 티켓을 획득하실 수 없습니다.</p>
                    <div className='battle-btns'>
                        <button onClick={battleRun} className='battle-modal-ok-btn' style={{ marginRight: 20 }}>확인</button>
                        <button onClick={closeModal} className='battle-modal-cancel-btn'>취소</button>
                    </div>

                </div>

            </Modal>


        </div>
    )
}

export default PokemonBattlePage
