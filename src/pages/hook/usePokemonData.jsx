import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonData = () => {
	const [pokemonData, setPokemonData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		const fetchData = async () => {
			try {
				const responses = await Promise.all(Array.from({ length: 151 }, (_, index) => axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)));
				const data = responses.map((response) => ({
					korean_name: response.data.name, // 이름 가져오기
					image: response.data.sprites.other.home.front_default, // 이미지 가져오기
				}));
				setPokemonData(data);
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
