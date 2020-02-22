module.exports = class Command {
  constructor(client, options) {
    this.client = client;

    this.config = {
      name: options.name || null,
      category: options.category || "util",
      aliases: options.aliases || [],
      UserPermission: options.UserPermission || null,
      ClientPermission: options.ClientPermission || null,
      OnlyDevs: options.OnlyDevs || false,
      hidden: false
    }
  }

  setT (t) {
    this.config.t = t
  }
  
  getT() {
    return this.config.t
  }

  getOption (message, yes = ['adicionar', 'adc', 'add', 'insert'], no = ['remover', 'remove', 'delete', 'deletar']) {
    const cleanMessage = message.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    if (yes.filter(a => a === cleanMessage)[0]) return 'yes'
    if (no.filter(a => a === cleanMessage)[0]) return 'no'
    return null
  }
  
  getEmoji (message, text) {
    return message.guild.emojis.get((text.split(':')[2] || '').replace('>', '')) || message.guild.roles.get(text) || message.guild.emojis.find(a => a.name.toLowerCase() === text.toLowerCase()).first()
  }
  getRole (message, text, useMention = false) {
    if (message.mentions.roles.first() && text && useMention) return message.mentions.roles.first()
    else return message.guild.roles.get(text) || message.guild.roles.get(text.split('@&')[1].replace('>', '')) || message.guild.roles.find(a => a.name.toLowerCase() === text.toLowerCase()).first()
  }
  getUser (message, text, useMention = false) {
    if (message.mentions.users.first() && text && useMention) return message.mentions.users.first()
    else return message.guild.users.get(text) || message.guild.users.get(text.split('@')[1].replace('>', '')) || message.guild.users.find(a => a.username.toLowerCase() === text.toLowerCase()).first()
  }
}