import React from 'react';

const AnswerList = ({answer, answerClick, handleAnswer}) => (
  <div>
    <div className='text'>
      {answer.text}
      {answerClick ? <span className='expand' onClick={e => handleAnswer()}>see less</span> : <span className='expand' onClick={e => handleAnswer()}>see more</span>}
    </div>
    <div className='user'>By {answer.username} on {answer.createdAt}</div>
  </div>
);

export default AnswerList;