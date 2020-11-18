const Command = require('../../structures/command/Command')

module.exports = class HelpCommand extends Command {
    constructor() {
        super({
            name: 'help',
            aliases: ['ajuda', 'comandos', 'commands']
        })
    }

    async run(ctx) {
        ctx.send('Comming soon\:tm:')
    }
}
