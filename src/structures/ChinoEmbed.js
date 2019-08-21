const { RichEmbed } = require('discord.js');

module.exports = class ChinoEmbed extends RichEmbed {
    constructor(data = {}) {
        super(data)
        this.setColor('#6b8dff')
    }
}