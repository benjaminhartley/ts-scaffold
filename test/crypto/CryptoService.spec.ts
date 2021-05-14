import { expect } from 'chai';

import CryptoService from '../../src/crypto/CryptoService';
import keyService from '../../src/crypto/keyService';

describe('UNIT: crypto/CryptoService', () => {
  if (process.env.KEY_FILE !== 'testKeys.dat') {
    throw new Error('invalid test key file');
  }

  const testKeys = keyService.getKeys();
  const service = new CryptoService(testKeys);

  describe('encrypt/decrypt', () => {
    it('should consistently encrypt and decrypt data', () => {
      const testString = 'test data here';
      const testData = Buffer.from(testString);

      const encryptedData = service.encrypt(testData);
      const decryptedData = service.decrypt(encryptedData, testKeys.publicKey);

      expect(decryptedData.toString()).to.equal(testString);
    });
  });

  describe('sign/verify', () => {
    it('should sign and verify data', () => {
      const testString = 'test data here';
      const testData = Buffer.from(testString);
      const signature = service.sign(testData);

      const isValid = service.verify(testData, testKeys.publicKey, signature);
      expect(isValid).to.equal(true);
    });

    it('should return false with an invalid signature', () => {
      const testString = 'test data here';
      const testData = Buffer.from(testString);
      const signature = service.sign(testData);

      const isValid = service.verify(testData, testKeys.publicKey, 'xyz' + signature);
      expect(isValid).to.equal(false);
    });
  });
});
