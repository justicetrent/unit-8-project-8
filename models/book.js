const Sequelize = require('sequelize')
const Config = require('../config/config')
//the template of information that is required from the database, and must be present to analyze on the webpage. 
const Books = Config.define('book', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Don't leave field empty"
      }
    }
  },
  author: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Don't leave field empty"
      }
    }
  },
  genre: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
  }

});

module.exports = Books;