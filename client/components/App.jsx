import React from 'react';
import Search from './Search.jsx';
import Questions from './Questions.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questRend: []
    };
  }

  componentDidMount() {
    axios('/api/questions')
      .then(data => {
        data = data.data.sort((a, b) => b.votes - a.votes);
        this.setState({
        questions: data,
        questRend: data.slice(0, 4)
      })})
      .catch(err => console.log(err));
  }


  render() {
    const {questions, questRend} = this.state;
    return (
      <div>
        <h1>Customer questions & answers</h1>
        <Search />
        <Questions questions={questRend}/>
        <button>See more answered questions ({questions.length})</button>
      </div>
    );
  }
}

export default App;