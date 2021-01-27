import React from 'react';
import Search from './Search.jsx';
import Questions from './Questions.jsx';
import FilterQuestion from './FilterQuestion.jsx';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';

const Header = styled.h2`
  margin-left: 10px;
`;

const SeeMoreQuestions = styled.button`
  height: 30px;
  margin: 10px;
  margin-left: 186px;
  border: 1px solid rgb(97, 93, 93, 0.6);
  border-radius: 1px;
  &:hover {
    cursor: pointer;
  }
  `;

const Wrapper = styled.div`
  border-top: solid 1px rgb(224, 220, 220);
  border-bottom: solid 1px rgb(224, 220, 220);
  font-family: Arial, Helvetica, sans-serif;
`;

const Unordered = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: 14px;
  border-bottom: solid 1px rgb(224, 220, 220);
  width: 65%;
`;

  const List = styled.li`
  float: left;
  height: 50px;
  border-bottom: ${props => props.selected === 'qna' ? '3px solid orange' : null};
  font-weight: ${props => props.selected === 'qna' ? 'bold' : null};
  `;

  const Nav = styled.a`
  text-align: center;
  display: block;
  margin: 12px;
  padding: 12px;
  &:hover {
    cursor: pointer;
  }
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      questions: [],
      searchQuery: '',
      view: 'default'
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.emptySearch = this.emptySearch.bind(this);
  }

  componentDidMount() {
    axios('http://localhost:1337/api/questions')
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
    }, () => {
      $('html, body').animate({scrollTop: $('#minh').height() + 400}, 1000);
    });
  }

  handleSearch(val) {
    if (val === '') {
      return this.emptySearch();
    }

    let data = JSON.parse(JSON.stringify(this.state.data));
    for (let i = 0; i < data.length; i++) {
      let ans = {};
      for (let j = 0; j < data[i].answer.length; j++) {
        if (!data[i].answer[j]) continue;
        if (data[i].answer[j].text.includes(val)) {
          ans = data[i].answer[j];
          break;
        }
      }
      data[i].answer[0] = ans;
    }

    let filtered = data.filter(question => question.question.includes(val) || question.answer[0].text);

    this.setState({
      searchQuery: val,
      questions: filtered,
      view: 'search'
    }, () => {
      let words = document.querySelectorAll('.question, .answer');
      let regex = RegExp(val, 'gi');
      let replace = `<span class="highlight">${val}</span>`;
      for (let i = 0; i < words.length; i++) {
        let newHTML = words[i].textContent.replace(regex, replace);
        words[i].innerHTML = newHTML;
      }
    });
  }

  emptySearch(e) {
    const {data} = this.state;
    let newQuestions = data.slice(0, 4);
    $(e).val('');
    this.setState({
      searchQuery: '',
      questions: newQuestions,
      view: 'default'
    });
  }

  render() {
    const {questions, data} = this.state;
    return (
      <Wrapper>
        <Header>Customer questions & answers</Header>
        <Search handleSearch={this.handleSearch} emptySearch={this.emptySearch} searchQuery={this.state.searchQuery}/>
        {this.state.view === 'default' ?
          <div>
            <Questions questions={questions}/>
            <SeeMoreQuestions onClick={e => this.handleQuestion()}>See more answered questions ({data.length - questions.length})</SeeMoreQuestions>
          </div> :
          <div>
            <Unordered>
              <List><Nav>All</Nav></List>
              <List><Nav>Product Information</Nav></List>
              <List selected={'qna'}><Nav>Customer Q&A's</Nav></List>
              <List><Nav>Customer Reviews</Nav></List>
            </Unordered>
            <FilterQuestion query={this.state.searchQuery} questions={questions}/>
          </div>
        }
      </Wrapper>
    );
  }
}

export default App;