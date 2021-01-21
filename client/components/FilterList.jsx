import React from 'react';
import FilterAnswer from './FilterAnswer.jsx';
import styled from 'styled-components';

const Wrap = styled.div`
  font-size: 14px;
  padding: 10px;
  margin-top: 5px;
  line-height: 1.4;
  width: 60%;
`;

const Question = styled.div`
  font-weight: bold;
`;

const Answer = styled.div`
`;

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    return (
      <Wrap>
        <Question className='question'>Q: {this.props.question.question}</Question>
        <Answer><b>A: </b><FilterAnswer answer={this.props.question.answer} handleClick={this.handleClick} clicked={this.state.clicked}/></Answer>
        <br></br>
      </Wrap>
    );
  }
}

export default FilterList;