const socket = io()
const form = document.querySelector('.js-join')
const joined = document.querySelector('.js-joined')
const buzzer = document.querySelector('.js-buzzer')
const joinedInfo = document.querySelector('.js-joined-info')
const editInfo = document.querySelector('.js-edit')

let user = {}

const getUserInfo = () => {
  user = JSON.parse(localStorage.getItem('user')) || {}
  if (user.name) {
    form.querySelector('[name=name]').value = user.name
    form.querySelector('[name=team]').value = user.team
  }
}
const saveUserInfo = () => {
  localStorage.setItem('user', JSON.stringify(user))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  user.name = form.querySelector('[name=name]').value
  user.team = form.querySelector('[name=team]').value
  if (!user.id) {
    user.id = Math.floor(Math.random() * new Date())
  }
  socket.emit('join', user)
  saveUserInfo()
  joinedInfo.innerText = `${user.name} on Team ${user.team}`
  form.classList.add('hidden')
  joined.classList.remove('hidden')
})

buzzer.addEventListener('click', (e) => {
  socket.emit('buzz', user)
  window.navigator.vibrate(300)
})

editInfo.addEventListener('click', () => {
  joined.classList.add('hidden')
  form.classList.remove('hidden')
  buzzer.classList.remove('first')
})

socket.on('first', (userID) => {
    console.log(userID)
  if ( userID === user.id) {
      buzzer.classList.add('first')
  }
})

socket.on('clear', () => {
    buzzer.classList.remove('first')
})

getUserInfo()
