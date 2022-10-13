import styled from 'styled-components';

const ListTitle = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1.5em;
  text-align: ${({ hasContent }) => (hasContent ? 'left' : 'center')};
`;

export default ListTitle;
