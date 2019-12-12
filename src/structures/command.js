module.exports = class Command {
    constructor(client, options) {
        this.client = client;

        this.name = options.name || null
        this.aliases = options.aliases || []
        this.category = options.category || 'util'
        
        this.UserPermission: options.UserPermission || null
        this.ClientPermission: options.ClientPermission || null
        
        this.OnlyDevs = !!options.OnlyDevs
        this.hidden = false
    }

    setT (translate) {
        return this.t = translate
    }
    
    getT () {
        return this.t
    }
}
