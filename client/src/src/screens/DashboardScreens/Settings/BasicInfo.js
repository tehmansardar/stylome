import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	appBarSpacer: theme.mixins.toolbar,

	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		borderRadius: 20,
		boxShadow: 'none',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	fixedHeight: {
		height: 240,
	},
	fieldHeading: {
		fontSize: 14,
		fontWeight: 700,
	},
	input: {
		display: 'none',
	},
	description: {
		// height: '200px !important',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

const drawerWidth = 240;

const BasicInfo = () => {
	const classes = useStyles();
	return (
		<div>
			<Paper className={classes.paper}>
				<Container maxWidth='lg' className={classes.container}>
					<Typography component='h1' variant='h5' className='mb-5'>
						Basic Salon Info
					</Typography>
					<form className='max-w-lg' autoComplete='off'>
						<Grid container spacing={3}>
							<Grid item xs={12} md={12} lg={12}>
								<TextField
									// variant='outlined'
									margin='normal'
									required
									fullWidth
									id='name'
									label='Salon Name'
									name='name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} md={12} lg={12}>
								<h3 className={classes.fieldHeading}>We provide services to</h3>
								<FormControlLabel
									value='male'
									control={<Checkbox color='primary' />}
									label='Male'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='female'
									control={<Checkbox color='primary' />}
									label='Female'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='other'
									control={<Checkbox color='primary' />}
									label='Other'
									labelPlacement='start'
								/>
							</Grid>
							<Grid item xs={12} md={12} lg={12}>
								<label htmlFor=''>Add cover to salon</label>
								<input
									accept='image/*'
									className={classes.input}
									id='icon-button-file'
									type='file'
								/>
								<label htmlFor='icon-button-file'>
									<IconButton
										color='primary'
										aria-label='upload picture'
										component='span'
									>
										<PhotoCamera />
									</IconButton>
								</label>
								<Divider />
							</Grid>
							<Grid item xs={12} md={12} lg={12}>
								<h3 className={classes.fieldHeading}>Location</h3>
								<TextField
									// variant='outlined'
									margin='normal'
									required
									fullWidth
									id='address'
									label='Salon Address'
									name='address'
								/>
							</Grid>
							<Grid item xs={6} md={6} lg={6}>
								<TextField
									// variant='outlined'
									margin='normal'
									required
									fullWidth
									id='postalcode'
									label='Postal Code'
									name='postalcode'
								/>
							</Grid>
							<Grid item xs={6} md={6} lg={6}>
								<TextField
									// variant='outlined'
									margin='normal'
									required
									fullWidth
									id='city'
									label='City'
									name='city'
								/>
							</Grid>
							<Grid item xs={6} md={6} lg={6}>
								<TextField
									// variant='outlined'
									margin='normal'
									required
									fullWidth
									id='city'
									label='Province'
									name='province'
								/>
							</Grid>
							<Grid item xs={6} md={6} lg={6}>
								<TextField
									// variant='outlined'
									margin='normal'
									required
									fullWidth
									id='country'
									label='Country'
									name='country'
								/>
							</Grid>
							<Grid item xs={12} md={12} lg={6}>
								<label className={classes.fieldHeading}>Contact No</label>

								<TextField
									// variant='outlined'
									margin='normal'
									required
									fullWidth
									id='phone'
									label='Contact Number'
									name='name'
								/>
							</Grid>
							<Grid item xs={12} md={12} lg={12}>
								<label className={classes.fieldHeading}>About Salon</label>

								<TextField
									variant='filled'
									margin='normal'
									required
									fullWidth
									id='name'
									label='Description'
									name='description'
									size='medium'
									className={classes.description}
									rowsMax='20'
								/>
							</Grid>
							<Button
								className={classes.button}
								variant='contained'
								color='primary'
							>
								Save
							</Button>
						</Grid>
					</form>
				</Container>
			</Paper>
		</div>
	);
};

export default BasicInfo;
