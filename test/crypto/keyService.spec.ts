import { expect } from 'chai';
import sinon from 'sinon';

import fs from 'fs';

import keyService, { Keys, KeysSchema } from '../../src/crypto/keyService';

describe('UNIT: crypto/keyService', () => {
  let readFileStub: sinon.SinonStub;
  let writeFileStub: sinon.SinonStub;

  beforeEach(() => {
    readFileStub = sinon.stub(fs, 'readFileSync');
    writeFileStub = sinon.stub(fs, 'writeFileSync');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('keys not found', () => {
    let keys: Keys;

    beforeEach(() => {
      const err: any = new Error('keys not found');
      err.code = 'ENOENT';
      readFileStub.throws(err);

      keys = keyService.getKeys();
    });

    it('should generate new keys if none are found', () => {
      sinon.assert.calledOnce(readFileStub);
      sinon.assert.calledOnce(writeFileStub);

      const [fileName, dataObject] = writeFileStub.getCall(0).args;
      expect(fileName).to.equal('testKeys.dat'); // from bootstrap.ts

      const data = KeysSchema.decode(dataObject);
      expect(data.publicKey.length).to.equal(800);
      expect(data.privateKey.length).to.equal(3434);

      expect(data).to.have.property('privateKeyPassphrase').to.be.a('string').with.lengthOf(44);

      const addr = keyService.getPubKeyAddress(keys.publicKey);
      expect(addr).to.be.a('string').with.lengthOf(40);
    });
  });
});
