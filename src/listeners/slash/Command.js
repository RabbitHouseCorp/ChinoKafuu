const Listener = require("../../structures/events/Listener");
const {Interaction} = require("eris");
const SlashRunner = require("../../structures/command/SlashRunner");

module.exports = class Command extends Listener {
    constructor () {
        super()
        this.event = 'slashCommand'
        this.loadStarted = false
    }

    async on(client, interaction = new Interaction()) {
        await SlashRunner.run(client, interaction)
    }

}
