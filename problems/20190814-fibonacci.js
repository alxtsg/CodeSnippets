/**
 * Calculates Fibonacci numbers with dynamic programming.
 */

'use strict';

const results = new Map();

const fib = (n) => {
  if (results.has(n)) {
    return results.get(n);
  }
  if ((n === 0) || (n === 1)) {
    return n;
  }
  const fn = fib(n - 1) + fib(n - 2);
  results.set(n, fn);
  return fn;
};

console.log(fib(10));
