const Logger = require('../util/Logger')
const command = require('./collections/Command')
const guild = require('./collections/Guild')
const user = require('./collections/User')
const Collection = require('./Collection')
const mongoose = require('mongoose')
const EventEmitter = require('events')

module.exports = class Database extends EventEmitter {
  constructor() {
    super()
    if (process.env.MONGO_URI) {
      mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          this.emit('state', (false))
          return Logger.error(`Unable to connect to the database ${err}`)
        }
        this.emit('state', (true))
        Logger.debug('Connected to the database.')
      })
    }

    this.commands = new Collection(command)
    this.guilds = new Collection(guild)
    this.users = new Collection(user)
  }
}
