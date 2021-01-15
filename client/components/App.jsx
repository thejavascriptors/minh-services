import React from 'react';
import Search from './Search.jsx';
import Questions from './Questions.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      questions: []
    };
  }

  componentDidMount() {
    axios('/api/questions')
      .then(data => {
        data = data.data.sort((a, b) => b.votes - a.votes);
        this.setState({
        data: data,
        questions: data.slice(0, 4)
      })})
      .catch(err => console.log(err));
  }


  render() {
    const {questions, data} = this.state;
    return (
      <div className='display'>
        <h2>Customer questions & answers</h2>
        <Search />
        <Questions questions={questions}/>
        <button className='seeQuests'>See more answered questions ({data.length})</button>
      </div>
    );
  }
}

export default App;