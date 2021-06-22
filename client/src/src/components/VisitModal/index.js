import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ServicesCarousel from './ServicesCarousel';
import ScheduleSlot from './ScheduleSlot';
import './style.css';

import { useDispatch, useSelector } from 'react-redux';
import { dispatchSalonId } from '../../../redux/actions/visitActions';
import axios from 'axios';

const VisitModal = ({ salon, onClose }) => {
	const [state, setState] = useState({ err: '', success: '' });
	const [nextStep, setNextStep] = useState(true);
	const nextStepModal = () => {
		setNextStep(false);
	};

	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);

	useEffect(() => {
		const salonid = () => {
			dispatch(dispatchSalonId(salon._id));
		};
		salonid();
	}, [dispatch]);

	const visit = useSelector((state) => state.visit);
	const { service, customService, staff, slots, price, status, customObj } =
		visit;

	useEffect(() => {
		if (!visit.service || !visit.customService) {
			setNextStep(true);
		}
	}, [nextStep]);

	const visitConfirm = async (e) => {
		e.preventDefault();
		const { salon } = visit;
		try {
			if (!salon || !service || !customService || !staff || !slots || !price)
				return setState({ ...state, err: 'Schedule Carefully', success: '' });

			if (slots.length > customObj.slots || slots.length < customObj.slots)
				return setState({
					...state,
					err: 'Choose required number of slots',
					success: '',
				});

			const res = await axios.post(
				'/api/visit/registerVisit',
				{
					salon: salon,
					service: service,
					customService: customService,
					staff: staff,
					slots: slots,
					price: price,
					status: status,
				},
				{
					headers: { Authorization: token },
				}
			);
			setState({ ...state, err: '', success: res.data });
			onClose(false);
		} catch (error) {
			return setState({ ...state, err: error.response.data.msg, success: '' });
		}
	};

	return (
		<div className='VisitModal sm:w-full md:w-10/12 lg:w-2/5  w-10/12 rounded-3xl h-5/6	'>
			<h1 className='text-center font-semibold text-white my-5'>
				SCHEDULE YOUR VISIT
			</h1>
			<div className='relative bg-white rounded-3xl pb-10 h-full'>
				<div className='bg-white w-full'>
					<div className='time-price flex flex-row justify-between px-10 py-2 text-gray-700'>
						<span>
							<AccessTimeIcon />
							{customObj.slots ? customObj.slots * 30 + 'min' : 0}
						</span>
						<span>
							<LocalOfferIcon />
							{price ? price + 'Rs' : '0'}
						</span>
					</div>
					{nextStep ? <ServicesCarousel salon={salon} /> : <ScheduleSlot />}
				</div>

				<div className='navigate-modal flex justify-end	absolute bottom-3 right-0 pr-12'>
					{nextStep ? (
						<>
							<div className='mr-2'>
								<Button
									variant='contained'
									color='primary'
									className='h-12 '
									color='secondary'
									style={{ outline: 'none' }}
									onClick={onClose}
								>
									Cancel
								</Button>
							</div>
							<div>
								<Button
									variant='contained'
									color='#000'
									className='h-12 '
									color='primary'
									style={{ outline: 'none' }}
									onClick={nextStepModal}
								>
									<span className='text-sm'>Next</span>
									<ArrowForwardIosIcon />
								</Button>
							</div>
						</>
					) : (
						<>
							<div className='mr-2'>
								<Button
									variant='contained'
									color='primary'
									className='h-12 '
									color='secondary'
									style={{ outline: 'none' }}
									onClick={onClose}
								>
									Cancel
								</Button>
							</div>
							<div>
								<Button
									variant='contained'
									color='#000'
									className='h-12 '
									color='primary'
									style={{ outline: 'none' }}
									onClick={visitConfirm}
								>
									<span className='text-sm'>Confirm</span>
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default VisitModal;
