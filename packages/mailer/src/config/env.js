// Imports
import dotenv from 'dotenv';

// Load .env
dotenv.config();


// Transporter
export const { TRANSPORT } = process.env;

// Credentials
export const { MAIL_USER, MAIL_PASS } = process.env;

//PORT
export const {PORT} = process.env;