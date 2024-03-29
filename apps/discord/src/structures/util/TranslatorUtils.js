export const TranslatorUtils = function (language) {
  const langs = {
    auto: 'auto',
    af: 'af',
    sq: 'sq',
    ar: 'ar',
    hy: 'hy',
    az: 'az',
    eu: 'eu',
    be: 'be',
    bn: 'bn',
    bs: 'bs',
    bg: 'bg',
    ca: 'ca',
    ceb: 'ceb',
    ny: 'ny',
    'zh-cn': 'zh-cn',
    'zh-tw': 'zh-tw',
    co: 'co',
    hr: 'hr',
    cs: 'cs',
    da: 'da',
    nl: 'nl',
    en: 'en',
    eo: 'Esperanto',
    et: 'et',
    tl: 'tl',
    fi: 'fi',
    fr: 'fr',
    fy: 'fy',
    gl: 'gl',
    ka: 'ka',
    de: 'de',
    el: 'el',
    gu: 'gu',
    ht: 'ht',
    ha: 'ha',
    haw: 'haw',
    iw: 'iw',
    hi: 'hi',
    hmn: 'hmn',
    hu: 'hu',
    is: 'is',
    ig: 'ig',
    id: 'id',
    ga: 'ga',
    it: 'it',
    ja: 'ja',
    jw: 'jw',
    kn: 'kn',
    kk: 'kk',
    km: 'km',
    ko: 'ko',
    ku: 'ku',
    ky: 'ky',
    lo: 'lo',
    la: 'la',
    lv: 'lv',
    lt: 'lt',
    lb: 'lb',
    mk: 'mk',
    mg: 'mg',
    ms: 'ms',
    ml: 'ml',
    mt: 'mt',
    mi: 'mi',
    mr: 'mr',
    mn: 'mn',
    my: 'my',
    ne: 'ne',
    no: 'no',
    ps: 'ps',
    fa: 'fa',
    pl: 'pl',
    pt: 'pt',
    'pt-br': 'pt-br',
    ma: 'ma',
    ro: 'ro',
    ru: 'ru',
    sm: 'sm',
    gd: 'gd',
    sr: 'sr',
    st: 'st',
    sn: 'sn',
    sd: 'sd',
    si: 'si',
    sk: 'sk',
    sl: 'sl',
    so: 'so',
    es: 'es',
    su: 'su',
    sw: 'sw',
    sv: 'sv',
    tg: 'tg',
    ta: 'ta',
    te: 'te',
    th: 'th',
    tr: 'tr',
    uk: 'uk',
    ur: 'ur',
    uz: 'uz',
    vi: 'vi',
    cy: 'cy',
    xh: 'xh',
    yi: 'yi',
    yo: 'yo',
    zu: 'zu'
  }

  const input = typeof language === 'string' ? language.toLocaleLowerCase().replace(/([^A-Za-z]+)/g, '') : 'en'

  const checkIndex = ([k = '', v = '']) => {
    // Just to add percentage of searching in languages.
    k = k.replace(/([^A-Za-z]+)/g, '')
    v = v.replace(/([^A-Za-z]+)/g, '')
    return (k.search(input) >= 0 && k.includes(input)) && (v.search(input) >= 0 && v.includes(input))
  }
  const checkString = (i) => i[0].toLocaleLowerCase() === input && i[1].toLocaleLowerCase() === input
  const getLang = Object.entries(langs)
    .filter((i) => checkIndex(i) || checkString(i))
    .map((i) => i[1])

  return getLang[0] === undefined ? 'en' : getLang[0]
}
