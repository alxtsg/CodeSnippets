/**
 * Finds the fewest number of steps to walk from the starting cell to the goal
 * in a maze.
 */

'use strict';

/**
 * A cell in the maze.
 *
 * @typedef {object} Cell
 * @property {number} row The row index.
 * @property {number} column The column index.
 */

/**
 * Builds a maze from string.
 *
 * @param {string} mazeString Maze as a multi-line string.
 *
 * @returns {Array.<Array.<string>>} A 2D string array.
 */
const buildMaze = (mazeString) => {
  const maze = mazeString.split('\n')
    .map((row) => {
      return row.trim();
    })
    .filter((row) => {
      return (row.length > 0);
    })
    .map((row) => {
      return row.split('');
    });
  return maze;
}

/**
 * Locates the starting cell and goal.
 *
 * @param {Array.<Array.<string>>} maze The maze.
 *
 * @returns {object} The location of the starting cell and the goal.
 */
const locateStartGoal = (maze) => {
  const location = {
    start: null,
    goal: null
  };
  for (let i = 0; i < maze.length; i += 1) {
    const row = maze[i];
    for (let j = 0; j < row.length; j += 1) {
      const cell = row[j];
      if (cell === 'S') {
        location.start = {
          row: i,
          column: j
        }
      } else if (cell === 'G') {
        location.goal = {
          row: i,
          column: j
        }
      }
      // We are done if both starting cell and goal have been located.
      if ((location.start !== null) && (location.goal !== null)) {
        return location;
      }
    }
  }
}

/**
 * Checks whether a cell is located within the maze.
 *
 * @param {Array.<Array.<string>>} maze The maze.
 * @param {Cell} cell The cell to be checked.
 *
 * @returns {boolean} True if the cell is located within the maze, false
 *                    otherwise.
 */
const isWithinMaze = (maze, cell) => {
  // We cannot walk upward too much.
  if (cell.row < 0) {
    return false;
  }
  // We cannot walk downward too much.
  if (cell.row >= maze.length) {
    return false;
  }
  // We cannot walk to the left too much.
  if (cell.column < 0) {
    return false;
  }
  // We cannot walk to the right too much.
  if (cell.column >= maze[cell.row].length) {
    return false;
  }
  return true;
};

/**
 * Checks whether a cell in the maze has been visited.
 *
 * @param {Set<string>} visitHistory Visit history.
 * @param {Cell} cell A cell in the maze.
 *
 * @returns {boolean} True if the cell has been visited, false otherwise.
 */
const hasVisited = (visitHistory, cell) => {
  return visitHistory.has(`${cell.row}-${cell.column}`);
}

/**
 * Checks whether a cell in the maze is a wall.
 *
 * @param {Set<string>} visitHistory Visit history.
 * @param {Cell} cell A cell in the maze.
 *
 * @returns {boolean} True if the cell is a wall, false otherwise.
 */
const isWall = (maze, cell) => {
  return (maze[cell.row][cell.column] === '#');
};

/**
 * Checks whether a cell is a candidate cell (i.e. should be visited).
 *
 * @param {Array.<Array.<string>>} maze The maze.
 * @param {Set<string>} visitHistory Visit history.
 * @param {Cell} cell The cell to be checked.
 *
 * @returns {boolean} True if the cell is a candidate cell, false otherwise.
 */
const isCandidateCell = (maze, visitHistory, cell) => {
  // We do not visit a cell outside the maze, we do not visit a cell more than
  // once, and we do not walk on walls.
  return (
    isWithinMaze(maze, cell) &&
    !hasVisited(visitHistory, cell) &&
    !isWall(maze, cell)
  );
};

/**
 * Gets the upward cell.
 *
 * @param {Array.<Array.<string>>} maze The maze.
 * @param {Set<string>} visitHistory Visit history.
 * @param {Cell} cell The cell in the maze currently standing on.
 *
 * @returns {Cell|null} The upward cell, or null if it is not available.
 */
const getUpwardCell = (maze, visitHistory, cell) => {
  const upwardCell = {
    row: cell.row - 1,
    column: cell.column
  };
  if (!isCandidateCell(maze, visitHistory, upwardCell)) {
    return null;
  }
  return upwardCell;
};

/**
 * Gets the downward cell.
 *
 * @param {Array.<Array.<string>>} maze The maze.
 * @param {Set<string>} visitHistory Visit history.
 * @param {Cell} cell The cell in the maze currently standing on.
 *
 * @returns {Cell|null} The downward cell, or null if it is not available.
 */
