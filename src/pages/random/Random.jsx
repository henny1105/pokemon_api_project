import React, { useState, useEffect } from 'react';
import './Random.css';
import FloatingCursor from '../common/FloatingCursor';
import '@kfonts/neodgm-code';

// -랜덤으로 뽑은 포켓몬은 나의 포켓몬에 저장된다
// -랜덤 포켓몬은 진화되지 않은 포켓몬만 나온다?
// -랜덤 뽑기시 오박사의 오늘의 포켓몬은 뭘까요?처럼 검은색 그림자로 먼저 포켓몬이 나온다
// -뽑기는 티켓을 사용해서 뽑느다
// -티켓은 1분에 하나씩 차오른다
// -티켓의 최대치는 20개이다
// -나의 포켓몬에 저장되어있는 포켓몬이 나오면 이상한사탕으로 변한다
// -랜덤 뽑기시 뮤,뮤츠 같은 종류의 확률은 낮게 설정한다
// -테스트 용으로 티켓 최대치를 채우는 버튼을 숨겨둔다

const Random = () => {
	const getRandomIndex = () => {
		return Math.floor(Math.random() * 13) + 3;
	};

	const formatImageIndex = (index) => {
		return index < 10 ? `0${index}` : `${index}`;
	};

	const [imageIndex, setImageIndex] = useState(formatImageIndex(getRandomIndex()));

	useEffect(() => {
		const intervalId = setInterval(() => {
			setImageIndex(formatImageIndex(getRandomIndex()));
		}, 90); // 0.1초마다 실행

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<FloatingCursor imgSrc='/img/random/pokeball.svg' altText='Pokeball' />
			<div className='random_page'>
				<div className='inner'>
					<div className='top_cont'>
						<div className='pokemon_cont'>
							<img src={`img/random/img${imageIndex}.jpg`} alt='포켓몬 실루엣' />
						</div>
					</div>
					<div className='bottom_box'>
						<div className='img_box'>
							<img src='img/random/img01.jpg' alt='오박사님' />
						</div>
						<div className='cont_box'>
							<div className='speech_bubble'>
								<div className='n1'>
									<p>난 오박사란다!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Random;
