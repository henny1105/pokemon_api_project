import { useEffect, useState } from "react";
import JSConfetti from "js-confetti";
const Modal = (props) => {
    // new JSConfetti()는 한 번만 실행되어져야 한다고 해서 useEffect를 사용하여 값을 변경해줌
    const [jsConfetti, setJsConfetti] = useState(null);
    useEffect(() => {
        setJsConfetti(new JSConfetti());
    }, []);

    const handleClick = () => {
        jsConfetti.addConfetti({
            confettiColors:["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
            confettiNumber: 500,
        });
    };

    return (
        <div style={{ witdh: "500px", height: "400px" }}>
            <button onClick={handleClick}>다시하기</button>
        </div>
    );
};

export default Modal;
