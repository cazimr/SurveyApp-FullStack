import nodemailer from 'nodemailer';
import gmailConfig from '../config/gmail.config';
import { TRANSPORT } from '../config/env';


// Mail configuration
const gmailOptions = {
  service: 'gmail',
  auth: gmailConfig,
};

const nodemailerGmail =
  TRANSPORT === 'gmail' && nodemailer.createTransport(gmailOptions);

export default nodemailerGmail;
