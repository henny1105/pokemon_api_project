import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Main.css";
import { Button, Container } from "react-bootstrap";

const translateType = (englishType) => {
  // 번역 함수는 그대로입니다.
};

function PokemonCard({ pokemon, koreanName, generation }) {
  const primaryType =
    pokemon.types.length > 0 ? pokemon.types[0].type.name : "";
  const translatedType = translateType(primaryType);

  return (
    <div className={`home-pokemon-card gmd-1 ${primaryType}`}>
      <div className="home-pokemon-id">
        <div>
          <img
            width="15"
            height="15"
            src="https://img.icons8.com/office/40/pokeball.png"
            alt="pokeball"
          />{" "}
          {generation}
        </div>
        <div>#{pokemon.id}</div>
      </div>

      <h2 className="home-pokemon-name">{koreanName}</h2>
      <img
        src={
          pokemon.sprites.versions["generation-v"]["black-white"].animated
            .front_default
        }
        alt={pokemon.name}
        className="home-pokemon-img"
      />
    </div>
  );
}

function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=251";
        const response = await axios.get(apiUrl);
        const results = response.data.results;

        const pokemonDataPromises = results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          const speciesResponse = await axios.get(res.data.species.url);
          const koreanName = speciesResponse.data.names.find(
            (name) => name.language.name === "ko"
          );
          const generation = apiUrl === "https://pokeapi.co/api/v2/pokemon?limit=251" ? "전체" : "1세대";
          return {
            ...res.data,
            koreanName: koreanName ? koreanName.name : res.data.name,
            generation: generation,
          };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemons(pokemonData);
      } catch (error) {
        console.error(
          "포켓몬 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const handleGenerationFilter = async (generation) => {
    setLoading(true);
    try {
      let apiUrl = "https://pokeapi.co/api/v2/pokemon";
      if (generation !== "전체") {
        const generationOffset = generation === "1세대" ? 0 : 151;
        const limit = generation === "1세대" ? 151 : 100;
        apiUrl = `${apiUrl}?limit=${limit}&offset=${generationOffset}`;
      } else {
        apiUrl = `${apiUrl}?limit=251`;
      }

      const response = await axios.get(apiUrl);
      const results = response.data.results;

      const pokemonDataPromises = results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        const speciesResponse = await axios.get(res.data.species.url);
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );
        return {
          ...res.data,
          koreanName: koreanName ? koreanName.name : res.data.name,
          generation: generation,
        };
      });

      const pokemonData = await Promise.all(pokemonDataPromises);
      setPokemons(pokemonData);
    } catch (error) {
      console.error(
        "포켓몬 데이터를 불러오는 중 오류가 발생했습니다:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="main-genbtn-area">
        <Button variant="outline-warning" className="main-genbtn" onClick={() => handleGenerationFilter("전체")}>전체 포켓몬</Button>
        <Button variant="outline-warning" className="main-genbtn" onClick={() => handleGenerationFilter("1세대")}>1세대</Button>
        <Button variant="outline-warning" className="main-genbtn" onClick={() => handleGenerationFilter("2세대")}>2세대</Button>
      </div>
      <div className="home-pokemon-container" ref={containerRef}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index} // 인덱스를 키로 사용
            pokemon={pokemon}
            koreanName={pokemon.koreanName}
            generation={pokemon.generation}
          />
        ))}
        {loading && (
          <p>
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/office/40/pokeball.png"
              alt="pokeball"
            />
          </p>
        )}
      </div>
    </Container>
  );
}

export default Main;
