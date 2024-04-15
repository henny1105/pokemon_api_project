import axios from "axios";
import React, { useEffect, useState } from "react";
import PokeInfo from "./PokeInfo";
import PokeCard from "./PokeCard";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex,setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    //console.log(res.data.results)
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results)
    setLoading(false)
  };
  const getPokemon=async(res)=>{
    res.map(async(item)=>{
      const result=await axios.get(item.url)
      setPokeData(state=>{
        state=[...state,result.data]
        state.sort((a,b)=>a.id>b.id?1:-1)
        return state;
      })
    })
  }
  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <div className="Container">
      <div className="left-content">
        <PokeCard pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>

        <div className="btn-group">
          { prevUrl &&  //첫페이지일때 버튼 없애기
            <button onClick={()=>{
            setPokeData([])  // 이 줄을 없애면 기존 출력 데이터와 버튼 눌렀을때 추가 데이터 같이 보여줌.20/40/60 이렇게
            setUrl(prevUrl)
          }}>Previous</button>}

          { nextUrl &&
          <button onClick={()=>{
            setPokeData([])  //
            setUrl(nextUrl)
          }}>Next</button>}
        </div>
      </div>
      <div className="right-content">
        <PokeInfo data={pokeDex}/>
      </div>
    </div>
  );
};

export default Main;
