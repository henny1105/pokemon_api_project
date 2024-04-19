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
                const requests = [];
                for (let i = 1; i <= 300; i++) {
                    requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
                    requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`));
                }

                const responses = await axios.all(requests);
                const allPokemonData = [];

                for (let i = 0; i < responses.length; i += 2) {
                    const pokemonInfo = responses[i].data;
                    const speciesInfo = responses[i + 1].data;
                    const koreanName = speciesInfo.names.find((name) => name.language.name === 'ko')?.name || '이름 없음';

                    allPokemonData.push({
                        ...pokemonInfo,
                        korean_name: koreanName,
                        image: pokemonInfo.sprites.other['official-artwork'].front_default, // 공식 아트워크 이미지 추가
                        animated_image: pokemonInfo.sprites.versions["generation-v"]["black-white"].animated.front_default,
                        height: pokemonInfo.height,
                        id: pokemonInfo.id,
                        weight: pokemonInfo.weight,
                        type: pokemonInfo.types[0].type.name,
                        hp: pokemonInfo.stats[0].base_stat,
                        attack: pokemonInfo.stats[1].base_stat,
                        defense: pokemonInfo.stats[2].base_stat,
                        special_attack: pokemonInfo.stats[3].base_stat,
                        special_defense: pokemonInfo.stats[4].base_stat,
                        speed: pokemonInfo.stats[5].base_stat,
                        full_data: pokemonInfo // 전체 데이터 저장
                    });
                }

                setPokemonData(allPokemonData);
            } catch (e) {
                setError(e.toString());
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return { pokemonData, loading, error };
};

export default usePokemonData;