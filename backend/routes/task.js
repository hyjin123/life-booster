const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', function(req, res) { 
    console.log(req.body);
    const taskName = req.body.taskName;
    const takeDetail = req.body.taskDetail;
    db.query(`INSERT INTO tasks (user_id, name, description, type, date, status, high_priority)`)
  });

  return router;
}