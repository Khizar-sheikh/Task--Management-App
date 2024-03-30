// routes/tasksRoutes.js
const express = require("express");
const router = express.Router();
const {
  addTask,
  editTask,
  deleteTask,
  getAllTasks,
  getTaskById,
} = require("../controllers/tasksController");

// Route to add a new task
router.post("/", addTask);

// Route to edit an existing task
router.put("/:id", editTask);

// Route to delete an existing task
router.delete("/:id", deleteTask);

// Route to get all tasks with optional filtering
router.get("/", (req, res) => {
  const filter = req.query.filter; // Get filter parameter from query
  getAllTasks(req, res, filter); // Pass filter parameter to controller method
});

// Route to get a task by ID
router.get("/:id", getTaskById);

module.exports = router;
