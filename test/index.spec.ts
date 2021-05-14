import { expect } from 'chai';
import sinon from 'sinon';

describe('UNIT: tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should test', () => {
    const stub = sinon.stub();
    stub.returns(true);

    expect(stub()).to.equal(true);
  });
});
