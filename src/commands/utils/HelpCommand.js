const { Command } = require('../../utils')

module.exports = class HelpCommand extends Command {
    constructor() {
        super({
            name: 'help',
            aliases: ['ajuda', 'comandos', 'commands']
        })
    }

    async run(ctx) {
        ctx.send('Coming soon\:tm:')
    }
}
