const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')

const timer30 = document.querySelector('.sec30')
const timer60 = document.querySelector('.sec60')
const pause = document.querySelector('.pause')
const timer = document.querySelector('.timer')

let clockTimer = null
let timeLeft = 0
let pauseTime = false
const SEC_30 = 30
const SEC_60 = 60

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

socket.on('buzzes', (buzzes) => {
  buzzList.innerHTML = buzzes
    .map(buzz => {
      const p = buzz.split('-')
      return { name: p[0], team: p[1] }
    })
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
    .join('')
})

clear.addEventListener('click', () => {
  socket.emit('clear')
})

timer30.addEventListener('click', start30)
timer60.addEventListener('click', start60)
pause.addEventListener('click', pauseTimer)

function pauseTimer() {
    pauseTime = !pauseTime

    if (pauseTime) {
        clearInterval(clockTimer);
        pause.classList.add('is-paused')
    } else {
        startTimer()
        pause.classList.remove('is-paused')
    }
}

function start30() {
    timeLeft = SEC_30
    startTimer()
}

function start60() {
    timeLeft = SEC_60
    startTimer()
}

function startTimer() {
    clearInterval(clockTimer)
    timer.innerHTML = timeLeft
    pauseTime = false
    pause.classList.remove('is-paused')
    timer.style.borderRadius = '0%'
    clockTimer = setInterval(countdown, 1000)
}

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(clockTimer)
        document.body.classList.remove('warning')
        return
    }
    if (!pauseTime) {
        timeLeft--
        timer.innerHTML = timeLeft
    }
    if ( timeLeft < 10 ){
        document.body.classList.add('warning')
    } else {
        document.body.classList.remove('warning')
    }

}