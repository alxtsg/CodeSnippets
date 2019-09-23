/**
 * A truck with P units of fuel travels L unit of distance. 1 unit of fuel is
 * required for each unit of travel. On the road, there are several gas stations
 * and each allows the driver to refuel a specific unit of fuel.
 *
 * The fuel tank can store infinity unit of fuel. The driver wants to minimize
 * the number of time of refuelling.
 *
 * Calculate the number of times of refuelling required, or -1 if the
 * destination is unreachable.
 */

'use strict';

const stations = [
  {pos: 10, fuel: 10},
  {pos: 14, fuel: 5},
  {pos: 20, fuel: 2},
  {pos: 21, fuel: 4}
];
let l = 25;
let p = 10;
let refuelCount = 0;
let priQueue = [];

/**
 * Adds a station to the priority queue.
 *
 * @param {object} station Station to be added to the priority queue.
 */
const addToPriQueue = (station) => {
  priQueue.push(station);
  priQueue = priQueue.sort((stationA, stationB) => {
    // Negate the priority differences, so the station with highest refuelling
    // capability is listed first.
    return -(stationA.fuel - stationB.fuel);
  });
};

let pos = 0;
while (pos < l) {
  if ((stations.length > 0) && (stations[0].pos === pos)) {
    addToPriQueue(stations.shift());
  }
  if (p > 0) {
    pos += 1;
    p -= 1;
    continue;
  }
  if (priQueue.length === 0) {
    refuelCount = -1;
    break;
  }
  const station = priQueue.shift();
  p += station.fuel;
  refuelCount += 1;
};
console.log(refuelCount);
