const db = require('./index');
const faker = require('faker');
const Sequelize = require('sequelize');
const { createObjectCsvWriter } = require('csv-writer');
const { performance } = require('perf_hooks');
const {
  Items,
  Users,
  Questions,
  Answers
} = require('./Model');

// const Promise = require('bluebird');
// const { Pool } = require('pg');

// let pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'postgres',
// });

// pool = Promise.promisifyAll(pool);

// pool.connectAsync()
//   .catch((err) => { console.error(err); });

const seed = async () => {

  let start = performance.now();

  await Answers.drop();
  await Questions.drop();
  await Users.drop();
  await Items.drop();
  await Items.sync();
  await Users.sync();
  await Questions.sync();
  await Answers.sync();

  const createItemsObjectArray = async () => {
    var list = [];

    var min = 1;
    var max = 1000000;

    // Will loop through process once
    for (var j = 0; j < 1; j++) {

      // Defines rules for ItemsCsvWriter
      var ItemsCsvWriter = createObjectCsvWriter({
        path: `./database/CSVs/items${j}.csv`,
        header: [
          { id: 'id', title: 'id' },
          { id: 'name', title: 'name' },
        ],
      });

      // Creates list of 1,000,000 records
      for (var i = min; i <= max; i++) {
        list.push({
          id: i,
          name: faker.random.words(),
        });
      }
      // Writes list of records to a CSV
      await ItemsCsvWriter.writeRecords(list)
        .catch((err) => { console.error(err) })

      // Copies CSV file to DB
      db.query(`COPY items ("id", "name") FROM '/home/robeusanio11/minh-services/database/CSVs/items${j}.csv' DELIMITER ',' CSV HEADER;`)
        .catch((err) => {
          console.error('SECOND CATCH:', err);
        })

      // Prepares min/max/list for next 1,000,000 records
      min = (max + 1);
      max += 1000000;
      list = [];

      console.log('Iteration ', j, ' of items completed');
    }
  };

  const createUsersObjectArray = async () => {
    let list = [];

    // Defines rules for UsersCsvWriter
    const UsersCsvWriter = createObjectCsvWriter({
      path: './database/CSVs/users0.csv',
      header: [
        { id: 'id', title: 'id' },
        { id: 'username', title: 'username' },
      ],
    });

    // Creates 1,000,000 Records
    for (let i = 1; i <= 1000000; i++) {
      list.push({
        id: i,
        username: faker.internet.userName(),
      });
    }

    // Writes list of records to CSV file
    await UsersCsvWriter.writeRecords(list)
      .catch((err) => { console.error(err) })

    // Copies CSV file to DB
    await db.query(`COPY users ("id", "username") FROM '/home/robeusanio11/minh-services/database/CSVs/users0.csv' DELIMITER ',' CSV HEADER;`)
      .catch((err) => { console.error(err) })

    list = [];
  }


  const createQuestionsObjectArray = async () => {
    var list = [];

    var min = 1;
    var max = 1000000;

    // Will create 5,000,000 total records
    for (var j = 0; j < 5; j++) {

      // Defines rules for QuestionsCsvWriter
      const QuestionsCsvWriter = createObjectCsvWriter({
        path: `./database/CSVs/questions${j}.csv`,
        header: [
          { id: 'id', title: 'id' },
          { id: 'itemId', title: 'itemId' },
          { id: 'userId', title: 'userId' },
          { id: 'question', title: 'question' },
          { id: 'rating', title: 'rating' },
          { id: 'createdAt', title: 'createdAt' },
        ],
      });

      // Creates 1,000,000 records
      for (var i = min; i <= max; i++) {
        list.push({
          id: i,
          itemId: (Math.floor(faker.random.number() % 1000000) + 1),
          userId: (Math.floor(faker.random.number() % 1000000) + 1),
          question: faker.lorem.paragraph(2),
          rating: faker.random.number(),
          createdAt: faker.date.past().toString(),
        });
      }

      // Writes list of records to CSV file
      await QuestionsCsvWriter.writeRecords(list)
        .catch((err) => { console.error(err) })

      // Copies CSV file to DB
      await db.query(`COPY questions("id", "itemId", "userId", "question", "rating", "createdAt") FROM '/home/robeusanio11/minh-services/database/CSVs/questions${j}.csv' DELIMITER ',' CSV HEADER;`)
        .catch((err) => { console.error(err) })

      // Prepares min/max/list for next 1,000,000 records
      min = (max + 1);
      max += 1000000;
      list = [];

      console.log('Iteration ', j, ' of questions completed');
    }
  }

  const createAnswersObjectArray = async () => {
    var list = [];

    var min = 1;
    var max = 1000000;

    // Will create 50,000,000 records
    for (var j = 0; j < 50; j++) {

      // Defines rules for AnswersCsvWriter
      var AnswersCsvWriter = createObjectCsvWriter({
        path: `./database/CSVs/answers${j}.csv`,
        header: [
          { id: 'id', title: 'id' },
          { id: 'questionId', title: 'questionId' },
          { id: 'userId', title: 'userId' },
          { id: 'answer', title: 'answer' },
          { id: 'createdAt', title: 'createdAt' },
          { id: 'rating', title: 'rating' },
        ],
      });

      // Creates 1,000,000 Records
      for (var i = min; i <= max; i++) {
        list.push({
          id: i,
          questionId: (Math.floor(faker.random.number() % 5000000) + 1),
          userId: (Math.floor(faker.random.number() % 1000000) + 1),
          answer: faker.lorem.paragraph(1),
          createdAt: faker.date.past().toString(),
          rating: faker.random.number(),
        });
      }

      // Writes list of records to CSV file
      await AnswersCsvWriter.writeRecords(list)
        .catch((err) => { console.error(err) })

      // Copies CSV file to DB
      await db.query(`COPY answers ("id", "questionId", "userId", "answer", "createdAt", "rating") FROM '/home/robeusanio11/minh-services/database/CSVs/answers${j}.csv' DELIMITER ',' CSV HEADER;`)
        .catch((err) => { console.error(err) })

      // Prepares min/max/list for next iteration
      min = (max + 1);
      max += 1000000;
      list = [];

      console.log('Iteration ', j, ' of answers completed');
    }
  }

  await createItemsObjectArray();
  await createUsersObjectArray();
  await createQuestionsObjectArray();
  await createAnswersObjectArray();

  let end = performance.now()
  console.log(`it took ${Math.floor((end - start)/1000)} seconds to create and seed all data`);
}

seed();
