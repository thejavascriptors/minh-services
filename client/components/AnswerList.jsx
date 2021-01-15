import React from 'react';

const AnswerList = ({answer}) => (
  <div>
    <div>{answer.text}</div>
    <div>By {answer.user_name} on {answer.created_at}</div>
  </div>
);

export default AnswerList;