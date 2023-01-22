import { LavalinkManager } from '../../../../lavalink/LavalinkManager'
import { PluginExtend } from '../loaders/PluginExtend'

export class LavalinkStore extends PluginExtend {
  constructor() {
    super({
      name: 'lavalink',
      args: {},
      timeout: 50 * 1000
    })

  }

  start() {
    try {
      const state = new LavalinkManager(null)
      this.$addClassState({ data: state })
      state.on('state', (a) => {
        if (!a) {
          this.fail(Error('Unable to connect to the lavalink client'))
        }
      }).on('err', (err) => {
        this.fail(err)
      })

      this.ready()
    } catch (err) {
      console.log(err)
      this.fail(err)
    }
  }
}
