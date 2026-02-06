var TaskState;
(function (TaskState) {
    TaskState[TaskState["Pending"] = 0] = "Pending";
    TaskState[TaskState["Completed"] = 1] = "Completed";
})(TaskState || (TaskState = {}));
var TodoItem = /** @class */ (function () {
    function TodoItem(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.state = TaskState.Pending;
    }
    TodoItem.prototype.toggleCompletion = function () {
        this.state =
            this.state === TaskState.Pending
                ? TaskState.Completed
                : TaskState.Pending;
    };
    TodoItem.prototype.isDone = function () {
        return this.state === TaskState.Completed;
    };
    return TodoItem;
}());
var todoForm = document.getElementById("todoForm");
var taskTitleInput = document.getElementById("taskInput");
var dueDatePicker = document.getElementById("dueDate");
var taskListContainer = document.getElementById("taskList");
var filterOptions = document.getElementsByName("filter");
var todoItems = [];
function getSelectedFilter() {
    for (var i = 0; i < filterOptions.length; i++) {
        if (filterOptions[i].checked) {
            return filterOptions[i].value;
        }
    }
    return "all";
}
function displayTasks(filterType) {
    if (filterType === void 0) { filterType = "all"; }
    taskListContainer.innerHTML = "";
    var visibleTasks = todoItems;
    if (filterType === "pending") {
        visibleTasks = todoItems.filter(function (item) { return !item.isDone(); });
    }
    else if (filterType === "completed") {
        visibleTasks = todoItems.filter(function (item) { return item.isDone(); });
    }
    visibleTasks
        .sort(function (a, b) {
        return new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime();
    })
        .forEach(function (item, index) {
        var listItem = document.createElement("li");
        var statusCheckbox = document.createElement("input");
        statusCheckbox.type = "checkbox";
        statusCheckbox.checked = item.isDone();
        var taskText = document.createElement("span");
        taskText.textContent = " ".concat(item.title, " (Due: ").concat(item.dueDate, ") ");
        taskText.style.textDecoration = item.isDone()
            ? "line-through"
            : "none";
        var removeButton = document.createElement("button");
        removeButton.textContent = "✖";
        statusCheckbox.addEventListener("change", function () {
            item.toggleCompletion();
            displayTasks(getSelectedFilter());
        });
        removeButton.addEventListener("click", function () {
            todoItems.splice(index, 1);
            displayTasks(getSelectedFilter());
        });
        listItem.appendChild(statusCheckbox);
        listItem.appendChild(taskText);
        listItem.appendChild(removeButton);
        taskListContainer.appendChild(listItem);
    });
}
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var taskTitle = taskTitleInput.value.trim();
    var selectedDueDate = dueDatePicker.value;
    if (taskTitle === "" || selectedDueDate === "")
        return;
    var newTodoItem = new TodoItem(taskTitle, selectedDueDate);
    todoItems.push(newTodoItem);
    taskTitleInput.value = "";
    dueDatePicker.value = "";
    displayTasks(getSelectedFilter());
});
filterOptions.forEach(function (option) {
    option.addEventListener("change", function () {
        displayTasks(option.value);
    });
});
