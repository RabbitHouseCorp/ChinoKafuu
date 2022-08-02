/* eslint-disable quotes */
const { UsagiClient } = require('usagi-http-interaction')
const { Interaction } = require('eris')
const { Logger } = require('../structures/util')
const chalk = require('chalk')

module.exports = class InteractionManager extends UsagiClient {
  constructor(client) {
    super({
      protocol: process.env.INTERACTION_URL.startsWith('wss://') ? 'https://' : 'http://',
      ip: process.env.INTERACTION_URL.replace('wss://', '').replace('ws://', ''),
      secret: process.env.SECRET_INTERACTION,
      publicKey: process.env.PUBLIC_KEY,
      port: parseInt(process.env.INTERACTION_PORT.length) === 0 ? null :  parseInt(process.env.INTERACTION_PORT) ,
      client: client,
      eventName: 'interactionCreate',
      lengthLatency: 3,
      websocketOptions: {
        reconnect: true,
        time: 2 * 1000,
        maxReconnect: 90
      }
    })

    this.connected = false
    this.on('reconnecting', () => {
      this.connected = true
      Logger.info('Reconnecting the Interaction API!')
    })
    this.on('connected', () => {
      this.connected = true
      Logger.info(`The connection made to the API was successful! (${this.stats.end - this.stats.start}ms)`)
    })
    this.on('in', (data, time, json) => {
      if (Date.now() - time > 7) {
        return Logger.warning(`Decompressing (${chalk.yellowBright(Date.now() - time)}ms):  Heavy compression maybe...`)
      }
      if (process.env.TRACER === 'true') {
        Logger.debug(`Decompressing (${Date.now() - time}ms): ${data.toString('utf-8').replace(/\n/g, '')} - (${this.byte(data, Buffer.from(JSON.stringify(json)))})`)
        return
      }
      Logger.debug(`Decompressing (${Date.now() - time}ms): [${data.toString('base64').substring(0, 4).replace(/\n/g, '')}] - (${this.byte(data, Buffer.from(JSON.stringify(json)))})`)
    })
    this.on('out', (data, time, json) => {
      if (Date.now() - time > 7) {
        return Logger.warning(`Decompressing (${chalk.yellowBright(Date.now() - time)}ms):  Heavy compression maybe...`)
      }
      if (process.env.TRACER === 'true') {
        Logger.debug(`Compressing (${Date.now() - time}ms): ${data.toString('utf-8').replace(/\n/g, '')} - (${this.byte(data, Buffer.from(JSON.stringify(json)))})`)
        return
      }
      Logger.debug(`Compressing (${Date.now() - time}ms): [${data.toString('base64').substring(0, 4).replace(/\n/g, '')}] - (${this.byte(data, Buffer.from(JSON.stringify(json)))})`)
    })
    this.on('interaction', (interaction) => {
      if (process.env.TRACING === 'true') {
        Logger.debug(`Interaction: ${JSON.stringify(interaction, ('', ' '))}`)
      }
      if (interaction.type === 1) return this // Ignore
      if (interaction.type === 200) return this; // Ping

      if (interaction.type === 2) {
        this.client.emit('slashCommand', new Interaction(interaction,
          this.client,
          this.client.guilds.get(interaction.guild_id),
          undefined,
          undefined,
          false
        ), true)
      } else {
        const interactionClass = new Interaction(interaction,
          this.client,
          this.client.guilds.get(interaction.guild_id),
          undefined,
          undefined,
          false
        )

        if (interaction.channel_id !== undefined) {
          interactionClass.channel_id = interaction.channel_id;
        }
        if (interaction.guild_id !== undefined) {
          interactionClass.guild_id = interaction.guild_id;
        }
        if (interaction.message !== undefined) {
          interactionClass.message_data = interaction.message;
        }
        if (interaction.data !== undefined) {
          interactionClass.data = interaction.data;
        }
        if (interaction.member !== undefined) {
          interactionClass.member = interaction.member;
        }
        interaction.is_http = true;
        this.client.emit('interactionCreate', interactionClass, true, this)
      }
    })
    this.on('error', (err) => Logger.error(err))
  }

  byte(a, b) {
    if (a.byteLength >= b.byteLength) {
      return `${chalk.blueBright(a.byteLength)}B ↔ ${chalk.blueBright(b.byteLength)}B`
    }
    if (a.byteLength > b.byteLength) {
      return `${chalk.greenBright(a.byteLength)}B → ${chalk.redBright(b.byteLength)}B`
    }
    if (a.byteLength < b.byteLength) {
      return `${chalk.blueBright(a.byteLength)}B ← ${chalk.yellowBright(b.byteLength)}B / ${chalk.redBright(b.byteLength - a.byteLength)}B of difference`
    }
    return `${a.byteLength}B / ${b.byteLength}B`
  }
}