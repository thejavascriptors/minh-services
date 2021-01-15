import React from 'react';
import AnswerList from './AnswerList.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question,
      answerData: props.question.answer,
      answerRender: props.question.answer.slice(0, 1),
      answerClick: false
    };
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleAnswer() {

  }

  handleClick() {

  }

  render() {
    const {question, answerData, answerRender} = this.state;
    return (
      <div className='qlist'>
        <div>
          <div id='question'>
            <label>Question:</label>
            <div className='question'>{question.question}</div>
          </div>
          <div id='answer'>
            <label>Answer: </label>
            <div className='answer'>{answerRender.map(answer => <AnswerList key={answer._id} answer={answer} answerClick={this.state.answerClick} handleAnswer={this.handleAnswer}/>)}</div>
          </div>
          <div className='hat'>
            <p className='arrow'>&lsaquo;</p>
            <p className='see' onClick={e => this.handleClick()}>See more answers ({answerData.length})</p>
          </div>
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