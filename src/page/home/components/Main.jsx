import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Main.css";
import { Button, Container } from "react-bootstrap";

// 타입을 한글로 번역하는 함수
const translateType = (englishType) => {
  switch (englishType) {
    case "normal":
      return "노멀";
    case "fire":
      return "불";
    case "water":
      return "물";
    case "electric":
      return "전기";
    case "grass":
      return "풀";
    case "ice":
      return "얼음";
    case "fighting":
      return "격투";
    case "poison":
      return "독";
    case "ground":
      return "땅";
    case "flying":
      return "비행";
    case "psychic":
      return "에스퍼";
    case "bug":
      return "벌레";
    case "rock":
      return "바위";
    case "ghost":
      return "고스트";
    case "dragon":
      return "드래곤";
    case "dark":
      return "악";
    case "steel":
      return "강철";
    case "fairy":
      return "페어리";
    default:
      return "알 수 없음";
  }
};

function PokemonCard({ pokemon, koreanName, generation }) {
  // 포켓몬의 첫 번째 타입을 추출합니다.
  const primaryType =
    pokemon.types.length > 0 ? pokemon.types[0].type.name : "";

  // 첫 번째 타입을 한글로 번역합니다.
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
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
            (currentPage - 1) * 20
          }`
        );
        const results = response.data.results;

        const pokemonDataPromises = results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          const speciesResponse = await axios.get(res.data.species.url);
          const koreanName = speciesResponse.data.names.find(
            (name) => name.language.name === "ko"
          );
          const generation = res.data.id <= 151 ? "1세대" : "2세대"; // 세대 정보 추가
          return {
            ...res.data,
            koreanName: koreanName ? koreanName.name : res.data.name,
            generation: generation,
          };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData]);

        // 포켓몬 번호 251번까지만 불러오기
        setTotalPages(Math.ceil(251 / 20));
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
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetTop + containerRef.current.offsetHeight
      ) {
        if (!loading && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, currentPage, totalPages]);

  return (
    <Container>
      <div className="home-pokemon-container" ref={containerRef}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            koreanName={pokemon.koreanName}
            generation={pokemon.generation} // 세대 정보 전달
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

      <div className="mobile-home">
        <div>
          <Button
            variant="outline-warning"
            className="mobile-home-button gmd-1"
          >
            1세대도감
          </Button>
          <Button
            variant="outline-warning"
            className="mobile-home-button gmd-1"
          >
            2세대도감
          </Button>
        </div>
        <div>
          <Button
            variant="outline-warning"
            className="mobile-home-button gmd-1"
          >
            배틀
          </Button>
          <Button
            variant="outline-warning"
            className="mobile-home-button gmd-1"
          >
            랜덤뽑기
          </Button>
        </div>
        <div>
          <Button
            variant="outline-warning"
            className="mobile-home-button gmd-1"
          >
            포켓몬키우기
          </Button>
          <Button variant="outline-warning" className="mobile-home-button">
            나의포켓몬
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Main;
