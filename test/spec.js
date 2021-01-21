const assert = require('assert');
const chai = require('chai');
const axios = require('axios');
const expect = chai.expect;

// Integration Testing
describe('Database', () => {
  describe('API GET requests', () => {
    it('should have the length of 100', async () => {
      let questions;
      await axios('http://localhost:1337/api/questions')
        .then(res => questions = res.data)
        .catch(err => console.error(err));

      expect(questions.length).to.equal(100);
    });

    describe('API PATCH requests', () => {
      it('should get the question with id 1', async () => {
        let id;
        await axios.patch('http://localhost:1337/api/questions/:1/question', {
          data: 0
        })
          .then(res => id = res.data._id)
          .catch(err => console.error(err));

        expect(id).to.equal(1);
      });

      it('should increment vote by 1', async () => {
        let vote, question;
        await axios('http://localhost:1337/api/questions')
          .then(res => vote = res.data[1].votes)
          .catch(err => console.error(err));

        await axios.patch('http://localhost:1337/api/questions/:1/question', {
          data: 1
        })
          .then(res => question = res.data)
          .catch(err => console.error(err));

        expect(vote + 1).to.equal(question.votes);
      });

    });
  });
});

// Unit Testing

// it('should increase question length by 4')
// Get current question length
// Invoke handleQuestions to render more questions
// Question length should have increased by 4

// it('should filter searched words')
// Invoke handleSearch to filter out questions/answers
// Iterate through questions and answers
// Check if searched word is contained in div