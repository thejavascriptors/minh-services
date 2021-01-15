import React from 'react';
import QuestionList from './QuestionList.jsx';

const Questions = ({questions}) => (
  <div>
    {questions.map(question => <QuestionList key={question.question_id} question={question} />)}
  </div>
);

export default Questions;