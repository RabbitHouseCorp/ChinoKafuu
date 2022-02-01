const { Message } = require('eris')
const EventEmitter = require('events')
const InteractionPacket = require('./InteractionPacket')

module.exports = class ResponseAck extends EventEmitter {
  constructor(message) {
    super()
    this.id = ''
    this.token = ''
    this.data = null
    this.message = message
    this.client = message.channel.client
    this.typeInteraction = 1
    this.user = message.member.user.toJSON()
    this.client.on('rawWS', (packet) => {
      if (packet.t === 'INTERACTION_CREATE') {
        if (packet.d.type === 3) {
          if (this.message.id === packet.d.message.id) {
            if (packet.d.isHttp !== undefined) {
              this.data = packet.d
            }
            this.token = packet.d.token
            this.id = packet.d.id
            this.emit('collect', ({
              messageCollect: new Message(packet.d.message, this.client),
              interaction: new InteractionPacket(packet.d),
              packet: packet
            }))

          }
        }
      }
    })
  }

  interactionType(type) {
    this.interactionType = type
    return this
  }

  setUser(user) {
    this.user = user
    return this
  }

  async sendAck(typeAck, data) {
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

    if ((this.client.interactionPost === null)) {

      this.client.interactionPost.send({
        token: this.token,
        type: 95,
        message: {
          type: type,
          token: this.token,
          data: data
        },
        ping_pong: false
      })
    } else {
      this.client.requestHandler.request('POST', `/interactions/${this.id}/${this.token}/callback`, true, {
        type: type,
        token: this.token,
        data: data
      }, null)
    }

    return this
  }

  // eslint-disable-next-line no-unused-vars
  messageInteraction(data, returns) {
    this.client.shards.get(this.message.guild.shardID).sendWS(5, data, false)
    return this
  }
}
