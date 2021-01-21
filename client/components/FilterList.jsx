import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  font-size: 14px;
  padding: 10px;
  margin-top: 5px;
  line-height: 1.4;
`;

const Question = styled.div`
  font-weight: bold;
`;

const Answer = styled.div`
`;

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

const FilterList = ({question, handleClick, clicked}) => (
  <Wrap>
    <Question>Q: {question.question}</Question>
    <Answer><b>A: </b>{question.answer[0].text.length < 256 ? <span>{question.answer[0].text}</span> : clicked ?
      <span>
        {question.answer[0].text} <SeeMore onClick={e => handleClick()}>see less</SeeMore>
      </span> :
      <span>
        {question.answer[0].text.slice(0, 256)}...<SeeMore onClick={e => handleClick()}>see more</SeeMore>
      </span>}</Answer>
    <User>By <Name>{question.answer[0].username}</Name> on {question.answer[0].createdAt}</User>
    <SeeOther>See other answers</SeeOther>
    <br></br>
  </Wrap>
);

export default FilterList;