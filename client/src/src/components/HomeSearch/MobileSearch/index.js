import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

import { Button, IconButton, Switch } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
const MobileSearch = () => {
	const [state, setState] = useState({
		step: 1,
		show: true,
		salon: '',
		type: '',
		location: '',
	});
	const { step, show, salon, type, location } = state;

	let history = useHistory();

	const handleChage = (e) => {
		setState({ ...state, [e.target.name]: e.target.value, show: true });
	};

	const clickSalonSuggestion = (e) => {
		e.preventDefault();
		const salonId = parseInt(e.currentTarget.getAttribute('data-id'));
		console.log(salonId);
		history.push('/salon-info/' + salonId);
	};

	const selectDropDownvalue = (e) => {
		e.preventDefault();
		const name = e.currentTarget.getAttribute('data-name');
		if (step === 2) {
			setState({ ...state, type: name, show: !show });
		}
		if (step === 3) {
			setState({ ...state, location: name, show: !show });
		}
	};

	const searchQuery = (e) => {
		e.preventDefault();
		// search-results
		// const salonId = parseInt(e.currentTarget.getAttribute('data-id'));
		history.push({
			pathname: '/search-results',
			search: `?${type && 'type=' + type}${type && location ? '&' : ''}${
				location && 'location=' + location
			}`,
		});
	};

	const firstStep = (
		<div className='firstStep'>
			<div className='input__wrapper'>
				<SearchIcon className='search-icon' />
				<input
					type='text'
					className='salon'
					name='salon'
					placeholder='Searh by Salon'
					value={salon}
					onChange={handleChage}
				/>
				<IconButton
					onClick={() => setState({ ...state, salon: '' })}
					className={`${salon ? 'visible' : 'invisible'}`}
				>
					<CancelIcon />
				</IconButton>
			</div>
			<Button
				className='setp1Btn'
				onClick={() => setState({ ...state, step: 2 })}
			>
				Next <ArrowRightAltIcon />
			</Button>
		</div>
	);
	const secStep = (
		<div className='secStep'>
			<div className='input__wrapper'>
				<ArrowDropDownIcon className='search-icon' />
				<input
					type='text'
					className='type'
					name='type'
					placeholder='Searh by Type'
					value={type}
					onChange={handleChage}
				/>
				<IconButton
					onClick={() => setState({ ...state, type: '' })}
					className={`${type ? 'visible' : 'invisible'}`}
				>
					<CancelIcon />
				</IconButton>
			</div>
			<div>
				<Button
					className='Backsetp2Btn'
					onClick={() => setState({ ...state, step: 1 })}
				>
					Back
				</Button>
				<Button
					className='setp2Btn'
					onClick={() => setState({ ...state, step: 3 })}
				>
					Next <ArrowRightAltIcon />
				</Button>
			</div>
		</div>
	);

	const thirdStep = (
		<div className='thirdStep'>
			<div className='input__wrapper'>
				<RoomIcon className='search-icon' />
				<input
					type='text'
					className='location'
					name='location'
					placeholder='Searh by location'
					value={location}
					onChange={handleChage}
				/>
				<IconButton
					onClick={() => setState({ ...state, location: '' })}
					className={`${location ? 'visible' : 'invisible'}`}
				>
					<CancelIcon />
				</IconButton>
			</div>
			<Button
				className='Backsetp3Btn'
				onClick={() => setState({ ...state, step: 2 })}
			>
				Back
			</Button>
			<Button className='setp3Btn' onClick={searchQuery}>
				<SearchIcon /> Search
			</Button>
		</div>
	);

	return (
		<div className='mobileSearch'>
			<form autoComplete='off'>
				<div className='search__wrapper'>
					{state.step === 1 && firstStep}
					{state.step === 2 && secStep}
					{state.step === 3 && thirdStep}
				</div>
			</form>

			<div className={`${salon ? 'visible' : 'invisible'}`}>
				<div className='m-suggestions m-suggestions-name bg-white mt-1 w-2/4 h-64 absolute rounded-xl overflow-scroll'>
					<ul className='p-5'>
						<li
							data-id='1'
							className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							onClick={clickSalonSuggestion}
						>
							<img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Stylo Salon'
							/>
							<p>Stylo Salon</p>
						</li>
					</ul>
				</div>
			</div>
			<div
				className={`${type ? (show ? 'visible' : 'invisible') : 'invisible'}`}
			>
				<div className='m-suggestions m-suggestions-name bg-white mt-1 w-2/4 h-64 absolute rounded-xl overflow-scroll'>
					<ul className='p-5'>
						<li
							data-name='salon'
							className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							onClick={selectDropDownvalue}
						>
							<img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Salon'
							/>
							<p>Salon</p>
						</li>
					</ul>
				</div>
			</div>

			<div
				className={`${
					location ? (show ? 'visible' : 'invisible') : 'invisible'
				}`}
			>
				<div className='m-suggestions m-suggestions-name bg-white mt-1 w-2/4 h-64 absolute rounded-xl overflow-scroll'>
					<ul className='p-5'>
						<li
							data-name='Lahore,Pakistan'
							className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							onClick={selectDropDownvalue}
						>
							<img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Stylo Salon'
							/>
							<p>Stylo Salon</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MobileSearch;
