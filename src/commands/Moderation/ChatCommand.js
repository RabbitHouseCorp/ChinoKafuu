const Command = require("../../structures/command")
module.exports = class ChatCommand extends Command {
    constructor(client) {
       super(client, {
           name: 'chat',
           category: 'mod',
           aliases: [],
           UserPermission: ["MANAGE_CHANNELS"],
           ClientPermission: ["MANAGE_CHANNELS"],
           OnlyDevs: false,
           hidden: false,
       })
   } 
  execute({message, args, server}, t) {
        
    let role = message.guild.defaultRole
    switch(args[0]) {
      case 'on':
      message.channel.overwritePermissions(role, {
        SEND_MESSAGES: null
      })
      message.chinoReply('success' , t('commands:chat.enable'))
    break;
      case 'off':
      message.channel.overwritePermissions(role, {
        SEND_MESSAGES: false    
      })
      message.chinoReply('success', t('commands:chat.disable'))
      break;
      default:
      message.chinoReply('error', t('commands:chat.args-null'))
    } 
  }
}