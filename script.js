document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `
        <span onclick="toggleDone(this)">${taskText}</span>
        <button class="edit" onclick="editTask(this)">✏️</button>
        <button class="delete" onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks();
}

function toggleDone(element) {
    element.parentElement.classList.toggle("done");
    saveTasks();
}

function editTask(button) {
    let newText = prompt("Edit your task:", button.previousElementSibling.innerText);
    if (newText !== null && newText.trim() !== "") {
        button.previousElementSibling.innerText = newText.trim();
        saveTasks();
    }
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            done: li.classList.contains("done")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let taskList = document.getElementById("taskList");
        JSON.parse(savedTasks).forEach(task => {
            let li = document.createElement("li");
            li.className = task.done ? "done" : "";
            li.innerHTML = `
                <span onclick="toggleDone(this)">${task.text}</span>
                <button class="edit" onclick="editTask(this)">✏️</button>
                <button class="delete" onclick="deleteTask(this)">❌</button>
            `;
            taskList.appendChild(li);
        });
    }
}
