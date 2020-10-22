const Command = require('../../structures/command/Command')
class TippyCommand extends Command {
    constructor() {
        super({
            name: 'tippy'
        })
    }

    run(ctx) {

    }
}

module.exports = TippyCommand