const Command = require('../../structures/command/Command')

class ReloadCommand extends Command {
    constructor() {
        super({
            name: 'reload',
            aliases: []
        })
    }

    async run(ctx) {
        switch (ctx.args[0].toLowerCase()) {
            case 'locales':
                ctx.client.loadLocales()
                await ctx.reply('chino_tail', t('commands:reload.locales'))
                break
            case 'shard': {
                if (!ctx.args[1]) return ctx.reply('chino_think', 'Como eu vou reiniciar essa shard se você não colocou nenhuma?')
                const shard = ctx.client.shards.get(Number(ctx.args[1]))
                shard.disconnect()
                shard.connect()

                await ctx.reply('chino_tail', t('commands:reload.shard', { shard: ctx.args[1] }))
                break
            }
            default: {
                const list = ['`locales`', '`shard`']
                await ctx.reply('chino_think', t('commands:reload.ctx.args-null', { list: list.join(', ') }))
            }
        }
    }
}

module.exports = ReloadCommand
