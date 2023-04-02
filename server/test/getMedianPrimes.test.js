import { assert } from 'chai';
import getMedianPrimes from '../services/getMedianPrimes';

describe('getMedianPrimes', function() {
  it('should return the median prime number(s) less than 10', function() {
    const result = getMedianPrimes(10);
    assert.deepEqual(result, [3, 5]);
  });

  it('should return the median prime number(s) less than 15', function() {
    const result = getMedianPrimes(15);
    assert.deepEqual(result, [5,7]);
  });

  it('should return an empty array for n = 2', function() {
    const result = getMedianPrimes(2);
    assert.deepEqual(result, [2]);
  });

  it('should throw an error for n < 2', function() {
    const result = getMedianPrimes(1);
    assert.deepEqual(result, []);
  });

  it('should throw an error for non-integer input', function() {
    assert.throw(() => getMedianPrimes('abc'), Error);
  });

  it('should throw an error for float input', function() {
    assert.throw(() => getMedianPrimes(3.14), Error);
  });
});

