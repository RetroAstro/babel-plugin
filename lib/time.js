var data = {}

var time = {
  start(uid) {
    var startTime = performance.now()
    data[startTime] = { uid, startTime }
    
    return startTime
  },
  end(uid, tid) {
    if (data[tid]) {
      var endTime = performance.now()
      data[tid] = { ...data[tid], endTime }
    }
  }
}
