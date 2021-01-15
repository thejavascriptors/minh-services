import React from 'react';
import AnswerList from './AnswerList.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question,
      answerData: props.question.answer,
      answerRender: props.question.answer.slice(0, 1)
    };
  }

  render() {
    const {question, answerData, answerRender} = this.state;
    return (
      <div className='qlist'>
        <label id='question'>Question:</label>
        <div className='question'>{question.question}</div>
        <label id='answer'>Answer: </label>
        <div>{answerRender.map(answer => <AnswerList key={answer._id} answer={answer} />)}</div>
        <div className='hat'>
          <p className='arrow'>&lsaquo;</p>
          <p className='see'>See more answers ({answerData.length})</p>
        </div>
        <div className='votes'>
          <button className='upvote'></button>
          <span>{question.votes}</span>
          <span>votes</span>
          <button className='downvote'></button>
        </div>
      </div>
    );
  }
}

export default QuestionList;