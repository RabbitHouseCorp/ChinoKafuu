require('./src/ProtoTypes').start()

const Client = require('./src/Client')
const ShardManager = require('./src/ShardManager')
const DBL = require("dblapi.js")
const config = require('./config')

const client = new Client({
  fetchAllMembers: true
})

if (client.shard) client.shardManager = new ShardManager(client)

const dbl = new DBL(config.dbltoken, client)

dbl.on("posted", () => {
  console.log("Connected to DBL")
})

client.loadCommands('./src/commands')
client.loadEvents('./src/events')
client.login(config.token)
      .then(() => console.log(`${client.shard ? ('Shard '+ client.shard.id) : 'Bot'} is online.`))
      .catch((e) => console.log(`Failure connecting to Discord! ${e.message}!`))