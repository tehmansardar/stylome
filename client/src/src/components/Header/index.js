import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Button, Menu, MenuItem, Chip } from '@material-ui/core';
import Logo from '../../../assets/images/logo.png';
import './style.css';

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const { user, isLogged } = auth;
	const [state, setState] = useState({
		anchorEl: null,
	});
	const { logged, anchorEl } = state;
	const handleClick = (event) => {
		setState({ ...state, anchorEl: event.currentTarget });
	};

	const handleSignout = async () => {
		try {
			await axios.get('/api/user/signout');
			localStorage.removeItem('firstLogin');
			window.location.href = '/';
		} catch (error) {
			window.location.href = '/';
		}
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
				<Avatar src={user.avatar} />
				<h5 className=' ml-1 capitalize'>hello, {user.fname}</h5>
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
				<MenuItem
					onClick={() => {
						handleSignout();
						handleClose();
					}}
				>
					Logout
				</MenuItem>
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
			<div className='header__right'>
				{isLogged ? renderAfter : renderbefore}
			</div>
		</div>
	);
};

export default Header;
