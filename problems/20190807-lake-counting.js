/**
 * Counts the number of lakes in a garden.
 */

'use strict';

/**
 * A cell in the garden.
 *
 * @typedef {object} Cell
 * @property {number} row The row index.
 * @property {number} column The column index.
 */

/**
 * Builds a garden from string.
 *
 * @param {string} gardenString Garden as a multi-line string.
 *
 * @returns {Array.<Array.<string>>} A 2D string array.
 */
const buildGarden = (gardenString) => {
  const garden = gardenString.split('\n')
    .map((row) => {
      return row.trim();
    })
    .filter((row) => {
      return (row.length > 0);
    })
    .map((row) => {
      return row.split('');
    });
  return garden;
}

/**
 * Checks whether a cell is located within the garden.
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Cell} cell The cell to be checked.
 *
 * @returns {boolean} True if the cell is located within the garden, false
 *                    otherwise.
 */
const isWithinGarden = (garden, cell) => {
  // We cannot walk to the north too much.
  if (cell.row < 0) {
    return false;
  }
  // We cannot walk to the south too much.
  if (cell.row >= garden.length) {
    return false;
  }
  // We cannot walk to the east too much.
  if (cell.column < 0) {
    return false;
  }
  // We cannot walk to the west too much.
  if (cell.column >= garden[cell.row].length) {
    return false;
  }
  return true;
};

/**
 * Checks whether a cell in the garden has been visited.
 *
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell A cell in the garden.
 *
 * @returns {boolean} True if the cell has been visited, false otherwise.
 */
const hasVisited = (visitedCells, cell) => {
  return visitedCells.has(`${cell.row}-${cell.column}`);
}

/**
 * Checks whether a cell in the garden is land.
 *
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell A cell in the garden.
 *
 * @returns {boolean} True if the cell is land (i.e. not filled with water),
 *                    false otherwise.
 */
const isLandCell = (garden, cell) => {
  return (garden[cell.row][cell.column] === '.');
};

/**
 * Checks whether a cell is a candidate cell (i.e. should be visited).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell to be checked.
 *
 * @returns {boolean} True if the cell is a candidate cell, false otherwise.
 */
const isCandidateCell = (garden, visitedCells, cell) => {
  // We do not visit a cell outside the garden, we do not visit a cell more than
  // once, and we ignore land cells.
  return (
    isWithinGarden(garden, cell) &&
    !hasVisited(visitedCells, cell) &&
    !isLandCell(garden, cell)
  );
};

/**
 * Gets the cell on the north (↑).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getNCell = (garden, visitedCells, cell) => {
  const nCell = {
    row: cell.row - 1,
    column: cell.column
  };
  if (!isCandidateCell(garden, visitedCells, nCell)) {
    return null;
  }
  return nCell;
};

/**
 * Gets the cell on the north-east (↗).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getNECell = (garden, visitedCells, cell) => {
  const neCell = {
    row: cell.row - 1,
    column: cell.column + 1
  };
  if (!isCandidateCell(garden, visitedCells, neCell)) {
    return null;
  }
  return neCell;
};

/**
 * Gets the cell on the east (→).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getECell = (garden, visitedCells, cell) => {
  const eCell = {
    row: cell.row,
    column: cell.column + 1
  };
  if (!isCandidateCell(garden, visitedCells, eCell)) {
    return null;
  }
  return eCell;
};

/**
 * Gets the cell on the south-east (↘).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getSECell = (garden, visitedCells, cell) => {
  const seCell = {
    row: cell.row + 1,
    column: cell.column + 1
  };
  if (!isCandidateCell(garden, visitedCells, seCell)) {
    return null;
  }
  return seCell;
};

/**
 * Gets the cell on the south (↓).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getSCell = (garden, visitedCells, cell) => {
  const sCell = {
    row: cell.row + 1,
    column: cell.column
  };
  if (!isCandidateCell(garden, visitedCells, sCell)) {
    return null;
  }
  return sCell;
};

/**
 * Gets the cell on the south-west (↙).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getSWCell = (garden, visitedCells, cell) => {
  const swCell = {
    row: cell.row + 1,
    column: cell.column - 1
  };
  if (!isCandidateCell(garden, visitedCells, swCell)) {
    return null;
  }
  return swCell;
};

/**
 * Gets the cell on the west (←).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getWCell = (garden, visitedCells, cell) => {
  const wCell = {
    row: cell.row,
    column: cell.column - 1
  };
  if (!isCandidateCell(garden, visitedCells, wCell)) {
    return null;
  }
  return wCell;
};

/**
 * Gets the cell on the north-west (↖).
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Cell} cell The cell in the garden currently standing on.
 *
 * @returns {Cell|null} The cell, or null if it is not available.
 */
