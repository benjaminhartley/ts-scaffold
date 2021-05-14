import { expect } from 'chai';

import log from '../../src/utils/logger';

describe('UNIT: utils/logger', () => {
  it('should use LOG_LEVEL set in bootstrap.ts', () => {
    expect(log.level.toString()).to.equal('OFF');
  });
});
