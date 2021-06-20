import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ServicesCarousel from './ServicesCarousel';
import ScheduleSlot from './ScheduleSlot';
import './style.css';

const VisitModal = ({ salon }) => {
	const [nextStep, setNextStep] = useState(true);

	const nextStepModal = () => {
		setNextStep(!nextStep);
	};

	return (
		<div className='VisitModal sm:w-full md:w-10/12 lg:w-2/5  w-10/12 rounded-3xl h-5/6	'>
			<h1 className='text-center font-semibold text-white my-5'>
				SCHEDULE YOUR VISIT
			</h1>
			<div className='relative bg-white rounded-3xl pb-10 h-full'>
				<div className='bg-white w-full'>
					{/* <div className='time-price flex flex-row justify-between px-10 py-2 text-gray-700'>
						<span>
							<AccessTimeIcon />
							1hr 30min
						</span>
						<span>
							<LocalOfferIcon />
							$20
						</span>
					</div> */}
					{nextStep ? <ServicesCarousel salon={salon} /> : <ScheduleSlot />}
				</div>

				<div className='navigate-modal flex justify-end	absolute bottom-3 right-0 pr-12'>
					{nextStep ? (
						<>
							{/* <div className='mr-2'>
								<Button
									variant='contained'
									color='primary'
									className='h-12 '
									color='secondary'
									style={{ outline: 'none' }}
								>
									Cancel
								</Button>
							</div> */}
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
