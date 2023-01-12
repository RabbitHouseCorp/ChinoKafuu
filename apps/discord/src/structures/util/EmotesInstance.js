import emotes from './Emojis'

export const Emoji = {
  getEmoji: function getEmoji(emoji) {
    if (!emotes[typeof emoji === 'string' ? emoji : '🐛']) {
      return emoji = {
        name: '🐛',
        id: '🐛',
        mention: '🐛',
        reaction: '🐛'
      }
    }

    const emojiSplit = emotes[typeof emoji === 'string' ? emoji : '🐛'].replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').trim().split(':')
    const objectEmoji = {
      name: emojiSplit[0],
      id: (emojiSplit[1] !== undefined) ? emojiSplit[1] : emojiSplit[0],
      mention: emotes[typeof emoji === 'string' ? emoji : '🐛'],
      reaction: (emojiSplit[1] !== undefined) ? `${emojiSplit[0]}:${emojiSplit[1]}` : `${emojiSplit[0]}`
    }

    return objectEmoji
  }
}