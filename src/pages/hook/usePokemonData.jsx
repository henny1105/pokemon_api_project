import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonData = () => {
	const [pokemonData, setPokemonData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		const fetchData = async () => {
			try {
				const allPokemonData = [];
				for (let i = 1; i <= 251; i++) {
					const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
					const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
					const koreanName = speciesResponse.data.names.find((name) => name.language.name === 'ko');
					allPokemonData.push({ ...response.data, korean_name: koreanName.name });
				}
				setPokemonData(allPokemonData);
			} catch (e) {
				setError(e);
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	return { pokemonData, loading, error };
};

export default usePokemonData;
