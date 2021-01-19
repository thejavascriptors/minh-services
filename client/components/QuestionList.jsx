import React from 'react';
import AnswerList from './AnswerList.jsx';
import axios from 'axios';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerData: props.question.answer,
      answerRender: props.question.answer.slice(0, 1),
      answerClick: false,
      vote: props.question.votes,
      collapse: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleAnswer() {
    const {answerData, answerRender} = this.state;
    let newAns = answerRender.slice();
    for(let i = answerRender.length; i < answerRender.length + 2; i++) {
      newAns.push(answerData[i]);
    }
    this.setState({
      answerRender: newAns,
      collapse: true
    });
  }

  handleClick() {
    this.setState({
      answerClick: !this.state.answerClick
    });
  }

  handleCollapse() {
    this.setState({
      answerRender: this.props.question.answer.slice(0, 1),
      collapse: false
    });
  }

  handleVote(e) {
    let vote = e === 'upvote' ? 1 : -1
    axios.patch(`/api/questions/:${this.props.question._id}/question`, {
      data: vote
    })
      .then(res => this.setState({
        vote: res.data.votes
      }))
      .catch(err => console.error(err));
  }

  render() {
    const {vote, answerData, answerRender} = this.state;
    return (
      <div className='qlist'>
        <div>
          <div id='question'>
            <label>Question:</label>
            <div className='question'>{this.props.question.question}</div>
          </div>
          <div id='answer'>
            <label>Answer: </label>
            <div className='answer'>{answerRender.map(answer => <AnswerList key={answer._id} answer={answer} answerClick={this.state.answerClick} handleClick={this.handleClick}/>)}</div>
          </div>
          <div className='seeMore'>
            <div className='seeAns'>
              <p className='caret'>&lsaquo;</p>
              <p className='see' onClick={e => this.handleAnswer()}>See more answers ({answerData.length - answerRender.length})</p>
            </div>
            {this.state.collapse ? <button className='collapse' onClick={e => this.handleCollapse()}>Collapse all answers</button> : null}
          </div>
        </div>
        <div className='votes'>
          <button className='upvote' onClick={e => this.handleVote(e.target.className)}></button>
          <span>{vote}</span>
          <span>votes</span>
          <button className='downvote' onClick={e => this.handleVote(e.target.className)}></button>
        </div>
      </div>
    );
  }
}

export default QuestionList;