import React from 'react';
import styled from 'styled-components';


const User = styled.div`
  color: rgb(97, 93, 93);
`;

const SeeOther = styled.div`
  color: rgb(24, 114, 156);
  &:hover {
    cursor: pointer;
    color: orange;
    text-decoration: underline;
  }
`;

const Name = styled.span`
  color: rgb(24, 114, 156);
  &:hover {
    cursor: pointer;
    color: orange;
    text-decoration: underline;
  }
`;

const SeeMore = styled.span`
  color: rgb(24, 114, 156);
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

const FilterAnswer = ({answer, handleClick, clicked}) => (
  <span>
      {answer[0].text.length < 222 ? <span className='answer'>{answer[0].text}</span> : clicked ?
      <span>
        <span className='answer'>{answer[0].text}</span> <SeeMore onClick={e => handleClick()}>see less</SeeMore>
      </span> :
      <span>
        <span className='answer'>{answer[0].text.slice(0, 222)}</span>...<SeeMore onClick={e => handleClick(answer[0].text)}>see more</SeeMore>
      </span>}
    <User>By <Name>{answer[0].username}</Name> on {answer[0].createdAt}</User>
    <SeeOther>See other answers</SeeOther>
  </span>
);

export default FilterAnswer;