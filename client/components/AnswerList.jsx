import React from 'react';

const AnswerList = ({answer}) => (
  <div>
    <div>{answer.text}</div>
    <div className='user'>By {answer.username} on {answer.createdAt}</div>
  </div>
);

export default AnswerList;