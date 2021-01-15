import React from 'react';
import AnswerList from './AnswerList.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question,
      answers: props.question.answer,
      answerRend: props.question.answer.slice(0, 1)
    };
  }

  render() {
    const {question, answers, answerRend} = this.state;
    return (
      <div className='qlist'>
        <label id='question'>Question:</label>
        <div className='question'>{question.question}</div>
        <label id='answer'>Answer: </label>
        <div>{answerRend.map(answer => <AnswerList key={answer.user_id} answer={answer} />)}</div>
        <p id='see'>See more answers ({answers.length})</p>
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