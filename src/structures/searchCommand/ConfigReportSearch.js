const { Interaction } = require('eris');
const ResultsMechanism = require('../../utils/ResultsMechanism');

module.exports = {
  CONFIG_REPORT_SEARCH: 'config report',
  searchClass: class {
    constructor() { }

    static search(interaction = new Interaction()) {
      const guild = new ResultsMechanism()

      try {
        guild.searchTextChannel_Interaction(interaction.command.interface.get('channel').value, interaction)
      } catch (e) {
        console.log(e)
      }
    }
  }
}