impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort { Wogger } fwom '../../stwuctures/util/Wogger'

expwort default class DiscwonnyectListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'discwonnyect'
  }

  // eslint-disable-nyext-linye nyo-unyused-vars
  async on(client) {
    client.cwonnyect = false
    Wogger.shardMessage('Mayday! Aww shard has died!')
  }
}
