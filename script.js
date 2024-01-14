const todosContent = document.getElementById('todo-content')
const addTodoButton = document.getElementById('addTodo')
const todoInput = document.getElementById('todo-input')
const todoSelect = document.getElementById('todoSelect')

const todos = [];

addTodoButton.addEventListener('click', () => {
    if (todoInput.value === '') return;

    addTodo(todoInput.value, todoSelect.value)
    todoInput.value = ''
    render()
})

todosContent.addEventListener('click', (event) => {
    if (event.target !== 'BUTTON') return;

})

function addTodo(text, category) {
    const todo = {
        text,
        category,
        done: false,
        id: `${Math.random()}`
    }

    todos.push(todo)
}

function removeTodo(id) {
    
}

function render() {

    todosContent.innerHTML = '';

    todos.forEach(element => {
        todosContent.innerHTML += `
            <div class="todos">
                <p>${element.text}</p>
                <button class="todo-remove">Done</button>
            </div>
            `
        // let div = document.createElement('div');
        // div.classList.add('todos')
        // todosContent.append(div);

        // let p = document.createElement('p')
        // div.append(p);
        // p.append(element.text)

        // let button = document.createElement('button');
        // button.classList.add('todo-remove')
        // button.textContent = 'Done'
        // div.append(button)
    })
}
