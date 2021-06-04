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
  TranslatorUtils: require('./TranslatorUtils'),
  TopGGUtils: require('./botlists/TopGGUtils'),
  Helper: require('../structures/util/Helper'),
  AwayFromKeyboardUtils: require('./AwayFromKeyboardUtils'),
  InviteDMUtils: require('./InviteDMUtil'),
  BlacklistUtils: require('./BlacklistUtils'),
  Button: require('../structures/interactions/Button'),
  ResponseAck: require('../structures/interactions/ResponseAck')
}

module.exports = collectors
