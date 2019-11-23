const Command = require('../../structures/command')

module.exports = class RoleColorCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rolecolor',
      category: 'mod',
      OnlyDevs: true,
      UserPermission: ['MANAGE_ROLES'],
      ClientPermission: ['MANAGE_ROLES']
    })
  }

  async run({message, server, args}, t) {
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0])
    if (!role) return message.chinoReply('error', 'esqueceu o cargo flor')
    if (!args[1].startsWith('#')) return message.chinoReply('error', 'hex invalido pena kk')
    if (role.calculatedPosition > this.client.highestRole.calculatedPosition) return message.chinoReply('error', 'oi mo esse cargo eh maior q o meu entao eu nao consigo mudar, jae?')

    try {
     await role.setColor(args[1])
      message.chinoReply('success', 'mudou ne eu acho se nao mudou voce que lute kkk')
    } catch {
      message.chinoReply('error', 'Algo deu errado ao tentar mudar a cor do cargo. Verifique se a cor é uma cor hex válida.')
    }
  }

}