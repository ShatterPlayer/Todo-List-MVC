class Model {
  // Method _notifyAboutChanges points to internal View method
  constructor() {
    // If there are todos in local storage, load them
    this.todos = localStorage.todos ? JSON.parse(localStorage.todos) : []
  }

  _cacheTodos = () => {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  addTodo = text => {
    const id =
      this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1
    this.todos.push({ id, text, completed: false })

    this._notifyAboutChanges()
    this._cacheTodos()
  }

  changeCompletionStatus = id => {
    this.todos = this.todos.map(todo => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo
    })

    this._notifyAboutChanges()
    this._cacheTodos()
  }

  deleteTodo = id => {
    this.todos = this.todos.filter(todo => todo.id !== id)

    this._notifyAboutChanges()
    this._cacheTodos()
  }

  updateTodo = (id, text) => {
    this.todos = this.todos.map(todo => {
      return todo.id === id ? { ...todo, text } : todo
    })

    this._notifyAboutChanges()
    this._cacheTodos()
  }

  getTodo = id => {
    return this.todos.find(todo => todo.id === id)
  }
}
