import React from 'react';
import styled from 'styled-components';

const User = styled.div`
  color: rgb(97, 93, 93);
  font-size: 14px;
`;

const Answer = styled.div`
  line-height: 20px;
  font-size: 15px;
`;

const SeeMore = styled.span`
  color: rgb(24, 114, 156);
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    return (
      <Answer>
        <div>
          {this.props.answer.text.length < 222 ? <div>{this.props.answer.text}</div> : this.state.clicked ?
          <div>
            {this.props.answer.text} <SeeMore onClick={e => this.handleClick()}>see less</SeeMore>
          </div> :
          <div>
            {this.props.answer.text.slice(0, 222)}...<SeeMore onClick={e => this.handleClick()}>see more</SeeMore>
          </div>}
        </div>
        <User>By {this.props.answer.username} on {this.props.answer.createdAt}</User>
      </Answer>
    );
  }
}

export default AnswerList;