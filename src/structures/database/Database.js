const Logger = require('../util/Logger')
const guild = require('./collections/Guild')
const user = require('./collections/User')
const Collection = require('./Collection')
const mongoose = require('mongoose')

module.exports = class Database {
    constructor() {
        if (process.env.MONGO_URI) {
            mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                if (err) return Logger.error(`Unable to connect to the database ${err}`)
                Logger.info('Connected to the database.')
            })
        }

        this.guilds = new Collection(guild)
        this.users = new Collection(user)
    }
}
