export class InteractionFunction {
  constructor(options = { name: undefined, customMessage: {}, autoComplete: false, timeoutInteraction: undefined },) {
    this.interactionName = options.name || null
    this.customMessage = {
      ...options.customMessage
    }
    this.autoComplete = options.autoComplete || false
    this.timeoutInteraction = options.timeoutInteraction || null
  }

  typeInteraction() {
    return []
  }

  interactionFunction() { }

  once() { }

  destroyInteraction() {
    return null
  }
}