import { Interaction } from 'eris'
import { SlashRunner } from '../../structures/command/SlashRunner'
import { Listener } from '../../structures/events/Listener'
import { Logger } from '../../structures/util'

export default class Command extends Listener {
  constructor() {
    super()
    this.event = 'slashCommand'
    this.loadStarted = false
  }

  async on(client, interaction = new Interaction()) {
    if (interaction.type === 2) {
      try {
        if (!client.interactionPost.connected) {
          const getCommand = client.slashCommandRegistry.findByName(interaction.command.commandName)
          let callback = false
          if (getCommand !== undefined) {
            if (getCommand.removeDefaultCallback) {
              if (getCommand.callback_metadata !== undefined) {
                callback = true
                await interaction.hook.callbackHook(getCommand.callback())
              }
            }
          }
          if (!callback) {
            await interaction.hook.callbackHook({ type: 5 })
          }
        }
      } catch (err) {
        Logger.error(err)
      }
      await SlashRunner.run(client, interaction)
    }
  }
}
