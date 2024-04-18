import { useEffect, useState } from 'react';
import JSConfetti from 'js-confetti';

const Modal = (props) => {
	const [jsConfetti, setJsConfetti] = useState(null);

	useEffect(() => {
		const confetti = new JSConfetti();
		setJsConfetti(confetti);

		confetti.addConfetti({
			confettiColors: ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson'],
			confettiNumber: 500,
		});
	}, []);

	return <div className='modal_btn' style={{ width: '0px', height: '0px' }}></div>;
};

export default Modal;
