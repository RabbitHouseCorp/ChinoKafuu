const Command = require('../../structures/command')

module.exports = class RoleColorCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rolecolor',
      category: 'mod',
      OnlyDevs: false,
      UserPermission: ['MANAGE_ROLES'],
      ClientPermission: ['MANAGE_ROLES']
    })
  }

  async run({message, server, args}, t) {
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0])
    if (!role) return message.chinoReply('error', t('commands:roleColor.invalidRole'))
    if (role.rawPosition > message.guild.me.roles.highest.rawPosition) return message.chinoReply('error', t('commands:roleColor.higherRole'))
    if (!args[1].startsWith('#')) return message.chinoReply('error', t('commands:roleColor.invalidHex'))
    if (args[1].length < 7 || args[1].length > 7) return message.chinoReply('error', t('commands:roleColor.invalidHex'))

    role.setColor(args[1]).then(message.chinoReply('success', t('commands:roleColor.success')))
  }
}