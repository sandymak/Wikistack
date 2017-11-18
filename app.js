'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

app.use(morgan('dev'));
nunjucks.configure('views', {
  noCache: true
});
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(express.static(__dirname + '/public'));
// CANNOT GET express.static to work!
app.use(bodyParser.urlencoded({
  extend: true
}));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send("I am listening");
});

app.listen(3000, () => console.log('listening on 3000!'));
