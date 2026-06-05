function getUserDataKey(type, user) {
  return `${type}_${user}`
}

function loadUserNote(user) {
  return localStorage.getItem(getUserDataKey('note', user)) || ''
}

function saveUserNote(user, note) {
  localStorage.setItem(getUserDataKey('note', user), note)
}

function loadUserTodos(user) {
  const raw = localStorage.getItem(getUserDataKey('todos', user))
  try {
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUserTodos(user, todos) {
  localStorage.setItem(getUserDataKey('todos', user), JSON.stringify(todos))
}

function loadUserMistakes(user) {
  const raw = localStorage.getItem(getUserDataKey('mistakes', user))
  try {
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function renderReviewNotes(mistakes) {
  const reviewList = document.getElementById('review-notes-list')
  if (!reviewList) return
  reviewList.innerHTML = ''

  if (!mistakes.length) {
    reviewList.innerHTML =
      '<div class="review-note-empty">저장된 오답이 없습니다.</div>'
    return
  }

  mistakes.forEach((mistake) => {
    const card = document.createElement('div')
    card.className = 'review-note-card'
    card.innerHTML = `
      <h4>${mistake.q}</h4>
      <p><span class="label">정답:</span> ${mistake.c}</p>
      <p><span class="label">내 답:</span> ${mistake.m}</p>
      <p><span class="label">분석:</span> ${mistake.a || '없음'}</p>
    `
    reviewList.appendChild(card)
  })
}

function renderTodoList(todos) {
  const todoList = document.getElementById('todo-list')
  if (!todoList) return
  todoList.innerHTML = ''
  todos.forEach((todo, index) => {
    const item = document.createElement('li')
    item.className = 'todo-item'
    item.dataset.index = index

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.done
    checkbox.className = 'todo-checkbox'
    checkbox.dataset.action = 'toggle'

    const text = document.createElement('span')
    text.className = todo.done ? 'todo-text done' : 'todo-text'
    text.innerText = todo.text

    const deleteBtn = document.createElement('button')
    deleteBtn.type = 'button'
    deleteBtn.className = 'todo-delete'
    deleteBtn.innerText = '삭제'
    deleteBtn.dataset.action = 'delete'

    item.appendChild(checkbox)
    item.appendChild(text)
    item.appendChild(deleteBtn)
    todoList.appendChild(item)
  })
}

window.addEventListener('DOMContentLoaded', () => {
  const user = sessionStorage.getItem('loggedInUser')
  if (!user) return

  const noteInput = document.getElementById('note-input')
  const noteDisplay = document.getElementById('note-display')
  const saveNoteButton = document.getElementById('save-note')
  const todoInput = document.getElementById('todo-input')
  const addTodoButton = document.getElementById('add-todo')
  const todoList = document.getElementById('todo-list')

  if (noteInput && noteDisplay && saveNoteButton) {
    const note = loadUserNote(user)
    noteInput.value = note
    noteDisplay.innerText = note || '저장된 메모가 없습니다.'

    saveNoteButton.addEventListener('click', () => {
      const newNote = noteInput.value.trim()
      saveUserNote(user, newNote)
      noteDisplay.innerText = newNote || '저장된 메모가 없습니다.'
      noteInput.value = ''
      alert('메모가 저장되었습니다.')
    })
  }

  if (todoInput && addTodoButton && todoList) {
    let todos = loadUserTodos(user)
    renderTodoList(todos)

    addTodoButton.addEventListener('click', () => {
      const text = todoInput.value.trim()
      if (!text) {
        alert('할 일을 입력하세요.')
        return
      }
      todos.push({ text, done: false })
      saveUserTodos(user, todos)
      renderTodoList(todos)
      todoInput.value = ''
    })

    todoList.addEventListener('click', (event) => {
      const action = event.target.dataset.action
      const item = event.target.closest('.todo-item')
      if (!item) return
      const index = Number(item.dataset.index)
      if (Number.isNaN(index)) return

      if (action === 'toggle') {
        todos[index].done = event.target.checked
        saveUserTodos(user, todos)
        renderTodoList(todos)
      }
      if (action === 'delete') {
        todos.splice(index, 1)
        saveUserTodos(user, todos)
        renderTodoList(todos)
      }
    })
  }

  const userMistakes = loadUserMistakes(user)
  renderReviewNotes(userMistakes)
})
