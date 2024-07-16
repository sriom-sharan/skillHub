const SibApiV3Sdk = require('sib-api-v3-sdk');
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
require("dotenv").config();


// Configure API key authorization: api-key
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (toEmail, toName, subject, htmlContent) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail = {
      to: [{
          email: toEmail,
          name: toName
      }],
      sender: {
          email: process.env.EMAIL_ID,
          name: 'SkillHub'
      },
      subject: subject,
      htmlContent: '<h1>Hello</h1>'
  };

  try {
      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  } catch (error) {
      console.error('Error while sending email: ', error);
  }
};

module.exports = {sendEmail};
