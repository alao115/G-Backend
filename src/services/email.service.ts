/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */

import nodemailer, { Transport, TransportOptions } from 'nodemailer';
import config from '../config';


// async..await is not allowed in global scope, must use a wrapper
export default class MailService {
  async sendMail ({ from, to, content, subject, attachments }: { from: any; to: any; content: any; subject: any; attachments: any }) {
    // Generate test SMTP service account from ethereal.email
    try {
      // Only needed if you don't have a real mail account for testing
      const testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: config.emailHost || 'smtp.ethereal.email',
        // port: config.emailPort || 587,
        // secure: config.emailSecure || false,

        // // service: 'gmail', for a real Gmail account
        auth: {
          user: config.emailUser || testAccount.user,
          pass: config.emailPassword || testAccount.pass, // generated ethereal password
        },
      });
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html: content, // html body
        attachments
      });

      // console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      return { info: info.messageId, preview: nodemailer.getTestMessageUrl(info) };
    } catch (err) { throw err; }
  }
}
