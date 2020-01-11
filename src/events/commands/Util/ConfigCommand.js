const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")

module.exports = class ConfigCommand extends Command {
    constructor (client) {
        super(client, {
            name: "config",
            aliases: ["module", "configurações", "configurar"],
            category: "util",
            UserPermission: ["MANAGE_GUILD"]
        })
    }

    run({message, args, server}, t) {

        let listReport = [
            `${server.prefix}config report set <channel>`,
            `${server.prefix}config report disable`
        ]

        let listPunish = [
            `${server.prefix}config punishment set <channel>`,
            `${server.prefix}config punishment disable`
        ]
        let modules = [
            `**${t("commands:config.config-modules.punishment.channel")}:** ${server.punishChannel ? message.guild.channels.get(server.punishChannel) : t("commands:config.no-channel")}`,
            `**${t("commands:config.config-modules.punishment.module")}**: ${server.punishModule ? t("commands:config.config-modules.enable") : t("commands:config.config-modules.disable")}`,
            `**${t("commands:config.config-modules.report.channel")}:** ${server.channelReport ? message.guild.channels.get(server.channelReport) : t("commands:config.no-channel")}`,
            `**${t("commands:config.config-modules.report.module")}**: ${server.reportModule ? t("commands:config.config-modules.enable") : t("commands:config.config-modules.disable")}`
        ]
        
        const embed = new RichEmbed()
        .setColor(this.client.colors.default)
        .setTitle(t("commands:config.title"))
        .setThumbnail(message.guild.iconURL)
        .addField(t("commands:config.how-use"), `${server.prefix}config <options> <set/disable>`)
        .addField(t("commands:config.report.title"), listReport.join("\n"))
        .addField(t("commands:config.punishment.title"), listPunish.join("\n"))
        .addField(t("commands:config.modules"), modules.join("\n"))

        if (!args[0]) return message.channel.send(embed)
        if (!["report", "reportar", "punishment", "punições"].some(options => args[0].toLowerCase() === options)) return message.chinoReply("error", t("commands:config.module-not-found"))
        if (["report", "reportar"].includes(args[0].toLowerCase())) {
            if (!["desativar", "false", "disable", "definir", "set", "add"].some(options => args[1].toLowerCase() === options)) return message.chinoReply("error", t("commands:config.options-not-found"))
            if (["desativar", "false", "disable"].includes(args[1].toLowerCase())) {
                server.reportModule = false
                server.channelReport = ""
                server.save()

                return message.chinoReply("success", t("commands:config.report.disable"))
            }

            let channel = message.guild.channels.get(args[2].replace(/[<#>]/g, ""))

            if (["definir", "set", "add"].includes(args[1].toLowerCase())) {
                if (!channel) return message.chinoReply("error", t("commands:config.channel-null"))

                server.reportModule = true
                server.channelReport = channel.id
                server.save()

                return message.chinoReply("success", t("commands:config.report.enable"))
            }
        }

        if (["punishment", "punições"].includes(args[0].toLowerCase())) {
            if (!args[1]) return message.chinoReply("error", t("commands:config.options-not-found"))
            if (!["desativar", "false", "disable", "definir", "set", "add"].some(options => args[1].toLowerCase() === options)) return message.chinoReply("error", t("commands:config.options-not-found"))
            if (["desativar", "false", "disable"].includes(args[1].toLowerCase())) {
                server.punishModule = false
                server.punishChannel = ""
                server.save()

                return message.chinoReply("success", t("commands:config.punishment.disable"))
            }

            let channel = message.guild.channels.get(args[2].replace(/[<#>]/g, ""))

            if (["definir", "set", "add"].includes(args[1].toLowerCase())) {
                if (!channel) return message.chinoReply("error", t("commands:config.channel-null"))

                server.punishModule = true
                server.punishChannel = channel.id
                server.save()

                return message.chinoReply("success", t("commands:config.punishment.enable"))
            }
        }
    }
}