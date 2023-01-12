//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event){
    //Form elements reload page when submitted. Below line prevents this behavior.
    event.preventDefault();
    //Creates todo div
    let newTask = document.createElement('div');
    newTask.classList.add('todo');
    //Creates todo li within todo div
    let newTaskLi = document.createElement('li');
    newTaskLi.innerText = todoInput.value;
    newTaskLi.classList.add('todo-item');
    //Remember: newTaskLi is newTodo in tutorial, while newTask is todoDiv
    newTask.appendChild(newTaskLi);
    //Add todo to local storage
    saveLocalTodos(todoInput.value);
    //Completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    newTask.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fa-solid fa-trash"></i>';
    trashButton.classList.add('trash-button');
    newTask.appendChild(trashButton);
    //Append to list
    todoList.appendChild(newTask);
    //Clear input value
    todoInput.value = '';
}

function deleteCheck(event){
    const item = event.target;
    // Delete Button
    if (item.classList[0] == 'trash-button'){
        deleteFromLocal(item.parentElement.innerText);
        item.parentElement.classList.add('fall');
        item.parentElement.addEventListener("transitionend", function(){
            item.parentElement.remove();
        });        
    }
    // Check Button
    else if (item.classList[0] == 'complete-button'){
        console.log(item.parentElement);
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = Array.from(todoList.children);
    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //Check local storage
    let todos;
    if (localStorage.getItem('todos') == null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') == null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Creates todo div
        let newTask = document.createElement('div');
        newTask.classList.add('todo');
        //Creates todo li within todo div
        let newTaskLi = document.createElement('li');
        newTaskLi.innerText = todo;
        newTaskLi.classList.add('todo-item');
        //Remember: newTaskLi is newTodo in tutorial, while newTask is todoDiv
        newTask.appendChild(newTaskLi);
        //Completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add('complete-button');
        newTask.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fa-solid fa-trash"></i>';
        trashButton.classList.add('trash-button');
        newTask.appendChild(trashButton);
        //Append to list
        todoList.appendChild(newTask);
        });
}

function deleteFromLocal(todo){
    let todos;
    if (localStorage.getItem('todos') == null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let index = todos.indexOf(todo);
    if (index !== -1) {
        todos.splice(index, 1);
    }  
    localStorage.setItem('todos', JSON.stringify(todos));
}