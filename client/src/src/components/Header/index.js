import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Button, Menu, MenuItem, Chip } from '@material-ui/core';

import Logo from '../../../assets/images/logo.png';
import './style.css';

const Header = () => {
	// const [anchorEl, setAnchorEl] = useState(null);

	const [state, setState] = useState({
		logged: true,
		anchorEl: null,
	});
	const { logged, anchorEl } = state;

	const handleClick = (event) => {
		setState({ ...state, anchorEl: event.currentTarget });
	};

	const handleClose = () => {
		setState({ ...state, anchorEl: null });
	};

	const renderbefore = (
		<>
			<Link className='link' to='/signin'>
				<Button className='signIn'>Sign in</Button>
			</Link>
			<Link className='link' to='/signup'>
				<Button className='signUp'>Sign up</Button>
			</Link>
		</>
	);
	const renderAfter = (
		<>
			<div className='flex flex-row items-center' onClick={handleClick}>
				<Avatar src='https://media-exp1.licdn.com/dms/image/C5603AQEWM0rF0oTGLA/profile-displayphoto-shrink_800_800/0/1587677838659?e=1625702400&v=beta&t=8vtbC6Hl_niIcCj9V2IAbjqeNQdSz3kA0VGHguTraYI' />
				<h5 className=' ml-1'>hello, Tehman</h5>
			</div>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Link to='/open-salon'>
					<MenuItem onClick={handleClose}>
						<Chip color='secondary' size='small' label='Open Salon' />
					</MenuItem>
				</Link>

				<Link to='/visit-history'>
					<MenuItem onClick={handleClose}>Your Visits</MenuItem>
				</Link>
				<Link to='/profile'>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
				</Link>
				{/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</>
	);

	return (
		<div className='header'>
			{/* Logo */}
			<Link to='/'>
				<img src={Logo} className='logo' alt='stylome' />
			</Link>

			{/* header-right */}
			<div className='header__right'>{logged ? renderAfter : renderbefore}</div>
		</div>
	);
};

export default Header;
