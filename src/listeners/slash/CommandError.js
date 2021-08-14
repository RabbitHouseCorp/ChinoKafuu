const Listener = require('../../structures/events/Listener')

module.exports = class CommandError extends Listener {
        constructor() {
            super()
            this.event = 'commandOK'
        }

        async on(client, commandError, error) {

        }

    }
