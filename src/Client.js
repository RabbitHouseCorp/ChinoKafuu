const { Client, Collection } = require('discord.js')
const { readdir } = require('fs')


module.exports = class Chino extends Client {
    constructor(options = {}) {
        super(options);

        this.database = require('./database')
        this.embed = require('./structures/ChinoEmbed')
        this.commands = new Collection()
        this.aliases = new Collection()
        this.colors = require('./structures/colors')
        this.emotes = require('./structures/emotes')
        this.api = require('./structures/api')
        this.player = new Map()
        this.Discord = require('discord.js')
        this.config = require("../config.json")
    }
    reloadCommand (commandName) {
        const command = this.commands.get(commandName) || this.commands.get(this.aliases.get(commandName))
        if (!command) return false
        let dir = command.dir
        this.commands.delete(command.name)
        delete require.cache[require.resolve(`${dir}`)]
        const Command = require(`${dir}`)
        const cmd = new Command(this)
        cmd.dir = dir
        this.commands.set(cmd.name, cmd)
        return true
    }
    login (token) {
        super.login(token)
        return this
    }

    loadCommands(path) {
        readdir(__dirname + '/commands', (err, files) => {
            if (err) console.error(err);
            files.forEach(category => {
                readdir(`${__dirname}/commands/${category}`, (err, cmd) => {
                    
                    cmd.forEach(cmd => {
                        const command = new(require(`${__dirname}/commands/${category}/${cmd}`))(this);
                        command.dir = `${__dirname}/commands/${category}/${cmd}`
                        this.commands.set(command.config.name, command);
                        command.config.aliases.forEach(a => this.aliases.set(a, command.config.name));
                    })
                    
                })
            });
        });

        return this;
    }
    loadEvents(path) {
        readdir(path, (err, files) => {
            if (err) console.error(err);
            
            files.forEach(em => {
                const event = new(require(`../${path}/${em}`))(this);
                super.on(em.split(".")[0], (...args) => event.execute(...args));
            });
        });

        return this;
    }
}
