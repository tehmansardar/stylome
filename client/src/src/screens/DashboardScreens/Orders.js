import React, { useState, useEffect } from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import axios from 'axios';
import { useSelector } from 'react-redux';
// import { getDate } from 'date-fns';

// Generate Order Data
// function createData(id, date, name, service, staff, slots, status) {
// 	return { id, date, name, service, staff, slots, status };
// }

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function Orders() {
	const classes = useStyles();

	const token = useSelector((state) => state.token);

	const [data, setData] = useState([]);

	useEffect(() => {
		const getVisit = async () => {
			const res = await axios.get('/api/visit/salonVisits', {
				headers: { Authorization: token },
			});
			setData(res.data);
		};
		getVisit();
	}, [token]);

	const rows = data;

	return (
		<React.Fragment>
			<Title>Incoming Visits</Title>
			<Table size='small'>
				<TableHead>
					<TableRow
						style={{
							background: '#FFCD06',
							fontWeight: 'bold',
							borderRadius: 15,
						}}
					>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Service</TableCell>
						<TableCell>Staff</TableCell>
						<TableCell>slots</TableCell>
						<TableCell align='right'>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
						const d = new Date(row.date);
						const months = [
							'January',
							'February',
							'March',
							'April',
							'May',
							'June',
							'July',
							'August',
							'September',
							'October',
							'November',
							'December',
						];
						d.getFullYear();
						const today = `${d.getDate()} ${
							months[d.getMonth()]
						}, ${d.getFullYear()}`;
						return (
							<TableRow key={row._id}>
								<TableCell>{today}</TableCell>
								<TableCell>{row.users.fname}</TableCell>
								<TableCell>{row.services.service}</TableCell>
								<TableCell>{row.staff.name}</TableCell>
								<TableCell>
									{row.slots.map((slot) => `${slot.slot} `)}
								</TableCell>
								<TableCell align='right'>
									{row.status === 0 && 'Incoming'}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{/* <div className={classes.seeMore}>
				<Link color='primary' href='#' onClick={preventDefault}>
					See more orders
				</Link>
			</div> */}
		</React.Fragment>
	);
}
