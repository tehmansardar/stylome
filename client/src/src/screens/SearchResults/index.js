import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './style.css';
import SalonsList from '../../components/SalonsList';
import axios from 'axios';

import { CircularProgress } from '@material-ui/core';

const SearchResults = () => {
	const search = useLocation().search;
	const type = new URLSearchParams(search).get('type');
	const location = new URLSearchParams(search).get('location');
	console.log(location);

	const [salons, setSalons] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const salonList = async () => {
			const res = await axios.post('api/search/search', {
				type: type,
				location: location,
			});
			console.log(res.data);
			setSalons(res.data);
			setLoading(false);
		};
		salonList();
	}, []);

	return (
		<div className='SearchResults'>
			{loading ? (
				<>
					<div className='h-96 flex justify-center items-center'>
						<CircularProgress color='primary' />
					</div>
				</>
			) : (
				<>
					<div className='searchResult'>
						<div className='searchItems'>
							{/* Results */}
							<div className='left-column'>
								<div className='search_info'>
									<p>300+</p>
									<h1>
										salon {location && 'in'} {location}
									</h1>
								</div>
								<SalonsList salons={salons} />
							</div>
							{/* Map */}
							<div className='right-column'></div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SearchResults;
