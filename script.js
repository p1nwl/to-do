const todosContent = document.getElementById("todo-content");
const addTodoButton = document.getElementById("addTodo");
const todoInput = document.getElementById("todo-input");
const todoSelect = document.getElementById("todoSelect");
const todosArchive = document.getElementById("todo-archive");

let todos = [];

if (localStorage.todos !== undefined) {
  todos = JSON.parse(localStorage.getItem("todos"));
  render();
}

todoInput.addEventListener("keydown", (event) => {
  if (todoInput.value === "") return;

  if (event.key === "Enter") {
    addTodo(todoInput.value, todoSelect.value);
    todoInput.value = "";
    render();
  }
});

addTodoButton.addEventListener("click", () => {
  if (todoInput.value === "") return;

  addTodo(todoInput.value, todoSelect.value);
  todoInput.value = "";
  render();
});

todosContent.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const id = event.target.dataset.id;

  archiveTodo(id);
  render();
});

todosArchive.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const id = event.target.dataset.id;

  unarchiveTodo(id);
  render();
});

function addTodo(text, category) {
  const todo = {
    text,
    category,
    done: false,
    id: `${Math.random()}`,
    deleted: false,
  };

  todos.push(todo);
}

function archiveTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.done = true;
    }
  });
}

function unarchiveTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.done = false;
    }
  });
}

function deleteTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo;
    }
  });
}

function render() {
  todosContent.innerHTML = "";
  todosArchive.innerHTML = "";

  todos.forEach((element) => {
    // todosContent.innerHTML += `
    //     <div class="todos">
    //         <p>${element.text}</p>
    //         <button class="todo-remove">Done</button>
    //     </div>
    //     `
    // if (element.done === true) return;
    let div = document.createElement("div");
    div.classList.add("todos");

    if (element.done) {
      todosArchive.append(div);
    } else {
      todosContent.append(div);
    }

    let p = document.createElement("p");
    div.append(p);
    p.append(element.text);

    let button = document.createElement("button");
    button.classList.add("todo-remove");
    if (element.done) {
      button.textContent = "Return";
    } else {
      button.textContent = "Done";
    }

    button.setAttribute("data-id", element.id);
    div.append(button);
  });

  toLocalStorage();
  console.log(todos);
}

function toLocalStorage() {
  const string = JSON.stringify(todos);
  localStorage.setItem("todos", string);
}
