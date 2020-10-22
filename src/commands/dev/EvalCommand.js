const Command = require('../../structures/command/Command')
const EmbedBuilder = require('../../structures/util/EmbedBuilder')
const util = require('util')

class EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            permissions: [{
                entity: 'user',
                permissions: ['botDeveloper']
            }],
            aliases: ['ev']
        })
    }

    async run(ctx) {
        try {
            let evaled = await eval(ctx.args.join(' '))
            evaled = util.inspect(evaled, { depth: 1 })
            evaled = evaled.replace(new RegExp(`${ctx.client.token}`, 'g'), undefined)

            if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`
            evaled = `\`\`\`js\n${evaled}\`\`\``
            await ctx.send(evaled)
        } catch (err) {
            const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack
            const embed = new EmbedBuilder()
            embed.setColor('ERROR')
            embed.setTitle(ctx.t('events:error.title'))
            embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)
            embed.addField(ctx.t('events:error.report-issue'), ctx.t('events:error.server-support'))

            ctx.send(embed)
        }
    }
}

module.exports = EvalCommand
