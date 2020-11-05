/* eslint-disable max-classes-per-file */

import { expect } from '@open-wc/testing';
import {
  getConstructor, isArray, isBoolean,
  isFunction, isInstanceOf, isNull,
  isNumber, isObject, isPrototypeOf,
  isString, isUndefined,
} from './unit';

const expectToBeTrueOnlyFor = (type: string, check: any) => {
  const inputs: Record<string, { input: any, isValid?: boolean }> = {
    array: { input: [] },
    string: { input: '' },
    noll: { input: null },
    notDefined: { input: undefined },
    number: { input: 0 },
    object: { input: {} },
    fn: { input: () => {} },
    boolean: { input: true },
  };

  inputs[type].isValid = true;

  // @ts-ignore
  Object.values(inputs)
    .forEach((input) => expect(check(input.input)).to.equal((input as any).isValid || false));
};

describe('isArray', () => {
  it('should return true only if given an array', () => {
    expectToBeTrueOnlyFor('array', isArray);
  });
});

describe('isBoolean', () => {
  it('should return true only if given a boolean', () => {
    expectToBeTrueOnlyFor('boolean', isBoolean);
  });
});

describe('isObject', () => {
  it('should return true only if given an object', () => {
    expectToBeTrueOnlyFor('object', isObject);
  });
});

describe('isString', () => {
  it('should return true only if given a string', () => {
    expectToBeTrueOnlyFor('string', isString);
  });
});

describe('isNumber', () => {
  it('should return true only if given a number', () => {
    expectToBeTrueOnlyFor('number', isNumber);
  });
});

describe('isFunction', () => {
  it('should return true only if given a function', () => {
    expectToBeTrueOnlyFor('fn', isFunction);
  });
});

describe('isNull', () => {
  it('should return true only if given null', () => {
    expect(isNull(null)).to.be.true;
    expect(isNull('')).to.be.false;
    expect(isNull(0)).to.be.false;
    expect(isNull([])).to.be.false;
    expect(isNull({})).to.be.false;
    expect(isNull(undefined)).to.be.false;
  });
});

describe('isUndefined', () => {
  it('should return true only if given undefined', () => {
    expect(isUndefined(null)).to.be.false;
    expect(isUndefined('')).to.be.false;
    expect(isUndefined(0)).to.be.false;
    expect(isUndefined([])).to.be.false;
    expect(isUndefined({})).to.be.false;
    expect(isUndefined(undefined)).to.be.true;
  });
});

class Mock {}
class MockTwo extends Mock {}
class MockThree {}

const instance = new Mock();

describe('getConstructor', () => {
  it('should return false given null or undefined', () => {
    expect(getConstructor(null)).to.be.undefined;
    expect(getConstructor(undefined)).to.be.undefined;
  });

  it('should return constructor given valid input', () => {
    const str = 'str';
    expect(getConstructor(str)).to.equal(str.constructor);
  });
});

describe('isInstanceOf`', () => {
  it('should return true given input is a instance of class', () => {
    expect(isInstanceOf(instance, Mock)).to.be.true;
  });

  it('should return false given null input or null constructor', () => {
    expect(isInstanceOf(null, Mock)).to.be.false;
    expect(isInstanceOf('', null)).to.be.false;
  });

  it('should return false given input is not a instance of class', () => {
    expect(isInstanceOf(instance, MockTwo)).to.be.false;
  });
});

describe('isPrototypeOf', () => {
  it('should return true given input is prototype of object', () => {
    expect(isPrototypeOf(new MockTwo(), Mock)).to.be.true;
  });

  it('should return false given input is not prototype of object', () => {
    expect(isPrototypeOf(new MockThree(), Mock)).to.be.false;
  });
});
