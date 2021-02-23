const axios = require('axios')

module.exports = class PolluxClient {
    constructor(data = require('../../../pollux.json')) {
        this.data = data
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