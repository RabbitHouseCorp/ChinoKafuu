const Command = require("../../structures/command")
let math = require('mathjs');
module.exports = class CalculateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'calculate',
            category: 'util',
            aliases: ['calcular', "calc"],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        
        const pergunta = args.join(" ");
	    if (!pergunta) return message.chinoReply('error', t('commands:calc.args-null'))
        let resposta = math.evaluate(pergunta);
    
	    message.chinoReply('diamond', t('commands:calc.result', {author: message.author, resposta: resposta}))
   }
}