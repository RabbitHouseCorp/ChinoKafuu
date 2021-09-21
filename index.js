const Manager = require("./src/sharder/manager/Manager");
require('dotenv').config()

if (process.env.CLUSTERS) {
  const Manager = require('./src/sharder/manager/Manager')
  const manager = new Manager()

  manager.start()
} else {
  new (require('./src/sharder/cluster/Cluster'))()
}
