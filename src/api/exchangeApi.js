const fetch = require('node-fetch');
const InvalidArgumentError = require('../error/invalidArgumentError');

/**
 * tempo em minutos para persistencia dos dados de conversão monetária em cache
 */
const TIME_CACHE_MINUTES = 15;

/**
 * classe utilizada para fazer requisições de valores para conversões monetárias
 */
class ExchangeApi {
  constructor() {
    this._url = 'https://api.exchangeratesapi.io';
    
    this._cache = {};
    
    // 15 minutes
    this.MAX_AGE = TIME_CACHE_MINUTES * 60 * 1000;
  }

  /**
   * @returns instância da classe ExchangeApi para realização das consultas
   */
  static getInstance() {
    if (!this._instance) {
      this._instance = new ExchangeApi();
    }
    return this._instance;
  }

  /**
   * verifica se o valor guardado na cache é válido
   * @param {object} cachedValue valor guardado na cache
   * @returns boolean true caso for válido e false caso expirado
   */
  _isCacheValid(cachedValue) {
    return cachedValue 
            && cachedValue.timestamp
            && new Date().getTime() - cachedValue.timestamp  > 0;
  }

  /**
   * verifica se a chave que será utilizada é válida na API
   * @param {string} rate base para a conversão monetária
   */
  _isValidRate(rate) {
    return ExchangeApi.ACCEPTED_RATES.includes(rate);
  }

  /**
   * realiza uma requisição à api exchangeratesapi
   * 
   * @param {string} from moeda base para a consulta
   * @param {string} to moeda alvo para a consulta
   * 
   * @returns os valores atuais
   * @throws InvalidArgumentError no caso de algum dos parâmetros não for suportado pela API
   */
  async getExchange(from, to) {
    const key = `${from}-${to}`;
    const cached = this._cache[key];
    let data;

    if (!this._isValidRate(from)) {
      throw new InvalidArgumentError(from);
    } 
    if (!this._isValidRate(to)) {
      throw new InvalidArgumentError(to);
    }

    if (this._isCacheValid(cached)) {
      data = { ...cached, isCached: true };
    } else {
      const res = await fetch(`${this._url}/latest?base=${from}&symbols=${to}`)
      data = await res.json();
      data.timestamp = new Date().getTime();
      this._cache[key] = data;
    }

    return data;
  }

}

/**
 * valores aceitos pela API exchangeratesapi
 */
ExchangeApi.ACCEPTED_RATES = [
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

module.exports = ExchangeApi;