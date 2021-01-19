import React from 'react';
import AnswerList from './AnswerList.jsx';
import axios from 'axios';
import styled from 'styled-components';

const Questions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  width: 60%;
  margin: 10px;
  padding: 10px;
`;

const DownVote = styled.button`
  padding: 0;
  width: 0;
  height: 0;
  margin: 5px;
  margin-left: 8px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid rgb(126, 123, 123);
  border-bottom: none;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

const UpVote = styled.button`
  padding: 0;
  width: 0;
  height: 0;
  margin: 5px;
  margin-left: 8px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid rgb(126, 123, 123);
  border-top: none;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Votes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 5px;
  padding-right: 10px;
  text-align: center;
  border-right: solid 1px rgb(224, 220, 220);
  height: 90px;
`;

const SeeMoreAnswers = styled.div`
  display: flex;
  margin-left: 118px;
`;

const Collapse = styled.button`
  height: 32px;
  margin: 15px;
  margin-left: 118px;
  border-width: 1px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Caret = styled.p`
  transform: rotate(-90deg);
  color: rgb(99, 96, 96);
`;

const Label = styled.label`
  font-weight: bold;
`;

const Question = styled.div`
  margin-left: 36px;
  color: rgb(24, 114, 156);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: orange;
  }
`;

const QABlock = styled.div`
  display: flex;
  margin: 10px;
`;

const Answer = styled.div`
  margin-left: 48px;
  float: left;
`;

const SeeAnswer = styled.p`
  margin-left: 5px;
  color: rgb(24, 114, 156);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: orange;
  }
`;

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

  handleVote(vote) {
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
      <Questions>
        <div>
          <QABlock>
            <Label>Question: </Label>
            <Question>{this.props.question.question}</Question>
          </QABlock>
          <QABlock>
            <Label>Answer: </Label>
            <Answer>{answerRender.map(answer => <AnswerList key={answer._id} answer={answer} answerClick={this.state.answerClick} handleClick={this.handleClick}/>)}</Answer>
          </QABlock>
          <div>
            <SeeMoreAnswers>
              <Caret>&lsaquo;</Caret>
              <SeeAnswer onClick={e => this.handleAnswer()}>See more answers ({answerData.length - answerRender.length})</SeeAnswer>
            </SeeMoreAnswers>
            {this.state.collapse ? <Collapse onClick={e => this.handleCollapse()}>Collapse all answers</Collapse> : null}
          </div>
        </div>
        <Votes>
          <UpVote onClick={e => this.handleVote(1)}></UpVote>
          <span>{vote}</span>
          <span>votes</span>
          <DownVote onClick={e => this.handleVote(-1)}></DownVote>
        </Votes>
      </Questions>
    );
  }
}

export default QuestionList;