import styled from 'styled-components';

const Overviews = styled.ul`
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 1em;
  row-gap: 1.5em;
  
  li {
    height: 20em;
  }

  button {
    width: 100%;
    height: 100%;
    text-align: left;
    background: none;
    border: none;
  }

  img {
    width: 16em;
    height: 16em;
    object-fit: cover;
    border-radius: 1em;
    margin-bottom: 1em;
  }
`;

export default Overviews;
