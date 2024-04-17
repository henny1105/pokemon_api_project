import React from 'react'
import "./PokemonBattleCard.style.css"

const PokemonBattleCard = ({ BattlePokemon }) => {

    return (
        <div className='battle-card'>
            <div className='battle-status-bar'>
                <div className="battle-name" style={{ marginRight: 10 }}>{BattlePokemon?.name}</div>
                <div className="battle-hp-bar">HP</div>
            </div>

            <div className='battle-card-image-container'>
                <img className="battle-card-image" ></img>
            </div>
        </div>
    )
}

export default PokemonBattleCard
