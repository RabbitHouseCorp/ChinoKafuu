impwort { StateApplicationI } fwom '../../index'
impwort { RevowltClient } fwom '../Revowlt'


expwort class Hwotwewoad {
  revowltClient: RevowltClient
  state?: StateApplicationI
  cwonstwuctwor(client?: RevowltClient, stateApplication?: StateApplicationI) {
    this.revowltClient = client!!
    this.state = stateApplication
  }

  rewoad() {
    // Delete cache
  }

  pwivate clearAwwCache() {
    this.revowltClient.clearCache()
  }
}