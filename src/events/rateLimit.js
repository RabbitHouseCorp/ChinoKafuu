module.exports = class Error {
  constructor(client) {
    this.client = client
  }
  
  run(info) {
    console.log(info)
  }
}
