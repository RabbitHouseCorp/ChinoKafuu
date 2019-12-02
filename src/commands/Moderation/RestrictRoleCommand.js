const Command = require('../../structures/command')

module.exports = class RestrictRoleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'restrictrole',
      category: 'mod',
      aliases: ['restringirrole'],
      UserPermission: ['MANAGE_ROLES'],
      ClientPermission: ['MANAGE_ROLES'],
      OnlyDevs: false,
      hidden: false,
    })
  }

  async run ({ message, args, server }, t) {
    const option = this.getOption(args[0])
    if (!option) return message.chinoReply('error', t('commands:restrictemoji.no-option'))

    const role = this.getRole(args[1], true)
    if (!role) return message.chinoReply('error', t('commands:roleinfo.args-null'))

    const emoji = this.getEmoji(args[2], true)
    if (!emoji) return message.chinoReply('error', t('commands:emoji.args-null'))

    if (option === 'yes') {
      await emoji.addRestrictedRole(role)
      message.chinoReply('success', t('commands:restrictemoji.added-successfully'))
    } else if (option == 'no') {
      await emoji.removeRestrictedRole(role)
      message.chinoReply('success', t('commands:restrictemoji.removed-successfully'))
    }
  }
}
