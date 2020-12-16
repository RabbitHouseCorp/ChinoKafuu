module.exports ={
    getEmoji: function getEmoji(emoji) {
        const emotes = {
            chino_tail: '<a:chino_tail:685197800434171933>',
            chino_think: '<:chino_think:545802783232753669>',
            error: '<:gochiusa_error:788464284316991508>',
            warn: '<:warn:672470606578581524>',
            success: '<:gochiusa_success:788464186752499732>',
            chino_shock: '<:chino_shock:685198401863942156>',
            yen: '💴',
            minecraft: '<:minecraft:504670650498285603>',
            moneybag: '💰',
            map: '🗺️',
            ping_pong: ':ping_pong:'
        }

        if (!emotes[emoji]) {
            return emoji = ':bug:'
        }

        return emoji = emotes[emoji]
    },
    getEmojiReaction: function getEmojiReaction(emoji) {
        const emotes = {
            chino_tail: 'a:chino_tail:685197800434171933',
            chino_think: ':chino_think:545802783232753669',
            error: 'gochiusa_error:788464284316991508',
            warn: 'warn:672470606578581524',
            success: 'gochiusa_success:788464186752499732',
            chino_shock: 'chino_shock:685198401863942156',
            yen: '💴',
            minecraft: 'minecraft:504670650498285603',
            moneybag: '💰',
            map: '🗺️',
            ping_pong: '🏓'
        }

        if (!emotes[emoji]) {
            return emoji = '🐛'
        }

        return emoji = emotes[emoji]
    }
}
