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
      <div>
        <label id='question'>Question:</label>
        <div>{question.question}</div>
        <label id='answer'>Answer: </label>
        <div>{answerRend.map(answer => <AnswerList key={answer.user_id} answer={answer} />)}</div>
        <p>See more answers ({answers.length})</p>
        <div>{question.votes} votes</div>
      </div>
    );
  }
}

export default QuestionList;