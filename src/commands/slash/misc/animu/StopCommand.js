const { Command, EmbedBuilder } = require('../../../utils')

module.exports = class AnimuStopCommand extends Command {
    constructor() {
        super({
            name: 'animu leave',
            aliases: ['module', 'configurações', 'configurar'],
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        await ctx.client.lavalink.manager.leave(ctx.message.guildID)
        ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
        ctx.client.player.delete(ctx.message.guildID)

        ctx.replyT('success', 'commands:animu.leaving')
    }
}
