const { Collection } = require('discord.js')

module.exports = class EventManager {
  constructor (client) {
    this.client = client
    this.events = []
  }

  add (name, fun) {
    this.client.on(name, (...args) => this.handleEvent(name, args))
    this.events.push({ name, fun })
  }

  remove (name) {
    delete this.events[this.events.findIndex(a => a.name === name)]
  }

  handleEvent (name, args) {
    this.events.filter(a => a.name === name).forEach((e) => e.fun.run(...args))
  }
}
