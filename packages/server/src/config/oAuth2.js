import {OAuth2Client} from 'google-auth-library';
import config from '../config/env';
//oAuth2Client
export const client = new OAuth2Client(config.CLIENT_ID);