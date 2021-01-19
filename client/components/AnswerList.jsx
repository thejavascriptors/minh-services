import React from 'react';

const AnswerList = ({answer, answerClick, handleClick}) => (
  <div>
    <div className='text'>
      {answer.text.length < 200 ? <div>{answer.text}</div> : answerClick ?
      <div>
        {answer.text} <span className='expand' onClick={e => handleClick()}>see less</span>
      </div> :
      <div>
        {answer.text.slice(0, 200)}...<span className='expand' onClick={e => handleClick()}>see more</span>
      </div>}
    </div>
    <div className='user'>By {answer.username} on {answer.createdAt}</div>
    <br></br>
  </div>
);

export default AnswerList;