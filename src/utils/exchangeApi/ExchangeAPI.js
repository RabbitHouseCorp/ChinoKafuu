const fetch = require('node-fetch')
const InvalidArgumentError = require('./InvalidArgumentError')
const TIME_CACHE_MINUTES = 15

class ExchangeAPI {
    constructor() {
        this._url = 'https://api.exchangeratesapi.io'
        this._cache = {}
        this.MAX_AGE = TIME_CACHE_MINUTES * 60 * 1000
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new ExchangeAPI()
        }

        return this._instance
    }

    _isCacheValid(cachedValue) {
        return cachedValue && cachedValue.timestamp && new Date().getTime() - cachedValue.timestamp < this.MAX_AGE
    }

    _isValidRate(rate) {
        return ExchangeAPI.ACCEPTED_RATES.includes(rate)
    }

    async getExchange(from, to) {
        const key = `${from}-${to}`
        const cached = this._cache[key]
        let data

        if (!this._isValidRate(from)) {
            throw new InvalidArgumentError(from)
        }

        if (!this._isValidRate(to)) {
            throw new InvalidArgumentError(to)
        }

        if (from === to) {
            data = { rates: { [`${to}`]: 1 } }
        }

        if (this._isCacheValid(cached)) {
            data = { ...cached, isCached: true }
        } else {
            const res = await fetch(`${this._url}/latest?base=${from}&symbols=${to}`)
            data = await res.json()
            data.timestamp = new Date().getTime()
            this._cache[key] = data
        }

        return data
    }
}

ExchangeAPI.ACCEPTED_RATES = [
    'CAD',
    'HKD',
    'ISK',
    'PHP',
    'DKK',
    'HUF',
    'CZK',
    'GBP',
    'RON',
    'SEK',
    'IDR',
    'INR',
    'BRL',
    'RUB',
    'HRK',
    'JPY',
    'THB',
    'CHF',
    'EUR',
    'MYR',
    'BGN',
    'TRY',
    'CNY',
    'NOK',
    'NZD',
    'ZAR',
    'USD',
    'MXN',
    'SGD',
    'AUD',
    'ILS',
    'KRW',
    'PLN'
]

module.exports = ExchangeAPI