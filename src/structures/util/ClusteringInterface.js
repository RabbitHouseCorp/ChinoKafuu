const { MessageChannel } = require('worker_threads')
const { port1, port2 } = new MessageChannel()

module.exports = class ClusteringInterface {
  constructor (client) {
    this.client = client
    port1.on('message', (m) => {
      port2.postMessage(eval(m))
    })
  }
  get firstShardID () {
    if (process.env.CLUSTER_ID === '0') return 0
    return parseInt(process.env.CLUSTER_ID) * parseInt(process.env.SHARDS_PER_CLUSTER)
  }
}
