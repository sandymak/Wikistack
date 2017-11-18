'use strict';

const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');

const models = require('./models/index');
const db = models.db;
const Page = models.Page;
const User = models.User;

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));
nunjucks.configure('views', {
  noCache: true
});
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(bodyParser.urlencoded({
  extend: true
}));
app.use(bodyParser.json());
// serving files publicly
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res, next) => {
  res.send("I'm listening");
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  res.send(err);
});

// APP LISTENER w/ DB SYNC
Page.sync({
    force: true
  })
  .then(() => {
    User.sync({
      force: true
    })
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on 3000!'));
  })
  .catch(console.error);

module.exports = app;
