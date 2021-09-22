require('dotenv').config()

if (!process.env.CLUSTERS) {
    const Manager = require('./src/sharder/manager/Manager')
    const manager = new Manager()
    manager.start()

} else {
    const BotInterface = require('./src/manager/BotInterface');
    new BotInterface().spawnShards()
}
