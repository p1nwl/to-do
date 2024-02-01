const todosContent = document.getElementById("todo-content");
const addTodoButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todo-input");
const todoSelect = document.getElementById("todoSelect");
const todosArchive = document.getElementById("todo-archive");

let todos = new Map();
let archive = new Map();

if (localStorage.todos !== undefined) {
  todos = new Map(JSON.parse(localStorage.getItem("todos")));

  renderTodoList();
}

if (localStorage.archive !== undefined) {
  archive = new Map(JSON.parse(localStorage.getItem("archive")));

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
  };

  todos.set(todo.id, todo);
}

function deleteTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.deleted = true;
      todos = todos.filter(todo => todo.deleted !== true)
    }
  });
}

function archiveTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.done = true;
      archive.set(todo.id, todo);
      todos.delete(todo.id)
    }
  });
}

function unarchiveTodo(id) {
  archive.forEach((todo) => {
    if (todo.id === id) {
      todo.done = false;
      todos.set(todo.id, todo);
      archive.delete(todo.id)
    }
  });
}

function renderTodoList() {
  todosContent.innerHTML = "";

  todos.forEach((element) => {

    let div = document.createElement("div");
    let p = document.createElement("p");
    let archiveButton = document.createElement("button");

    div.classList.add("todos");
    archiveButton.classList.add("todo-archive-button");

    archiveButton.setAttribute("data-id", element.id);

    div.append(p);
    div.append(archiveButton);
    p.append(element.text);
    
    if (element.done) {
      archiveButton.textContent = "Return";
      todosArchive.append(div);
    } else {
      archiveButton.textContent = "Done";
      todosContent.append(div);
    }
  });

  toLocalStorageTodos();
}

function renderArchive() {
  todosArchive.innerHTML = "";

  archive.forEach((element) => {

    let div = document.createElement("div");
    let p = document.createElement("p");
    let archiveButton = document.createElement("button");

    div.classList.add("todos");
    archiveButton.classList.add("todo-archive-button");

    archiveButton.setAttribute("data-id", element.id);

    div.append(p);
    div.append(archiveButton);
    p.append(element.text);
    
    if (element.done) {
      archiveButton.textContent = "Return";
      todosArchive.append(div);
    } else {
      archiveButton.textContent = "Done";
      todosContent.append(div);
    }
  });

  toLocalStorageArchive();
}


function toLocalStorageTodos() {
  const todosString = JSON.stringify(Array.from(todos.entries()));

  localStorage.setItem("todos", todosString);
}

function toLocalStorageArchive() {
  const archiveString = JSON.stringify(Array.from(archive.entries()));

  localStorage.setItem("archive", archiveString);
}
