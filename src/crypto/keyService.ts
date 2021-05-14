import crypto from 'crypto';
import fs from 'fs';

import { Type } from 'js-binary';

import hash from '../utils/hash';
import log from '../utils/logger';

const KEY_FILE = process.env.KEY_FILE || 'keys.dat';

export interface Keys {
  publicKey: string;
  privateKey: string;
  privateKeyPassphrase: string;
}

export const KeysSchema = new Type({
  publicKey: 'string',
  privateKey: 'string',
  privateKeyPassphrase: 'string',
});

function getKeys(): Keys {
  try {
    const rawKeyData = fs.readFileSync(KEY_FILE);
    log.debug('got key data from file');

    const keyData = KeysSchema.decode(rawKeyData);
    log.debug('parsed keys:', keyData);
    return keyData as Keys;
  } catch (e) {
    if (e.code === 'ENOENT') {
      log.info('key data not found, generating');

      const keys = generateKeys();
      log.debug('keys generated');

      saveKeys(keys, KEY_FILE);
      log.debug('keys saved');

      return keys;
    }

    log.error('error opening key file:', e);
    process.exit(1);
  }
}

function generateKeys(): Keys {
  const passphrase = crypto.randomBytes(32).toString('base64');

  const kp = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase,
    },
  });

  return {
    publicKey: kp.publicKey,
    privateKey: kp.privateKey,
    privateKeyPassphrase: passphrase,
  };
}

function saveKeys(keys: Keys, location: string): void {
  fs.writeFileSync(location, KeysSchema.encode(keys));
}

function getPubKeyAddress(pubKey: string): string {
  const h = hash.base64(pubKey);
  return h.substr(0, 40);
}

export default {
  getKeys,
  getPubKeyAddress,
};
