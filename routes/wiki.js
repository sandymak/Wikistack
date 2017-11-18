const express = require('express');
const router = express.Router();

const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

//wiki/
router.get('/', (req, res, next) => {
  res.redirect('/');
});


//wiki/
router.post('/', (req, res, next) => {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  page.save();
  res.send(req.body);
});

//wiki/
router.get('/add', (req, res, next) => {
  res.render('addpage');
});
