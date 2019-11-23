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
    if (!role) return message.chinoReply('error', 'esqueceu o cargo flor')
    if (!args[1].startsWith('#')) return message.chinoReply('errro', 'hex invalido pena kk')

    role.setColor()

  }
}