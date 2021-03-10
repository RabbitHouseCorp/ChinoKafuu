const { Command, MessageCollector } = require('../../utils')

module.exports = class HangmaidCommand extends Command {
    constructor() {
        super({
            name: 'hangmaid',
            hasUsage: true,
            arguments: 1,
            permissions: [{
                permissions: ['attachFiles']
            }]
        })
    }

    async run(ctx) {
        let countError = 0
        let letterCorrect = 0
        let letterCorrectUser = 0 /** Do not ask me  */
        let member = await ctx.getUser(ctx.args[0], true)
        let mode = '0'
        if (typeof ctx.args[0] === 'string') {
            mode = ctx.args[0]
        }

        const a = []
        let Theme = "".toLocaleUpperCase()
        const textRandom = await ctx.client.polluxClient.request(`/api/games/hangmaid/words?q=1&l=${mode === '1' ? Math.floor(Math.random() * 5) : '5'}`.replace("0", "1"), 'constants').then(res => {
            Theme = res.data[0].theme.toLocaleUpperCase()
            return res.data[0].word
        })
        let ChosenLetter = `${textRandom}`.toLocaleUpperCase()
            .replace(/( +)/g, '{')
            .split('')


        let letters = []
        let nb = -1

        for (let letter of ChosenLetter) {
            nb++
            letters.push({
                nb: nb,
                letter: letter,
                correct: false,
                isSpace: letter === '{' ? false : true,
                show: false
            })

        }


        const randomNb = [1, 2]


        switch (mode) {
            case '1':
                Array.from({ length: randomNb[Math.floor(Math.random() * randomNb.length)] }, () => {
                    letters[Math.floor(Math.random() * letters.length)].show = true
                    letters[Math.floor(Math.random() * letters.length)].correct = true
                    letterCorrect++
                })
                break;
            case '2':
                Array.from({ length: 1 }, () => {
                    letters[Math.floor(Math.random() * letters.length)].show = true
                    letters[Math.floor(Math.random() * letters.length)].correct = true
                    letterCorrect++
                })
                break;
            default:
                return ctx.send('Dificuldade:\n`1` - Fácil\n`2` - Difícil')
        }

        if (typeof ctx.client.polluxClient.userGame.get(member.id) === 'undefined') {
            ctx.client.polluxClient.createHangmaid(member.id, ctx.channel, ctx)
        } else {
            return ctx.send("Você não pode criar outra jogada porquê já existe um! Espere 15 minutos para terminar a jogada!");
        }

        const checkLetter = (letter) => {
            let success = 0
            let wrong = 0

            for (let infLetter of letters) {
                switch (letter) {
                    case "{":
                        /** SPACE IGNORE */
                        break;
                    default:
                        if (letters[infLetter.nb].correct === true) {
                            /** IGNORE THIS LETTER */
                        } else {
                            if (letter === infLetter.letter) {
                                if (letterCorrectUser === 0) {
                                    letterCorrect++
                                    letterCorrectUser = 1
                                } else {
                                    letterCorrect++
                                    letterCorrectUser++
                                }

                                success++
                                letters[infLetter.nb].correct = true


                                return
                            } else {
                                if (infLetter.show === true) {

                                } else {
                                    wrong++
                                }
                            }
                        }
                }
            }

            if (wrong === 0) {
                letterCorrectUser++
                success++
            } else {
                countError++
                if (typeof ChosenLetter.find(y => y === letter) === 'undefined') {
                    if (letter.length === 0) {

                    } else {

                        if (typeof a.find(u => u === letter.split("")[0]) === 'undefined') {

                            a.push(letter.split("")[0])
                        } else {

                        }
                    }
                } else {

                }
            }
        }

        const correctMap = (showBoolean) => {
            return letters.map((letter) => {
                if (letter.letter === "{") {
                    return " "
                }
                if (letter.correct === true) {
                    return letter.letter
                } else {
                    return "_"
                }
            }).join("")
        }

        const g = correctMap()

        ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(""), g: g, h: Theme })
            .then(buffer => {

                ctx.send(`Errou **${a.length} letras** e falta **${6 - a.length}** chances\nAcertou: ${correctMap()}\nVocê só pode errar no máximo 6 vezes`, {}, { file: buffer.data, name: 'hangmaid.png' }).then(msg => {

                    const collect = new MessageCollector(msg.channel, (message) => {
                        if (typeof ctx.client.polluxClient.userGame.get(member.id) === 'undefined') {
                            collect.ended = true
                            collect.emit('end', null, true);
                        } else {

                            checkLetter(message.content.toLocaleUpperCase())
                            if (a.length > 5 /**  RIP  */) {
                                try {
                                    ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(""), g: correctMap(), h: Theme })
                                        .then(buffer => {
                                            ctx.client.polluxClient.removeHangmaid(member.id)
                                            ctx.send(`😔 Você perdeu! ${letterCorrect > 1 ? `${ChosenLetter.length - letterCorrect > ChosenLetter.length ? `Acertou **${letterCorrectUser}** letras no jogo!` : `Acertou **${letterCorrectUser}** letras e faltava **${ChosenLetter.length - letterCorrect}** para terminar o jogo!`}` : "Não acertou nenhuma letra."}`,
                                                {}, { file: buffer.data, name: 'hangmaid.png' })
                                        })
                                    collect.ended = true
                                    collect.emit('end', null, true);
                                } catch { }
                                return
                            }

                            if (letterCorrect > ChosenLetter.length - 1) {
                                try {
                                    ctx.client.polluxClient.removeHangmaid(member.id)
                                    ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(""), g: correctMap(), h: Theme })
                                        .then(buffer => {
                                            ctx.replyT('tada', 'commands:hangmaid.winner', {}, {}, { file: buffer.data, name: 'hangmaid.png' })
                                        })
                                    collect.ended = true
                                    collect.emit('end', null, true);
                                } catch (ignore) {

                                }
                                return
                            }
                            ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(""), g: correctMap(), h: Theme })
                                .then(buffer => {

                                    ctx.send(`😔 Errou **${a.length} letras** e falta **${6 - countError}** chances\nJogo: ${correctMap().replace("_", "\_")}\nVocê só pode errar no máximo 6 vezes.`,
                                        {}, { file: buffer.data, name: 'hangmaid.png' })
                                })
                        }
                    })
                })
            })




    }
}