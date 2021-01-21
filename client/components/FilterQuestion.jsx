import React from 'react';
import FilterList from './FilterList.jsx';
import styled from 'styled-components';

const Post = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  height: 45px;
  width: 60%;
  background-color: rgb(97, 93, 93, 0.1);
`;

const Bold = styled.div`
  font-weight: bold;
  margin-left: 10px;
`;

const Button = styled.button`
  height: 30px;
  width: 135px;
  margin-left: 16px;
  border-radius: 3px;
  border: 1px solid rgb(97, 93, 93, 0.6);
  background-color: whitesmoke;
`;

const FilterQuestion = ({questions}) => (
  <div>
    {questions.map(question => <FilterList key={question._id} question={question}/>)}
    <Post>
      <Bold>Don't see the answer you're looking for?</Bold>
      <Button>Post your question</Button>
    </Post>
  </div>
);

export default FilterQuestion;