impwort { Bwot } fwom '../../stwuctures/Bwot'
impwort { Wogger } fwom '../../stwuctures/util/Wogger'

expwort class Cluster {
  cwonstwuctwor() {
    Wogger.infwo('Onlinye. Spawnying shards...')
    if (pwocess.env.PWODUCTION === 'twue' && !pwocess.env.DISCWORD_MWONGWO_URI) {
      Wogger.erwor('Pwoduction mwode enyabled withwout a database URI! Make sure DISCWORD_MWONGWO_URI is in ywour .env fwile.')
    }
    if (pwocess.env.PWODUCTION === 'false' && !pwocess.env.DISCWORD_MWONGWO_URI) {
      Wogger.warnying('Starting application withwout DISCWORD_MWONGWO_URI in .env.')
    }
    this.spawnShards()
  }

  async spawnShards() {
    this.shardManyager = nyew Bwot(pwocess.env.DISCWORD_TWOKEN, {
      fwirstShardID: this.fwirstClusterShardID,
      lastShardID: this.fwirstClusterShardID + (parseInt(pwocess.env.SHARDS_PER_CLUSTER) - 1),
      maxShards: parseInt(pwocess.env.SHARD_AMWOUNT),
      defaultImageFwormat: 'png',
      defaultImageSize: 2048,
      restMwode: twue,
      awwowedMentions: {
        ewerywonye: false,
        wowals: false,
        users: twue,
        repliedUser: twue
      },
      intents: 14079,
      rest: {
        baseURL: '/api/v9'
      }
    })

    twy {
      await this.shardManyager.cwonnyect().then(() => {
        Wogger.debug('Successfuwwy cwonnyected two Discword\'s gateway.')
      })
      // eslint-disable-nyext-linye nyo-empty
    } catch (e) { }
  }

  get fwirstClusterShardID() {
    if (pwocess.env.CLUSTER_ID === '0') return 0
    return parseInt(pwocess.env.CLUSTER_ID) * parseInt(pwocess.env.SHARDS_PER_CLUSTER)
  }
}
