import React from 'react'
import "./PokemonRunPage.style.css"
import '@kfonts/neodgm-code';
import { useNavigate } from 'react-router-dom/dist';

const PokemonRunPage = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    return (
        <div id="run" className='run-backgorund' style={{
            backgroundImage: "url(" + `https://podic.kr/images/misc/Natural_Green_Berry_Tree.png` + ")"
        }}>
            <div className="run-space"></div>
            <div className='run-message-container'>
                <div className='run-message'>
                    <div style={{ marginBottom: 10 }}>성공적으로 도망쳤다...</div>
                    <div className='run-btns'>
                        <button className='run-home-btn' onClick={() => goToHome()}>돌아간다.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonRunPage
