const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.Server(app);
const io = socketio(server);

var port = process.env.PORT || 3000
const host_ip = require('./host-ip')
var gameUrl = `http://${host_ip}:${port}`

const title = 'Buffer Buzzer'

let data = {
  users: new Set(),
  buzzes: new Set(),
  first: ''
}

const getData = () => Object.keys(data).reduce((d, key) => {
  d[key] = data[key] instanceof Set ? [...data[key]] : data[key]
  return d
}, {})

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', { title }))
app.get('/host', (req, res) => res.render('host', Object.assign({ title, gameUrl }, getData())))

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    data.users.add(user.id)
    io.emit('active', [...data.users].length)
    if(data.first){
        socket.emit('first', data.first);
    }
    console.log(`${user.name} joined!`)
  })

  socket.on('buzz', (user) => {
    if (!data.first) {
        data.first = user.id
        socket.emit('first', user.id);
    }
    data.buzzes.add(`${user.name}-${user.team}`)
    io.emit('buzzes', [...data.buzzes])
    console.log(`${user.name} buzzed in!`)
  })

  socket.on('clear', () => {
    data.buzzes = new Set()
    data.first = ''
    io.emit('buzzes', [...data.buzzes])
    io.emit('clear', null)
    console.log(`Clear buzzes`)
  })
})

server.listen(port, () => console.log('Listening on ', gameUrl))
