const Collector = require('./Collector')

class MessageCollector extends Collector {
  constructor(message, filter, options = {}) {
    super(filter, options)

    this.message = message
    this.client = message._client
    this.receivedReactionRemoved = !!options.receivedReactionRemoved

    this.client.on('messageReactionAdd', this.handleCollect.bind(this))
    if (this.receivedReactionRemoved) {
      this.client.on('messageReactionRemove', this.handleCollect.bind(this))
    }

    this.once('end', () => {
      this.client.removeListener('messageReactionAdd', this.handleCollect.bind(this))
      if (this.receivedReactionRemoved) {
        this.client.removeListener('messageReactionRemove', this.handleCollect.bind(this))
      }
    })
  }

  collect (message, _, userId) {
    const user = this.client.users.get(userId)

    if (user && user.bot) {
      return null
    }

    if (message.id === this.message.id) {
      return message
    }

    return null
  }
}

module.exports = MessageCollector
