import React, { useState, useEffect } from 'react';

const FloatingCursor = ({ imgSrc, altText }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updatePosition = (e) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', updatePosition);

		return () => {
			window.removeEventListener('mousemove', updatePosition);
		};
	}, []);

	return (
		<div className='cursor' style={{ left: `${position.x}px`, top: `${position.y}px` }}>
			<img src={imgSrc} alt={altText} />
		</div>
	);
};

export default FloatingCursor;
