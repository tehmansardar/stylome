import React, { useState } from 'react';
// Rating
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';

import './style.css';

const customIcons = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon />,
		label: 'Very Dissatisfied',
	},
	2: {
		icon: <SentimentDissatisfiedIcon />,
		label: 'Dissatisfied',
	},
	3: {
		icon: <SentimentSatisfiedIcon />,
		label: 'Neutral',
	},
	4: {
		icon: <SentimentSatisfiedAltIcon />,
		label: 'Satisfied',
	},
	5: {
		icon: <SentimentVerySatisfiedIcon />,
		label: 'Very Satisfied',
	},
};

function IconContainer(props) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
	value: PropTypes.number.isRequired,
};

// End

const CompleteModal = ({ stars }) => {
	const [rating, setRating] = useState(1);

	return (
		<div className='info-rating'>
			<Box component='fieldset' mb={2} borderColor='transparent'>
				<Rating
					name='customized-icons'
					defaultValue={stars}
					size='large'
					getLabelText={(value) => customIcons[value].label}
					IconContainerComponent={IconContainer}
					onChange={(_, value) => {
						setRating(value);
					}}
					readOnly
				/>
			</Box>
		</div>
	);
};

export default CompleteModal;
