import styled from 'styled-components';

const Overviews = styled.ul`
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 1em;
  row-gap: 1.5em;
  
  li {
    height: 16em;
  }

  button {
    width: 100%;
    height: 100%;
    text-align: left;
    background: none;
    border: 1px dotted #999999;
  }

  img {
    
  }
`;

export default Overviews;
