import styled from 'styled-components';

const PrimaryButton = styled.button`
  font-size: 1.25em;
  font-weight: bold;
  padding: 1em 9.375em;
  border: none;
  border-radius: 10px;
  margin-top: 1em;
  color: #FFF;
  background-color: #22DAAB;

  :hover {
    color: #006148;  
  }

  :active {
    color: #FFF;
    background-color: #008C68;
  }
`;

export default PrimaryButton;
