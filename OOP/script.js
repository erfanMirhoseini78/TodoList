class Todo {
    constructor(title) {
        this.title = title;
        this.isComplete = false;
    }
}

class TodoList {
    constructor(todosContainer) {
        this.todosContainer = todosContainer;
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.querySelector('input');
        this.addBtn = document.querySelector('#addButton');
        this.clearBtn = document.querySelector('#clearButton');

        this.render();
    }

    render() {
        // console.log('Start Todo List');

        this.todosContainer.innerHTML = '';

        this.addBtn.addEventListener('click', () => {
            this.addNewTodo(this.todoInput.value);
        })

        this.todoInput.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                this.addNewTodo(this.todoInput.value);
            }
        })

        this.clearBtn.addEventListener('click', () => {
            this.clearTodos();
        })

        this.addTodosToDom();
        this.saveTodosInToLocalStorage();

        this.todoInput.focus();
    }

    addTodosToDom() {
        // console.log('Todos Add To Dom');

        this.todosContainer.innerHTML = '';

        this.todos.forEach((todo, todoIndex) => {
            let li = document.createElement('li');
            li.className = 'completed well';

            let todoTitleElem = document.createElement('label');
            todoTitleElem.innerHTML = todo.title;
            todo.isComplete ? todoTitleElem.classList.add('todo-completed') : null;

            let completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-success';
            completeBtn.innerHTML = 'Complete';
            completeBtn.addEventListener('click', event => {
                // console.log(event.target.previousSibling);

                todo.isComplete = !todo.isComplete;
                this.saveTodosInToLocalStorage();
                this.addTodosToDom();
            })

            if (todo.isComplete) {
                completeBtn.innerHTML = 'UnComplete';
            }

            let removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-danger';
            removeBtn.innerHTML = 'Remove';
            removeBtn.addEventListener('click', () => {
                this.todosContainer.removeChild(li);

                let mainTodoIndex = this.todos.findIndex(index => {
                    index === todoIndex;
                })

                this.todos.splice(mainTodoIndex, 1);

                this.saveTodosInToLocalStorage();
                this.addTodosToDom();
            })

            li.append(todoTitleElem, completeBtn, removeBtn);
            this.todosContainer.append(li);
        })
    }

    addNewTodo(newTodoTitle) {
        // console.log('new todo title :', newTodoTitle);

        if (newTodoTitle.trim()) {
            this.todos.push(new Todo(newTodoTitle));

            this.saveTodosInToLocalStorage();
            this.addTodosToDom();

            this.todoInput.value = '';
        }
    }

    clearTodos() {
        // console.log('All Todo Is Remove');

        this.todos = [];

        this.render();
        this.saveTodosInToLocalStorage();
    }

    saveTodosInToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));

        this.todoInput.focus();
    }
}

new TodoList(document.querySelector('ul'));