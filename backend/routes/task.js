const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/all", function (req, res) {
    // save the query into a date variable, 2021-01-20
    const fullDate = req.query.date;
    const date = new Date(fullDate);
    const userId = req.query.userId;
    const queryParams = [fullDate, userId];
    // retrive all tasks from this date from the db, NEED TO SET THE USERID AS WELL OR ELSE ALL TASK WILL BE HERE
    db.query(`SELECT * FROM tasks WHERE date = $1 AND user_id = $2`, queryParams)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => console.log(err))
  });

  router.get("/uncompleted", function (req, res) {
  
  });

  router.get("/in-progress", function (req, res) {
  
  });

  router.get("/completed", function (req, res) {
  
  });

  router.post("/add", function (req, res) {
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
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
      task
    )
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => console.log(err));
  });
  
  router.post("/delete", function (req, res) {
    const taskId = req.body.id;
    // make a query to remove the task from the task table (database)
    db.query(`DELETE FROM tasks WHERE id = $1 RETURNING id;`, [taskId])
      .then(data => {
        res.json(data.rows[0])
      })
      .catch(err => console.log(err))
  });

  router.post("/edit", function (req, res) {
    const taskId = req.body.id;
    const taskType = req.body.taskType;
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const taskStatus = req.body.taskStatus;
    const queryParams = [taskName, taskDescription, taskType, taskStatus, taskId];
    // make a query to edit the task based on new information
    db.query(`
    UPDATE tasks
    SET name = $1, description = $2, type = $3, status = $4
    WHERE id = $5
    RETURNING id, name;
    `, queryParams)
      .then(data => {
        res.json(data.rows[0])
      })
      .catch(err => console.log(err))
  });

  return router;
};
