// routes/projectsRoutes.js
const express = require("express");
const router = express.Router();
const {
  addProject,
  editProject,
  deleteProject,
  getAllProjects,
  getProjectById,
} = require("../controllers/projectsController");

// Route to add a new project
router.post("/", (req, res) => {
  console.log("Received project data:", req.body); // Log received project data
  addProject(req, res);
});

// Route to edit an existing project
router.put("/:id", (req, res) => {
  console.log("Received project data:", req.body); // Log received project data
  editProject(req, res);
});

// Route to delete an existing project
router.delete("/:id", deleteProject);

// Route to get all projects
router.get("/", getAllProjects);

// Route to get a project by ID
router.get("/:id", getProjectById);

module.exports = router;
