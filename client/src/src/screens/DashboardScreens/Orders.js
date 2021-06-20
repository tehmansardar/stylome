import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, service, staff, slots, status) {
	return { id, date, name, service, staff, slots, status };
}

const rows = [
	createData(
		0,
		'19 June, 2021',
		'Elvis Presley',
		'Hair cut',
		'Zeeshan',
		'09:00 10:00',
		'Incoming'
	),
	createData(
		1,
		'19 June, 2021',
		'Paul McCartney',
		'Beard',
		'Fahad',
		'10:00 11:00',
		'Incoming'
	),
	createData(
		2,
		'19 June, 2021',
		'Tom Scholz',
		'Hair cut',
		'Iqra',
		'11:00 12:00',
		'Incoming'
	),
	createData(
		3,
		'19 June, 2021',
		'Michael Jackson',
		'Massage',
		'Kashif',
		'12:00 01:00',
		'Incoming'
	),
	createData(
		4,
		'19 June, 2021',
		'Bruce Springsteen',
		'Massage',
		'Habib',
		'01:00 02:00',
		'Incoming'
	),
];

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function Orders() {
	const classes = useStyles();
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
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.service}</TableCell>
							<TableCell>{row.staff}</TableCell>
							<TableCell>{row.slots}</TableCell>
							<TableCell align='right'>{row.status}</TableCell>
						</TableRow>
					))}
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
