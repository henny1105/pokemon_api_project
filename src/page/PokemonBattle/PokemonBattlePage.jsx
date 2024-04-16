import React from 'react'
import "./PokemonBattlePage.style.css"
import PokemonBattleCard from './components/PokemonBattleCard'

const PokemonBattlePage = () => {
    return (
        <div className='battle-backgorund' style={{
            backgroundImage: "url(" + `https://podic.kr/images/misc/Natural_Green_Berry_Tree.png` + ")"
        }}>
            <div className='battle-cards'>
                <div className='battle-enemy-card'>
                    <PokemonBattleCard />
                </div>
                <div className='battle-my-card'>
                    <PokemonBattleCard />
                </div>
            </div>

            <div className='battle-message-container'>
                <div className='battle-message'>
                    <div style={{ marginBottom: 10 }}>야생의 "랜덤 포켓몬"을/를 마주쳤다.</div>
                    <div className='battle-btns'>
                        <button className='battle-attack-btn'>공격한다.</button>
                        <button className='battle-run-btn'>도망간다.</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PokemonBattlePage
