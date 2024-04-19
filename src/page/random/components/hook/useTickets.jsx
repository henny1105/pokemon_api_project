import { useState, useEffect } from 'react';

const useTickets = () => {
	const [tickets, setTickets] = useState(() => {
		return loadTickets();
	});

	function loadTickets() {
		const lastDate = localStorage.getItem('lastDate');
		const today = new Date().toISOString().slice(0, 10);

		if (lastDate === today) {
			const savedTickets = Number(localStorage.getItem('tickets'));
			if (savedTickets === 0) {
				localStorage.setItem('tickets', 10); // 저장된 티켓이 0이면 100으로 재설정
				return 10;
			}
			return savedTickets;
		} else {
			localStorage.setItem('lastDate', today);
			localStorage.setItem('tickets', 10);
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
