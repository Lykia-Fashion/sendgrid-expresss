const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context, callback) => {
  // Set your SendGrid API key
  sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

  // Extract the email parameters from the Lambda event
  const { to, from, subject, text } = JSON.parse(event.body);

  // Create the email message
  const msg = {
    to,
    from,
    subject,
    text
  };

  try {
    // Send the email using the SendGrid API
    await sgMail.send(msg);
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
    callback(null, response);
  } catch (error) {
    console.error('Error sending email:', error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' })
    };
    callback(error, response);
  }
};
