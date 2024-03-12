import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class EmailService {
  async send(newUser: string, sendTo: string[]): Promise<boolean> {
    if (sendTo.length == 0) {
      return false;
    }
    const config = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    };
    const transporter = nodemailer.createTransport(config);

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
        console.log('Email Sent');
      }
    });

    return true;
  }
}
