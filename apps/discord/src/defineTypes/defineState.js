import EventEmitter from 'events'

const isJson = (data) => {
  try {
    JSON.stringify(data)
    return true
  } catch (error) {
    return false
  }
}
export class StateData {
  constructor(actionState) {
    this.actionState = actionState
  }
}

/**
 *
 * @description This will help save unnecessary variable and after you are done and set the data to null and let the GC work.
 * @returns {StateData?}
 */
export const defineState = (data, options = { eventEmitter: false }) => {
  let state = data ?? {}
  const event = options?.eventEmitter === true ? new EventEmitter() : null

  const get = (stateName) => {
    return Object.entries(state).filter(([key]) => key === stateName)[0][1] ?? null
  }
  const setState = (dataState = {}) => {
    if (!Array.isArray(dataState)) {
      Object.entries(dataState).map(([k]) => delete state[typeof k === 'string' ? k : ''])
    }
    Object.assign(state, dataState)
    if (event !== null) {
      event.emit('stateUpdated', dataState, state, data)
    }
    return state
  }

  const postStructJson = (stateName, data) => {
    if (isJson(data))
      throw new Error('PostDataStateError: This doesn\'t appear to be JSON data.')

    const arr = Object.values([stateName, data])
    const obj = {}
    obj[arr[0]] = arr[1]
    Object.assign(state, obj)
    if (event !== null) {
      event.emit('postData', (state, stateName, data))
    }
    return state
  }

  const del = (stateName) => {
    const stateData = Object.entries(state).filter(([key]) => key === stateName)

    if (stateData === undefined) return
    if (event !== null) {
      event.emit('deleteData', (state[stateData[0]], stateName))
    }
    delete state[stateData[0]]
  }

  const destroy = () => {
    state = null
    if (event !== null) {
      event.emit('destroy', (state))
      event.removeAllListeners()
    }
  }

  state = new StateData({
    event,
    get,
    setState,
    postStructJson,
    del,
    destroy,
  })

  Object.assign(state, data)

  return state
}