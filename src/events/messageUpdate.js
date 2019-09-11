module.exports = class MessageUpdate {
  constructor(client) {
    this.client = client
  }
  
  execute(oldMessage, newMessage) {
    if (oldMessage.content === newMessage.content) return
    this.client.emit("message", newMessage)
  }
}