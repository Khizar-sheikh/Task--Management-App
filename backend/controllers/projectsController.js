const Project = require("../models/Project");

const addProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = new Project({ name });
    await project.save();
    res.json(project);
    console.log("Project Added");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ msg: "Project deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const searchProjects = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i"); // Case-insensitive search
    const projects = await Project.find({ name: regex });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addProject,
  editProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  searchProjects,
};