const getDownwardCell = (maze, visitHistory, cell) => {
  const downwardCell = {
    row: cell.row + 1,
    column: cell.column
  };
  if (!isCandidateCell(maze, visitHistory, downwardCell)) {
    return null;
  }
  return downwardCell;
};

/**
 * Gets the left cell.
 *
 * @param {Array.<Array.<string>>} maze The maze.
 * @param {Set<string>} visitHistory Visit history.
 * @param {Cell} cell The cell in the maze currently standing on.
 *
 * @returns {Cell|null} The left cell, or null if it is not available.
 */
const getLeftCell = (maze, visitHistory, cell) => {
  const leftCell = {
    row: cell.row,
    column: cell.column - 1
  };
  if (!isCandidateCell(maze, visitHistory, leftCell)) {
    return null;
  }
  return leftCell;
};

/**
 * Gets the right cell.
 *
 * @param {Array.<Array.<string>>} maze The maze.
 * @param {Set<string>} visitHistory Visit history.
 * @param {Cell} cell The cell in the maze currently standing on.
 *
 * @returns {Cell|null} The right cell, or null if it is not available.
 */
const getRightCell = (maze, visitHistory, cell) => {
  const rightCell = {
    row: cell.row,
    column: cell.column + 1
  };
  if (!isCandidateCell(maze, visitHistory, rightCell)) {
    return null;
  }
  return rightCell;
};

/**
 * Finds the routes to walk from the starting cell to the goal.
 *
 * @param {Array.<Array.<string>>} maze The maze.
 * @param {Cell} start The starting cell.
 * @param {Cell} goal The goal.
 *
 * @returns {Array.<Array.<Cell>>} The route.
 */
const findRoutes = (maze, start, goal) => {
  const visitHistory = new Set();
  const candidateRoutes = [
    [start]
  ];
  const solutionRoutes = [];
  while (true) {
    const route = candidateRoutes.shift();
    if (!route) {
      // No more candidate routes.
      break;
    }
    // Get the cell currently standing on.
    const currentCell = route[route.length - 1];
    // Save the cell to visit history.
    visitHistory.add(`${currentCell.row}-${currentCell.column}`);
    // Look for cells to visit.
    const upwardCell = getUpwardCell(maze, visitHistory, currentCell);
    if (upwardCell !== null) {
      if (maze[upwardCell.row][upwardCell.column] === 'G') {
        // We have found a solution route.
        solutionRoutes.push([...route, upwardCell]);
      } else {
        // We have found a candidate route.
        candidateRoutes.push([...route, upwardCell]);
      }
    }
    const downwardCell = getDownwardCell(maze, visitHistory, currentCell);
    if (downwardCell !== null) {
      if (maze[downwardCell.row][downwardCell.column] === 'G') {
        // We have found a solution route.
        solutionRoutes.push([...route, downwardCell]);
      } else {
        // We have found a candidate route.
        candidateRoutes.push([...route, downwardCell]);
      }
    }
    const leftCell = getLeftCell(maze, visitHistory, currentCell);
    if (leftCell !== null) {
      if (maze[leftCell.row][leftCell.column] === 'G') {
        // We have found a solution route.
        solutionRoutes.push([...route, leftCell]);
      } else {
        // We have found a candidate route.
        candidateRoutes.push([...route, leftCell]);
      }
    }
    const rightCell = getRightCell(maze, visitHistory, currentCell);
    if (rightCell !== null) {
      if (maze[rightCell.row][rightCell.column] === 'G') {
        // We have found a solution route.
        solutionRoutes.push([...route, rightCell]);
      } else {
        // We have found a candidate route.
        candidateRoutes.push([...route, rightCell]);
      }
    }
  }
  return solutionRoutes;
};

const main = () => {
  const rawMaze = `
    #S######.#
    ......#..#
    .#.##.##.#
    .#........
    ##.##.####
    ....#....#
    .#######.#
    ....#.....
    .####.###.
    ....#...G#
  `;
  const maze = buildMaze(rawMaze);
  /*
  console.log('Maze:');
  console.log(maze);
  */
  const location = locateStartGoal(maze);
  /*
  console.log(`Start: ${location.start.row}, ${location.start.column}`);
  console.log(`Goal: ${location.goal.row}, ${location.goal.column}`);
  */
  const routes = findRoutes(maze, location.start, location.goal);
  // See which route has fewest steps.
  let minLength = Infinity;
  routes.forEach((route) => {
    minLength = Math.min(minLength, route.length);
  });
  // Exclude the first step (i.e. standing on the starting cell).
  console.log(`${minLength - 1}`);
};

main();
