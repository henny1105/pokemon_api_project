import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Main.css";
import { Button, Container } from "react-bootstrap";

const translateType = (englishType) => {
  // 번역 함수는 그대로입니다.
};

function PokemonCard({ pokemon, koreanName, generation }) {
  // PokemonCard 컴포넌트를 정의합니다.
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generationFilter, setGenerationFilter] = useState(""); // 세대 필터 추가
  const containerRef = useRef(null);

  const fetchPokemonData = async () => {
    setLoading(true);
    try {
      const generationOffset = generationFilter === "1세대" ? 0 : 151;
      const limit = generationFilter === "1세대" ? 151 : 100; // 각 세대별로 가져올 포켓몬 수 설정

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
          (currentPage - 1) * 20 + generationOffset
        }`
      );
      const results = response.data.results;

      const pokemonDataPromises = results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        const speciesResponse = await axios.get(res.data.species.url);
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );
        const generation = generationFilter ? generationFilter : "전체"; // 세대 정보 추가
        return {
          ...res.data,
          koreanName: koreanName ? koreanName.name : res.data.name,
          generation: generation,
        };
      });

      const pokemonData = await Promise.all(pokemonDataPromises);
      setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData]);

      const totalPokemonCount = generationFilter === "1세대" ? 151 : 251; // 세대에 따른 포켓몬 총 수
      setTotalPages(Math.ceil(totalPokemonCount / 20));
    } catch (error) {
      console.error(
        "포켓몬 데이터를 불러오는 중 오류가 발생했습니다:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [currentPage, generationFilter]);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 이벤트 핸들러는 그대로입니다.
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, currentPage, generationFilter]);

  const handleGenerationFilter = (generation) => {
    setGenerationFilter(generation);
    setPokemons([]); // 필터 변경 시 포켓몬 목록 초기화
    setCurrentPage(1); // 페이지 초기화
  };

  return (
    <Container>
      <div className="main-genbtn-area">
        <Button variant="outline-warning" className="main-genbtn" onClick={() => handleGenerationFilter("1세대")}>1세대</Button>
        <Button variant="outline-warning" className="main-genbtn" onClick={() => handleGenerationFilter("2세대")}>2세대</Button>
      </div>
      <div className="home-pokemon-container" ref={containerRef}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
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
