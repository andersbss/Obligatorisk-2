const todosWrapper = document.getElementById('todoList');
const completedTodosWrapper = document.getElementById('completedTodosTable');
const completedTodos = [];
let todos = [];
let todoId = 1;

const todoHtml = (title, description, id) => {
    return `<li class="todoItem" id="${id}">` + 
                `<h3>${title}</h3>` +
                `<p>${description}</p>` +
                '<div class="todoBtn">' +
                    '<button class="deleteBtn">Delete</button>' +
                    '<button class="completeBtn">Complete</button>'+
                '</div>' + 
            '</li>';
}

const completedTodoHtml = (title, author, description, date) => {
return '<tr class="completedTodo">'+
            `<td>${title}</td>` +
            `<td>${author}</td>` +
            `<td>${description}</td>` +
            `<td>${date}</td>` +
        '</tr>'
}

const getById = (id) => { return document.getElementById(id) };

const generateId = () => { return `Todo${todoId++}`};
    
const togglePopup = () => { getById("popup").classList.toggle("active"); }

const dateZeroHandler = (num) => { return (num < 10 ? `0${num}` : num); }

const formatYear = (year) => {
    const splitYear = year.toString().split('');
    return `${splitYear[2]}${splitYear[3]}`;
}

const getDate = () => {
    const date = new Date;
    const day = dateZeroHandler(date.getDate());
    const month = dateZeroHandler(date.getMonth() + 1);
    const year = formatYear(date.getFullYear());
    console.log(date.getHours());
    return `${day}.${month}.${year}`;
}

const renderTodos = () => {
    todosWrapper.innerHTML = "";
    todos.forEach((todo) => todosWrapper.innerHTML += todoHtml(todo.title, todo.description, todo.id));
    setMulitpleBtnListeners('.deleteBtn', deleteTodo);
    setMulitpleBtnListeners('.completeBtn', completeTodo);
}

const renderCompletedTodos = () => {
    const tableHeaders = getById('headers');
    completedTodosWrapper.innerHTML = "";
    completedTodosWrapper.appendChild(tableHeaders);
    completedTodos.forEach((todo) => completedTodosWrapper.innerHTML += completedTodoHtml(todo.title, todo.author, todo.description, getDate()))
}

const createTodo = (title, description, author) => {
    const todo = {title: title, description: description, author: author, id: generateId()};
    todos.push(todo);
}

const setMulitpleBtnListeners = (btnClass, event) => {
    const elements = document.querySelectorAll(btnClass);
    elements.forEach(element => element.addEventListener('click', event));
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    const formTitle = e.target[0].value;
    const formDescription = e.target[1].value;
    const formAuthor = e.target[2].value;
    
    if (!formTitle || !formAuthor) return;

    createTodo(formTitle, formDescription, formAuthor);
    togglePopup();
    renderTodos();
};

const deleteTodo = (event) => {
    let deletedTodo;

    const targetTodoId = event.target.parentNode.parentNode.id;
    todos = todos.filter((todo) => { 
        if (todo.id == targetTodoId) { deletedTodo = todo; }
        return todo.id !== targetTodoId;
    }); 
    renderTodos();

    return deletedTodo;
}

const completeTodo = (event) => {
    completedTodos.push(deleteTodo(event));
    renderCompletedTodos();
}

const characterCount = () => {
    const charCounter = getById('charCount');
    let input = getById('todoDescriptionInput').value;
    let count = 30 - input.length;
    
    charCounter.innerHTML = ` (${count} charachters left)`;
}

class ButtonEvent{
    constructor(buttonId, eventType, event){
        this.buttonId = buttonId;
        this.eventType = eventType;
        this.event = event;
    }
    addEventListener() {
        const btn = getById(this.buttonId);
        btn.addEventListener(this.eventType, this.event)
    }
}

const setBtnListeners = () => {

    const buttons = [   new ButtonEvent('addTodoBtn', 'click', togglePopup), 
                        new ButtonEvent('closeBtn', 'click', togglePopup),
                        new ButtonEvent('filter', 'click', togglePopup),
                        new ButtonEvent('newTodoForm', 'submit', handleFormSubmission),
                        new ButtonEvent('todoDescriptionInput', 'keyup', characterCount)
                    ];
    buttons.forEach((button) => button.addEventListener());
};

try {
    setBtnListeners();
    characterCount();
} catch (error){
    //Bad handling, but it is something i guess
    alert("Something went wrong when initializing page!");
}