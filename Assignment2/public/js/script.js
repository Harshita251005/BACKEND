document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // 🌓 
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

    // ➕ 
    addTaskBtn.addEventListener("click", async () => {
        const taskTitle = taskInput.value.trim();
        if (!taskTitle) return alert("Task cannot be empty!");

        try {
            const response = await fetch("/add-task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: taskTitle })
            });

            if (!response.ok) throw new Error("Failed to add task");

            const newTask = await response.json();
            appendTaskToDOM(newTask);
            taskInput.value = "";
        } catch (error) {
            console.error("Error adding task:", error);
        }
    });

    // ✔️ 
    taskList.addEventListener("change", async (e) => {
        if (e.target.classList.contains("task-checkbox")) {
            const taskId = e.target.closest("li").dataset.id;

            try {
                const response = await fetch(`/toggle-task?id=${taskId}`, { method: "POST" });
                if (!response.ok) throw new Error("Failed to toggle task");

                e.target.nextElementSibling.classList.toggle("completed");
            } catch (error) {
                console.error("Error toggling task:", error);
            }
        }
    });

    // ✏️ 
    taskList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const taskItem = e.target.closest("li");
            const taskId = taskItem.dataset.id;
            const taskText = taskItem.querySelector(".task-text");

            const newTitle = prompt("Edit Task:", taskText.textContent);
            if (!newTitle) return;

            try {
                const response = await fetch("/edit-task", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: taskId, title: newTitle })
                });

                if (!response.ok) throw new Error("Failed to edit task");

                taskText.textContent = newTitle;
            } catch (error) {
                console.error("Error editing task:", error);
            }
        }
    });

    // 🗑 
    taskList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const taskItem = e.target.closest("li");
            const taskId = taskItem.dataset.id;

            try {
                const response = await fetch(`/delete-task?id=${taskId}`, { method: "DELETE" });
                if (!response.ok) throw new Error("Failed to delete task");

                taskItem.remove();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    });

    // 📌 
    function appendTaskToDOM(task) {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
                <span class="task-text ${task.completed ? "completed" : ""}">${task.title}</span>
            </div>
            <div class="task-buttons">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    }
});
