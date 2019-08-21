var key = 0
var data = {}

var time = {
  start(uid) {
    var startTime = new Date().getTime()
    data[uid] = { startTime }
  },
  end(uid) {
    if (data[uid]) {
      var endTime = new Date().getTime()
      data[uid] = { ...data[uid], endTime }
    }
  }
}

function getUid() {
  return (++key) + ''
}

module.exports = { time, getUid }
 