import React from 'react';
import styled from 'styled-components';

const User = styled.div`
  color: rgb(97, 93, 93);
  font-size: 14px;
`;

const Answer= styled.div`
  line-height: 1.4;
  font-size: 15px;
`;

const SeeMore = styled.span`
  color: rgb(24, 114, 156);
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

const AnswerList = ({answer, answerClick, handleClick}) => (
  <Answer>
    <div>
      {answer.text.length < 200 ? <div>{answer.text}</div> : answerClick ?
      <div>
        {answer.text} <SeeMore onClick={e => handleClick()}>see less</SeeMore>
      </div> :
      <div>
        {answer.text.slice(0, 200)}...<SeeMore onClick={e => handleClick()}>see more</SeeMore>
      </div>}
    </div>
    <User>By {answer.username} on {answer.createdAt}</User>
    <br></br>
  </Answer>
);

export default AnswerList;