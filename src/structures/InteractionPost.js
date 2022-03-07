/* eslint-disable quotes */
const Interaction = require('eris/lib/structures/Interaction')
const WebSocket = require('ws')
const { Logger } = require('../structures/util')
const zlib = require('zlib')
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
    this.$guild = []
  }

  connect() {
    if (process.env?.URL_INTERACTION === undefined) {
      return this
    }
    const t = Date.now()
    if (!(this.attempt > 99999)) {
      if (this.connected === false) {
        try {

          if (process.env.URL_INTERACTION?.startsWith('ws://IP:PORT/ws')) {
            Logger.warning('Interaction URL not found, please, put it next time.')
          } else {
            this.ws = new WebSocket(process.env.URL_INTERACTION, {
              headers: {
                'Identification-Id': this.client.user.id,
                'Secret': process.env.SECRET_INTERACTION,
                'Public-Key': process.env.PUBLIC_KEY,
                'Shard-In': 0,
                'Shard-Total': 1,
              }
            })
          }
        } catch (err) {
          Logger.error(`It's not possible connect to an interaction right now: ${err.name}`)
          console.log(err)
        }
      }

      if (this.ws !== null) {
        this.ws.on('open', async () => {
          this.connected = true
          Logger.warning(`API is connected successfully! Interactions will be received via HTTP. (${(Date.now() - t).toFixed(1)}ms)`)
          this.uptime = Date.now()
          this.client.interactionPost = this
          this.update = Date.now()
          this.send({ type: 89, message: '' })
        })
        this.ws.on('error', (err) => {
          this.attempt++
          Logger.error(err)
          this.client.interactionPost = null
          this.connected = false
          this.del()
        })
        this.ws.on('close', (code, reason) => {
          this.attempt++
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
            const unzipData = zlib.unzipSync(message)
            const json = JSON.parse(unzipData)
            if (json.type == 200) {
              this.lastPing = this.ping
              this.ping = Date.now() - this.update
              setTimeout(() => {
                this.update = Date.now()
                this.send({ type: 89 })
              }, 5 * 1000)
              return
            }
            json.interactionPost = this;
            if (json.type == 1) return this; // Ignore
            if (json.type == 2) {
              this.client.emit('slashCommand', new Interaction(json,
                this.client,
                this.client.guilds.get(json.guild_id),
                undefined,
                undefined,
                false
              ), true)
            } else {
              const interaction = new Interaction(json,
                this.client,
                this.client.guilds.get(json.guild_id),
                undefined,
                undefined,
                false
              )

              if (json.channel_id !== undefined) {
                interaction.channel_id = json.channel_id;
              }
              if (json.guild_id !== undefined) {
                interaction.guild_id = json.guild_id;
              }
              if (json.message !== undefined) {
                interaction.message_data = json.message;
              }
              if (json.data !== undefined) {
                interaction.data = json.data;
              }
              if (json.member !== undefined) {
                interaction.member = json.member;
              }
              interaction.is_http = true;
              this.client.emit('interactionCreate', interaction, true, this)
            }

          } catch (err) {
            console.log(err)
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
    return this
  }

  del() {
    this.ws = null
    return this
  }

  send(data) {
    if (this.connected) {
      return this.ws.send(zlib.gzipSync(Buffer.from(JSON.stringify(data), 'utf-8')), function (err) {
        if (err !== undefined) {
          console.log(err)
        }
      })
    } else {
      return null
    }
  }
}