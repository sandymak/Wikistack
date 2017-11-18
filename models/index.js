var Sequelize = require('sequelize');
var db = new Sequelize('postgress://localhost:5432/wikistack');

// USER

// field	description
// name	full name of the user
// email	a unique, identifying email address
const User = db.define('user', {
  name: {
    type: Sequelize.STRING(255)
  },
  email: {
    isEmail: true,
    type: Sequelize.STRING(255)
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING(255)
  },
  urlTitle: {
    type: Sequelize.STRING(255)
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('open', 'close')
  }
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};