const Task = require("../models/Task");

// Controller method to add a new task
const addTask = async (req, res) => {
  try {
    const { title, description, date, project, important } = req.body;
    const task = new Task({ title, description, date, project, important });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller method to edit an existing task
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, project, important } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, date, project, important },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller method to delete an existing task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller method to get all tasks
const getAllTasks = async (req, res) => {
  try {
    let tasks;
    let filter = req.query.filter;

    // Set default filter to 'all' if not provided or invalid
    if (
      !filter ||
      !["all", "today", "next7", "important", "past7"].includes(filter)
    ) {
      filter = "all";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 for comparison

    if (filter === "today") {
      // Filter tasks for today
      tasks = await Task.find({
        dueDate: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Add 1 day to today
        },
      });
    } else if (filter === "next7") {
      // Filter tasks for the next 7 days
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days to today
      tasks = await Task.find({ dueDate: { $gte: today, $lt: nextWeek } });
    } else if (filter === "important") {
      // Filter important tasks
      tasks = await Task.find({ important: true });
    } else if (filter === "past7") {
      // Filter tasks for the past 7 days
      const pastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days from today
      tasks = await Task.find({ dueDate: { $gte: pastWeek, $lt: today } });
    } else {
      // Get all tasks
      tasks = await Task.find();
    }

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller method to get a task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  getAllTasks,
  getTaskById,
};
