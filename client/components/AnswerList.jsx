import React from 'react';
import styled from 'styled-components';

const User = styled.div`
  color: rgb(97, 93, 93);
`;

const Text = styled.div`
  line-height: 1.3;
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
  <div>
    <Text>
      {answer.text.length < 200 ? <div>{answer.text}</div> : answerClick ?
      <div>
        {answer.text} <SeeMore onClick={e => handleClick()}>see less</SeeMore>
      </div> :
      <div>
        {answer.text.slice(0, 200)}...<SeeMore onClick={e => handleClick()}>see more</SeeMore>
      </div>}
    </Text>
    <User>By {answer.username} on {answer.createdAt}</User>
    <br></br>
  </div>
);

export default AnswerList;