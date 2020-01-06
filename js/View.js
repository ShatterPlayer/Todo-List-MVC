class View {
  constructor() {
    // Root element
    this.root = document.createElement('div')
    this.root.className = 'root'
    // Title
    this.title = document.createElement('h1')
    this.title.textContent = 'Todo List'
    this.title.className = 'title'
    this.root.append(this.title)
    // Form
    this.form = document.createElement('form')
    this.form.className = 'form'
    // Todo creation section
    this.input = document.createElement('input')
    this.input.className = 'form__text-input'
    this.input.type = 'text'
    this.input.name = 'todoTextInput'
    this.input.placeholder = 'New Todo Text'
    this.form.append(this.input)
    this.submitBtn = document.createElement('button')
    this.submitBtn.className = 'form__submit'
    this.submitBtn.type = 'submit'
    this.submitBtn.textContent = 'Create'
    this.form.append(this.submitBtn)
    this.root.append(this.form)
    // List of todos
    this.todoList = document.createElement('ul')
    this.todoList.className = 'todolist'
    this.root.append(this.todoList)
    // Appending root to body
    document.body.append(this.root)
  }

  updateTodoList = () => {
    // Deleting all todos nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild)
    }
    // Creating todos nodes
    this.todosData.forEach(todoData => {
      const todo = document.createElement('li')
      todo.className = 'todo'
      todo.id = todoData.id

      const todoText = document.createElement('span')
      todoText.className = 'todo__text'
      todoText.contentEditable = true
      todoText.textContent = todoData.text
      todoText.role = 'todoText'
      if (todoData.completed) {
        todoText.style.textDecoration = 'line-through'
      }

      const todoCheckbox = document.createElement('input')
      todoCheckbox.className = 'todo__checkbox'
      todoCheckbox.type = 'checkbox'
      todoCheckbox.checked = todoData.completed
      todoCheckbox.role = 'completionStatus'

      const deleteBtn = document.createElement('button')
      deleteBtn.className = 'todo__delete'
      deleteBtn.textContent = 'Delete'
      deleteBtn.role = 'deleteBtn'
      todo.append(todoText, todoCheckbox, deleteBtn)

      this.todoList.append(todo)
    })
  }

  onTodoCreation = handle => {
    this.form.addEventListener('submit', handle)
  }

  onTodoDelete = handle => {
    this.todoList.addEventListener('click', e => {
      e.preventDefault()
      if (e.target.role === 'deleteBtn') {
        handle(e.target.parentNode)
      }
    })
  }

  onTodoCompletionChange = handle => {
    this.todoList.addEventListener('click', e => {
      if (e.target.role === 'completionStatus') {
        handle(e)
      }
    })
  }

  onTodoEdit = handle => {
    this.todoList.addEventListener('focusout', e => {
      if (e.target.role === 'todoText') {
        handle(e)
      }
    })
  }
}
