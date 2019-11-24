const Command = require('../../structures/command')

module.exports = class ReloadCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'reload',
      aliases: ['recarregar', 'r'],
      category: 'developers',
      OnlyDevs: true
    })
  }

  run ({ message, args, server }) {
    const option = this.getOption(args[0], ['command', 'comando'], ['evento', 'event'])
    if (!option) return message.chinoReply('error', 'me dê uma opção válida. Opções disponíveis: `evento`, `comando`')
    if (!args[1]) return message.chinoReply('error', 'me dê um comando/evento para recarregar.')
    const type = option === 'yes' ? 'comando' : 'evento'

    const rst = option === 'yes' ? this.client.reloadCommand(args[1]) : this.client.reloadEvent(args[1])
    if (rst instanceof Error) return message.chinoReply('error', `falha no recarregamento do ${type}.Stack:\n\`\`\`js${rst}\`\`\``)
    if (rst === false) return message.chinoReply('error', `${type} inexistente.`)

    message.chinoReply('success', `${type} recarregado com sucesso!`)
  }
}
