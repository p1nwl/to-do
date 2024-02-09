const myTodoListButton = document.getElementById("to-do");
const todoContent = document.getElementById("myTodos");
const todoArchiveContainer = document.getElementById("todo-archive-container")
const tabHeader = document.querySelector(".tab-header");
const tab = document.getElementById("tab");

tabHeader.addEventListener("click", (event) => {
  if (event.target === myTodoListButton) {
    todoContent.classList.add("checked");
    todoArchiveContainer.classList.remove("checked");
  } else {
    todoArchiveContainer.classList.add("checked");
    todoContent.classList.remove("checked");
  }
});


fetch("archive.html")
  .then((response) => response.text())
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const archiveContainer = doc.getElementById("todo-archive");
    const archiveChildren = Array.from(archiveContainer.children).map(child => child.cloneNode(true));

    todoArchiveContainer.append(...archiveChildren);
  });
