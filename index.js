require('dotenv').config()

const Manager = require('./src/sharder/manager/Manager')
const manager = new Manager()

manager.start()