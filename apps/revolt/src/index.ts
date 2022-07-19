
interface ProjectWrapper {

}

interface StateApplicationI {
  projectWrapper: ProjectWrapper
}

export class StateApplication {
  state: StateApplicationI

  constructor(state: any) {
    this.state = state
  }

  forceReload() {
    // Clear all cache and finish connection with revolt.
    // Code
  }
}

export default {
  // Imports Repository

}