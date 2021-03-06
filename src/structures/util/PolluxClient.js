const axios = require('axios')

module.exports = class PolluxClient {
    constructor(data = require('../../../pollux.json')) {
        this.data = data
        this.userGame = new Map()
    }
    
    createHangmaid(id, channel, ctx) {
        const getGame = this.userGame
        const returns = this
     
        return this.userGame.set(id, {
            channel: channel,
            ctx: ctx,
            time: setTimeout(function()  {
                if (typeof getGame.get(id) === 'undefined') {
                } else {
                    returns.removeHangmaid(id)
                }
            }, 900000)
        })
    }

    removeHangmaid(id) {
        clearTimeout(this.userGame.get(id))
        try { this.userGame.get(id).ctx.send('O jogo foi finalizado com sucesso!')  } catch (error) {   }
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