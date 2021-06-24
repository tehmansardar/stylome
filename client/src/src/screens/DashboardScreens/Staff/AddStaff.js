import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios';
import { useSelector } from 'react-redux';

const AddStaff = () => {
	let services = [];
	let serviceId = [];

	const token = useSelector((state) => state.token);
	const salon = useSelector((state) => state.salons);
	services = useSelector((state) => state.salons.services);
	if (services.length <= 0) {
		services.push({
			service: 'No Option',
		});
	}

	const [state, setState] = useState({ err: '', success: '' });
	const [staff, setStaff] = useState('');
	const [service, setService] = useState('');

	const { err, success } = state;

	if (salon.services.length > 0 && service.length > 0) {
		service.map((ser) => {
			return serviceId.push(ser._id);
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (staff === '') {
				return setState({ ...state, err: 'Add Name', success: '' });
			}
			if (serviceId.length === 0 || serviceId[0] === undefined) {
				return setState({ ...state, err: 'Allocate Service', success: '' });
			}

			axios.post(
				'/api/salon/newstaff',
				{
					name: staff,
					services: serviceId,
				},
				{
					headers: { Authorization: token },
				}
			);
			setState({ ...state, err: '', success: 'Added Successfully' });
			setStaff('');
		} catch (error) {
			setState({ ...state, err: error.response.data.msg, success: '' });
		}
	};

	// console.log(err, success);

	return (
		<div>
			<form className='staff flex' onSubmit={handleSubmit}>
				<TextField
					id='outlined-basic'
					label='Add New staff'
					// className={classes.textField}
					// size='small'
					variant='outlined'
					value={staff}
					onChange={(e) => setStaff(e.target.value)}
				/>

				<Autocomplete
					multiple
					limitTags={2}
					id='multiple-limit-tags'
					className='service'
					onChange={(e, v) => setService(v)}
					options={services}
					getOptionLabel={(option) => option.service}
					defaultValue={[services[0]]}
					renderInput={(params) => (
						<TextField
							{...params}
							variant='outlined'
							label='Services'
							placeholder='Service'
						/>
					)}
				/>

				<Button variant='contained' color='primary' size='small' type='submit'>
					Add Staff
				</Button>
			</form>
		</div>
	);
};

export default AddStaff;
