import React from 'react';

const PokemonInfo = ({ pokemon, statKeys, progressWidths }) => (
	<div className='random_pokemon_cont'>
		{pokemon && (
			<>
				<div className='img_box'>
					<img src={pokemon.image} alt={pokemon.korean_name} />
				</div>
				<div className='txt_box'>
					<p className={`type ${pokemon.type}`}>
						<span>{pokemon.type}</span>
					</p>
					<p className='id'>No. {pokemon.id}</p>
					<p className='name'>{pokemon.korean_name}</p>
					<p className='height'>키 : {pokemon.height}m</p>
					<p className='weight'>몸무게 : {pokemon.weight}kg</p>
					<ul className='spec'>
						{['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'].map((statLabel, index) => (
							<li key={statLabel}>
								<span className='stats'>{statLabel}</span>
								<span className='stats_num'>{pokemon[statKeys[statLabel].toLowerCase()]}</span>
								<div className='progress'>
									<div
										className={`progress-bar progress-bar-striped progress-bar-animated ${pokemon.type}`}
										role='progressbar'
										aria-valuenow={pokemon[statLabel.toLowerCase()]}
										aria-valuemin='0'
										aria-valuemax='255'
										style={{ width: `${progressWidths[index]}%`, transition: 'width 0.5s ease-in-out' }}
									></div>
								</div>
							</li>
						))}
					</ul>
					<p className='desc'>{pokemon.korean_flavor_text}</p>
				</div>
			</>
		)}
	</div>
);

export default PokemonInfo;
