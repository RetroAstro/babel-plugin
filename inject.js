var key = 0
var result = {}

var time = {
  start(uid) {
    var startTime = new Date().getTime()
    result[uid] = { startTime }
    return uid
  },
  end(_uid) {
    if (result[_uid]) {
      var endTime = new Date().getTime()
      result[_uid] = { ...result[_uid], endTime }
    }
  }
}

function getUid() {
  return (++key) + ''
}

module.exports = { time, getUid }
 