const express = require('express');
const router = express.Router();
const nunjucks = require('nunjucks');
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

//GET /wiki/
router.get('/', (req, res, next) => {
  Page.findAll({})
    .then(pages => {
      res.render('index', {
        pages
      });
    })
    .catch(next);
});


// POST /wiki/
router.post('/', (req, res, next) => {
  User.findOrCreate({
      where: {
        name: req.body.name,
      }
    })
    .then(function (values) {
      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });
      return page.save()
        .then(function (page) {
          return page.setAuthor(user);
        });
    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
});

// GET /wiki/add
router.get('/add', (req, res, next) => {
  res.render('addpage');
});

// GET /wiki/:urlTitle
router.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function (page) {
      if (!page) {
        return next(new Error('That page was not found!"'));
      }
      res.render('wikipage', {
        // key ==> on nunjucks!
        // value ==> query data!
        page: page
      });
    })
    .catch(next);
});
