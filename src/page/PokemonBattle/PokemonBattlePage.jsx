import React, { useEffect } from 'react'
import "./PokemonBattlePage.style.css"
import PokemonBattleCard from './components/PokemonBattleCard/PokemonBattleCard';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import usePokemonData from './hook/usePokemonData';
import '@kfonts/neodgm-code';
import { useNavigate } from 'react-router-dom/dist';
import BarLoader from "react-spinners/BarLoader";
import { myInfoActions } from '../../redux/reducers/Slice';

const PokemonBattlePage = () => {
    const { pokemonData, loading, error } = usePokemonData();   // Pokemon 데이터 불러오기
    // modal - 도망간다 클릭시 나오는 주의 창, modal2 - 내 배틀 포켓몬 변경을 위한 모달
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [myBattlePokemon, setMyBattlePokemon] = useState(null);     // 내가 선택한 배틀 포켓몬
    const [enemyBattlePokemon, setEnemyBattlePokemon] = useState(null);     // 랜덤 상대 배틀 포켓몬
    const [isAttack, setIsAttack] = useState(false);        // 현재 공격중인지? - 애니메이션을 위해 필요
    const [resultText, setResultText] = useState("");       // 결과 텍스트
    const [isWin, setIsWin] = useState(false);              // 배틀 결과
    const [clickedPokemon, setclickedPokemon] = useState(null);     // modal2에서 내가 선택한 변경할 포켓몬 값
    const [visibleCatch, setvisibleCatch] = useState(true);     // 한 번 잡으면 안 보이게 하기 - 포획한다
    const dispatch = useDispatch();
    const myPokemonList = useSelector(state => state.myInfo.MyPokeMons);    // 내가 가진 포켓몬리스트 가져오기
    const ticketNum = useSelector(state => state.myInfo.Ticket);    // 내가 가진 티켓 수
    const candyNum = useSelector(state => state.myInfo.RareCandy);    // 내가 가진 이상한 사탕 수
    const navigate = useNavigate();

    const myPokemonListData = [];       // 내가 가진 포켓몬리스트인데 객체 data 저장
    for (let i = 0; i < myPokemonList.length; i++) {
        // pokemonData에서 myPokemonList에 있는 이름이랑 같은 거 찾아서 넣기
        myPokemonListData.push(pokemonData.find((item) => item.name === myPokemonList[i].data.name))
    }
    // console.log("내 생각이 맞을까? ", myPokemonListData);

    // console.log("내가 가진 포켓몬 리스트 ", myPokemonList);

    useEffect(() => {
        getRandomEnemyPokemonData();    // 랜덤한 적 포켓몬 불러오기

        // 내 포켓몬 리스트의 첫(index:0)번째 값을 처음 나오는 포켓몬으로 지정
        // console.log("내 포켓몬 1번째", myPokemonList[0].data.name);
        setMyBattlePokemon(myPokemonListData[0]);
        setclickedPokemon(myPokemonListData[0]);

        //setMyBattlePokemon(pokemonData[0]);          // 임시로 내 포켓몬 1번값으로 지정(공격력 약함)
        //setMyBattlePokemon(pokemonData[148]);          // 임시로 내 포켓몬 148번값으로 지정(공격력 셈)
    }, [pokemonData]);

    useEffect(() => {
        console.log("Is attack? ", isAttack);   // 공격 확인
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

    // 로딩 스피너
    if (loading) {
        return (<div className="loader" style={{ margin: 10 }}>
            <div>배틀 하러 떠나는 중...</div>
            <BarLoader color="#DC0A2D" loading={loading} width={300} height={10} />
        </div>);
    }

    // 에러 메세지
    if (error) {
        return (<div>ERROR : {error.message}</div>);
    }

    // 공격한다 버튼 클릭 시, 결과를 보여줌 -> 이기면 티켓 획득
    const attack = () => {
        setIsAttack(true);          // true일 경우 포켓몬 몸 흔들기

        // 내 포켓몬과 상대 포켓몬 공격력 비교
        // console.log("내 포켓몬", myBattlePokemon);
        console.log("나 ", myBattlePokemon.attack, "/ 배틀 ", enemyBattlePokemon.attack);

        // 더 공격력 큰 포켓몬이 승리!
        if (myBattlePokemon.attack == enemyBattlePokemon.attack) {
            console.log("비김");
            setResultText("이번엔 비겼지만 다음엔 이기겠어!");
            setIsWin(false);
        }
        else if (myBattlePokemon.attack > enemyBattlePokemon.attack) {
            console.log("내가 이김");
            setIsWin(true);

            // 내가 승리하면 랜덤으로 티켓 또는 사탕 획득
            let getRandom = Math.random();
            console.log("두구두구 랜덤 숫자 : ", getRandom);
            if (getRandom < 0.2){
                setResultText("야호! 내가 배틀에서 승리했다! [보상 : 이상한 사탕🍬]");
                dispatch(myInfoActions.addRareCandy());
            }
            else{
                setResultText("야호! 내가 배틀에서 승리했다! [보상 : 티켓🎫]");
                dispatch(myInfoActions.addTicket());
            }

        }
        else {
            console.log("상대가 이김");
            setResultText("이런 졌군... 더 강한 포켓몬을 잡아야겠다.");
            setIsWin(false);
        }

    }

    // 배틀에서 지고 나서 다시 싸울 때
    const attackAgain=()=>{
        setIsAttack(false);
        setIsWin(false);
    }

    // 배틀 이후에 또 배틀 할 경우 - "또 싸우러 가기"
    const changeEnemyBattlePokemon = () => {
        // 값 초기화
        setEnemyBattlePokemon(null);
        setIsAttack(false);
        setIsWin(false);
        setvisibleCatch(true);

        getRandomEnemyPokemonData();    // 랜덤 포켓몬 다시 불러오기
    }

    // 내 배틀 포켓몬 변경 - 선택한 포켓몬으로 변경한다
    const changeMyBattlePokemon = (choosePokemon) => {
        // 선택한 포켓몬으로 변경
        setMyBattlePokemon(choosePokemon);

        // 모달 닫기
        closeModal2();
    }

    // 배틀에서 이기면 포켓몬 잡을 수 있게 함!
    const catchPokemon = () => {
        setvisibleCatch(false);     // 포확한다 버튼을 누르면 버튼이 안 보이게 함

        //console.log("enemyBattlePokemon", enemyBattlePokemon, enemyBattlePokemon.name, enemyBattlePokemon.id);
        setResultText(enemyBattlePokemon?.korean_name + ", 너 내 동료가 돼라!");

        if (enemyBattlePokemon) {
            let isExist = false;        // 이미 잡은 포켓몬인지 확인

            // myPokemonListData에서 상대 포켓몬이 이미 있는지 중복 여부 확인
            for (let i = 0; i < myPokemonListData.length; i++) {
                isExist = myPokemonListData.find((item) => item.name === enemyBattlePokemon.name)
            }

            if (isExist) {
                setResultText("이미 잡은 포켓몬 입니다.");
            }
            else {
                // 없을 경우에만 추가
                dispatch(
                    myInfoActions.addPokemon({
                        name: enemyBattlePokemon?.name,
                        id: enemyBattlePokemon?.id,
                    })
                );
            }
        }
    }

    // 모달 관리
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal2() {
        setIsOpen2(true);
    }

    function closeModal2() {
        setIsOpen2(false);
    }

    // 도망칠 경우, run 페이지로 navigate
    function battleRun() {
        setIsOpen(false);

        // 확인 버튼 누르면 도망 감
        navigate("/battle/run");
    }

    // modal style - 도망간다
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

    // modal style2 - 변경
    const customStyles2 = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "90%",
            height: "400px",
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
            <div className="battle-ticket-candy-container">
                <div>
                    <img style={{ width: 40, marginRight: 10 }} src="https://cdn-icons-png.flaticon.com/128/4533/4533935.png" />
                    {/* <FontAwesomeIcon icon={faTicket} style={{ color: "#DC0A2D", marginRight: 10 }} /> */}
                    {ticketNum}
                </div>
                <div style={{ marginLeft: 15 }}>
                    <img style={{ width: 40, marginRight: 10 }} src="https://www.serebii.net/itemdex/sprites/sv/rarecandy.png" />
                    {candyNum}
                </div>
            </div>
            <div className='battle-cards'>
                {/* 포켓몬이 공격 중인 경우에는 애니메이션 수행 */}
                <div className={isAttack ? 'battle-enemy-card-atk' : 'battle-enemy-card'}>
                    <PokemonBattleCard BattlePokemon={enemyBattlePokemon} />
                </div>
                <div className={isAttack ? 'battle-my-card-atk' : 'battle-my-card'}>
                    <PokemonBattleCard BattlePokemon={myBattlePokemon} />
                </div>
            </div>
            <div>
                {/* 가지고 있는 포켓몬 수만큼 포켓볼 보여줌 */}
                {myPokemonList.map((item) =>
                    <button onClick={openModal2} className="battle-change-pokemon-btn">
                        <img width={30} src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-pokemon-game-symbol-pikachu-play-picture-image_8234794.png"></img>
                    </button>
                )}

            </div>

            {
                isAttack ?
                    (
                        isWin ?
                            (
                                <div className='battle-message-container'>
                                    <div className='battle-message'>
                                        <div style={{ marginBottom: 10 }}>{resultText}</div>
                                        <div className='battle-btns'>
                                            <button className='battle-attack-btn' onClick={() => changeEnemyBattlePokemon()}>또 싸우러 가기.</button>
                                            {visibleCatch ?
                                                (<button className='battle-catch-btn' onClick={() => catchPokemon()}>포획한다.</button>)
                                                :
                                                (<></>)
                                            }
                                            <button className='battle-run-btn' onClick={() => navigate("/")}>홈으로</button>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className='battle-message-container'>
                                    <div className='battle-message'>
                                        <div style={{ marginBottom: 10 }}>{resultText}</div>
                                        <div className='battle-btns'>
                                            <button className='battle-attack-btn' onClick={() => attackAgain()}>다시 싸우기.</button>
                                            <button className='battle-attack-btn' onClick={() => navigate("/random")}>포켓몬 뽑으러 가기.</button>
                                            <button className='battle-run-btn' onClick={() => navigate("/")}>홈으로.</button>
                                        </div>
                                    </div>
                                </div>
                            )
                    )
                    :
                    (
                        <div className='battle-message-container'>
                            <div className='battle-message'>
                                <div style={{ marginBottom: 10 }}>앗! 야생의 "{enemyBattlePokemon?.korean_name}"이/가 나타났다.</div>
                                <div className='battle-btns'>
                                    <button className='battle-attack-btn' onClick={() => attack()}>공격한다.</button>
                                    <button className='battle-run-btn' onClick={openModal}>도망간다.</button>
                                </div>
                            </div>
                        </div>
                    )
            }

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
                    <div className='battle-modal-btns'>
                        <button onClick={battleRun} className='battle-modal-ok-btn'>확인</button>
                        <button onClick={closeModal} className='battle-modal-cancel-btn'>취소</button>
                    </div>

                </div>
            </Modal>

            {/* 변경할 포켓몬 선택하는 모달 */}
            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                style={customStyles2}
                contentLabel="알림"
                className="battle-modal"
            >
                <div className='battle-modal-content'>

                    <h3 style={{ color: "#DC0A2D", marginTop: 30 }}>{myBattlePokemon?.korean_name}, 수고했어 들어와!</h3>
                    <div style={{ margin: 10 }}>
                        {myPokemonListData.map((item) =>
                            <button className="battlecard-choice-btn" onClick={() => setclickedPokemon(item)}>
                                <PokemonBattleCard BattlePokemon={item} />
                            </button>
                        )}

                    </div>
                    <div className='battle-modal-btns'>
                        <button onClick={() => changeMyBattlePokemon(clickedPokemon)} className='battle-modal-cancel-btn'>가랏, {clickedPokemon?.korean_name}!</button>
                        <button onClick={closeModal2} className='battle-modal-cancel-btn'>그대로.</button>
                    </div>

                </div>
            </Modal >


        </div >


    )
}

export default PokemonBattlePage