const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(express.json());
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//create a new user
apiRouter.post('/auth/create', async (req, res) => {
  if(await findUser('username', req.body.username)){
    res.status(409).send({msg: "Existing user"});
  } else {
    const user = await createServerModuleRunner(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({username: user.username})
  }
})

apiRouter.post('/auth/login', async(req, res) => {
  const user = await findUser('username', req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)){
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({username : user.username});
      return; // this return statement stops the code from sending two response statements
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function verifyAuth(req, res, next) {
  const user = await findUser("token", req.cookeies[authCookieName]);
  if (user){
    next();
  } else{
    res.status(401).send({ msg: "unauthorized"});
  }
}

async function createUser(username, password){
  const paswordHashcode = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHashcode,
    token: uuid.v4(),
  };

  users.push(user);
  return user;
}

async function findUser(field, value){
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

async function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () =>{
  console.log('listening on port ${port}');
});