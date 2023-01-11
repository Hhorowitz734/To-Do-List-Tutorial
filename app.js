//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Event Listeners
todoButton.addEventListener('click', addTodo);

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