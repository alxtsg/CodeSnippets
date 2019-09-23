/**
 * Given a set of numbers, check whether the sum of (part of) the numbers equals
 * to the given target.
 *
 * Samples:
 *
 * Candidates = [1, 2, 4, 7]
 * Target = 13
 * The problem has a solution.
 *
 * Candidates = [100, 1]
 * Target = 20
 * The problem has no solutions.
 */

'use strict';

/**
 * Prints program usage.
 */
const printUsage = () => {
  console.log(`Usage: node ${__filename} <target> <candidates[]>`);
};

/**
 * Checks whether the problem is solvable.
 *
 * @param {number[]} candidates An array of candidates to choose from.
 * @param {number} target The target.
 *
 * @returns {boolean} True if the problem is solvable, false otherwise.
 */
const isSolvable = (candidates, target) => {
  // If there are no candidates, the problem has no solutions.
  if (candidates.length === 0) {
    return false;
  }
  // If the sum of all candidates is less than the target, the problem has no
  // solutions.
  const allNumberSum = candidates.reduce((accumulator, value) => {
    return accumulator + value;
  });
  if (allNumberSum < target) {
    return false;
  }
  // If the sum of all candidates equals to the target, the problem has a
  // solution.
  if (allNumberSum === target) {
    return true;
  }
  // Pick the greatest candidate which is equal to or less than the target.
  let i = null;
  let candidate = null;
  for (i = 0; i < candidates.length; i += 1) {
    const value = candidates[i];
    if (value <= target) {
      candidate = value;
      break;
    }
  }
  // If no candidates are suitable, the problem has no solutions.
  if (candidate === null) {
    return false;
  }
  // If the candidate equals to the target, the problem has a solution.
  if (candidate === target) {
    return true;
  }
  // Prepare to work on a smaller problem.
  // Calculdate the smaller target.
  const nextTarget = target - candidate;
  // We only need to consider candidates smaller than the picked candiate.
  const nextCandidates = candidates.slice(i + 1);
  return isSolvable(nextCandidates, nextTarget);
};

const main = () => {
  // The first argument is node.
  // The second argument is this program.
  // The third argument is the target.
  // The rest are the candidates.
  if (process.argv.length < 4) {
    printUsage();
    return;
  }
  const [node, program, target, ...numbers] = process.argv;
  const radix = 10;
  const candidates = numbers.map((value) => {
      return parseInt(value, radix);
    })
    .sort()
    .reverse();
  console.log(`Target: ${target}`);
  console.log(`Candidates: ${candidates}`);
  if (isSolvable(candidates, target)) {
    console.log('The problem has a solution.');
  } else {
    console.log('The problem has no solutions.');
  }
};

main();
