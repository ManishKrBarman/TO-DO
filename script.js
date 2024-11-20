document.addEventListener("DOMContentLoaded", () => {
    let todoInput = document.getElementById("todo-input");
    let addTaskBtn = document.getElementById("add-task-btn");
    let todoList = document.getElementById("todo-list");

    let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => renderTasks(task))

    todoInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTaskBtn.click();
    })

    addTaskBtn.addEventListener("click", () => {
        let taskText = todoInput.value.trim()
        if (taskText === "") return;

    let newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(newTask)
    saveTasks();
    renderTasks(newTask);
    todoInput.value = ""

    console.log(tasks);
    })
    function renderTasks(task) {
        let listItem = document.createElement("li");
        listItem.setAttribute("data-id", task.id);
        if (task.completed) listItem.classList.add("completed");
        listItem.innerHTML = `${task.text} <button class="delete-btn">Delete</button>`;
        listItem.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return
            task.completed = !task.completed;
            listItem.classList.toggle("completed");
            saveTasks();
        })

        listItem.querySelector(".delete-btn").addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        listItem.remove();
        saveTasks();
        });

        todoList.appendChild(listItem);
    }
    
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})
