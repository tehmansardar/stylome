import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import './style.css';
import MobileSearch from './MobileSearch';

const HomeSearch = () => {
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
								<input type='text' name='salon' placeholder='Search by salon' />
							</div>
							<IconButton>
								<CancelIcon />
							</IconButton>
							<div className='line'></div>
						</div>
					</div>

					<div className='lg:w-1/4'>
						<div className='input__wrapper lg:ml-1'>
							<div className='input__fields px-2 py-2'>
								<label htmlFor='Type'>Type</label>
								<input type='text' name='salon' placeholder='Search by Type' />
							</div>
							<IconButton>
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
									name='salon'
									placeholder='Search by location'
								/>
							</div>
							<IconButton>
								<CancelIcon />
							</IconButton>
						</div>
					</div>
					<Link to='/search-results' className='link'>
						<Button className='searchButton'>
							<SearchIcon /> Search
						</Button>
					</Link>

					<div className='suggestions  suggestions-name bg-white mt-1 w-2/5 h-64 absolute rounded-xl overflow-scroll'>
						<ul className='p-5'>
							<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
								<img
									className='w-16 rounded-lg mr-2'
									src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
									alt='Stylo Salon'
								/>
								<p>Stylo Salon</p>
							</li>
							<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
								<img
									className='w-16 rounded-lg mr-2'
									src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
									alt='Stylo Salon'
								/>
								<p>Stylo Salon</p>
							</li>
							<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
								<img
									className='w-16 rounded-lg mr-2'
									src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
									alt='Stylo Salon'
								/>
								<p>Stylo Salon</p>
							</li>
							<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
								<img
									className='w-16 rounded-lg mr-2'
									src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
									alt='Stylo Salon'
								/>
								<p>Stylo Salon</p>
							</li>
							<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
								<img
									className='w-16 rounded-lg mr-2'
									src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
									alt='Stylo Salon'
								/>
								<p>Stylo Salon</p>
							</li>
							<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
								<img
									className='w-16 rounded-lg mr-2'
									src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
									alt='Stylo Salon'
								/>
								<p>Stylo Salon</p>
							</li>
							<li className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'>
								<img
									className='w-16 rounded-lg mr-2'
									src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
									alt='Stylo Salon'
								/>
								<p>Stylo Salon</p>
							</li>
						</ul>
					</div>
					<div className='suggestions hidden suggestions-type bg-white mt-1 w-2/5 h-64 absolute rounded-xl overflow-scroll'></div>
					<div className='suggestions hidden suggestions-location bg-white mt-1 w-2/5 h-64 absolute rounded-xl overflow-scroll'></div>
				</form>
			</div>
		</section>
	);
};

export default HomeSearch;
