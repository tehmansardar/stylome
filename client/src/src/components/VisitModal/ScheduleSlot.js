import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Chip, Avatar } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { dispatchGetStaffSlots } from '../../../redux/actions/visitActions';

import axios from 'axios';

const ScheduleSlot = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [selectMember, setSelectMember] = useState(1);
	const [staff, setStaff] = useState([]);
	const [selectedSlots, setSelectedSlots] = useState([]);

	const token = useSelector((state) => state.token);
	const visit = useSelector((state) => state.visit);

	useEffect(() => {
		const staffAndSlots = async () => {
			const res = await axios.post(
				'/api/visit/staffforvisit',
				{
					service: visit.service,
				},
				{
					headers: { Authorization: token },
				}
			);
			// console.log(res.data);
			setStaff(res.data);
			setLoading(false);
		};
		staffAndSlots();
	}, [token, visit]);

	const getStaffAndSlots = () => {
		const staffAndSlots = { selectMember, selectedSlots };
		return dispatch(dispatchGetStaffSlots(staffAndSlots));
	};

	const handleSelectMember = (e) => {
		const changeMemeber = e.currentTarget.getAttribute('data-id');
		setSelectMember(changeMemeber);
		setSelectedSlots([]);
		// getStaffAndSlots();
	};

	useEffect(() => {
		getStaffAndSlots();
	}, [dispatch, selectMember, selectedSlots]);

	// const chooseSlot = (e) => {
	// 	e.preventDefault();
	// 	const personId = e.currentTarget.getAttribute('data-id');

	// 	if (selectMember === personId) {
	// 		console.log(e.target.value, personId);
	// 		e.currentTarget.classList.add('slot-select');
	// 	}
	// };

	return (
		<div className='px-3'>
			{loading ? (
				<div className='flex justify-center items-center'>
					<CircularProgress color='primary' />
				</div>
			) : (
				<>
					<h2 className='mb-2'>Choose person for service</h2>
					{staff.length > 0 ? (
						<>
							<ul className='flex flex-row flex-wrap'>
								{staff.map((stafff, index) => {
									return (
										<li
											key={index}
											data-id={stafff._id}
											className='list-none mr-1 mb-1'
											onClick={handleSelectMember}
										>
											<Chip
												variant={
													selectMember === stafff._id ? 'default' : 'outlined'
												}
												label={stafff.name}
												clickable={true}
												color={
													selectMember === stafff._id ? 'primary' : 'secondary'
												}
												avatar={<Avatar>{stafff.name.charAt(0)}</Avatar>}
											/>
										</li>
									);
								})}
							</ul>
						</>
					) : (
						<>
							<p>No Staff Member</p>
						</>
					)}

					{/* Schedule Time */}
					<div className='mt-5'>
						<h2>Choose slots for service</h2>
						<div className='flex flex-row flex-wrap mt-2'>
							{staff
								.filter((member) => member._id === selectMember)
								.map((member) =>
									member.slots.map((slot) => (
										<button
											key={slot._id}
											className={`${
												slot.book
													? 'slot-default'
													: 'slot-default slot-reserved'
											}  w-12 h-6 mr-1 mb-2 text-center`}
											value={slot.slot}
											data-id={member._id}
											// onClick={chooseSlot}
											onClick={(e) => {
												e.preventDefault();
												const personId =
													e.currentTarget.getAttribute('data-id');
												e.currentTarget.setAttribute('disabled', true);
												if (selectMember === personId) {
													if (slot.book === true) {
														setSelectedSlots((currentArray) => [
															...currentArray,
															slot,
														]);
														e.currentTarget.classList.add('slot-select');
													}

													// getStaffAndSlots();
												}
											}}
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
