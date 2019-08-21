const Command = require("../../structures/command")
module.exports = class Unmute extends Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      category: 'mod',
      aliases: ['desmutar'],
      UserPermission: ["KICK_MEMBERS"],
      ClientPermission: ["MANAGE_ROLES"],
      OnlyDevs: false,
      hidden: false,
    })
  } 
  execute({message, args, server}, t) {
        
    const member = message.mentions.users.first() || this.client.users.get(args[0])
    if (!member) return message.chinoReply('error', t('commands:mention-null'))
    let role = message.guild.roles.find(r => r.name === "Silenciado")
    if (!message.guild.member(member).roles.find(r => r.name === "Silenciado")) return message.channel.send('error', t('commands:unmute.noMuted'))
    let reason = args.slice(1).join(" ")
    if (!reason) {
      reason = t("commands:no-reason")
    }
    let embed = new RichEmbed()
    .setTitle(t('commands:unmute.title', {member: member.tag}))
    .setColor(this.client.colors.moderation)
    .setThumbnail(member.displayAvatarURL)
    .addField(t('commands:punishment.embed.memberName'), member.tag, true)
    .addField(t('commands:punishment.embed.memberID'), member.id, true)
    .addField(t('commands:punishment.embed.staffName'), message.author.tag, true)
    .addField(t('commands:punishment.embed.reason'), reason, true)
  
    message.guild.member(member).removeRole(role.id).then(() => {
      message.channel.send(embed)
    }) 
  }
}