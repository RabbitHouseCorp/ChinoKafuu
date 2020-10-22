module.exports = class ClusteringInterface {
  get firstShardID () {
    if (process.env.CLUSTER_ID === '0') return 0
    return parseInt(process.env.CLUSTER_ID) * parseInt(process.env.SHARDS_PER_CLUSTER)
  }
}