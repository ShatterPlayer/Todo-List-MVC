class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    // Action handlers
    this.view.onTodoCreation(this.handleTodoCreate)
    this.view.onTodoDelete(this.handleTodoDelete)
    this.view.onTodoCompletionChange(this.handleCompletionChange)
    this.view.onTodoEdit(this.handelTodoEdit)
    // Data bindings
    Object.defineProperty(this.view, 'todosData', {
      get: () => this.model.todos
    })
    // Model change notification binding
    Object.defineProperty(this.model, '_notifyAboutChanges', {
      get: () => this.view.updateTodoList
    })
    // Refresh todo list just in case there were todos in local storage
    this.view.updateTodoList()
  }

  handleTodoCreate = e => {
    e.preventDefault()
    this.model.addTodo(e.target.elements.todoTextInput.value)
  }

  handleTodoDelete = e => {
    this.model.deleteTodo(parseInt(e.id))
  }

  handleCompletionChange = e => {
    this.model.changeCompletionStatus(parseInt(e.target.parentNode.id))
  }

  handelTodoEdit = e => {
    const id = parseInt(e.target.parentNode.id)
    const text = e.target.textContent
    this.model.updateTodo(id, text)
  }
}
