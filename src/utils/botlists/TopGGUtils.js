const { Api } = require('@top-gg/sdk')

module.exports = class TopGGUtils extends Api {
  constructor(token) {
    super(token)
  }

  getVote(id) {
    return this.hasVoted(id)
  }

  async post(client) {
    await this.postStats({
      serverCount: client.guilds.size,
      shardCount: client.shards.size
    })
  }
}