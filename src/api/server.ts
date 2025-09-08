import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

export const createServer = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // Email API endpoint
  app.post('/api/send-email', async (req, res) => {
    try {
      const { to, subject, text, html } = req.body;

      // Validate required fields
      if (!to || !subject || !text) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Create a test account (use real credentials in production)
      const testAccount = await nodemailer.createTestAccount();

      // Create a transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Ganpati Mandal App" <noreply@ganpatimandal.com>',
        to,
        subject,
        text,
        html: html || text,
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.status(200).json({
        message: 'Email sent successfully',
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info),
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  });

  return app;
};
