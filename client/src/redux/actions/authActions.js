import ACTIONS from './index';
import axios from 'axios';

export const dispatchSignin = () => {
	return {
		type: ACTIONS.SIGNIN,
	};
};

export const fetchUser = async (token) => {
	const res = await axios.get('/api/user/user_info', {
		headers: { Authorization: token },
	});
	return res;
};

export const dispatchGetUser = (res) => {
	return {
		type: ACTIONS.GET_USER,
		payload: {
			user: res.data,
			isSalon: res.data.role === 1 ? true : false,
			isAdmin: res.data.role === 2 ? true : false,
		},
	};
};
