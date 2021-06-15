import ACTIONS from '../actions';

const salon = [];

const salonReducer = (state = salon, action) => {
	switch (action.type) {
		case ACTIONS.GET_SALON:
			return action.payload;
		default:
			return state;
	}
};
export default salonReducer;
