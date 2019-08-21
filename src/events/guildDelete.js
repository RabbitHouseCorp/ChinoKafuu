const Database = require("../database.js")
module.exports = class GuildDelete {
  constructor(client) {
    this.client = client
  }
  
  async execute(guild) {
    this.client.database.Guilds.deleteOne({
      _id: guild.id
    }, async function (err, server) {
      server = new this.client.database.Guilds.Guilds({
        _id: guild.id
      })
    })
  }
}