const Command = require("../../structures/command")
module.exports = class CreateinviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'createinvite',
            category: 'developers',
            aliases: ['criarconvite'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: true,
            hidden: true,
        })
    }
    async run({ message, args, server }, t) {
        const {
            error: emoteError,
            chino_peek: emotePeek,
            chino_sad: emoteSad
        } = this.client.emotes;

        const guild = args.join(' ')

        if (!guild) return message.channel.send(`${emoteError} **|** ${message.author}, ${t('commands:createInvite.unknownGuild')}`)
        const guilds = this.client.guilds.get(args[0]) || this.client.guilds.find(g => g.name === guild)

        if (!guilds) return message.channel.send(`${emoteError} **|** ${message.author}, ${t('commands:createInvite.unknownGuild')}`)

        if (!guilds.member(this.client.user).hasPermission('CREATE_INSTANT_INVITE')) return message.channel.send(`${emoteSad} **|** ${message.author}, ${t('commands:createInvite.withoutPermission')}`)
        const invite = await this.client.guilds.get(guilds.id).channels.random().createInvite()

        message.channel.send(`${emotePeek} **|** ${message.author} ${t('commands:createInvite.success', { invite })}`)
    }
}