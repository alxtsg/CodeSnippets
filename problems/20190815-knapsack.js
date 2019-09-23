/**
 * 0-1 knapsack problem.
 *
 * Reference:
 * https://medium.com/@fabianterh/how-to-solve-the-knapsack-problem-with-dynamic-programming-eb88c706d3cf
 */

'use strict';

/**
 * Solves the 0-1 knapsack problem.
 *
 * @param {object[]} items Items available for put into the knapsack.
 * @param {number} items[].value The value of the item.
 * @param {number} items[].weight The weight of the item.
 * @param {number} capacity The capacity of the knapsack.
 *
 * @returns {number} The maximum value.
 */
const knapsack = (items, capacity) => {
  // The nth row indicates the maximum values we can get by putting 1...nth item
  // into the knapsack.
  // The nth column indicates the maximum values we can get for n unit of
  // remaining capacity of the knapsack.
  const results = [];
  for (let i = 0; i <= items.length; i += 1) {
    const itemRow = [];
    results.push(itemRow);
    for (let j = 0; j <= capacity; j += 1) {
      // When no item is selected, or remaining capacity of knapsack is 0 ,the
      // maximum value is 0.
      if ((i === 0) || (j === 0)) {
        itemRow.push(0);
        continue;
      }
      // When i equals to n, where n > 0, we get the nth item, so items[i - 1].
      const item = items[i - 1];
      const maxWithoutItem = results[i - 1][j];
      // We don't need to consider putting the item into the knapsack if the
      // item is heavier than the remaining capacity.
      if (item.weight > j) {
        results[i][j] = maxWithoutItem;
        continue;
      }
      // The maximum value is the item value, plus the maximum value we can get
      // for remaining capacity.
      const maxWithItem = item.value + results[i - 1][j - item.weight];
      results[i][j] = Math.max(maxWithoutItem, maxWithItem);
    }
  }
  return results[items.length][capacity];
};

const items = [
  {
    value: 3,
    weight: 2
  },
  {
    value: 2,
    weight: 1
  },
  {
    value: 4,
    weight: 3
  },
  {
    value: 2,
    weight: 2
  }
];
const capacity = 5;
console.log(knapsack(items, capacity));
