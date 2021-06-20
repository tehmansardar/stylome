import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import axios from 'axios';

import './style.css';
import MobileSearch from './MobileSearch';

const HomeSearch = () => {
	const [state, setState] = useState({
		step: 1,
		show: false,
		showS: false,
		showT: false,
		showL: false,
		loadSalon: false,
		salon: '',
		resultSalon: [],
		type: '',
		location: '',
		err: '',
		success: '',
	});
	const { step, show, showS, showT, showL, salon, type, location } = state;

	let history = useHistory();

	// const handleChage = (e) => {
	// 	setState({ ...state, [e.target.name]: e.target.value, show: true });
	// };

	const salonChange = async (e) => {
		//e.preventDefault();
		setState({
			...state,
			loadSalon: true,
			salon: e.target.value,
			resultSalon: [],
			show: true,
			showS: true,
			showT: false,
			showL: false,
		});

		const res = await axios.post('/api/search/saerchbyname', {
			salon: salon,
		});

		return setState({
			...state,
			err: '',
			success: '',
			resultSalon: res.data,
			loadSalon: false,
			salon: e.target.value,
			show: true,
			showS: true,
			showT: false,
			showL: false,
		});
	};

	console.log(state.resultSalon);

	const clickSalonSuggestion = (e) => {
		e.preventDefault();
		const salonId = e.currentTarget.getAttribute('data-id');
		console.log(salonId);

		if (salonId === null) return console.log('Nothing in search');

		history.push('/salon-info/' + salonId);
	};

	const searchQuery = (e) => {
		e.preventDefault();
		// search-results
		// const salonId = parseInt(e.currentTarget.getAttribute('data-id'));
		if (type || location) {
			history.push({
				pathname: '/search-results',
				search: `?${type && 'type=' + type}${type && location ? '&' : ''}${
					location && 'location=' + location
				}`,
			});
		}
	};

	return (
		<section className='homeSearch'>
			<MobileSearch />

			{/* For Large Screens */}
			<div className='search'>
				<form
					className='search__form relative flex flex-row justify-around items-center lg:justify-between xl:justify-around px-1 py-2 lg:w-11/12 xl:w-4/5	'
					autoComplete='off'
				>
					<div className='lg:w-1/4'>
						<div className='input__wrapper w-auto'>
							<div className='input__fields px-2 py-2'>
								<label htmlFor='Salon'>Salon</label>
								<input
									type='text'
									name='salon'
									placeholder='Search by salon'
									onChange={salonChange}
									value={salon}
								/>
							</div>
							<IconButton
								onClick={() =>
									setState({
										...state,
										salon: '',
										resultSalon: [],
										showS: false,
									})
								}
							>
								<CancelIcon />
							</IconButton>
							<div className='line'></div>
						</div>
					</div>

					<div className='lg:w-1/4'>
						<div className='input__wrapper lg:ml-1'>
							<div className='input__fields px-2 py-2'>
								<label htmlFor='Type'>Type</label>
								<input
									type='text'
									name='type'
									placeholder='Search by Type'
									value={type}
									onClick={(e) => {
										e.preventDefault();
										setState({
											...state,
											show: true,
											showS: false,
											showT: true,
											showL: false,
										});
									}}
								/>
							</div>
							<IconButton
								onClick={() =>
									setState({
										...state,
										type: '',
										showT: false,
									})
								}
							>
								<CancelIcon />
							</IconButton>
							<div className='line'></div>
						</div>
					</div>

					<div className='lg:w-1/4'>
						<div className='input__wrapper lg:ml-2'>
							<div className='input__fields px-2 py-2'>
								<label htmlFor='Salon'>Location</label>
								<input
									type='text'
									name='location'
									placeholder='Search by location'
									value={location}
									onClick={(e) => {
										e.preventDefault();
										setState({
											...state,
											show: false,
											showS: false,
											showT: false,
											showL: false,
										});
									}}
									onChange={(e) =>
										setState({ ...state, location: e.target.value })
									}
								/>
							</div>
							<IconButton
								onClick={() =>
									setState({
										...state,
										location: '',
										showL: false,
									})
								}
							>
								<CancelIcon />
							</IconButton>
						</div>
					</div>
					{/* <Link to='/search-results' className='link'> */}
					<Button type='submit' className='searchButton' onClick={searchQuery}>
						<SearchIcon /> Search
					</Button>
					{/* </Link> */}

					<div
						className={`${
							showS ? (salon ? 'visible' : 'invisible') : 'invisible'
						}`}
					>
						<div className='suggestions suggestions-name bg-white mt-1 w-2/5 h-64 absolute rounded-xl overflow-scroll'>
							<ul className='p-5'>
								{state.resultSalon.map((result) => (
									<li
										key={result._id}
										data-id={result._id}
										className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
										onClick={clickSalonSuggestion}
									>
										<img
											className='w-16 rounded-lg mr-2'
											src={
												result.showcase
													? result.showcase
													: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Very_Black_screen.jpg'
											}
											alt={result.name}
										/>
										<p>{result.name}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className={`${showT ? 'visible' : 'invisible'}`}>
						<div className='suggestions suggestions-type bg-white mt-1 w-2/5 h-64 absolute rounded-xl overflow-scroll'>
							<li
								onClick={() => {
									setState({
										...state,
										show: false,
										showS: false,
										showT: false,
										showL: false,
										type: 'male',
									});
								}}
								className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							>
								{/* <img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Stylo Salon'
							/> */}
								<p>Male</p>
							</li>
							<li
								onClick={() => {
									setState({
										...state,
										show: false,
										showS: false,
										showT: false,
										showL: false,
										type: 'female',
									});
								}}
								className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							>
								{/* <img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Stylo Salon'
							/> */}
								<p>Female</p>
							</li>
							<li
								onClick={() => {
									setState({
										...state,
										show: false,
										showS: false,
										showT: false,
										showL: false,
										type: 'other',
									});
								}}
								className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							>
								{/* <img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Stylo Salon'
							/> */}
								<p>Other</p>
							</li>
						</div>
					</div>
					<div className='suggestions hidden suggestions-location bg-white mt-1 w-2/5 h-64 absolute rounded-xl overflow-scroll'>
						<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
							<img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Stylo Salon'
							/>
							<p>Stylo Salon</p>
						</li>
					</div>
				</form>
			</div>
		</section>
	);
};

export default HomeSearch;
