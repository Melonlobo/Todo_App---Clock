const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');
document.addEventListener('DOMContentLoaded', getTodosLocalStorage);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkEditDelete);
todoFilter.addEventListener('click', todoSelect);

let todos = JSON.parse(localStorage.getItem('todos'));
let todoChecked = JSON.parse(localStorage.getItem('todoChecked'));
function addTodo(event) {
	event.preventDefault(); 
	if (todoInput.value.trim()) {
		const key = !todos.includes(todoInput.value);
		createTodoElement(todoInput.value, key);
	}
	todoInput.value = '';
	todoInput.select();
}

function createTodoElement(item, key = true) {
	if (key) {
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo-div');
		const newTodo = document.createElement('li');
		newTodo.innerText = item;
		newTodo.classList.add('todo');
		todoDiv.append(newTodo);
		if (todoInput.value) {
			saveToLocalStorage(item);
		}
		if (todoChecked) {
			todoChecked.forEach((todo) => {
				if (todo === newTodo.innerText) {
					todoDiv.classList.add('checked');
				}
			});
		}
		const checkButton = document.createElement('button');
		checkButton.innerHTML = '<i class="fas fa-check"></i>';
		checkButton.classList.add('check-btn');
		todoDiv.append(checkButton);
		const editButton = document.createElement('button');
		editButton.innerHTML = '<i class="fas fa-edit"></i>';
		editButton.classList.add('edit-btn');
		todoDiv.append(editButton);
		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="fas fa-times-circle"></i>';
		deleteButton.classList.add('delete-btn');
		todoDiv.append(deleteButton);
		todoList.append(todoDiv);
	}
}

function checkEditDelete(e) {
	e.preventDefault();
	const item = e.target;
	const todo = item.parentElement;
	let newEdit = todoList.querySelectorAll('.todo-div');
	if (item.classList.contains('check-btn')) {
		todo.classList.toggle('checked');
		if (!todoChecked) {
			todoChecked = [];
		}
		if (todo.classList.contains('checked')) {
			todoChecked.push(todo.innerText);
		} else {
			todoChecked.splice(todoChecked.indexOf(todo.innerText), 1);
		}
		localStorage.setItem('todoChecked', JSON.stringify(todoChecked));
	}
	if (!todo.classList.contains('new-edit')) {
		if (item.classList.contains('edit-btn')) {
			let newForm = document.createElement('form');
			let newTodo = document.createElement('input');
			let newBtn = document.createElement('button');
			let indexTodos = todos.indexOf(todo.innerText);
			let indexTodoChecked = todoChecked.indexOf(todo.innerText);
			const edtBtns = todoList.querySelectorAll('.edit-btn');
			newEdit.forEach((todo) => todo.classList.add('new-edit'));
			newTodo.value = todo.innerText;
			newForm.append(newTodo);
			newForm.append(newBtn);
			todo.childNodes[0].style.display = 'none';
			todo.append(newForm);
			newBtn.style.display = 'none';
			newForm.style.order = '-1';
			newForm.style.flex = '1';
			newTodo.style.width = '100%';
			newTodo.focus();
			if (todo.classList.contains('new-edit')) {
				todo.childNodes[1].style.pointerEvents = 'none';
				edtBtns.forEach((edtBtn) => (edtBtn.style.pointerEvents = 'none'));
			}
			newBtn.addEventListener('click', () => {
				if (newTodo.value.trim()) {
					todo.querySelector('.todo').innerText = newTodo.value;
					newForm.remove();
					todo.childNodes[0].style.display = 'flex';
					todos.splice(indexTodos, 1, todo.innerText);
					localStorage.setItem('todos', JSON.stringify(todos));
					if (todo.classList.contains('checked')) {
						todoChecked.splice(indexTodoChecked, 1, todo.innerText);
						localStorage.setItem('todoChecked', JSON.stringify(todoChecked));
					}
				} else {
					todo.remove();
					todos.splice(indexTodos, 1);
					localStorage.setItem('todos', JSON.stringify(todos));
					if (todo.classList.contains('checked')) {
						todoChecked.splice(indexTodoChecked, 1);
						localStorage.setItem('todoChecked', JSON.stringify(todoChecked));
					}
				}
				newEdit.forEach((todo) => todo.classList.remove('new-edit'));
				todo.childNodes[1].style.pointerEvents = 'all';
				edtBtns.forEach((edtBtn) => (edtBtn.style.pointerEvents = 'all'));
			});
		}
	}
	if (item.classList.contains('delete-btn')) {
		if (todo.classList.contains('checked')) {
			todoChecked.splice(todoChecked.indexOf(todo.innerText), 1);
			localStorage.setItem('todoChecked', JSON.stringify(todoChecked));
		}
		todo.remove();
		todos.splice(todos.indexOf(todo.innerText), 1);
		localStorage.setItem('todos', JSON.stringify(todos));
	}
}

function todoSelect(e) {
	todoList.childNodes.forEach((todo) => {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'checked':
				if (todo.classList.contains('checked')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (todo.classList.contains('checked')) {
					todo.style.display = 'none';
				} else {
					todo.style.display = 'flex';
				}
				break;
		}
	});
}

function saveToLocalStorage(todo) {
	if (!localStorage.getItem('todos')) {
		todos = [];
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosLocalStorage() {
	if (!localStorage.getItem('todos')) {
		todos = [];
	}
	todos.forEach((todo) => createTodoElement(todo));
}
