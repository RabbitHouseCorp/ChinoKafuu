const emotes = require('./Emojis')
module.exports = {
    getEmoji: function getEmoji(emoji) {

        if (!emotes[emoji]) {
            return emoji = ':bug:'
        }

        return emotes[emoji]
    },
    getEmojiReaction: function getEmojiReaction(emoji) {
        if (!emotes[emoji]) {
            return emoji = {
                name: '🐛',
                id: '🐛',
                mention: '🐛'
            }
        }
        const emojiSplit = emotes[emoji].replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').trim().split(':')
        const objectEmoji = {
            name: emojiSplit[0],
            id: (emojiSplit[1] !== undefined) ? emojiSplit[1] : emojiSplit[0],
            mention: (emojiSplit[1] !== undefined) ? `${emojiSplit[0]}:${emojiSplit[1]}` : `${emojiSplit[0]}`
        }
        
        return objectEmoji
    }
}
