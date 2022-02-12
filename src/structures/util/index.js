const collectors = {
  MessageCollector: require('./collectors/MessageCollector'),
  ReactionCollector: require('./collectors/ReactionCollector'),
  EmbedBuilder: require('./EmbedBuilder'),
  Emoji: require('./EmotesInstance'),
  Logger: require('./Logger'),
  Command: require('../command/Command'),
  version: require('../../../package.json').version,
  TranslatorUtils: require('./TranslatorUtils'),
  TopGGUtils: require('./botlists/TopGGUtils'),
  Helper: require('./Helper'),
  AwayFromKeyboardUtils: require('./AwayFromKeyboardUtils'),
  InviteDMUtils: require('./InviteDMUtil'),
  BlacklistUtils: require('./BlacklistUtils'),
  Button: require('./../interactions/Button'),
  ResponseAck: require('./../interactions/ResponseAck'),
  UtilsGenerator: require('./UtilsGenerator')
}

module.exports = collectors
