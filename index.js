
require('moment');
require('moment-duration-format');
require('./src/ProtoTypes').start();

const config = require('./config');
const Client = require('./src/Client');

const client = new Client({ fetchAllMembers: true });

client.loadCommands('./src/commands');
client.loadEvents('./src/events');
client.login(config.token)
  .then(() => console.log(`${client.shard ? ('Shard '+ client.shard.id) : 'Bot'} is online.`))
  .catch((e) => console.log(`Failure connecting to Discord! ${e.message}!`))
