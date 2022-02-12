const { Interaction } = require('eris')
const ResultsMechanism = require('../util/ResultsMechanism')

module.exports = {
  CONFIG_ANIMU_SEARCH: 'config animu',
  searchClass: class {
    constructor() { }

    static search(interaction = new Interaction()) {
      const guild = new ResultsMechanism()

      try {
        guild.searchVoiceChannel_Interaction(interaction.command.interface.get('channel').value, interaction)
      } catch (e) {
        console.log(e)
      }
    }
  }
}