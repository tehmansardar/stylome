import ACTIONS from './index';

export const dispatchSalonId = (salonId) => {
	return {
		type: ACTIONS.GET_SALON_ID,
		payload: {
			salonId,
		},
	};
};

export const dispatchServiceId = (serviceId) => {
	return {
		type: ACTIONS.GET_SERVICE_ID,
		payload: {
			serviceId,
		},
	};
};
export const dispatchCustomService = (customService) => {
	return {
		type: ACTIONS.GET_CUSTOM_SERVICE,
		payload: {
			customService: customService.name,
			price: customService.price,
		},
	};
};

export const dispatchGetStaffSlots = (staffAndSlots) => {
	return {
		type: ACTIONS.GET_STAFF_SLOTS,
		payload: {
			staff: staffAndSlots.selectMember,
			slots: staffAndSlots.selectedSlots,
		},
	};
};
