const Command = require("../../structures/command")
const parse = require("parse-duration")
module.exports = class TempMuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tempmute',
            category: 'mod',
            aliases: [],
            UserPermission: ["KICK_MEMBERS"],
            ClientPermission: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
            OnlyDevs: false,
            hidden: false,
        })
    } 
    async run({message, args, server}, t) {
        
        const member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply('error', t('commands:mention-null'))
        let time = args[1];
        if (!time) return message.chinoReply('error', t('commands:tempmute.time'))
        let reason = args.slice(2).join(' ')
        if (!reason) {
            reason = t("commands:no-reason")
        }
        let role = message.guild.roles.find(r => r.name === "Silenciado")
        if (!role) {
            role = await message.guild.createRole({
                name: "Silenciado",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false,
                    CONNECT: false
                });
            });
        }

        if (message.member.highestRole.position < message.guild.member(member).highestRole.position) return message.chinoReply("error", t("commands:punishment.unpunished"))
        
        let embed = new this.client.Discord.RichEmbed()
        .setTitle(t('commands:tempmute.title', {member: member.tag}))
        .setColor(this.client.colors.moderation)
        .setThumbnail(member.displayAvatarURL)
        .addField(t('commands:punishment.embed.memberName'), member.tag, true)
        .addField(t('commands:punishment.embed.memberID'), member.id, true)
        .addField(t('commands:punishment.embed.staffName'), message.author.tag, true)
        .addField(t('commands:punishment.embed.reason'), reason, true)

        message.guild.member(member).addRole(role.id).then(() => {
            message.channel.send(embed)
            if (server.punishModule) {
                message.guild.channels.get(server.punishChannel).send(embed).catch(err => {
                    message.channel.send(t("events:channel-not-found"))
                })
            }
        })
        setTimeout(function() {
            message.guild.member(member).removeRole(role.id)
        }, parse(time));
    }
}