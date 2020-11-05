import { expect } from '@open-wc/testing';
import { formatTime } from './formatters';

describe('formatTime', () => {
  it('should return h:mm:ss', () => {
    expect(formatTime(3750)).to.equal('1:02:30');
  });

  it('should return mm:ss', () => {
    expect(formatTime(250)).to.equal('04:10');
  });

  it('should return 00:ss', () => {
    expect(formatTime(30)).to.equal('00:30');
  });

  it('should return h:mm:ss given always show hours is true', () => {
    expect(formatTime(30, true)).to.equal('0:00:30');
  });
});
