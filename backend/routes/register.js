var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  router.post("/", function (req, res) {
    const { first_name, last_name, email } = req.body;
    // hash the password before storing into db
    const password = bcrypt.hashSync(req.body.password, 10);
    // check if the email already exists in the database
    db.query(`SELECT email from users;`)
      .then((data) => {
        const existingEmails = data.rows;
        for (const existingEmail of existingEmails) {
          // if the email exists in the database, throw an error
          if (existingEmail.email === email) {
            return res
              .status(400)
              .send({ message: "This email already exists" });
          }
        }
        // if the email does not exist in the database, insert the new info into the database
        // create user params with all the register info
        const queryParams = [first_name, last_name, email, password];
        db.query(
          `INSERT INTO users (first_name, last_name, email, password)
           VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email;`,
          queryParams
        )
          .then((data) => {
            console.log("data has been inserted", data.rows[0]);
            const id = data.rows[0].id;
            const first_name = data.rows[0].first_name;
            const last_name = data.rows[0].last_name;
            const email = data.rows[0].email;
            // save user information
            const user = { id, first_name, last_name, email };
            // save access token
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken, user});
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
