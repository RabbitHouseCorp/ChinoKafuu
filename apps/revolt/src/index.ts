import { RevoltClient } from "./services/Revolt";
import { Hotreload } from './services/platform/Hotreload'

export interface ProjectWrapper {

}

export interface StateApplicationI {
  projectWrapper: ProjectWrapper
}

export const Versions = {
  p: '2'
}
export class StateApplication {
  state: StateApplicationI
  // Starting service of RevoltClient
  revoltClient: RevoltClient
  // Force clear cache and shutdown connection of websocket.
  hotreload: Hotreload
  constructor(state: StateApplicationI) {
    this.state = state
    this.revoltClient = new RevoltClient('', {})
    this.hotreload = new Hotreload(this.revoltClient, state)
  }

  forceReload() {
    // Clear all cache and finish connection with revolt.
    // Code
    
  }

  start() {
    this.hotreload.reload()
  }

  stop() {

  }
}

export default {
  // Imports Repository
  StateApplication
}