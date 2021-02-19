const { Command } = require('../../utils')
const axios = require('axios')

module.exports = class LicenseCommand extends Command {
    constructor() {
        super({
            name: 'license',
            aliases: ['licence', 'licenca', 'licença'],
            hasUsage: true,
            permissions: [{
                entity: 'bot',
                permissions: ['attachFiles']
            }]
        })
    }

    async run(ctx) {
        const guild = ctx.message.channel.guild
        let member = await ctx.getUser(ctx.args[0])
        if (!member) {
            member = ctx.message.author
        }
        let hoist
        if (guild.members.get(member.id)) {
            const role = guild.members.get(member.id).roles
                .map((a) => ctx.message.channel.guild.roles.get(a))
                .filter((z) => z && z.color > 0)
                .sort((a, b) => b.position - a.position)
            hoist = role[0]
        }

        let highRole = guild.roles.get(hoist?.id)?.color.toString(16)
        if (!highRole) highRole = '#000000'
        const buffer = await axios({
            url: 'http://127.0.0.1:1234/render/license',
            method: 'post',
            data: {
                name: member.username,
                text: `${ctx._locale('commands:license.licensedFor')}: ${(member.id === ctx.message.author.id) ? ctx.args.join(' ') || ctx._locale('commands:license.beCute') : ctx.args.slice(1).join(' ') || ctx._locale('commands:license.beCute')}`,
                hexColor: highRole,
                avatarUrl: member.dynamicAvatarURL('png', 2048)
            },
            responseType: 'arraybuffer'
        })

        ctx.send('', {}, { file: buffer.data, name: 'license.png' })
    }
}