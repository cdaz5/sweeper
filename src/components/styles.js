import styled from 'styled-components';

export const StyledTable = styled.table`
  border-collapse: collapse;
`;

export const StyledButton = styled.button`
  height: 25px;
  width: 25px;
  background: ${({ isVisible }) => (isVisible ? '#fff' : 'grey')};
`;

export const StyledTd = styled.td`
  padding: 0;
`;
