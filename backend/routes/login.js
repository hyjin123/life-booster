const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (db) => {
  router.post("/", function (req, res) {
    // save login information to variables
    const email = req.body.email;
    const passwordInput = req.body.password;
    // make a query to compare if email or password is valid
    db.query(
      `SELECT id, first_name, last_name, email, password FROM users WHERE email = $1`,
      [email]
    )
      .then((data) => {
        console.log(data.rows[0]);
        const id = data.rows[0].id;
        const first_name = data.rows[0].first_name;
        const last_name = data.rows[0].last_name;
        const email = data.rows[0].email;
        const password = data.rows[0].password;
        // check if the email or password is valid and that it exists in the database
        if (!email || !password) {
          res.status(400).send({ message: "Invalid email or password" });
        } else if (bcrypt.compareSync(passwordInput, password)) {
          // if the password compare matches
          const user = { id, first_name, last_name };
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          res.json({ accessToken, user });
        } else {
          res.status(400).send({ message: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });

  return router;
};
