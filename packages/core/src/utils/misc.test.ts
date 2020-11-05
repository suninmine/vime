import { expect } from '@open-wc/testing';
import { spy } from 'sinon';
import { Disposal } from './misc';

describe('Disposal', () => {
  it('should dispose of all goods', () => {
    const disposal = new Disposal();
    const goodA = spy();
    const goodB = spy();
    disposal.add(goodA);
    disposal.add(goodB);
    disposal.empty();
    expect(goodA).to.have.been.calledOnce;
    expect(goodB).to.have.been.calledOnce;
  });
});
