const { RichEmbed } = require("discord.js")
module.exports = class GuildCreate {
  constructor(client) {
    this.client = client
  }
  
  async execute(guild) {

      let server = await this.client.database.Guilds.findById(guild.id)

      server = new this.client.database.Guilds({
        _id: guild.id
      })
      server.save()
      
      const embed = new RichEmbed()
      .setColor(this.client.colors.default)
      .setFooter("Servidor salvo no meu banco de dados com successo!")
      .addField("Obrigada por me adicionar", `Olá, eu sou ${this.client.user.username}, obrigada por me adicionar! Bom, eu sou um bot cheio de funções super divertidas para alegrar o seu dia, se você quiser saber quais os comandos eu tenho, use \`${server.prefix}help\`, está com alguma dúvida? Então entre em meu servidor de suporte usando \`${server.prefix}invite\`, mais uma vez, obrigada por me adicionar e tenha um bom divertimento!`)
      
      guild.channels.filter(c => c.type === "text").random().send(embed).catch(e => {})

  }
}