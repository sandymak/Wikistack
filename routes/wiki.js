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
  var page = Page.build(req.body);
  page.save()
    .then(function (savedPage) {
      res.redirect(savedPage.route);
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
        title: page.title,
        content: page.content
      });
    })
    .catch(next);
});
