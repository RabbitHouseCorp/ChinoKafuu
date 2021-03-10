const axios = require('axios')

module.exports = class PolluxClient {
     constructor(data = require('../../../pollux.json')) {
        this.data = data
        this.userGame = new Map()
        

        /**
         * This is to load all the words so as not to make the command so slow
         */
        this.words = []
        this.reloadWords()
  
    }


    /**
     * @description This to reload the word list.
     * @returns {this}
     */
    reloadWords() {
        for (let data of this.words) {
            this.words.pop()
        }
        this.request(`/api/games/hangmaid/words`, 'constants').then(res => {
            for (let data of res.data) {
                this.words.push(data)
            
            }
        })
        return this
    }


    /**
     * 
     * @param {*} level Tells the level to search for difficult words
     * @returns {word: "null", theme: "null", level: 0}
     */
    randomWord(level) {
    
        let first = {
            word: "null",
            theme: "null",
            level: 0
        }

        const arrayWord = []
     
        for (let wordData of this.words) {
            if (wordData.level !== level) {
            } else {
                arrayWord.push(wordData)
            }
        }
        
        const randomNb = Math.floor(Math.random() * Math.floor(Math.random() * arrayWord.length))

        first = arrayWord[randomNb]
        
        return first
    }


    /**
     * 
     * @param {*} id Player ID
     * @param {*} channel To save the text channel for the player to receive a message
     * @param {*} ctx Context
     * @returns 
     */
    createHangmaid(id, channel, ctx) {
    
        const getGame = this.userGame
        const returns = this
     
        return this.userGame.set(id, {
            channel: channel,
            ctx: ctx,
            time: setTimeout(function()  {
                if (typeof getGame.get(id) === 'undefined') {
                } else {
                    returns.removeHangmaid(id, false)
                }
            }, 900000)
        })
    }

    /**
     * 
     * @param {*} id Player ID
     * @param {*} message To mention that the player that the match has ended!
     */
    removeHangmaid(id, message) {
        clearTimeout(this.userGame.get(id))
        try { if (message === true) {  this.userGame.get(id).ctx.send('O jogo foi finalizado!')   } } catch (error) {   }
        this.userGame.delete(id)
    }

    request(path, field, parameters = {}) {
        return axios({
            url: (this.data[field] + path),
            params: parameters,
            method: 'GET',
            headers: {
                'User-Agent': this.data['useragent']
            },
            responseType: (path.includes('generator') ? 'arraybuffer' : 'json'),
            paramsSerializer: (params) => {
                let result = '';
                Object.keys(params).forEach(key => {
                    result += `${key}=${encodeURIComponent(params[key])}&`;
                });
                return result.substr(0, result.length - 1);
            }
        })
    }
}