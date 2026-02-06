const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const filters = document.getElementsByName("filter");

let tasks = [];

/* Render tasks on screen */
function renderTasks(filterType = "all") {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filterType === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filterType === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .forEach((task, index) => {

            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            const span = document.createElement("span");
            span.textContent = ` ${task.name} (Due: ${task.dueDate}) `;
            span.style.textDecoration = task.completed ? "line-through" : "none";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "✖";

            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                renderTasks(getCurrentFilter());
            });

            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1);
                renderTasks(getCurrentFilter());
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
}

/* Get selected filter */
function getCurrentFilter() {
    for (let f of filters) {
        if (f.checked) return f.value;
    }
    return "all";
}

/* Add new task */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskName === "" || dueDate === "") return;

    tasks.push({
        name: taskName,
        dueDate: dueDate,
        completed: false
    });

    taskInput.value = "";
    dueDateInput.value = "";

    renderTasks(getCurrentFilter());
});

/* Filter change */
filters.forEach(filter => {
    filter.addEventListener("change", () => {
        renderTasks(filter.value);
    });
});
