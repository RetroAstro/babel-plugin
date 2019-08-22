const fs = require('fs')
const path = require('path')
const Server = require('ws').Server

const port = 8080
const wss = new Server({ port })

wss.on('connection', (socket) => {
  console.log(`Server running at port ${port}.`)

  socket.on('message', (msg) => {
    var data = mergeData(JSON.parse(msg))

    socket.send(JSON.stringify(data))
  })
})

function mergeData({ timeData }) {
  var file = path.resolve(__dirname, '../data.json')
  var funcData = JSON.parse(fs.readFileSync(file, 'utf-8'))
  
  var data = {}

  Object.entries(timeData)
    .forEach(([key, value]) => {
      if (funcData[value.uid] && value.endTime) {
        data[key] = { ...value, ...funcData[value.uid] }
      }
    })

  fs.writeFileSync(file, JSON.stringify(data))

  return data
}
