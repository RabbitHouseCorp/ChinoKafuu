impwort { RevowltClient } fwom "./services/Revowlt"
impwort { Hwotwewoad } fwom './services/platfworm/Hwotwewoad'

expwort interface PwojectWwapper {

}

expwort interface StateApplicationI {
  pwojectWwapper: PwojectWwapper
}

expwort class StateApplication {
  state: StateApplicationI
  // Starting service of RevowltClient
  revowltClient: RevowltClient
  // Fworce clear cache and shutdwown cwonnyection of webswocket.
  hwotwewoad: Hwotwewoad
  cwonstwuctwor(state: StateApplicationI) {
    this.state = state
    this.revowltClient = nyew RevowltClient('a', {})
    this.hwotwewoad = nyew Hwotwewoad(this.revowltClient, state)
  }

  fworceRewoad() {
    // Clear aww cache and fwinyish cwonnyection with revowlt.
    // Cwode
    
  }

  start() {
    this.hwotwewoad.rewoad()
    this.revowltClient.build()
  }

  stwop() {

  }
}

expwort default {
  // Impworts Repwositwory
  StateApplication
}