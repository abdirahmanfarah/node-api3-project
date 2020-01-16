const express = require('express');

const userRouter = require('./users/userRouter.js');

const postRouter = require('./posts/postRouter.js');

const server = express();

//Parses Json from the body
server.use(express.json());


server.use(logger);
// server.use(validateUserId);

server.use('/api/users', userRouter, postRouter);
server.use('/api/users/:id/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware


function logger(req, res, next) {
  const{ method, originalUrl } = req;

  console.log(`${new Date().toISOString()} to ${method} to ${originalUrl}`);

  next();
}

module.exports = server;
