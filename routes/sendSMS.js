const path = require('path');
console.log('Loading .env from:', path.resolve(__dirname, '../.env')); // Log the .env path
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Log environment variables to confirm they're loaded (only for debugging)
console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (to, body) => {
  if (!to) {
      console.error('Recipient phone number is missing.');
      throw new Error('Recipient phone number is required to send an SMS.');
  }

  console.log('Sending SMS to:', to, 'with body:', body); // Log message details

  client.messages
      .create({
          body,
          to, // Use the `to` parameter from the function
          from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
      })
      .then(message => console.log(`Message sent: ${message.sid}`)) // Log success
      .catch(error => console.error('Error sending SMS:', error)); // Log errors
};


// Test the function by calling it
//sendSMS('+17782142310', 'Your Orders is Accepted and Ready!'); // Replace with your test phone number
sendSMS('+15879873950', 'Your Orders is Accepted and Ready!'); // Replace with your test phone number



