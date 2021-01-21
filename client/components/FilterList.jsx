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

const FilterList = ({question}) => (
  <Wrap>
    <Question>Q: {question.question}</Question>
    <Answer><b>A: </b><span>{question.answer[0].text}</span></Answer>
    <User>By <Name>{question.answer[0].username}</Name> on {question.answer[0].createdAt}</User>
    <SeeOther>See other answers</SeeOther>
    <br></br>
  </Wrap>
);

export default FilterList;