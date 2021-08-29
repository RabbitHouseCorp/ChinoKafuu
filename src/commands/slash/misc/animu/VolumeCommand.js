const { Command, EmbedBuilder } = require('../../utils')

module.exports = class AnimuVolumeCommand extends Command {
    constructor() {
        super({
            name: 'animu volume',
            aliases: ['module', 'configurações', 'configurar'],
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    run(ctx) {
        if (!ctx.message.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.replyT('error', 'baisc:voice.clientAreNotInVoiceChannel')
        if (!ctx.client.player.has(ctx.message.guildID)) return ctx.replyT('error', 'basic:voice.playerNotFound')
        if (!ctx.args[1]) return ctx.replyT('warn', 'commands:animu.currentVolume', { volume: ctx.client.player.get(ctx.message.guildID).player.state.volume })
        if (parseInt(ctx.args[1]) > 100) return ctx.replyT('error', 'basic:voice.maxVolume')
        if (parseInt(ctx.args[1]) < 5) return ctx.replyT('error', 'basic:voice.minVolume')

        ctx.client.player.get(ctx.message.guildID).setVolume(ctx.args[1])
        ctx.replyT('success', 'commands:animu.volumeChanged')

    }
}
