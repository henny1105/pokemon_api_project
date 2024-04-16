import React from 'react'
import PokemonBattleCard from './components/PokemonBattleCard/PokemonBattleCard'
import "./PokemonBattlePage.style.css"

const PokemonBattlePage = () => {
    return (
        <div className='battle-backgorund' style={{
            backgroundImage: "url(" + `https://podic.kr/images/misc/Natural_Green_Berry_Tree.png` + ")"
        }}>
            <div>
                <PokemonBattleCard />
            </div>
            <div>
                <PokemonBattleCard />
            </div>
            Battle

        </div>
    )
}

export default PokemonBattlePage
