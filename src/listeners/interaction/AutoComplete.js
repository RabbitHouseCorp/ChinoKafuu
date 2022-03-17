
const Listener = require('../../structures/events/Listener')
const ConfigAnimuSearch = require('../../structures/searchCommand/ConfigAnimuSearch')
const ConfigModSearch = require('../../structures/searchCommand/ConfigModSearch')
const ConfigReportSearch = require('../../structures/searchCommand/ConfigReportSearch')

module.exports = class extends Listener {
  constructor() {
    super()

    this.event = 'interactionCreate'
  }

  async on(client, interaction) {
    const command = client.slashCommandRegistry.findByName(interaction.command.commandName)
    if (!command) return

    if (interaction.type === 8 || interaction.type === 4) {
      switch (interaction.command.commandName) {
        case ConfigAnimuSearch.CONFIG_ANIMU_SEARCH: {
          ConfigAnimuSearch.searchClass.search(interaction)
        }
          break;
        case ConfigModSearch.CONFIG_MOD_SEARCH: {
          ConfigModSearch.searchClass.search(interaction)
        }
          break;
        case ConfigReportSearch.CONFIG_REPORT_SEARCH: {
          ConfigReportSearch.searchClass.search(interaction)
        }
          break;
      }
    }
  }
}
