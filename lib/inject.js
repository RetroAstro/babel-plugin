var key = 0
var data = {}

var time = {
  start(uid) {
    var startTime = new Date().getTime()
    data[uid] = { startTime }
    return uid
  },
  end(_uid) {
    if (data[_uid]) {
      var endTime = new Date().getTime()
      data[_uid] = { ...data[_uid], endTime }
    }
  }
}

function getUid() {
  return (++key) + ''
}

module.exports = { time, getUid }
 