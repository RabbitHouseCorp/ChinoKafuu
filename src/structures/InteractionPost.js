const Interaction = require('eris/lib/structures/Interaction')
const WebSocket = require('ws')
const { Logger } = require('../utils')

module.exports = class InteractionPost {
  constructor(client) {
    this.client = client
    this.ws = null
    this.uptime = 0
    this.heartbeart = null
    this.a = 0
    this.b = 0
    this.update = 0
    this.lastPing = 0
    this.ping = 0
    this.connected = false
    this.attempt = 0
  }

  connect() {
    if (!(this.attempt > 10)) {
      if (this.connected == false) {
        this.ws = new WebSocket(process.env.URL_INTERACTION, {
          headers: {
            'Authorization': Buffer.from(process.env.SECRET_INTERACTION ?? '{secret}').toString('base64').replace('==', '')
          }
        })
      }


      if (this.ws !== null) {
        this.ws.on('open', async () => {
          this.connected = true
          Logger.warning('API is connected successfully! Interactions will be received via HTTP.')
          this.uptime = Date.now()
          this.client.interactionPost = this
          await this.ws.send(JSON.stringify({
            public_key: process.env.PUBLIC_KEY,
            bot_id: this.client.user.id,
            bot_name: this.client.user.username,
            date: Date.now()
          }))
          this.ws.send(JSON.stringify({
            type: 89,
          }))

        })
        this.ws.on('error', (err) => {
          this.attempt++;
          Logger.error(err)
          this.client.interactionPost = null
          this.connected = false
          this.del()
        })
        this.ws.on('close', (code, reason) => {
          this.attempt++;
          this.connected = false
          this.client.interactionPost = null
          this.del()
          Logger.error(`The connection was closed with code [${code}] and reason ~> ${reason ?? 'no reason'}`)
          try {
            setTimeout(() => {
              this.connect()
            }, 5 * 1000)
          } catch (err) {
            Logger.error(err)
          }
        })
        this.ws.on('message', async (message) => {
          try {
            const json = JSON.parse(Buffer.from(message, 'utf8').toString('utf-8').replace(/^129/g, ''))

            if (json.type_ws !== undefined) {
              switch (json.type_ws) {
                case 1001: {
                  this.heartbeart = setTimeout(async () => {
                    this.a = Date.now()
                    await this.ws.send(JSON.stringify({
                      type: 90,
                    }))
                  }, 25 * 1000)
                }
                  break
                case 1002: {
                  this.b = this.a - Date.now();
                  this.lastPing = this.ping
                  this.ping = Date.now() - this.a
                  await this.ws.send(JSON.stringify({
                    type: 89,
                  }))
                  this.uptime = Date.now()
                  Logger.debug(`Connection update is ${this.ping}ms and the last one was ${this.lastPing}ms`)
                }
              }
            }
            if (this.client !== undefined) {

              if (json.type !== undefined) {

                switch (json.type) {
                  case 2: {
                    const guild = this.client.guilds.get(json.guild_id)
                    json.isHttp = true

                    this.send({
                      type: 95,
                      token: json.token,
                      message: {},
                      ping_pong: true
                    })

                    this.client.emit('slashCommand', new Interaction(json, this.client, guild, undefined, undefined, true))
                    this.client.emit('rawWS', {
                      t: 'INTERACTION_CREATE',
                      d: json,
                    })
                  }
                    break;
                  case 3: {
                    const guild = this.client.guilds.get(json.guild_id)

                    json.isHttp = true
                    
                    this.client.emit('rawWS', {
                      t: 'INTERACTION_CREATE',
                      d: json,
                    })

                    this.client.emit('interactionCreate', new Interaction(json, this.client, guild, undefined, undefined, true))
                  }

                    break;
                }
              }
            }
          } catch (err) {
            Logger.error(err)
          }
        })
      }
      return this
    }
  }

  reconnect() {
    this.ws = null
    this.uptime = 0
    this.heartbeart = null
    this.a = 0
    this.b = 0
    this.lastPing = 0
    this.ping = 0
    this.connected = false
    this.attempt = 0
    this.connect()
  }

  del() {
    this.ws = null
  }

  send(data) {
    this.ws.send(JSON.stringify(data))
  }
}