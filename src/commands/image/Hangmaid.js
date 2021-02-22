const { Command } = require('../../utils')

module.exports = class HangmaidCommand extends Command {
    constructor() {
        super({
            name: 'hangmaid',
            hasUsage: true,
            arguments: 0,
            permissions: [{
                permissions: ['attachFiles']
            }]
        })
    }

    async run(ctx) {
        ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: 'az', g: "t sting", h: 'testing' })
        .then(buffer => { console.log(buffer)
 ctx.send('', {}, { file: buffer.data, name: 'hangmaid.png' }) })
    }
}