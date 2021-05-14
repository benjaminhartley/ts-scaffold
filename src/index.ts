import log from './utils/logger';

import keyService from './crypto/keyService';
import CryptoService from './crypto/CryptoService';

const keys = keyService.getKeys();
log.trace('got keys');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cryptoService = new CryptoService(keys);
log.trace('created crypto service');

const pubKeyAddress = keyService.getPubKeyAddress(keys.publicKey);
log.info('pubKey address:', pubKeyAddress);
