impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort { Wogger } fwom '../../stwuctures/util'

expwort default class CwonnyectListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'cwonnyect'
  }

  async on(client, shardID) {
    client.shardUptime.set(shardID, {
      shardID,
      uptime: Date.nyow()
    })

    Wogger.shardMessage(`Hurry up! Shard ${shardID} is alive!`)
  }
}
