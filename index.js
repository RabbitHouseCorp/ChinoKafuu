const config = require('./config')
const Client = require('./src/Client')
require('./src/ProtoTypes').start()
const DBL = require("dblapi.js")
const client = new Client({
    fetchAllMembers: true
})
const dbl = new DBL(config.dbltoken, client)
dbl.on("posted", () => {
  console.log("Connected to DBL")
})

client.login(config.token)
client.loadCommands('./src/commands')
client.loadEvents('./src/events')
console.log("Connected")