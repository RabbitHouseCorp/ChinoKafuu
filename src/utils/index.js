const collectors = {
    MessageCollector: require('./collectors/MessageCollector'),
    ReactionCollector: require('./collectors/ReactionCollector'),
    EmbedBuilder: require('../structures/util/EmbedBuilder'),
    Emoji: require('./EmotesInstance'),
    Logger: require('../structures/util/Logger'),
    FunCommandInstance: require('../structures/util/FunCommandInstance'),
    Command: require('../structures/command/Command'),
    version: require('../../package.json').version
}

module.exports = collectors
