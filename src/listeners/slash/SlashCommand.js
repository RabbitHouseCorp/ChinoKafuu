const Listener = require("../../structures/events/Listener");

module.exports = class SlashCommand extends Listener {
    constructor () {
        super()
        this.event = 'ready'
        this.loadStarted = false
    }

    async on(client) {
        if (this.loadStarted === false) {
            this.loadStarted = true
            const commandFolder = []
            for (const command of client.commandRegistry.modules) {
                if (!(command.slash == null)) {
                    commandFolder.push(command.slash)
                }
            }

            // commandRegistry:
            client.slashCommand.createCommand(commandFolder)
        }

    }

}
