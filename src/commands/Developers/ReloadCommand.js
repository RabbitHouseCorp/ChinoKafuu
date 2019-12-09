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

  run ({ message, args, server }, t) {
    const option = this.getOption(args[0], ['command', 'comando'], ['evento', 'event'])
    if (!option) return message.chinoReply('error', t('commands:reload.invalidOption'))
    if (!args[1]) return message.chinoReply('error', t('command:reload.invalidCommand'))
    const type = option === 'yes' ? 'comando' : 'evento'

    const rst = option === 'yes' ? this.client.reloadCommand(args[1]) : this.client.reloadEvent(args[1])
    if (rst instanceof Error) return message.chinoReply('error', t(`commands:reload.failure`, { type, rst }))
    if (rst === false) return message.chinoReply('error', t('commans:reload.nonExistent', { type }))

    message.chinoReply("success", t('commands:reload.success'))
  }
}
