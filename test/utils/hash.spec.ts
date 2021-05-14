import { expect } from 'chai';

import hash from '../../src/utils/hash';

describe('UNIT: utils/hash', () => {
  describe('hex', () => {
    it('should create a consistent hash', () => {
      const data = { some: 'data' };
      const h = hash.hex(data);
      expect(h).to.equal('1832e26ebd2237d45ef5608d476d9d40f2507093d57c3dcb119eb429fe0e652b');
    });

    it('should handle null', () => {
      const h = hash.hex(null);
      expect(h).to.equal('fa1d2db62d4d952e2031452e1bc1ddcad0b192c2e29a706f11ce426ae5acddea');
    });

    it('should throw an error on undefined values', () => {
      expect(hash.hex).to.throw('Object argument required.');
    });
  });

  describe('base64', () => {
    it('should create a consistent hash', () => {
      const data = { some: 'data' };
      const h = hash.base64(data);
      expect(h).to.equal('GDLibr0iN9Re9WCNR22dQPJQcJPVfD3LEZ60Kf4OZSs=');
    });

    it('should handle null', () => {
      const h = hash.base64(null);
      expect(h).to.equal('+h0tti1NlS4gMUUuG8HdytCxksLimnBvEc5CauWs3eo=' );
    });

    it('should throw an error on undefined values', () => {
      expect(hash.base64).to.throw('Object argument required.');
    });
  });
});
