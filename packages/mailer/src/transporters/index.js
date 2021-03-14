import gmailTransport from './gmail';
import { TRANSPORT } from '../config/env';

const getTransport = () => {
  if (TRANSPORT === 'gmail') return gmailTransport;
  else throw Error(`Unknown transport ${TRANSPORT}`);
};

export default getTransport;
