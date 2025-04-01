//npm instal both in our root directory and in your service directory because there's two programs. a front end program and a backend program.
// backend runs in Virginia. frontend program runs in Virginia
//front end is in the root and backend is in services

const{MongoClient} = require('mongodb');
const config = require('./dbConfig.json');//initializes a variable to config and pulls in stuff from the dbConfig.json which we dont' have
// we need to make our own dbConfig.json. you will have to add your own credentials. the same credentials for your service and simon. 
//use the mongo file you create during the excercizes

//require syntaxfrom a module that you created you export out the things you want to be avaiable outside of the module and if you want to
//bring in someone else's code, you use the require syntax
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('higherOrLower');
const userCollection = db.collection('user');
const currentScoreCollection = db.collection('currentScore');
const scoreCollection = db.collection('score');
const highScoreCollection = db.collection('highScore');


(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connected to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

  function getUser(username) {
    return userCollection.findOne({ username: username });
  }

  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function addUser(user) {
    await userCollection.insertOne(user);
  }

  async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
  }

  async function addCurrentScore(name, score) {
    const query = { name: name };  // Find user by name
    const update = {  score: score  };  // Update score only if it's higher
    const options = { upsert: true };  // Insert a new record if one doesn't exist

    await highScoreCollection.updateOne(query, update, options);
  }

  function getCurrentScore() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray().then(results => results.reverse());
  }

  async function addScore(score) {
    return scoreCollection.insertOne(score);
  }

  function getScores() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray().then(results => results.reverse());
  }

  async function addOrUpdateHighScore(name, score) {
    const query = { name: name };  // Find user by name
    const update = { $max: { score: score } };  // Update score only if it's higher
    const options = { upsert: true };  // Insert a new record if one doesn't exist

    await highScoreCollection.updateOne(query, update, options);
    }

  function getHighScores() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
      sort: { score: -1 },
      limit: 10,
    };
    const cursor = highScoreCollection.find(query, options);
    return cursor.toArray();
  }

  module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addScore,
    getScores,
    addOrUpdateHighScore,
    getHighScores,
  };
  