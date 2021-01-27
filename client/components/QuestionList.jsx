import React from 'react';
import AnswerList from './AnswerList.jsx';
import axios from 'axios';
import styled from 'styled-components';

const Questions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  width: 58em;
  margin: 10px;
  padding: 10px;
  font-size: 14px;
  padding-bottom: 0;
  margin-bottom: 0;
  margin-top: 0;
  padding-top: 0;
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
    border-top: 15px solid rgb(233, 110, 10);
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
  border-bottom: 15px solid rgb(126, 123, 123, 1.5);
  border-top: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    border-bottom: 15px solid rgb(233, 110, 10);
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


const Collapse = styled.button`
  height: 32px;
  margin: 15px;
  margin-left: 116px;
  margin-top: 0;
  border-radius: 1px;
  border: 1px solid rgb(97, 93, 93, 0.6);
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
  margin-left: 38px;
  color: rgb(24, 114, 156);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: rgb(194, 87, 38);
  }
`;

const QuestionBlock = styled.div`
  display: flex;
  margin: 10px;
  position: relative;
`;

const AnswerBlock = styled.div`
  display: flex;
  margin: 10px;
  margin-bottom: 0;
`;

const SeeMoreAnswers = styled.span`
  display: flex;
  margin-left: 116px;
`;

const Answers = styled.div`
  display: block;
  margin-left: 48px;
`;

const SeeAnswer = styled.p`
  display: inline-block;
  margin-left: 5px;
  color: rgb(24, 114, 156);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: rgb(194, 87, 38);
  }
`;

const User = styled.div`
  color: rgb(97, 93, 93);
  font-size: 14px;
  margin-left: 48px;
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 20px;
  font-size: 15px;
`;

const SeeMore = styled.span`
  color: rgb(24, 114, 156);
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    color: rgb(194, 87, 38);
  }
`;

const First = styled.div`
  margin-left: 48px;
`;

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerData: props.question.answer,
      answerRender: props.question.answer.slice(0, 1),
      vote: props.question.votes,
      collapse: false,
      didVote: 0,
      clicked: false
    };
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

  handleCollapse() {
    this.setState({
      answerRender: this.props.question.answer.slice(0, 1),
      collapse: false
    });
  }

  handleVote(vote) {
    if (this.state.didVote + vote > 1 || this.state.didVote + vote < -1) return;
    axios.patch(`http://localhost:1337/api/questions/:${this.props.question._id}/question`, {
      data: vote
    })
      .then(res => this.setState({
        vote: res.data.votes,
        didVote: this.state.didVote + vote
      }))
      .catch(err => console.error(err));
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const {vote, answerData, answerRender} = this.state;
    return (
      <Questions>
        <div>
          <QuestionBlock>
            <Label>Question: </Label>
            <Question>{this.props.question.question}</Question>
          </QuestionBlock>
          <AnswerBlock>
            <Label>Answer: </Label>
            <Answer>
              <First>
                {this.state.answerRender[0].text.length < 222 ? <div>{this.state.answerRender[0].text}</div> : this.state.clicked ?
                <div>
                  {this.state.answerRender[0].text} <SeeMore onClick={e => this.handleClick()}>see less</SeeMore>
                </div> :
                <div>
                  {this.state.answerRender[0].text.slice(0, 222)}...<SeeMore onClick={e => this.handleClick()}>see more</SeeMore>
                </div>}
              </First>
              <User>By {this.state.answerRender[0].username} on {this.state.answerRender[0].createdAt}</User>
              {this.state.answerRender.length > 1 ? <Answers>{answerRender.slice(1).map(answer => <AnswerList key={answer._id} answer={answer} />)}</Answers> : null}
            </Answer>
          </AnswerBlock>
          <span>
            <SeeMoreAnswers>
              <Caret>&lsaquo;</Caret>
              <SeeAnswer onClick={e => this.handleAnswer()}>See more answers ({answerData.length - answerRender.length})</SeeAnswer>
            </SeeMoreAnswers>
            {this.state.collapse ? <Collapse onClick={e => this.handleCollapse()}>Collapse all answers</Collapse> : null}
          </span>
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