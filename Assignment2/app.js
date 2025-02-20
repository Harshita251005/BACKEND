const express = require("express");
const cors = require("cors");
const path = require("path");
const tasksRouter = require("./routes/tasks");
const logger = require("./middleware/logger");
const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));
app.use(tasksRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🚀 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
