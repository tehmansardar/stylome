import React, { useState, useEffect } from 'react';

import { CircularProgress } from '@material-ui/core';

import axios from 'axios';
import { useSelector } from 'react-redux';

import Visits from './Visits';

const VisitHistory = () => {
	const token = useSelector((state) => state.token);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(async () => {
		const res = await axios.get('/api/visit/userVisits', {
			headers: { Authorization: token },
		});
		setData(res.data);
		setLoading(false);
	}, [axios]);
	return (
		<div className='p-5'>
			{loading ? (
				<>
					<div className='h-96 flex justify-center items-center'>
						<CircularProgress color='primary' />
					</div>
				</>
			) : (
				<div>
					<h2 className='font-medium text-3xl mb-5'>
						{data ? 'Your Visits' : 'No Visit'}
					</h2>
					<div className='flex flex-wrap'>
						{data &&
							data.map((visit) => <Visits key={visit._id} visit={visit} />)}
					</div>
				</div>
			)}
		</div>
	);
};

export default VisitHistory;
