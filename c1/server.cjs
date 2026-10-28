require('dotenv').config();
const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Welcome to DEV@Deakin',
    text: 'Thanks for subscribing to DEV@Deakin. You will now receive our daily insider updates.',
    html: '<p>Thanks for subscribing to <strong>DEV@Deakin</strong>. You will now receive our daily insider updates.</p>'
  };

  try {
    const response = await sgMail.send(msg);
    console.log('SendGrid status:', response[0].statusCode);
    res.status(202).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));