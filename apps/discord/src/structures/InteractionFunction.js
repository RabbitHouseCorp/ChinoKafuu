/* eslint-disable no-unused-vars */
import { isAsyncFunction } from 'util/types'
import { InteractionContext } from './InteractionContext'

/**
 * @typedef {object} defineOptionsCtx
 * @property {InteractionContext['createMessageInteraction']} createMessageInteraction
 * @property {InteractionContext['editMessageInteraction']} editMessageInteraction
 * @property {InteractionContext['editT']} editT
 * @property {InteractionContext['editMessage']} editMessage
 * @property {InteractionContext['editMessageT']} editMessageT
 * @property {InteractionContext['editInteraction']} editInteraction
 * @property {InteractionContext['edit']} edit
 * @property {InteractionContext['getUserInteraction']} getUserInteraction
 * @property {InteractionContext['reply']} reply
 * @property {InteractionContext['replyT']} replyT
 * @property {InteractionContext['send']} send
 * @property {InteractionContext['sendT']} sendT
 * @property {InteractionContext['useModal']} useModal
 * @property {InteractionContext['userGetsInteractionAccess']} userGetsInteractionAccess
 * @property {InteractionContext['getState']} getState
 * @property {InteractionContext['deleteInteraction']} deleteInteraction
 * @property {InteractionContext['sendEmbedPage']} sendEmbedPage
 * @property {(args: 'commands:' | 'basic:' | 'events:' | 'permission:' | 'slashcommand:', placeholder: Object.<number, string | 'Text example.'>) => string} _locale
 * @property {InteractionContext['getData']} getData
 * @property {InteractionContext['getArg']} getArg
 * @property {InteractionContext} ctx
 * @property {InteractionContext['trackingCommand']} trackingCommand
 * @property {defineState} defineState
 */
/**
 * @typedef {object} defineOptionsInterface
 * @property {InteractionContext['createMessageInteraction']} createMessageInteraction
 * @property {InteractionContext['editMessageInteraction']} editMessageInteraction
 * @property {InteractionContext['editT']} editT
 * @property {InteractionContext['editMessage']} editMessage
 * @property {InteractionContext['editMessageT']} editMessageT
 * @property {InteractionContext['editInteraction']} editInteraction
 * @property {InteractionContext['edit']} edit
 * @property {InteractionContext['getUserInteraction']} getUserInteraction
 * @property {InteractionContext['reply']} reply
 * @property {InteractionContext['replyT']} replyT
 * @property {InteractionContext['send']} send
 * @property {InteractionContext['sendT']} sendT
 * @property {InteractionContext['useModal']} useModal
 * @property {InteractionContext['userGetsInteractionAccess']} userGetsInteractionAccess
 * @property {InteractionContext['getState']} getState
 * @property {InteractionContext['deleteInteraction']} deleteInteraction
 * @property {InteractionContext['sendEmbedPage']} sendEmbedPage
 * @property {(args: 'commands:' | 'basic:' | 'events:' | 'permission:' | 'slashcommand:', placeholder: Object.<number, string | 'Text example.'>) => string} _locale
 * @property {InteractionContext['getData']} getData
 * @property {InteractionContext['getArg']} getArg
 * @property {InteractionContext} ctx
 * @property {InteractionContext['trackingCommand']} trackingCommand
 * @property {defineState} defineState
 * @property {async () => void} once
 * @property {}
 */
/**
 *  This type of interaction function definition is used to reduce workload and make it a single and asynchronous (or non-asynchronous) function.
 *  @param {(T: defineOptionsInterface) => void} interactionDefault
 *  ```js
 *  import { defineInteractionFunction } from './InteractionFunction'
 *
 *  export default defineInteractionFunction(({...options}) => {
 *      /// ...code
 *  })
 *  ```
 *
 */
export const defineInteractionFunction = async (interactionDefault) => {
  /**
   * @param {defineOptionsInterface} arguments
   * @returns {void}
   */
  return async (args) => {

    return new Promise((resolve, reject) => {
      const defaultFunc = {
        isAsync: isAsyncFunction(interactionDefault),
        fn: interactionDefault,
        args: []
      }
      if (defaultFunc.isAsync) {
        defaultFunc.fn(args)
          .then(() => resolve(true))
          .catch((err) => reject({ err, error: true, isAsync: true }))
        delete defaultFunc.fn
        return
      }

      try {
        defaultFunc.fn(args)
        resolve(true)
        delete defaultFunc.fn
      } catch (err) {
        reject({ err, error: true, isAsync: false })
      }
    })
  }
}

/**
 * @typedef {{
 *   name: string;
 *   customMessage?: {
 *      'userLimited'?: string | null;
 *      'userBanned'?: string | null;
 *      'error'?: string | null;
 *      'timeout'?: 'string | null';
 *  };
 *  autoComplete?: boolean;
 *  timeoutInteraction?: number | null | undefined;
 * }} interactionOptionsTypeDef
 */

/**
 * @template T, R
 * @param {defineInteraction} T
 * @param {defineInteractionFunction} R
 * @param options soon!
 */
export const defineInteractionDefault = (T, R, options = {}) => {

  const obj = ({
    mode: 'define',
    T: T instanceof Object ? T : (() => { throw new Error('') }),
    R: async (args) => (await R)(args)
  })

  // To make the code safer, let's avoid modifying property names.
  Object.defineProperty(obj, 'mode', { writable: false })
  Object.defineProperty(obj, 'T', { writable: false })
  Object.defineProperty(obj, 'R', { writable: false })

  return obj
}

/**
 * If you want to reduce the excessive use of classes, you can use defineInteraction and defineInteractionFunction to define the file as an interaction function.
 * @param {interactionOptionsTypeDef} interactionOptions
 * @returns {interactionOptionsTypeDef}
 */
export const defineInteraction = ({ name, customMessage, autoComplete, timeoutInteraction }) => ({
  interactionName: typeof name === 'string' ? name : (() => { throw Error(`Field of name is string: (${typeof name}) - ${name}`) })(),
  customMessage: Object.is(customMessage) ? {} : customMessage,
  autoComplete: typeof autoComplete === 'boolean' ? autoComplete : false,
  timeoutInteraction: typeof timeoutInteraction === 'number' ? timeoutInteraction : null
})

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