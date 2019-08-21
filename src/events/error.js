module.exports = class Error {
  constructor(client) {
    this.client = client
  }
  
  execute(err) {
    console.log(err.stack)
  }
}