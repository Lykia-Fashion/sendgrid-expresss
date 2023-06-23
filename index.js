const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context, callback) => {
  // Retrieve the SendGrid API key from the environment variable
  const apiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(apiKey);

  // Extract necessary data from the event
  const { to, from, templateId, dynamicTemplateData } = JSON.parse(event.body);

  // Create the email payload
  const msg = {
    to,
    from,
    templateId,
    dynamicTemplateData,
  };

  try {
    // Send the email using SendGrid
    await sgMail.send(msg);

    // Return a success response
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };

    callback(null, response);
  } catch (error) {
    // Handle any errors that occur during sending
    console.error('Error sending email:', error);

    // Return an error response
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    };

    callback(error, response);
  }
};