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
    if (!option) return message.chinoReply('error', t('commands:restrictEmoji.noOption'))

    const role = this.getRole(args[1], true)
    if (!role) return message.chinoReply('error', t('commands:roleinfo.args-null'))

    const emoji = this.getEmoji(args[2], true)
    if (!emoji) return message.chinoReply('error', t('commands:emoji.args-null'))

    if (option === 'add') {
      await emoji.roles.add(role)
      message.chinoReply('success', t('commands:restrictEmoji.successfullyAdded', { role: role.toString() }))
    } else if (option === 'remove') {
      await emoji.roles.remove(role)
      message.chinoReply('success', t('commands:restrictEmoji.successfullyRemoved', { role: role.toString() }))
    }
  }
}
