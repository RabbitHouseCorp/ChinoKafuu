import { RevoltClient } from '../services/Revolt';

export interface WebsocketClientI {
  client: RevoltClient
}


export class WebsocketClient {
  client: RevoltClient
  latency: number
  ready: boolean
  constructor(options: WebsocketClientI) {
    this.client = options.client
    this.latency = 0
    this.ready = false
  }
}