var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
  router.post('/', function(req, res) {
    const { first_name, last_name, email } = req.body;
    // hash the password before storing into db
    const password = bcrypt.hashSync(req.body.password, 10);
    // check if the email already exists in the database
    db.query(
      `SELECT email from users;`
    )
      .then((data) => {

      })
      .catch((err) => {
        res
          .status(500)
          .json({error: err.message });
      })
      
    console.log(password);
  });

  return router;
}