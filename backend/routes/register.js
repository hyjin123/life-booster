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
        console.log("this is data rows:", data.rows[0])
        const existingEmails = data.rows;
        for (const existingEmail of existingEmails) {
          // if the email exists in the database, throw an error
          if (existingEmail.email === email) {
            return res.status(400).send({ message: "This email already exists" });
          }
        }
        // if the email does not exist in the database, insert the new info into the database
        // create user params with all the register info
        const params = [first_name, last_name, email, password];
        db.query(
          `INSERT INTO users (first_name, last_name, email, password)
           VALUES ($1, $2, $3, $4)`
        , params)
          .then(data => {
            
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          })
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