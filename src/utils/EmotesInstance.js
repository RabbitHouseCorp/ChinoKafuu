const emotes = require('./Emojis')
module.exports = {
  getEmoji: function getEmoji (emoji) {
    if (!emotes[emoji]) {
      return emoji = {
        name: '🐛',
        id: '🐛',
        mention: '🐛',
        reaction: '🐛'
      }
    }

    const emojiSplit = emotes[emoji].replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').trim().split(':')
    const objectEmoji = {
      name: emojiSplit[0],
      id: (emojiSplit[1] !== undefined) ? emojiSplit[1] : emojiSplit[0],
      mention: emotes[emoji],
      reaction: (emojiSplit[1] !== undefined) ? `${emojiSplit[0]}:${emojiSplit[1]}` : `${emojiSplit[0]}`
    }

    return objectEmoji
  }
}
