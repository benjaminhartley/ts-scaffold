import crypto from 'crypto';

import { Keys } from './keyService';

export default class CryptoService {
  private keys: Keys;

  constructor(keys: Keys) {
    this.keys = keys;
  }

  public encrypt(data: Buffer): Buffer {
    return crypto.privateEncrypt(
      {
        key: this.keys.privateKey,
        passphrase: this.keys.privateKeyPassphrase,
      },
      data,
    );
  }

  public sign(data: Buffer): string {
    return crypto
      .sign(null, data, {
        key: this.keys.privateKey,
        passphrase: this.keys.privateKeyPassphrase,
      })
      .toString('base64');
  }

  public decrypt(data: Buffer, publicKey: string): Buffer {
    return crypto.publicDecrypt(publicKey, data);
  }

  public verify(data: Buffer, publicKey: string, signature: string): boolean {
    return crypto.verify(
      null,
      data,
      publicKey,
      Buffer.from(signature, 'base64'),
    );
  }
}
