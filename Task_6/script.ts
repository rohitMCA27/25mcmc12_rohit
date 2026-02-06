enum TaskState {
    Pending,
    Completed
}

class TodoItem {
    title: string;
    dueDate: string;
    state: TaskState;

    constructor(title: string, dueDate: string) {
        this.title = title;
        this.dueDate = dueDate;
        this.state = TaskState.Pending;
    }

    toggleCompletion(): void {
        this.state =
            this.state === TaskState.Pending
                ? TaskState.Completed
                : TaskState.Pending;
    }

    isDone(): boolean {
        return this.state === TaskState.Completed;
    }
}

const todoForm = document.getElementById("todoForm") as HTMLFormElement;
const taskTitleInput = document.getElementById("taskInput") as HTMLInputElement;
const dueDatePicker = document.getElementById("dueDate") as HTMLInputElement;
const taskListContainer = document.getElementById("taskList") as HTMLUListElement;
const filterOptions = document.getElementsByName("filter") as NodeListOf<HTMLInputElement>;

let todoItems: TodoItem[] = [];

function getSelectedFilter(): string {
    for (let i = 0; i < filterOptions.length; i++) {
        if (filterOptions[i].checked) {
            return filterOptions[i].value;
        }
    }
    return "all";
}

function displayTasks(filterType: string = "all"): void {
    taskListContainer.innerHTML = "";

    let visibleTasks: TodoItem[] = todoItems;

    if (filterType === "pending") {
        visibleTasks = todoItems.filter(item => !item.isDone());
    } else if (filterType === "completed") {
        visibleTasks = todoItems.filter(item => item.isDone());
    }

    visibleTasks
        .sort(
            (a, b) =>
                new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime()
        )
        .forEach((item, index) => {
            const listItem = document.createElement("li");

            const statusCheckbox = document.createElement("input");
            statusCheckbox.type = "checkbox";
            statusCheckbox.checked = item.isDone();

            const taskText = document.createElement("span");
            taskText.textContent = ` ${item.title} (Due: ${item.dueDate}) `;
            taskText.style.textDecoration = item.isDone()
                ? "line-through"
                : "none";

            const removeButton = document.createElement("button");
            removeButton.textContent = "✖";

            statusCheckbox.addEventListener("change", () => {
                item.toggleCompletion();
                displayTasks(getSelectedFilter());
            });

            removeButton.addEventListener("click", () => {
                todoItems.splice(index, 1);
                displayTasks(getSelectedFilter());
            });

            listItem.appendChild(statusCheckbox);
            listItem.appendChild(taskText);
            listItem.appendChild(removeButton);

            taskListContainer.appendChild(listItem);
        });
}

todoForm.addEventListener("submit", (event: Event): void => {
    event.preventDefault();

    const taskTitle: string = taskTitleInput.value.trim();
    const selectedDueDate: string = dueDatePicker.value;

    if (taskTitle === "" || selectedDueDate === "") return;

    const newTodoItem = new TodoItem(taskTitle, selectedDueDate);
    todoItems.push(newTodoItem);

    taskTitleInput.value = "";
    dueDatePicker.value = "";

    displayTasks(getSelectedFilter());
});

filterOptions.forEach(option => {
    option.addEventListener("change", () => {
        displayTasks(option.value);
    });
});
