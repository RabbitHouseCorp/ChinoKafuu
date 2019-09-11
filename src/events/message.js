const i18next = require('i18next')
const fs = require('fs')
const translationBackend = require('i18next-node-fs-backend')
const { RichEmbed } = require("discord.js")
const moment = require("moment")
const cooldown = new Map()
require("moment-duration-format")
module.exports = class MessageReceive {
    constructor(client) {
        this.client = client;
        this.config = require('../../config')
    }

    async execute(message) {

        if (message.channel.type === 'dm') return;
        if (message.author.bot) return;

        let server = await this.client.database.Guilds.findById(message.guild.id)
        if (!server) {
          let g = new this.client.database.Guilds({
            '_id': message.guild.id
          })
          g.save()
        }
        let user = await this.client.database.Users.findById(message.author.id)
        if (!user || user === null) {
            let novoUser = new this.client.database.Users({
                '_id': message.author.id
            })
            novoUser.save()
        }
      

        let t;
        const setFixedT = function (translate) {
            t = translate
        }

        const language = (server && server.lang) || 'pt-BR'
        setFixedT(i18next.getFixedT(language))

        return new Promise(async (resolve, reject) => {
            i18next.use(translationBackend).init({
                ns: ['commands', 'events', 'help'],
                preload: await fs.readdirSync('./src/locales/'),
                fallbackLng: 'pt-BR',
                backend: {
                    loadPath: `./src/locales/{{lng}}/{{ns}}.json`
                },
                interpolation: {
                    escapeValue: false
                },
                returnEmptyString: false
            }, async (err, f) => {
                if (f) {
                    if (message.mentions.users.size > 0) {
                        let number = 1
                        message.mentions.users.forEach(async (member) =>  {
                          if (!member) return
                          let user = await this.client.database.Users.findById(member.id)
                          if (user) {
                              if (user.afk) {
                                  if (!user.afkReason) {
                                      message.reply(`\`${member.tag}\` ${t("commands:afk.no-reason")}`)
                                      return
                                  }

                                  message.reply(`\`${member.tag}\` ${t("commands:afk.with-reason", {reason: user.afkReason})}`)
                              }
                          }
                        })
                    }
                    
                    let member = await this.client.database.Users.findById(message.author.id)
                    
                    if (member) {
                        if (member) {
                            member.afk = false
                            member.afkReason = null
                            member.save()
                        }
                    }

                    if (message.content === `<@${this.client.user.id}>` || message.content === `<@!${this.client.user.id}>`) {
                        message.channel.send(`${t("events:mention.start")} ${message.author}, ${t("events:mention.end", {prefix: server.prefix})}`)
                    }

                    if (!message.content.startsWith(server.prefix)) return;
                    const args = message.content.slice(server.prefix.length).trim().split(/ +/g);
                    const command = args.shift().toLowerCase()
                    const comando = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
                    
                    if (cooldown.has(message.author.id)) {
                        let time = cooldown.get(message.author.id)
                        return message.chinoReply("error", t("events:cooldown.message", {time: (time - Date.now() > 1000) ? moment.utc(time - Date.now()).format(`ss [${t("events:cooldown.secounds")}]`) : moment.duration(time - Date.now()).format(`ms [${t("events:cooldown.milliseconds")}]`)}))
                        
                      }
                      cooldown.set(message.author.id, Date.now() + 5000)
                      
                      setTimeout(() => {
                          cooldown.delete(message.author.id)
                      }, 5000)


                    if (server.commandNull === true) {
                        if (!comando) return message.chinoReply("error", t("events:command-null"))
                    }
                    if (comando.config.OnlyDevs) {
                        if (!this.config.owners.includes(message.author.id)) return message.chinoReply('error', t('commands:onlyOwner')) 
                    }

                    let perms = comando.config.UserPermission
                    if (perms !== null) {
                        if (!message.member.hasPermission(perms)) {
                            let perm = perms.map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, ' ')).join(', ')
                            return message.chinoReply("error", `${t('commands:userNoPermission', {perm: perm})}`)
                        }
                    }
                    try {
                        comando.setT(t)
                        message.channel.startTyping()
                        comando.execute({message, args, server}, t).then(() => {
                            message.channel.stopTyping()
                        }).catch(err => {
                            message.channel.stopTyping()
                            if (err.stack.length > 1800) {
                                err.stack = err.stack.substr(0, 1800)
                                err.stack = `${err.stack}...`
                              }
                              const embed = new RichEmbed()
                              .setColor(this.client.colors.error)
                              .setTitle(`${this.client.emotes.chino_sad} ${t("events:error")} ${this.client.emotes.chino_chibi}`)
                              .setDescription(`\`\`\`js\n${err.stack}\`\`\``)
                  
                              message.channel.send(embed)
                        })
                    } catch (err) {
                        message.channel.stopTyping()
                        console.error(err.stack)
                    }
                }
            })
        })
    }
}