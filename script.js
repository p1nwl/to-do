const todosContent = document.getElementById("todo-content");
const addTodoButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todo-input");
const todoSelect = document.getElementById("todoSelect");
const todosArchive = document.getElementById("todo-archive");

let todos = new Map();
let archive = new Map();

if (localStorage.todos !== undefined) {
  todos = new Map(JSON.parse(localStorage.getItem("todos")));
  todos.forEach((todo) => {
    todo.date = new Date(todo.date);
  });

  renderTodoList();
}

if (localStorage.archive !== undefined) {
  archive = new Map(JSON.parse(localStorage.getItem("archive")));
  archive.forEach((todo) => {
    todo.date = new Date(todo.date);
  });
  renderArchive();
}

todoInput.addEventListener("keydown", (event) => {
  if (todoInput.value === "") return;

  if (event.key === "Enter") {
    addTodo(todoInput.value, todoSelect.value);
    todoInput.value = "";

    renderTodoList();
    renderArchive();
  }
});

addTodoButton.addEventListener("click", () => {
  if (todoInput.value === "") return;

  addTodo(todoInput.value, todoSelect.value);
  todoInput.value = "";

  renderTodoList();
  renderArchive();
});

todosContent.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const id = event.target.dataset.id;

  archiveTodo(id);
  renderTodoList();
  renderArchive();
});

todosArchive.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const id = event.target.dataset.id;

  unarchiveTodo(id);
  renderTodoList();
  renderArchive();
});

function addTodo(text, category) {
  const todo = {
    text,
    category,
    done: false,
    id: `${Math.random()}`,
    deleted: false,
    date: new Date(),
  };

  todos.set(todo.id, todo);
}

function deleteTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.deleted = true;
      todos = todos.filter((todo) => todo.deleted !== true);
    }
  });
}

function archiveTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.done = true;
      const currentDate = new Date();
      todo.date = new Date();

      archive.set(todo.id, todo);
      todos.delete(todo.id);
    }
  });
}

function unarchiveTodo(id) {
  archive.forEach((todo) => {
    if (todo.id === id) {
      todo.done = false;
      todo.date = "";

      todos.set(todo.id, todo);
      archive.delete(todo.id);
    }
  });
}

function renderTodoList() {
  todosContent.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const archiveButton = document.createElement("button");

    div.classList.add("todos");
    archiveButton.classList.add("todo-archive-button");
    archiveButton.textContent = "Done";
    archiveButton.setAttribute("data-id", todo.id);

    div.append(p);
    div.append(archiveButton);
    p.append(todo.text);
    todosContent.append(div);
  });

  toLocalStorageTodos();
  console.log(todos);
}

function renderArchive() {
  todosArchive.innerHTML = "";
  let sortedArchive = new Map();

  let monthName = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  archive.forEach((todo) => {
    let dayOfMonth = todo.date.getDate();
    let month = todo.date.getMonth();
    let year = todo.date.getFullYear();

    if (!sortedArchive.has(year)) {
      sortedArchive.set(year, new Map());
    }

    let yearMap = sortedArchive.get(year);

    if (!yearMap.has(month)) {
      yearMap.set(month, new Map());
    }

    let monthMap = yearMap.get(month);

    if (!monthMap.has(dayOfMonth)) {
      monthMap.set(dayOfMonth, []);
    }

    monthMap.get(dayOfMonth).push(todo);
  });

  sortedArchive.forEach((yearMap, year) => {
    yearMap.forEach((monthMap, month) => {
      monthMap.forEach((todos, dayOfMonth) => {
        let dateContainer = document.createElement("div");
        dateContainer.classList.add("todo-archive-date-container");
        dateContainer.innerHTML = `<h3 class="date-container-title">${dayOfMonth} ${monthName[month]}, ${year}</h3>`;

        todos.forEach((todo) => {
          const div = document.createElement("div");
          const p = document.createElement("p");
          const archiveButton = document.createElement("button");

          div.classList.add("todos");
          archiveButton.classList.add("todo-archive-button");
          archiveButton.textContent = "Return";
          archiveButton.setAttribute("data-id", todo.id);

          div.append(p);
          div.append(archiveButton);
          p.append(todo.text);
          dateContainer.append(div);
          todosArchive.append(dateContainer);
        });
      });
    });
  });

  toLocalStorageArchive();
  console.log(archive);
}

function toLocalStorageTodos() {
  const todosString = JSON.stringify(Array.from(todos.entries()));

  localStorage.setItem("todos", todosString);
}

function toLocalStorageArchive() {
  const archiveString = JSON.stringify(Array.from(archive.entries()));

  localStorage.setItem("archive", archiveString);
}
