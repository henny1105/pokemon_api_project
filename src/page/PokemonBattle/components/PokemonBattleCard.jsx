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
                <img className="battle-card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif"></img>
            </div>
        </div>
    )
}

export default PokemonBattleCard
