'use strict';

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

// USER

// field	description
// name	full name of the user
// email	a unique, identifying email address
const User = db.define('user', {
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(455),
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'close')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: (page) => {
      if (page.title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        return page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        // Generates random 5 letter string
        return page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  }
});

module.exports = {
  db,
  Page,
  User
};
