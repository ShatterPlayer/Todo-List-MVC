class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    // Action handlers
    this.view.onTodoCreation(this.handleTodoCreate)
    this.view.onTodoDelete(this.handleTodoDelete)
    this.view.onTodoCompletionChange(this.handleCompletionChange)
    this.view.onTodoEdit(this.handleTodoEdit)
    this.view.onTodoEditEnd(this.handelTodoEditEnd)
    // Data bindings
    Object.defineProperty(this.view, 'todosData', {
      get: () => this.model.todos,
    })
    // Model change notification binding
    Object.defineProperty(this.model, '_notifyAboutChanges', {
      get: () => this.view.updateTodoList,
    })
    // Refresh todo list just in case there were todos in local storage
    this.view.updateTodoList()
  }

  handleTodoCreate = e => {
    e.preventDefault()
    if (this.view.input.value.trim() !== '') {
      this.model.addTodo(e.target.elements.todoTextInput.value)
      this.view.input.value = ''
    }
  }

  handleTodoDelete = e => {
    this.model.deleteTodo(parseInt(e.id))
  }

  handleCompletionChange = e => {
    this.model.changeCompletionStatus(parseInt(e.target.parentNode.id))
  }

  handleTodoEdit = e => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.target.innerHTML = this.model.getTodo(
        Number(e.target.parentNode.id)
      ).text
      e.target.blur()
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }

  handelTodoEditEnd = e => {
    const id = parseInt(e.target.parentNode.id)
    const text = e.target.textContent
    if (text.trim() === '') {
      this.model.deleteTodo(id)
    } else {
      this.model.updateTodo(id, text)
    }
  }
}
