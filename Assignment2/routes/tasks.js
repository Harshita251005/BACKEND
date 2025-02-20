const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const tasksFile = path.join(__dirname, "tasks.json");

const getTasks = () => {
    try {
        return JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
    } catch (error) {
        return [];
    }
};


const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

// 📌 
router.get("/tasks", (req, res) => {
    res.json(getTasks());
});

// 📌 
router.post("/add-task", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Task title required" });

    const tasks = getTasks();
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
    };

    tasks.push(newTask);
    saveTasks(tasks);
    res.json(newTask);
});

// 📌 
router.post("/toggle-task", (req, res) => {
    const taskId = parseInt(req.query.id);
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === taskId);

    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = !task.completed;
    saveTasks(tasks);
    res.json(task);
});

// 📌 
router.post("/edit-task", (req, res) => {
    const { id, title } = req.body;
    const taskId = parseInt(id);
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === taskId);

    if (!task) return res.status(404).json({ error: "Task not found" });

    task.title = title;
    saveTasks(tasks);
    res.json(task);
});

// 📌
router.delete("/delete-task", (req, res) => {
    const taskId = parseInt(req.query.id);
    let tasks = getTasks();
    tasks = tasks.filter((t) => t.id !== taskId);
    saveTasks(tasks);
    res.json({ success: true });
});

router.get("/", (req, res) => {
    res.render("index", { tasks: getTasks() });
});

module.exports = router;
