const config = require('./config')
const Client = require('./src/Client')
require('./src/ProtoTypes').start()
new Client({
    fetchAllMembers: true
}).login(config.token).loadCommands('./src/commands').loadEvents('./src/events')
console.log("Connected")