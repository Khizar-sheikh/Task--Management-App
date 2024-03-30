const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectsRoutes = require("./routes/projectsRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
connectDB();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use("/api/projects", projectsRoutes);

app.use("/api/tasks", tasksRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome To Task Management App");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
