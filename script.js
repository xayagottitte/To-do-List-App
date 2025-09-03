
//task container
let tasksContainer = [];

const taskList = document.getElementById("taskList");

// Add task to container
function addTask(task, date) {
  tasksContainer.push({
    id: Date.now(),
    task: task,
    date: date,
    completed: false
  });
}

// Render all tasks
function renderAllTasks() {
  taskList.innerHTML = ""; // clear old list
  tasksContainer.forEach(task => renderTask(task));
}

// Render a single task card
function renderTask(taskObj) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.setAttribute("data-id", taskObj.id);

  // Compute Status
  let status = "";
  let inputDateObj = new Date(taskObj.date);

  if (isNaN(inputDateObj.getTime())) {
    status = "Invalid Date";
  } else {
    let today = new Date();
    today.setHours(0, 0, 0, 0); // normalize time

    if (taskObj.completed) {
      status = "Completed";
    } else if (inputDateObj.getTime() === today.getTime()) {
      status = "Due Today";
    } else if (inputDateObj < today) {
      status = "Overdue";
    } else {
      status = "Upcoming";
    }
  }

  //Build card HTML 
  card.innerHTML = `
    <div class="task-title">
      <h2><strong>Task:</strong> ${taskObj.task}</h2>
    </div>
    <div class="task-date">
      <h2><strong>Date:</strong> ${taskObj.date}</h2>
    </div>
    <div class="task-status">
      <h2><strong>Status:</strong> ${status}</h2>
    </div>
    <div class="task-actions">
      <button class="btn-complete" data-id="${taskObj.id}">
        ${taskObj.completed ? "Undo" : "Complete"}
      </button>
      <button class="btn-delete" data-id="${taskObj.id}">Delete</button>
    </div>
  `;

  taskList.appendChild(card);
}

//Add Task Button
document.getElementById("addTaskButton").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput").value.trim();
  const dateInput = document.getElementById("dateInput").value;

  if (!taskInput || !dateInput) {
    alert("Enter both Task & Date or check your Date format");
    return;
  }

  addTask(taskInput, dateInput);
  renderAllTasks();

  // Clear inputs
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
});

//Handle Delete & Complete with Event Delegation
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.getAttribute("data-id");
    tasksContainer = tasksContainer.filter(task => task.id != id);
    renderAllTasks();
  }

  if (e.target.classList.contains("btn-complete")) {
    let id = e.target.getAttribute("data-id");
    tasksContainer = tasksContainer.map(task => {
      if (task.id == id) {
        return { ...task, completed: !task.completed }; // toggle complete
      }
      return task;
    });
    renderAllTasks();
  }
});