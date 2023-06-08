import nodemailer from 'nodemailer';
// import logger from '../logger/index';

const sendEmail = (firstname: string, email: string | undefined, token: any) => {
  // https://docs.microsoft.com/en-us/exchange/troubleshoot/send-emails/smtp-submission-improvements#new-throttling-limit-for-concurrent-connections-that-submitmessages
  // The service has various limits to prevent abuse and to ensure fair use.
  // An additional limit is being added. Under the new limit, up to three concurrent connections are allowed
  // to send email messages at the same time. If an application tries to send more than three messages at the same time
  // by using multiple connections, each connection will receive the following error message:
  // 432 4.3.2 STOREDRV.ClientSubmit; sender thread limit exceeded
  //   Additional throttling limits for the SMTP Authentication protocol are:
  //     30 messages per minute
  //     Recipient rate limit of 10,000 recipients per day
  // Exceeding these limits will cause the following issues:
  //     Exceeding the per minute limit causes email delivery delays, any excess in message submission will be throttled and successively carried over to the following minutes.

  //     Exceeding the per day limit causes the following error message:
  //         554 5.2.0 STOREDRV.Submission.Exception:SubmissionQuotaExceededException
  // https://stackoverflow.com/questions/67855666/how-to-maintain-multiple-concurrent-connections-using-nodemailer

  const transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 3,
    maxMessages: 5000000,
    service: 'Office365',
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // for now false
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'productaffair@productaffair.com',
    to: email,
    subject: process.env.NODE_ENV === 'production' ? 'ProductAffair - Verify Email' : 'Test Email',
    html: `<h4>Hi ${firstname}, you have successfully created a Productaffair account! Please enter the code below to verify your email address.</h4>
             <p>${token}</p>`,
  };
  transporter.sendMail(mailOptions, (err, response) => {
    if (response) transporter.close(); // Don't forget to close the connection pool!
  });
};

export default sendEmail;
