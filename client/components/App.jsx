import React from 'react';
import Search from './Search.jsx';
import Questions from './Questions.jsx';
import axios from 'axios';
import styled from 'styled-components';

const Header = styled.h2`
  margin-left: 10px;
`;

const SeeMoreQuestions = styled.button`
  height: 30px;
  margin: 10px;
  margin-left: 186px;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  border-top: solid 1px rgb(224, 220, 220);
  border-bottom: solid 1px rgb(224, 220, 220);
  font-family: Arial, Helvetica, sans-serif;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      questions: [],
      filter: [],
      searchQuery: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.emptySearch = this.emptySearch.bind(this);
  }

  componentDidMount() {
    axios('/api/questions')
      .then(data => {
        data = data.data.sort((a, b) => b.votes - a.votes);
        this.setState({
        data: data,
        questions: data.slice(0, 4)
      })})
      .catch(err => console.error(err));
  }

  handleQuestion() {
    const {data, questions} = this.state;
    let newQuest = questions.slice();
    for (let i = questions.length; i < questions.length + 4; i++) {
      newQuest.push(data[i]);
    }
    this.setState({
      questions: newQuest
    });
  }

  handleSearch(val) {
    const {data} = this.state;
    let filtered = data.filter(question => question.question.includes(val));
    this.setState({
      searchQuery: val,
      questions: filtered.slice(0, 4),
      filter: filtered
    });
  }

  emptySearch(e) {
    const {data} = this.state;
    let newQuestions = data.slice(0, 4)
    $(e).val('');
    this.setState({
      searchQuery: '',
      questions: newQuestions
    });
  }

  render() {
    const {questions, data} = this.state;
    return (
      <Wrapper>
        <Header>Customer questions & answers</Header>
        <Search handleSearch={this.handleSearch} emptySearch={this.emptySearch} searchQuery={this.state.searchQuery}/>
        <Questions questions={questions}/>
        <SeeMoreQuestions onClick={e => this.handleQuestion()}>See more answered questions ({data.length - questions.length})</SeeMoreQuestions>
      </Wrapper>
    );
  }
}

export default App;