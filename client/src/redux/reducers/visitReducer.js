import ACTIONS from '../actions';

const visit = {
	salon: '',
	service: '',
	customService: '',
	staff: '',
	slots: [],
	price: '',
	status: 0,
	customObj: {},
};

const visitReducer = (state = visit, action) => {
	switch (action.type) {
		case ACTIONS.GET_VISIT:
			return action.payload;
		case ACTIONS.GET_SALON_ID:
			return {
				...state,
				salon: action.payload.salonId,
			};
		case ACTIONS.GET_SERVICE_ID:
			return {
				...state,
				service: action.payload.serviceId,
			};
		case ACTIONS.GET_CUSTOM_SERVICE:
			return {
				...state,
				customService: action.payload.customService,
				price: action.payload.price,
				customObj: action.payload.customObj,
			};
		case ACTIONS.GET_STAFF_SLOTS:
			return {
				...state,
				staff: action.payload.staff,
				slots: action.payload.slots,
			};
		case ACTIONS.CLEAR_VISIT:
			return {
				...state,
				salon: '',
				service: '',
				customService: '',
				staff: '',
				slots: [],
				price: '',
				status: 0,
				customObj: {},
			};
		default:
			return state;
	}
};
export default visitReducer;
