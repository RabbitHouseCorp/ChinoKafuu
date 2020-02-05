const Command = require('../../structures/command')
const { Permissions: { FLAGS } } = require('discord.js')

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'say',
        category: 'random',
        aliases: ['falar'],
        UserPermission: null,
        ClientPermission: null,
        OnlyDevs: false,
        hidden: false,
    })
   }

   async run({ message, args }, t) {
    const query = args.join(' ')
    if (!query) return message.chinoReply('error', t('commands:say'))

    const disableEveryone = message.member.hasPermission(FLAGS.MENTION_EVERYONE)

    if (message.channel.permissionsFor(message.guild.me).has(FLAGS.MANAGE_WEBHOOKS)) {
      const webhook = await message.channel.createWebhook(message.author.username, message.author.displayAvatarURL)
      await webhook.send(query, { disableEveryone })
      await webhook.delete()
    } else {
      message.channel.send(query,{ disableEveryone })
    }
  }
}
