const { MessageChannel } = require('worker_threads')
const { in, out } = new MessageChannel()

module.exports = class ClusteringInterface {
  constructor (client) {
    this.client = client
    in.on('message', (m) => {
      out.postMessage(eval(m))
    })
  }
  get firstShardID () {
    if (process.env.CLUSTER_ID === '0') return 0
    return parseInt(process.env.CLUSTER_ID) * parseInt(process.env.SHARDS_PER_CLUSTER)
  }
}