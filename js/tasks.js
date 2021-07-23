// VARIABLES

const taskContainer = document.querySelector(".task-container");
const taskInput = document.querySelector("#task-input");
const clearCompleted = document.querySelector("#clear-completed");
const itemsLeft = document.querySelector("#items-left");

const allOption = document.querySelector("#all-option");
const uncompletedOption = document.querySelector("#uncompleted-option");
const completedOption = document.querySelector("#completed-option");

let tasks = JSON.parse(localStorage.getItem("todo-manager:todos")) || [];

const Tasks = {
  create(info) {
    let newId = Math.floor(Math.random() * 1000);
    let hasRepeatedId = tasks.filter((task) => task.id == newId);

    while (hasRepeatedId.length >= 1) {
      newId = Math.floor(Math.random() * 1000);
      hasRepeatedId = tasks.filter((task) => task.id == newId);
      console.log("roletando");
    }

    const newTask = {
      id: newId,
      title: info,
      completed: false,
    };

    tasks.push(newTask);
    localStorage.setItem("todo-manager:todos", JSON.stringify(tasks));

    App.reload();
  },
  load(toLoad) {
    if (toLoad == "all") {
      tasks.forEach((task) => {
        const newTask = `
          <div class="task ${task.completed ? "completed" : ""}">
              <div class="left">
                  <button data-id="${
                    task.id
                  }" onclick="Tasks.check(this.dataset.id)" class="task-complete">
                      <img src="images/icon-check.svg"/>
                  </button>
                  <p>${task.title}</p>
              </div>
              <button data-id="${
                task.id
              }" onclick="Tasks.delete(this.dataset.id)" class="task-delete">
                  <img src="images/icon-cross.svg"/>
              </button>
          </div>
      `;

        taskContainer.innerHTML += newTask;
      });

      handleCheckTheme();
    }

    if (toLoad == "uncompleted") {
      tasks.forEach((task) => {
        if (task.completed == false) {
          const newTask = `
            <div class="task ${task.completed ? "completed" : ""}">
                <div class="left">
                    <button data-id="${
                      task.id
                    }" onclick="Tasks.check(this.dataset.id)" class="task-complete">
                        <img src="images/icon-check.svg"/>
                    </button>
                    <p>${task.title}</p>
                </div>
                <button data-id="${
                  task.id
                }" onclick="Tasks.delete(this.dataset.id)" class="task-delete">
                    <img src="images/icon-cross.svg"/>
                </button>
            </div>
        `;

          taskContainer.innerHTML += newTask;
        }
      });

      handleCheckTheme();
    }

    if (toLoad == "completed") {
      tasks.forEach((task) => {
        if (task.completed == true) {
          const newTask = `
                    <div class="task ${task.completed ? "completed" : ""}">
                        <div class="left">
                            <button data-id="${
                              task.id
                            }" onclick="Tasks.check(this.dataset.id)" class="task-complete">
                                <img src="images/icon-check.svg"/>
                            </button>
                            <p>${task.title}</p>
                        </div>
                        <button data-id="${
                          task.id
                        }" onclick="Tasks.delete(this.dataset.id)" class="task-delete">
                            <img src="images/icon-cross.svg"/>
                        </button>
                    </div>
                `;

          taskContainer.innerHTML += newTask;
        }
      });

      handleCheckTheme();
    }
  },
  clear() {
    taskContainer.innerHTML = "";
  },
  delete(id) {
    tasks = tasks.filter((task) => task.id != id);
    localStorage.setItem("todo-manager:todos", JSON.stringify(tasks));

    App.reload();
  },
  clearCompleted() {
    tasks = tasks.filter((task) => task.completed == false);
    localStorage.setItem("todo-manager:todos", JSON.stringify(tasks));

    App.reload();
  },
  updateRemaining() {
    const remaining = tasks.filter((task) => task.completed == false);
    itemsLeft.innerHTML = remaining.length;
  },
  check(id) {
    tasks.forEach((task) => {
      if (task.id == id) {
        if (task.completed) {
          task.completed = false;
        } else {
          task.completed = true;
        }
      }
    });

    localStorage.setItem("todo-manager:todos", JSON.stringify(tasks));

    App.reload();
  },
  setFilter(filter) {
    localStorage.setItem("filter", filter);

    App.reload();
  },
};

const App = {
  init() {
    const filter = localStorage.getItem("filter");
    if (filter == "") localStorage.setItem("filter", "all");
    if (filter == null) localStorage.setItem("filter", "all");
    if (filter == undefined) localStorage.setItem("filter", "all");
    
    handleFilter(filter);
    
    Tasks.clear();
    Tasks.updateRemaining();
    Tasks.load(filter);
  },
  reload() {
    const filter = localStorage.getItem("filter");
    if (filter == "") localStorage.setItem("filter", "all");
    if (filter == null) localStorage.setItem("filter", "all");
    if (filter == undefined) localStorage.setItem("filter", "all");
    
    Tasks.clear();
    Tasks.updateRemaining();
    Tasks.load(filter);
  },
};

App.init();

// HANDLERS

function handleCreateTask(value) {
  Tasks.create(value);
}

function handleFilter(filter) {
  allOption.classList.remove("active");
  uncompletedOption.classList.remove("active");
  completedOption.classList.remove("active");

  filter == null ? filter = 'all' : filter = filter;

  document.querySelector(`#${filter}-option`).classList.add("active");

  Tasks.setFilter(filter);
}

function handleCheckTheme() {
  const theme = localStorage.getItem("theme");
  if (theme == "") localStorage.setItem("theme", "light");

  if (theme == "dark") {
    document.body.classList.add("dark");
    themeTogglerIcon.src = "images/icon-sun.svg";

    document.querySelectorAll(".task .task-complete img").forEach((task) => {
      task.src = "images/icon-check.svg";
    });
    document.querySelectorAll(".task .task-delete img").forEach((task) => {
      task.src = "images/icon-cross.svg";
    });
  }

  if (theme == "light") {
    document.body.classList.remove("dark");
    themeTogglerIcon.src = "images/icon-moon.svg";

    document.querySelectorAll(".task .task-complete img").forEach((task) => {
      task.src = "images/icon-check-black.svg";
    });
    document.querySelectorAll(".task .task-delete img").forEach((task) => {
      task.src = "images/icon-cross-black.svg";
    });
  }
}

// EVENT LISTENERS

taskInput.addEventListener("keyup", ({ key }) => {
  if (key == "Enter")
    if (taskInput.value != "") {
      handleCreateTask(taskInput.value);
      taskInput.value = "";
    }
});

clearCompleted.addEventListener("click", () => {
  Tasks.clearCompleted();
});
