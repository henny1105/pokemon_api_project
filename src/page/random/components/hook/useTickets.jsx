import { useState, useEffect } from 'react';

const useTickets = () => {
	const [tickets, setTickets] = useState(() => {
		return loadTickets();
	});

	function loadTickets() {
		const lastDate = localStorage.getItem('lastDate');
		const today = new Date().toISOString().slice(0, 10);

		// 오늘 날짜와 로컬 스토리지에 저장된 날짜가 같다면
		if (lastDate === today) {
			const savedTickets = Number(localStorage.getItem('tickets')); // 로컬 스토리지에 저장된 티켓 수
			if (savedTickets === 0) {
				// 티켓이 0개일 때
				localStorage.setItem('tickets', 10); // 10개로 초기화
				return 10;
			}
			return savedTickets;
		} else {
			localStorage.setItem('lastDate', today); // 오늘 날짜로 갱신
			localStorage.setItem('tickets', 10); // 티켓 수 초기화
			return 10;
		}
	}

	// 티켓 수 감소 시 로컬 스토리지에 저장
	useEffect(() => {
		localStorage.setItem('tickets', tickets);
	}, [tickets]);

	return { tickets, setTickets };
};

export default useTickets;
