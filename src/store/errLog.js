/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-24 11:00:04
 * @modify date 2017-08-24 11:00:04
 * @desc [错误日志store]
*/

const errLog = {
  state: {
    errLog: []
  },
  pushLog (log) {
    this.state.errLog.unshift(log)
  },
  clearLog () {
    this.state.errLog = []
  }
}

export default errLog
