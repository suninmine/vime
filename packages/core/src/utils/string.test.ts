import { expect } from '@open-wc/testing';
import { dashToCamelCase, dashToPascalCase } from './string';

describe('dashToCamelCase', () => {
  it('should convert to camel case', () => {
    expect(dashToCamelCase('vime')).to.equal('vime');
    expect(dashToCamelCase('vime-test')).to.equal('vimeTest');
    expect(dashToCamelCase('vime-test-more')).to.equal('vimeTestMore');
  });
});

describe('dashToPascalCase', () => {
  it('should convert to pascal case', () => {
    expect(dashToPascalCase('vime')).to.equal('Vime');
    expect(dashToPascalCase('vime-test')).to.equal('VimeTest');
    expect(dashToPascalCase('vime-test-more')).to.equal('VimeTestMore');
  });
});
