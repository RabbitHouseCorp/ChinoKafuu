const { Message } = require("eris")
const EventEmitter = require("events")
const InteractionPacket = require("./InteractionPacket")

module.exports = class ResponseAck extends EventEmitter {
  constructor(message) {
    super()
    this.id = '';
    this.token = '';
    this.message = message
    this.client = message.channel.client
    this.typeInteraction = 1;
    this.user = message.member.user.toJSON()
    this.client.on('rawWS', (packet) => {
      if (packet.t === 'INTERACTION_CREATE') {
        if (this.message.id === packet.d.message.id) {
          this.token = packet.d.token
          this.id = packet.d.id
          this.emit('collect', (new Message(packet.d.message, this.client), new InteractionPacket(packet.d), packet))
        }
      }
    })
  }


  interactionType(type) {
    this.interactionType = type
    return this
  }

  setUser(user) {
    this.user = user;
    return this;
  }

  sendAck(typeAck, data) {
    let type = 4

    switch (typeAck) {
      case 'update':
        type = 7
        break;
      case 'respond':
        type = 4
        break;
      case 'later':
        type = 5
        break;
      case 'ack':
        type = 6
        break;
      default:
        type = 4
    }
    this.client.requestHandler.request("POST", `/interactions/${this.id}/${this.token}/callback`, true, {
      type: type,
      token: this.token,
      data: data
    }, null)
    return this;
  }

  messageInteraction(data, returns) {
    this.client.shards.get(this.message.channel.guild.shardID).sendWS(5, data, false)
    return this;
  }
}