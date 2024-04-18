import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Main.css"; // 스타일 파일을 불러옵니다.
import { Container } from "react-bootstrap";

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

function PokemonCard({ pokemon, koreanName }) {
  // const translatedType = pokemon.types.map((type) =>
  //   translateType(type.type.name)
  // );
   // 포켓몬의 첫 번째 타입을 추출합니다.
   const primaryType = pokemon.types.length > 0 ? pokemon.types[0].type.name : "";

   // 첫 번째 타입을 한글로 번역합니다.
   const translatedType = translateType(primaryType);

  return (
    <div className={`home-pokemon-card gmd-1 ${primaryType}`}>
      <p className="home-pokemon-id"><img width="15" height="15" src="https://img.icons8.com/office/40/pokeball.png" alt="pokeball"/> {pokemon.id}</p>
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

  useEffect(() => {
    const fetchPokemonData = async () => {
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
          return {
            ...res.data,
            koreanName: koreanName ? koreanName.name : res.data.name,
          };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemons(pokemonData);

        // 포켓몬 번호 251번까지만 불러오기
        setTotalPages(Math.ceil(251 / 20));
      } catch (error) {
        console.error(
          "포켓몬 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
      }
    };

    fetchPokemonData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 5) {
      const endPage = Math.min(i + 4, totalPages);
      pages.push(
        <div key={i}>
          {Array.from({ length: endPage - i + 1 }, (_, index) => index + i).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      );
    }
    return pages;
  };

  return (
    <Container>
      <div className="home-pokemon-container" >
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            koreanName={pokemon.koreanName}
          />
        ))}
        <div className="home-pagination">{renderPagination()}</div>
      </div>


    </Container>
  );
}

export default Main;