const getNWCell = (garden, visitedCells, cell) => {
  const nwCell = {
    row: cell.row - 1,
    column: cell.column - 1
  };
  if (!isCandidateCell(garden, visitedCells, nwCell)) {
    return null;
  }
  return nwCell;
};

/**
 * Finds nearby water cell.
 *
 * @param {Array.<Array.<string>>} garden The garden.
 * @param {Set<string>} visitedCells Visited cells.
 * @param {Set<Cell>} lake Set of cells in the same lake.
 * @param {Cell} cell The cell in the garden currently standing on.
 */
const findNearbyWaterCell = (garden, visitedCells, lake, cell) => {
  // Get the cells on all 8 directions.
  const nCell = getNCell(garden, visitedCells, cell);
  if (nCell !== null) {
    lake.add(nCell);
    visitedCells.add(`${nCell.row}-${nCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, nCell);
  }
  const neCell = getNECell(garden, visitedCells, cell);
  if (neCell !== null) {
    lake.add(neCell);
    visitedCells.add(`${neCell.row}-${neCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, neCell);
  }
  const eCell = getECell(garden, visitedCells, cell);
  if (eCell !== null) {
    lake.add(eCell);
    visitedCells.add(`${eCell.row}-${eCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, eCell);
  }
  const seCell = getSECell(garden, visitedCells, cell);
  if (seCell !== null) {
    lake.add(seCell);
    visitedCells.add(`${seCell.row}-${seCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, seCell);
  }
  const sCell = getSCell(garden, visitedCells, cell);
  if (sCell !== null) {
    lake.add(sCell);
    visitedCells.add(`${sCell.row}-${sCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, sCell);
  }
  const swCell = getSWCell(garden, visitedCells, cell);
  if (swCell !== null) {
    lake.add(swCell);
    visitedCells.add(`${swCell.row}-${swCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, swCell);
  }
  const wCell = getWCell(garden, visitedCells, cell);
  if (wCell !== null) {
    lake.add(wCell);
    visitedCells.add(`${wCell.row}-${wCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, wCell);
  }
  const nwCell = getNWCell(garden, visitedCells, cell);
  if (nwCell !== null) {
    lake.add(nwCell);
    visitedCells.add(`${nwCell.row}-${nwCell.column}`);
    findNearbyWaterCell(garden, visitedCells, lake, nwCell);
  }
};

const countLakes = (garden) => {
  const lakes = new Set();
  const visitedCells = new Set();
  for (let i = 0; i < garden.length; i += 1) {
    const row = garden[i];
    for (let j = 0; j < row.length; j += 1) {
      const cell = {
        row: i,
        column: j
      };
      if (!isCandidateCell(garden, visitedCells, cell)) {
        continue;
      }
      visitedCells.add(`${cell.row}-${cell.column}`);
      const lake = new Set();
      lake.add(cell);
      findNearbyWaterCell(garden, visitedCells, lake, cell);
      lakes.add(lake);
    }
  }
  return lakes.size;
};



const main = () => {
  const rawGarden = `
    W........WW.
    .WWW.....WWW
    ....WW...WW.
    .........WW.
    .........W..
    ..W......W..
    .W.W.....WW.
    W.W.W.....W.
    .W.W......W.
    ..W.......W.
  `;
  const garden = buildGarden(rawGarden);
  console.log('Garden:');
  console.log(garden);
  const numberOfLakes = countLakes(garden);
  console.log(numberOfLakes);
};

main();
