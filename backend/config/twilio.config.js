const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSms = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      to: `+91${to}`, // Assuming Indian numbers
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    return response;
  } catch (error) {
    console.error("SMS sending failed:", error);
    throw error;
  }
};

module.exports = sendSms;
