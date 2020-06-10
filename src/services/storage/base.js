export default class Storage {
  constructor(type) {
    this.storage = type
  }

  setItem(key, payload) {
    try {
      const stringifiedPayload = JSON.stringify(payload)
      this.storage.setItem(key, stringifiedPayload)
      return {
        [key]: payload
      }
    }
    catch (err) {
      return null
    }
  }

  getItem(key) {
    try {
      const payload = this.storage.getItem(key)
      return JSON.parse(payload)
    }
    catch (err) {
      return null
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key)
      return true
    }
    catch (err) {
      return false
    }
  }
}
