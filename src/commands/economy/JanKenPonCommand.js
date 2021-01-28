const {Command} = require('../../utils')
module.exports = class JanKePonCommand extends Command {
    constructor() {
        super({
            name: 'jankenpon',
            aliases: ['ppt', 'pedrapapeltesoura'],
            arguments: 1,
            hasUsage: true
        })
    }

    async run(ctx) {
        let user = await ctx.db.user
        let client = ctx.client.database.users.getOrCreate(ctx.client.user.id)
        let options = ['pedra', 'papel', 'tesoura']
        if (!['pedra', 'papel', 'tesoura', 'rock', 'paper', 'scissors'].includes(ctx.args[0])) return ctx.replyT('error', 'commands:jankenpon.optionNotFound')
        let clientChoice = options[Math.floor(Math.random() * options.length)]
        let me = ctx.args[0].toLowerCase()
        let result
        let emoji
        let value = ctx.args[1]
        if (!value) return ctx.replyT('warn', 'commands:jankenpon.valueNotInputed')
        let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
        if (invalidValue) return ctx.replyT('error', 'commands:pay.invalidValue')
        if (user.yens < value) return ctx.replyT('error', 'commands:pay.poorUser')
        const clientChoiceMappings = {
            tesoura: ['pedra', 'rock'],
            papel: ['tesoura', 'scissors'],
            pedra: ['papel', 'paper']
        }

        const clientDrawMappings = {
            tesoura: 'scissors',
            pedra: 'rock',
            papel: 'paper',
            scissors: 'scissors',
            rock: 'rock',
            paper: 'paper'
        }
        
        const userWinOption = (clientChoiceMappings[clientChoice]).includes(clientDrawMappings[me])
        if (userWinOption) {
            emoji = 'chino_upset'
            result = ctx._locale('commands:jankenpon.youWin', { 0: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[me]}`), 1: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[clientChoice]}`), 2: Number(value).toLocaleString() })
            user.yens += Math.floor(value)
            user.save()
        } else if (clientDrawMappings[clientChoice] === clientDrawMappings[me]) {
            emoji = 'chino_thiking'
            result = ctx._locale('commands:jankenpon.tie')
        } else if (!userWinOption) {
            emoji = 'chino_kek'
            result = ctx._locale('commands:jankenpon.youLose', { 0: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[me]}`), 1: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[clientChoice]}`), 2: Number(value).toLocaleString() })
            user.yens -= Math.floor(value)
            client.yens += Math.floor(value)
            user.save()
            client.save()
        }

        ctx.send('Jan ken pon').then(msg => {
            setTimeout(() => {
                msg.delete()
                ctx.reply(emoji, result)
            }, 2000)
        })
    }
}