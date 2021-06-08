import ACTIONS from '../actions';

const initialState = {
	user: [],
	isLogged: false,
	isAdmin: false,
	isSalon: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.SIGNIN:
			return {
				...state,
				isLogged: true,
			};
		case ACTIONS.GET_USER:
			return {
				...state,
				user: action.payload.user,
				isSalon: action.payload.isSalon,
				isAdmin: action.payload.isAdmin,
			};
		default:
			return state;
	}
};

export default authReducer;
