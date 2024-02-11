const todosContent = document.getElementById("todo-content");
const todosArchive = document.getElementById("todo-archive");
const todoInput = document.getElementById("todo-input");
const todoSelect = document.getElementById("todoSelect");
const todoForm = document.getElementById("todoForm");

let todos = new Map();
let archive = new Map();

const MONTH_NAME = {
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

initTodos();
initArchive();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addTodo(todoInput.value, todoSelect.value);
  todoInput.value = "";

  renderTodoList();
  renderArchive();
  toLocalStorageTodos();
  toLocalStorageArchive();
});

function addTodo(text, category) {
  const todo = {
    text,
    category,
    done: false,
    id: crypto.randomUUID(),
    deleted: false,
    date: new Date(),
  };

  todos.set(todo.id, todo);
}

function createTodosHTML(todos, dateContainer) {
  todos.forEach((todo) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const archiveButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const buttonContainer = document.createElement("div");

    div.classList.add("todos");
    archiveButton.classList.add("todo-archive-button");
    deleteButton.classList.add("todo-delete-button");
    buttonContainer.classList.add("button-container");
    p.classList.add("todo-text");

    archiveButton.setAttribute("data-id", todo.id);
    archiveButton.addEventListener("click", () => {
      if (todo.done) {
        unarchiveTodo(todo.id);
      } else {
        archiveTodo(todo.id);
      }
      renderTodoList();
      renderArchive();
      toLocalStorageTodos();
      toLocalStorageArchive();
    });
    deleteButton.setAttribute("data-id", todo.id);
    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
      renderTodoList();
      renderArchive();
      toLocalStorageTodos();
      toLocalStorageArchive();
    });

    div.append(p);
    p.textContent = todo.text;

    if (todo.done) {
      todosArchive.append(dateContainer);
      dateContainer.append(div);
      div.append(archiveButton);

      archiveButton.textContent = "Return";
    } else {
      todosContent.append(div);
      div.append(buttonContainer);
      buttonContainer.append(archiveButton, deleteButton);

      deleteButton.textContent = "Delete";
      archiveButton.textContent = "Done";
    }
  });
}

function deleteTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.deleted = true;
      const deletedTodo = Array.from(todos.entries()).filter(
        ([, value]) => !value.deleted
      );
      todos = new Map(deletedTodo);
    }
  });
}

function archiveTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.done = true;
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

function initTodos() {
  try {
    if (localStorage.todos !== undefined) {
      todos = new Map(JSON.parse(localStorage.getItem("todos")));
      todos.forEach((todo) => {
        todo.date = new Date(todo.date);
      });

      renderTodoList();
    }
  } catch (error) {
    console.log(error);
  }
}

function initArchive() {
  try {
    if (localStorage.archive !== undefined) {
      archive = new Map(JSON.parse(localStorage.getItem("archive")));
      archive.forEach((todo) => {
        todo.date = new Date(todo.date);
      });
      renderArchive();
    }
  } catch (error) {
    console.log(error);
  }
}

function renderArchive() {
  todosArchive.innerHTML = "";

  const sortedByDate = Array.from(archive.entries())
    .sort(([, entryA], [, entryB]) => entryB.date - entryA.date)
    .reduce((sortedMap, [, value]) => {
      const { date } = value;
      const dayOfMonth = date.getDate();
      const month = MONTH_NAME[date.getMonth()];
      const year = date.getFullYear();
      const dateString = `${dayOfMonth} ${month} ${year}`;

      sortedMap.set(
        dateString,
        (sortedMap.get(dateString) || []).concat(value)
      );
      return sortedMap;
    }, new Map());

  sortedByDate.forEach((todos, date) => {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("todo-archive-date-container");
    dateContainer.innerHTML = `<h3 class="date-container-title">${date}</h3>`;

    createTodosHTML(todos, dateContainer);
  });
}

function renderTodoList() {
  todosContent.innerHTML = "";
  createTodosHTML(todos);
}

function toLocalStorageTodos() {
  const todosString = JSON.stringify(Array.from(todos.entries()));

  localStorage.setItem("todos", todosString);
}

function toLocalStorageArchive() {
  const archiveString = JSON.stringify(Array.from(archive.entries()));

  localStorage.setItem("archive", archiveString);
}
