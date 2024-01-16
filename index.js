const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// Replace with your SMTP2GO credentials
const smtpConfig = {
    host: 'mail.smtp2go.com',
    port: 2525, // or 8025, 587 and 25 can also be used.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to receive email requests
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    // Create a transporter object using the SMTP2GO configuration
    const transporter = nodemailer.createTransport(smtpConfig);

    // Email options
    const mailOptions = {
        from: 'System@illinoisnotaryregistration.com', // your email address
        to: to,
        subject: subject,
        text: text
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

