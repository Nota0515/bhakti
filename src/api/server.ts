import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Basic CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});
app.use(bodyParser.json());

// Test endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
  });

  console.log('Server starting...');
  console.log('GMAIL_EMAIL:', process.env.GMAIL_EMAIL ? 'Set' : 'Not set');
  console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');

  // Email API endpoint
  app.post('/api/send-email', async (req, res) => {
    try {
      const { to, subject, text, html } = req.body;

      // Validate required fields
      if (!to || !subject || !text) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Create a transporter object using Gmail SMTP
      console.log('Attempting to send email to:', to);
      console.log('Using email service:', 'gmail');
      
      if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
        console.error('Missing email configuration. Please check your .env file');
        return res.status(500).json({ message: 'Email configuration error' });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        debug: true, // Enable debug logging
        logger: true // Enable detailed logging
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('GMAIL_EMAIL:', process.env.GMAIL_EMAIL ? 'Set' : 'Not set');
  console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');
});

export const createServer = () => app;
