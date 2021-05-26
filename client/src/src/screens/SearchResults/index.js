import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './style.css';
import SalonsList from '../../components/SalonsList';

const SearchResults = () => {
	const search = useLocation().search;
	const type = new URLSearchParams(search).get('type');
	const location = new URLSearchParams(search).get('location');
	console.log(location);
	return (
		<div className='SearchResults'>
			<div className='searchResult'>
				<div className='searchItems'>
					{/* Results */}
					<div className='left-column'>
						<div className='search_info'>
							<p>300+</p>
							<h1>
								{type} in {location}
							</h1>
						</div>
						<SalonsList />
					</div>
					{/* Map */}
					<div className='right-column'>Salon Maps</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResults;
