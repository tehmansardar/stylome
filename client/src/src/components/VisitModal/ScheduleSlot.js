import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Chip, Avatar } from '@material-ui/core';

const members = [
	{
		id: 1,
		name: 'Tehman Sardar',
		rating: 4.5,
		slots: [
			{
				slotID: 1,
				slot: '07:00',
				book: false,
			},
			{
				slotID: 2,
				slot: '07:30',
				book: false,
			},
			{
				slotID: 3,
				slot: '08:00',
				book: true,
			},
			{
				slotID: 4,
				slot: '08:30',
				book: true,
			},
			{
				slotID: 5,
				slot: '09:00',
				book: true,
			},
			{
				slotID: 6,
				slot: '09:30',
				book: true,
			},
			{
				slotID: 7,
				slot: '10:00',
				book: true,
			},
		],
	},
	{
		id: 2,
		name: 'Zeeshan Sardar',
		rating: 4.5,
		slots: [
			{
				slotID: 1,
				slot: '06:00',
				book: false,
			},
			{
				slotID: 2,
				slot: '06:30',
				book: false,
			},
			{
				slotID: 3,
				slot: '07:00',
				book: true,
			},
			{
				slotID: 4,
				slot: '07:30',
				book: true,
			},
			{
				slotID: 5,
				slot: '08:00',
				book: true,
			},
			{
				slotID: 6,
				slot: '08:30',
				book: true,
			},
			{
				slotID: 7,
				slot: '09:00',
				book: true,
			},
		],
	},
	{
		id: 3,
		name: 'Salman Sardar',
		rating: 4.5,
		slots: [
			{
				slotID: 1,
				slot: '05:00',
				book: false,
			},
			{
				slotID: 2,
				slot: '05:30',
				book: false,
			},
			{
				slotID: 3,
				slot: '06:00',
				book: true,
			},
			{
				slotID: 4,
				slot: '06:30',
				book: true,
			},
			{
				slotID: 5,
				slot: '07:00',
				book: true,
			},
			{
				slotID: 6,
				slot: '07:30',
				book: true,
			},
			{
				slotID: 7,
				slot: '08:00',
				book: true,
			},
		],
	},
	{
		id: 4,
		name: 'Adnan Sardar',
		rating: 4.5,
		slots: [
			{
				slotID: 1,
				slot: '06:00',
				book: false,
			},
			{
				slotID: 2,
				slot: '06:30',
				book: false,
			},
			{
				slotID: 3,
				slot: '07:00',
				book: false,
			},
			{
				slotID: 4,
				slot: '07:30',
				book: true,
			},
			{
				slotID: 5,
				slot: '08:00',
				book: true,
			},
			{
				slotID: 6,
				slot: '08:30',
				book: false,
			},
			{
				slotID: 7,
				slot: '09:00',
				book: false,
			},
		],
	},
	{
		id: 5,
		name: 'Jhon Doe',
		rating: 4.5,
		slots: [
			{
				slotID: 1,
				slot: '06:00',
				book: false,
			},
			{
				slotID: 2,
				slot: '06:30',
				book: false,
			},
			{
				slotID: 3,
				slot: '07:00',
				book: true,
			},
			{
				slotID: 4,
				slot: '07:30',
				book: true,
			},
			{
				slotID: 5,
				slot: '08:00',
				book: true,
			},
			{
				slotID: 6,
				slot: '08:30',
				book: false,
			},
			{
				slotID: 7,
				slot: '09:00',
				book: false,
			},
		],
	},
];

const ScheduleSlot = () => {
	const [loading, setLoading] = useState(true);
	const [selectMember, setSelectMember] = useState(1);

	useEffect(() => {
		setTimeout(function () {
			setLoading(false);
		}, 400);
	}, []);

	const handleSelectMember = (e) => {
		const chnageMemeber = e.currentTarget.getAttribute('data-id');
		setSelectMember(parseInt(chnageMemeber));
	};

	const chooseSlot = (e) => {
		e.preventDefault();
		const personId = parseInt(e.currentTarget.getAttribute('data-id'));

		if (selectMember === personId) {
			console.log(e.target.value, personId);
			e.currentTarget.classList.add('slot-select');
		}
	};

	return (
		<div className='px-3'>
			{loading ? (
				<div className='flex justify-center items-center'>
					<CircularProgress color='primary' />
				</div>
			) : (
				<>
					<h2 className='mb-2'>Choose person for service</h2>
					<ul className='flex flex-row flex-wrap'>
						{members.map((member, i) => {
							return (
								<li
									key={i}
									data-id={member.id}
									className='list-none mr-1 mb-1'
									onClick={handleSelectMember}
								>
									<Chip
										variant={
											selectMember === member.id ? 'default' : 'outlined'
										}
										label={member.name}
										clickable={true}
										color={selectMember === member.id ? 'primary' : 'secondary'}
										avatar={<Avatar>{member.name.charAt(0)}</Avatar>}
									/>
								</li>
							);
						})}
					</ul>

					{/* Schedule Time */}
					<div className='mt-5'>
						<h2>Choose slots for service</h2>
						<div className='flex flex-row flex-wrap mt-2'>
							{members
								.filter((member) => member.id === selectMember)
								.map((member) =>
									member.slots.map((slot) => (
										<button
											key={slot.slotID}
											className={`${
												slot.book
													? 'slot-default'
													: 'slot-default slot-reserved'
											}  w-12 h-6 mr-1 mb-2 text-center`}
											value={slot.slot}
											data-id={member.id}
											onClick={chooseSlot}
										>
											{slot.slot}
										</button>
									))
								)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ScheduleSlot;
