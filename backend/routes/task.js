const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", function (req, res) {
    const userId = req.body.userId;
    const date = req.body.date;
    const taskName = req.body.taskName;
    const taskDetail = req.body.taskDetail;
    const taskStatus = req.body.taskStatus;
    const taskType = req.body.taskType;
    console.log(userId, date, taskStatus);
    let taskPriority = null;
    // if the task priority is on, then assign it true
    if (req.body.taskPriority === "on") {
      taskPriority = true;
    } else {
      taskPriority = false;
    }
    console.log(taskStatus, taskPriority);
    const task = [
      userId,
      taskName,
      taskDetail,
      taskType,
      date,
      taskStatus,
      taskPriority
    ];
    db.query(
      `INSERT INTO tasks (user_id, name, description, type, date, status, high_priority) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING name;`,
      task
    )
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => console.log(err));
  });

  return router;
};
