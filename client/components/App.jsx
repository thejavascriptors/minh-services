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
  visibility: ${props => props.search.length > 0 ? 'visible' : 'hidden'};
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
      searchQuery: '',
      view: 'default'
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
    let data = [...this.state.data];
    let filtered = data.filter(question => question.question.includes(val));

      this.setState({
        searchQuery: val,
        questions: filtered,
      });

      let para = document.querySelectorAll('.question');
      let regex = RegExp(val, 'gi');
      let replace = `<span class="highlight">${val}</span>`;
      for (let i = 0; i < para.length; i++) {
        let newHTML = para[i].textContent.replace(regex, replace);
        para[i].innerHTML = newHTML;
      }
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

  renderView() {

  }

  render() {
    const {questions, data} = this.state;
    // console.log('Start');
    return (
      <div>
        {this.state.view === 'default' ?
          <Wrapper>
            <Header>Customer questions & answers</Header>
            <Search handleSearch={this.handleSearch} emptySearch={this.emptySearch} searchQuery={this.state.searchQuery}/>
            <Questions questions={questions}/>
            <SeeMoreQuestions search={this.state.searchQuery} onClick={e => this.handleQuestion()}>See more answered questions ({data.length - questions.length})</SeeMoreQuestions>
          </Wrapper> :
          <div>

          </div>
        }
      </div>
    );
  }
}

export default App;