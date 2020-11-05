import { expect } from '@open-wc/testing';
import { sortBy } from './array';

describe('sortBy', () => {
  it('should sort the array', () => {
    const array = [{ id: 3 }, { id: 2 }, { id: 1 }];
    const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(sortBy(array, (item) => item.id)).to.eql(expected);
  });
});
