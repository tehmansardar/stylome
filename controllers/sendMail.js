const nodemailer = require('nodemailer');

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_ADDRESS_PASSWORD } = process.env;

// send mail
const sendEmail = (to, url, txt) => {
	const smtpTransport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: SENDER_EMAIL_ADDRESS,
			pass: SENDER_EMAIL_ADDRESS_PASSWORD,
		},
	});

	const mailOptions = {
		from: SENDER_EMAIL_ADDRESS,
		to: to,
		subject: 'Stylome',
		html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: #ffcd06;">Stylo<span style="color: #232323;">me</span></h2>
            <p>Congratulations! You're almost set to start using Stylome.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: #ffcd06; text-decoration: none; color: #232323; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
	};

	smtpTransport.sendMail(mailOptions, (err, infor) => {
		if (err) return err;
		return infor;
	});
};

module.exports = sendEmail;
