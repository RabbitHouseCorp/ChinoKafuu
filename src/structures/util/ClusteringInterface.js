const { MessageChannel } = require('worker_threads')
const { port1, port2 } = new MessageChannel()

module.exports = class ClusteringInterface {
  constructor (client) {
    this.client = client
    this.in = port1
    this.out = port2

    this.in.on('message', (m) => {
      this.out.postMessage(eval(m))
    })
  }

  broadcastEval (code) {
    port2.postMessage({ code, sending: true })
  }

  get firstShardID () {
    if (process.env.CLUSTER_ID === '0') return 0
    return parseInt(process.env.CLUSTER_ID) * parseInt(process.env.SHARDS_PER_CLUSTER)
  }
}
