const { Command } = require('../../utils')

module.exports = class RemoveRoleCommand extends Command {
    constructor() {
        super({
            name: 'removerole',
            arguments: 2,
            aliases: ['removercargo'],
            hasUsage: true,
            permissions: [{
                entity: 'both',
                permissions: ['manageRoles']
            }]
        })
    }
    async run(ctx) {
        const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
        const getRole = ctx.args.slice(1).join(' ').toLowerCase()
        const role = ctx.message.channel.guild.roles.find(role => role.name.toLowerCase().includes(getRole)) || ctx.message.channel.guild.roles.get(getRole.replace(/[<@&>]/g, ''))
        if (!member) return ctx.replyT('error', 'basic:invalidUser')
        if (!role) return ctx.replyT('error', 'basic:invalidRole')

        const guildMember = ctx.message.channel.guild.members.get(member.id)
        if (!guildMember.roles.includes(role.id)) return ctx.replyT('error', 'commands:removerole.alreadyRemoved')
        guildMember.removeRole(role.id).then(() => {
            ctx.replyT('success', 'commands:removerole.success')
        }).catch(() => ctx.replyT('error', 'commands:addrole.higher'))
    }
}
