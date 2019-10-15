import React, { useState } from 'react';

import Cell from './cell';

import { generateBoard, checkSurroundingCells } from './helpers';

import { StyledTable } from './styles';

const initialGameMeta = {
  status: 'pending',
  totalVisibleCells: 0
};

// i like the helper paradigm vs large components filled with functions

// add difficulty logic being passed down and creating board based off that

// add additional flagged logic

// generate board should use lodash flow instead of constantly resetting board variable

// definitely need to optimize the amount of setting state in handle click
// i liked the idea of promisfying the recursion and then setting state

// i focused more on the functionality to show something rather than css, but css is my JAM! (so sad i couldnt do more)

// a lot of overall cleanup is needed

const Minesweeper = ({ numOfMines }) => {
  const [board, setBoard] = useState(generateBoard('easy'));
  const [gameMeta, setGameMeta] = useState(initialGameMeta);

  const handleFlag = (row, col) => e => {
    e.preventDefault();
    let boardToUpdate = [...board];
    let currCell = board[row][col];

    const flaggedCell = {
      ...currCell,
      isFlagged: true,
      value: 'F'
    };
    boardToUpdate[row][col] = flaggedCell;
    setBoard(boardToUpdate);
  };

  const handleClick = (row, col) => () => {
    let boardToUpdate = [...board];

    const currCell = boardToUpdate[row][col];

    const visibleCell = {
      ...currCell,
      isVisible: true
    };

    boardToUpdate[row][col] = visibleCell;
    setBoard(boardToUpdate);

    if (totalVisibleCells + 1 - numOfMines === 0) {
      setGameMeta(prevMeta => ({
        ...prevMeta,
        status: 'won'
      }));
      openAllCells();
      return alert('you won!');
    }

    setGameMeta(prevState => ({
      ...prevState,
      totalVisibleCells: (prevState.totalVisibleCells += 1)
    }));

    if (visibleCell.isMine) {
      setGameMeta(prevMeta => ({
        ...prevMeta,
        status: 'lost'
      }));
      openAllCells();
      return alert('Sorry you lost!');
    }

    if (!visibleCell.value) {
      boardToUpdate = checkSurroundingCells(
        boardToUpdate,
        row,
        col,
        handleClick
      );
      setBoard(boardToUpdate);
    }
  };

  const openAllCells = () => {
    const openedBoard = board.map(row =>
      row.map(({ isVisible, ...cell }) => ({
        ...cell,
        isVisible: true
      }))
    );
    setBoard(openedBoard);
  };
  const { status, totalVisibleCells } = gameMeta;
  console.log(board);
  return (
    <StyledTable>
      <tbody>
        {board.map((row, rowIdx) => (
          <tr key={`row-${rowIdx}`}>
            {row.map((cell, colIdx) => (
              <Cell
                key={`row-${rowIdx}-col-${colIdx}`}
                {...cell}
                status={status}
                handleClick={handleClick(rowIdx, colIdx)}
                handleFlag={handleFlag(rowIdx, colIdx)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Minesweeper;
