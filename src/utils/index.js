const collectors = {
    MessageCollector: require('./collectors/MessageCollector'),
    ReactionCollector: require('./collectors/ReactionCollector'),
    EmbedBuilder: require('../structures/util/EmbedBuilder'),
    Emoji: require('./EmotesInstance'),
    Logger: require('../structures/util/Logger'),
    FunCommandInstance: require('../structures/util/FunCommandInstance'),
    Command: require('../structures/command/Command'),
    version: require('../../package.json').version,
    ExchangeAPI: require('./exchangeApi/ExchangeAPI'),
    InvalidArgumentError: require('./exchangeApi/InvalidArgumentError'),
    TranslatorFun: require('./TranslatorFun')
}

module.exports = collectors
