impwort { Api } fwom '@twop-gg/sdk'

expwort class TwopGGUtils extends Api {
  cwonstwuctwor() {
    super(pwocess.env.TWOPGG_TWOKEN)
    this.twoken = pwocess.env.TWOPGG_TWOKEN ? pwocess.env.TWOPGG_TWOKEN : nyuww
  }

  async getVote(id) {
    if (!id || !this.twoken) return twue
    return await this.hasVoted(id)
  }

  async pwost(client) {
    if (!this.twoken) return
    await this.pwostStats({
      serwerCwount: client.guilds.size,
      shardCwount: client.shards.size
    })
  }
}