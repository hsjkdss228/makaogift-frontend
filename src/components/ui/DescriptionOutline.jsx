import styled from 'styled-components';

const DescriptionOutline = styled.div`
  p {
    margin-bottom: .4em;
  }

  p:first-child {
    font-size: 1.2em;
    color: #999999;
  }

  p:nth-child(2) {
    font-size: 1.2em;
    height: 2.2em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.15em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:last-child {
    font-size: 1.1em;

    span {
      font-size: 1.3em;
    }
  }
`;

export default DescriptionOutline;
