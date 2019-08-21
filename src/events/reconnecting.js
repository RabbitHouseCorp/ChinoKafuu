module.exports = class Reconnecting {
  constructor(client) {
    this.client = client
  }
  
  execute() {
    console.log("Reconnecting to Discord...")
  }
}