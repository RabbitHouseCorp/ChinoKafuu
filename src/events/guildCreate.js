const { MessageEmbed } = require("discord.js")
const i18next = require("i18next")
const translationBackend = require("i18next-node-fs-backend")
const fs = require("fs")
module.exports = class GuildCreate {
    constructor(client) {
        this.client = client
        this.region = {
            "brazil": "pt-BR",
            "eu-central": "en-US",
            "eu-west": "en-US",
            "hongkong": "en-US",
            "japan": "en-US",
            "russia": "en-US",
            "singapore": "en-US",
            "southafrica": "en-US",
            "sydney": "en-US",
            "us-central": "es",
            "us-east": "en-US",
            "us-south": "es",
            "us-west": "en-US",
        }
    }

    async run(guild) {

        let server = await this.client.database.Guilds.findById(guild.id)
        if (!server) {
            server = new this.client.database.Guilds({
                _id: guild.id,
                lang: this.region[guild.region]
            })
            server.lang = this.region[guild.region]
            server.save()
            let t
            const setFixedT = function (translate) {
                t = translate
            }
            const language = (server && server.lang) || "pt-BR"
            setFixedT(i18next.getFixedT(language))

            return new Promise(async (resolve, reject) => {
                i18next.use(translationBackend).init({
                    ns: ["commands", "events", "permissions"],
                    preload: await fs.readdirSync("./src/locales/"),
                    fallbackLng: "pt-BR",
                    backend: {
                        loadPath: "./src/locales/{{lng}}/{{ns}}.json"
                    },
                    interpolation: {
                        escapeValue: false
                    },
                    returnEmptyString: false
                }, async (err, f) => {
                    if (f) {
                        if (server) {
                            let auditLogs = await guild.fetchAuditLogs()
                            let auditLogsFilter = auditLogs.entries.filter(audit => audit.action === "BOT_ADD").array()[0]
                            let guildIcon = guild.iconURL({ format: "png", dynamic: true, size: 2048 })
                            const embed = new MessageEmbed()
                                embed.setImage("https://cdn.discordapp.com/attachments/589293933939392533/672268982887383080/91fe833b1dc7d14bc96fd4efd0bc8dc2.gif")
                                embed.setColor(this.client.colors.default)
                                guild.icon ? embed.setFooter(t("events:added-to-guild.guild-saved"), guildIcon) : embed.setFooter(t("events:added-to-guild.guild-saved"))
                                embed.addField(t("events:added-to-guild.thanks-to-add"), t("events:added-to-guild.msg", {
                                    prefix: server.prefix, client: this.client.user.username,
                                    author: auditLogsFilter.executor.tag,
                                    guild: guild.name
                                }))


                            auditLogsFilter.executor.send(embed).catch(() => {
                                guild.channels.filter(c => c.type === "text").random().send(embed).catch()
                            })
                        }
                    }
                })
            })
        } else {
            let t
            const setFixedT = function (translate) {
                t = translate
            }
            const language = (server && server.lang) || "pt-BR"
            setFixedT(i18next.getFixedT(language))
            return new Promise(async (resolve, reject) => {
                i18next.use(translationBackend).init({
                    ns: ["commands", "events", "permissions"],
                    preload: await fs.readdirSync("./src/locales/"),
                    fallbackLng: "pt-BR",
                    backend: {
                        loadPath: "./src/locales/{{lng}}/{{ns}}.json"
                    },
                    interpolation: {
                        escapeValue: false
                    },
                    returnEmptyString: false
                }, async (err, f) => {
                    if (f) {
                        const embed = new MessageEmbed()
                            .setImage("https://cdn.discordapp.com/attachments/589293933939392533/672268982887383080/91fe833b1dc7d14bc96fd4efd0bc8dc2.gif")
                            .setColor(this.client.colors.default)
                            .setFooter(t("events:added-to-guild.guild-saved"), guild.icon)
                            .addField(t("events:added-to-guild.thanks-to-add"), t("events:added-to-guild.msg", { prefix: server.prefix, client: this.client.user.username }))

                        guild.channels.filter(c => c.type === "text").random().send(embed).catch()
                    }
                })
            })
        }
    }
}
