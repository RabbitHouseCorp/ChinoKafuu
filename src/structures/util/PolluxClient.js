const axios = require('axios')

module.exports = class PolluxClient {
  request (path, field, parameters = {}) {
    return axios({
      url: (process.env['POLLUX_' + field.toUpperCase()] + path),
      params: parameters,
      method: 'GET',
      headers: {
        'User-Agent': process.env.POLLUX_USER_AGENT
      },
      responseType: (path.includes('generator') ? 'arraybuffer' : 'json'),
      paramsSerializer: (params) => {
        let result = ''
        Object.keys(params).forEach(key => {
          result += `${key}=${encodeURIComponent(params[key])}&`
        })
        return result.substr(0, result.length - 1)
      }
    })
  }
}
