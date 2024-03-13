import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

async function authorize(config, callback) {
  const oauth2Client = new OAuth2(
    config.auth.clientId,
    config.auth.clientSecret,
    'https://developers.google.com/oauthplayground',
  );
  oauth2Client.setCredentials({
    refresh_token: config.auth.refreshToken,
  });
  oauth2Client.getAccessToken((err, token) => {
    if (err) return console.log(err);
    config.auth.accessToken = token;
    callback(nodemailer.createTransport(config));
  });
}

@Injectable()
export class EmailService {
  async send(newUser: string, sendTo: string[]): Promise<boolean> {
    const config = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.OAUTH_CLIENT,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.OAUTH_REFRESH,
      },
    };

    await authorize(config, (transporter) => {
      const mail = {
        from: process.env.MAIL_USER,
        to: sendTo,
        subject: 'New User',
        text: `This is the new user: ${newUser}`,
      };
      return transporter.sendMail(mail, (error) => {
        if (error) {
          console.error('Error while sending Email', error);
        } else {
          console.log(`Email Sent: ${mail}`);
        }
      });
    });

    return true;
  }
}
