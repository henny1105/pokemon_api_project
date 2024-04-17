import { useEffect, useState } from 'react';
import JSConfetti from 'js-confetti';

const Modal = (props) => {
	const [jsConfetti, setJsConfetti] = useState(null);
	useEffect(() => {
		setJsConfetti(new JSConfetti());
	}, []);

	const handleClick = () => {
		jsConfetti.addConfetti({
			confettiColors: ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson'],
			confettiNumber: 500,
		});
	};

	return (
		<div className='modal_btn' style={{ witdh: '500px', height: '400px' }}>
			<button onClick={handleClick}>다시하기</button>
		</div>
	);
};

export default Modal;
