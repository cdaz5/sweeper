import React from 'react';

import { StyledButton, StyledTd } from './styles';

const Cell = ({
  status,
  value,
  isVisible,
  isMine,
  isFlagged,
  handleClick,
  handleFlag
}) => {
  const content = isFlagged ? value : isVisible && value;
  const disabled =
    isVisible || isFlagged || status === 'lost' || status === 'won';
  return (
    <StyledTd>
      <StyledButton
        type="button"
        onClick={handleClick}
        onContextMenu={handleFlag}
        isVisible={isVisible}
        disabled={disabled}
      >
        {content}
      </StyledButton>
    </StyledTd>
  );
};

export default Cell;
