import DIFFICULTY from './constants';

// difficulty: string (easy, medium, hard)
export const generateBoard = difficultyLevel => {
  const { numOfRows, numOfCols, numOfMines } = DIFFICULTY[difficultyLevel];
  console.log(numOfCols);
  let board = generateDataStructure(numOfRows, numOfCols);
  board = randomlyAddMines(board, numOfMines);
  board = addProximityValuesToCells(board);
  console.log({ board });
  return board;
};

const generateDataStructure = (numOfRows, numOfCols) => {
  let board = [];

  for (let i = 0; i < numOfRows; i++) {
    board.push([]);
    for (let j = 0; j < numOfCols; j++) {
      board[i].push({
        value: null,
        isMine: false,
        isVisible: false,
        isFlagged: false
      });
    }
  }
  return board;
};

const randomlyAddMines = (board, numOfMines) => {
  let minesLeft = numOfMines;
  let boardWithMines = [...board];

  while (minesLeft > 0) {
    let { randRow, randCol } = generateRandomRowAndCol(
      board.length,
      board[0].length
    );

    let cell = boardWithMines[randRow][randCol];

    if (!cell.isMine) {
      const minedCell = {
        ...cell,
        isMine: true,
        value: 'M'
      };
      boardWithMines[randRow][randCol] = minedCell;
      minesLeft -= 1;
    }
  }
  return boardWithMines;
};

const addProximityValuesToCells = board => {
  const boardWithProxValues = [...board];

  // iterate through all cells
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      // grab cell
      let totalMines = 0;
      let currCell = boardWithProxValues[row][col];

      // if mine move on
      if (currCell.isMine) continue;
      // iterate through surrounding cells
      // top left
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let currRow = row + i;
          let currCol = col + j;
          // null check that cell exists
          if (
            boardWithProxValues[currRow] &&
            boardWithProxValues[currRow][currCol] &&
            boardWithProxValues[currRow][currCol].isMine
          ) {
            totalMines += 1;
          }
        }
      }
      if (totalMines) {
        const updatedCell = {
          ...currCell,
          value: totalMines
        };
        boardWithProxValues[row][col] = updatedCell;
        totalMines = 0;
      }
    }
  }
  return boardWithProxValues;
};

export const checkSurroundingCells = (board, row, col, openFn) => {
  let boardToUpdate = [...board];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let currRow = row + i;
      let currCol = col + j;
      // null check that cell exists
      if (
        boardToUpdate[currRow] &&
        boardToUpdate[currRow][currCol] &&
        !boardToUpdate[currRow][currCol].isVisible &&
        !boardToUpdate[currRow][currCol].isMine
      ) {
        openFn(currRow, currCol)();
      }
    }
  }
  return boardToUpdate;
};

const generateRandomRowAndCol = (numOfRows, numOfCols) => ({
  randRow: Math.floor(Math.random() * numOfRows),
  randCol: Math.floor(Math.random() * numOfCols)
});
