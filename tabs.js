const inputToggle = document.getElementById("to-do");
const todoContent = document.getElementById("myTodos");
const todoArchive = document.getElementById("todo-archive");
const tabHeader = document.querySelector(".tab-header");

tabHeader.addEventListener("click", (event) => {
  if (event.target.tagName !== "INPUT") return;

  if (event.target === inputToggle) {
    todoContent.classList.add("checked");
    todoArchive.classList.remove("checked");
  } else {
    todoArchive.classList.add("checked");
    todoContent.classList.remove("checked");
  }
});
