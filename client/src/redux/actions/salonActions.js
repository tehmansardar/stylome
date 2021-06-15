import ACTIONS from './index';
import axios from 'axios';

export const fetchSalon = async (token) => {
	const res = await axios.get('/api/salon/salonbyuser', {
		headers: { Authorization: token },
	});
	return res;
};

export const dispatchGetSalon = (res) => {
	return {
		type: ACTIONS.GET_SALON,
		payload: res.data,
	};
};
