const Command = require("../../structures/command")
module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'say',
        category: 'random',
        aliases: ['falar'],
        UserPermission: null,
        ClientPermission: null,
        OnlyDevs: false,
        hidden: false,
    })
   } 
   run({message, args, server}, t) {
        
    let say = args.join(' ');
    if (!args.join(" ")) return message.chinoReply('error', t('commands:say'));
    if (!message.member.hasPermission("MENTION_EVERYONE")) {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.createWebhook(message.author.username, message.author.displayAvatarURL).then(w => {
        w.send(args.join(' '), {
          disableEveryone: false
        })
        w.delete()
      })
        message.channel.send(say,{
          disableEveryone: false
      });
         
    } else {
  
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.createWebhook(message.author.username, message.author.displayAvatarURL).then(w => {
        w.send(args.join(' '), {
          disableEveryone: true
        })
        w.delete()
      })
      message.channel.send(say, { 
        disableEveryone: true
      })
    }
  }
}
