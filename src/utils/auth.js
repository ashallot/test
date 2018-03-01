import storage from './helpers/storageLite'

const ADMINID = 'adminId'
const TOKEN = 'token'
const USERNAME = 'userName'

export default {
  name: 'auth',

  /**
   * 获取 auth，返回：管理员信息和 token
   * @return {Object}
   */
  get () {
    return {
      [ADMINID]: storage.get(ADMINID),
      [TOKEN]: storage.get(TOKEN),
      [USERNAME]: storage.get(USERNAME)
    }
  },

  /**
   * 登录
   * @param {string} manager 登录管理员
   * @param {string} token 登录 token
   */
  login ({adminId, token, userName}) {
    storage.set(ADMINID, adminId)
    storage.set(TOKEN, token)
    storage.set(USERNAME, userName)
  },

  /**
   * 登出
   */
  logout () {
    storage.remove(ADMINID)
    storage.remove(TOKEN)
    storage.remove(USERNAME)
  },

  /**
   * 是否已登录
   * @return {boolean}
   */
  loggedIn () {
    return !!storage.get(ADMINID) && !!storage.get(TOKEN)
  },

  getDate (n) {
    if (n === '' || n === undefined || n === null) {
      return ''
    }
    var year = n.getFullYear()
    var month = n.getMonth() + 1
    var day = n.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return year + '-' + month + '-' + day + ' 00:00:00'
  },
  getTimesDate (n) {
    if (n === '' || n === undefined || n === null) {
      return ''
    }
    var year = n.getFullYear()
    var month = n.getMonth() + 1
    var day = n.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return year + '-' + month + '-' + day
  },
  getDateLastTime (n) {
    if (n === '' || n === undefined || n === null) {
      return ''
    }
    var year = n.getFullYear()
    var month = n.getMonth() + 1
    var day = n.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return year + '-' + month + '-' + day + ' 23:59:59'
  }
}
