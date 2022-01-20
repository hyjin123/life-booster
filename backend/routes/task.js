const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', function(req, res) { 
    console.log(req.body);
    const taskName = req.body.taskName;
    const taskDetail = req.body.taskDetail;
    const taskStatus = req.body.taskStatus.toLowerCase();
    let taskPriority = null;
    // if the task priority is on, then assign it true
    if (req.body.taskPriority === "on") {
      taskPriority = true;
    } else {
      taskPriority = false;
    }
    console.log(taskStatus, taskPriority);
    db.query(`INSERT INTO tasks (user_id, name, description, type, date, status, high_priority)`)
  });

  return router;
}