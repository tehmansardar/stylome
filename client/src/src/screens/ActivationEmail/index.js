import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Success from '../../components/utils/Notification.js/Success';
import Errors from '../../components/utils/Notification.js/Errors';

const ActivationEmail = () => {
	const { activation_token } = useParams();
	console.log(activation_token);

	const [err, setErr] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		if (activation_token) {
			const activateEmail = async () => {
				try {
					const res = await axios.post('/api/user/activate', {
						activation_token,
					});
					setSuccess(res.data.msg);
				} catch (error) {
					error.response.data.msg && setErr(error.response.data.msg);
				}
			};
			activateEmail();
		}
	}, []);

	return (
		<div>
			{success && <Success show={true} msg={success} />}
			{err && <Errors show={true} msg={err} />}
		</div>
	);
};

export default ActivationEmail;
