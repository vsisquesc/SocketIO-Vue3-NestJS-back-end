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
    // tls: {
    //     rejectUnauthorized: false
    // }
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
    if (sendTo.length == 0) {
      return false;
    }
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

    authorize(config, (transporter) => {
      const mail = {
        from: process.env.MAIL_USER,
        to: sendTo,
        subject: 'New User',
        text: `This is the new user: ${newUser}`,
      };
      transporter.sendMail(mail, (error) => {
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

// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
// import 'dotenv/config';

// @Injectable()
// export class EmailService {
//   async send(newUser: string, sendTo: string[]): Promise<boolean> {
//     if (sendTo.length == 0) {
//       return false;
//     }
//     const config = {
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       service: 'gmail',
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     };
//     const transporter = nodemailer.createTransport(config);

//     const mail = {
//       from: process.env.MAIL_USER,
//       to: sendTo,
//       subject: 'New User',
//       text: `This is the new user: ${newUser}`,
//     };

//     transporter.sendMail(mail, (error) => {
//       if (error) {
//         console.error('Error while sending Email', error);
//       } else {
//         console.log('Email Sent');
//       }
//     });

//     return true;
//   }
// }
