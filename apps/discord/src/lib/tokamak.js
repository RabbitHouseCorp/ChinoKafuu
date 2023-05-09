import axios from 'axios'
import { Buffer } from 'node:buffer'
const genID = (name, disabled, cached) => Buffer.from(JSON.stringify({ name, disabled, cached }), 'base64')
export const ConstantBackground = {
  'chino_woaaah': {
    name: 'chino_woaaah',
    id: genID('chino_woaaah', false, false),
    disabled: false,
    cached: false,
    animated: true,
  },
  'gochiusa_1': {
    name: 'gochiusa_1',
    id: genID('gochiusa_1', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_2': {
    name: 'gochiusa_2',
    id: genID('gochiusa_2', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_3': {
    name: 'gochiusa_3',
    id: genID('gochiusa_3', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_4': {
    name: 'gochiusa_4',
    id: genID('gochiusa_4', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_5': {
    name: 'gochiusa_5',
    id: genID('gochiusa_5', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'mctha_red': {
    name: 'mctha_red',
    id: genID('mctha_red', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'no_game_no_life_1': {
    name: 'no_game_no_life_1',
    id: genID('no_game_no_life_1', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'no_game_no_life_2': {
    name: 'no_game_no_life_2',
    id: genID('no_game_no_life_2', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'nyc_skyline': {
    name: 'nyc_skyline',
    id: genID('nyc_skyline', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_1': {
    name: 'show_by_rock_1',
    id: genID('show_by_rock_1', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_2': {
    name: 'show_by_rock_2',
    id: genID('show_by_rock_2', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_3': {
    name: 'show_by_rock_3',
    id: genID('show_by_rock_3', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_4': {
    name: 'show_by_rock_4',
    id: genID('show_by_rock_4', false, false),
    disabled: false,
    cached: false,
    animated: false,
  },
}

// const versionExperimental = () => false

const Actions = ['renderProfile', 'renderLaranjo', 'renderLicense', 'renderRize', 'version']
const defineObject = (data = {}) => ({
  buffer: Buffer,
  byteLength: 0,
  length: 0,
  ...data
})

/**
 *
 * @param {{action: string;render: {buffer: BufferConstructor;byteLength: number;length: number; }; timeRequest: number;}} data
 * @returns
 */
const defineMetadata = (data = {}) => ({
  action: '', // String
  render: defineObject({}), // Buffer,
  timeRequest: 0,
  ...data
})

const profileStruct = (defineOptions = {}) => ({
  avatarUrl: '',
  bgId: '',
  stickerId: '',
  reps: '',
  married: false,
  name: '',
  aboutMe: '',
  favColor: '',
  money: '',
  type: '',
  badges: null,
  partnerName: '',
  avatarIcon: '',
  ...defineOptions
})

const laranjoStruct = (text = '') => (typeof text === 'string' ? { text } : (() => {
  throw `This is not a text, it appears to be: ${typeof text}`
})())

const licenseStruct = (defineOptions = {}) => ({
  text: '',
  name: '',
  avatarUrl: '',
  hexColor: '',
  ...defineOptions
})

const rizeStruct = (text = '') => (typeof text === 'string' ? { text } : (() => {
  throw `This is not a text, it appears to be: ${typeof text}`
})())

export const optionsTokamak = {
  tokamakUrl: process.env.TOKAMAK_URL,
  action: '',
  profileStruct: profileStruct(),
  laranjoStruct: laranjoStruct(),
  licenseStruct: licenseStruct(),
  rizeStruct: rizeStruct()
}

// Endpoint
// https://github.com/RabbitHouseCorp/tokamak/blob/master/src/server/server.go
const Endpoints = (url) => ({
  render: url + '/render/profile?w=600&h=400&type=thumb',
  version: url + 'version',
  renderLicense: url + '/render/license',
  renderRize: url + '/render/rize',
  renderLaranjo: url + '/render/laranjo',
  getBackground: url + '/get_backgrounds'
})

// Resolve image type.
const defineImageBufferTokamak = (contentType = '', buffer = {}) => {
  return defineObject({
    buffer: buffer,
    byteLength: buffer.byteLength,
    length: buffer.length,
    contentType
  })
}

const renderProfile = async (options = optionsTokamak) => {
  return new Promise((resolve, rejects) => {
    axios({
      url: Endpoints(options.tokamakUrl).render,
      method: 'post',
      data: options.profileStruct,
      responseType: 'arraybuffer'
    })
      .then((request) => {
        const time = Date.now()
        const buffer = defineImageBufferTokamak(request.headers.getContentType(), request.data)
        resolve(defineMetadata({
          timeRequest: time - Date.now(),
          ...buffer,
          ...options
        }))
      })
      .catch((error) => rejects(error))
  })
}

const renderLaranjo = async (options = optionsTokamak) => {
  return new Promise((resolve, rejects) => {
    return axios({
      url: Endpoints(options.tokamakUrl).renderLaranjo,
      method: 'post',
      data: options.laranjoStruct,
      responseType: 'arraybuffer'
    })
      .then((request) => {
        const time = Date.now()
        const buffer = defineImageBufferTokamak(request.headers.getContentType(), request.data)
        resolve(defineMetadata({
          timeRequest: time - Date.now(),
          ...buffer,
          ...options
        }))
      })
      .catch((error) => rejects(error))
  })
}

const renderLicense = async (options = optionsTokamak) => {
  return new Promise((resolve, rejects) => {
    return axios({
      url: Endpoints(options.tokamakUrl).renderLicense,
      method: 'post',
      data: options.licenseStruct,
      responseType: 'arraybuffer'
    })
      .then((request) => {
        const time = Date.now()
        const buffer = defineImageBufferTokamak(request.headers.getContentType(), request.data)
        resolve(defineMetadata({
          timeRequest: time - Date.now(),
          ...buffer,
          ...options
        }))
      })
      .catch((error) => rejects(error))
  })
}

const renderRize = async (options = optionsTokamak) => {
  return new Promise((resolve, rejects) => {
    return axios({
      url: Endpoints(options.tokamakUrl).renderRize,
      method: 'post',
      data: options.rizeStruct,
      responseType: 'arraybuffer'
    })
      .then((request) => {
        const time = Date.now()
        const buffer = defineImageBufferTokamak(request.headers.getContentType(), request.data)
        resolve(defineMetadata({
          timeRequest: time - Date.now(),
          ...buffer,
          ...options
        }))
      })
      .catch((error) => rejects(error))
  })
}

/**
 *
 * @param {keyof ConstantBackground} name
 * @returns {Promise<Buffer | null | undefined>}
 */
export const getBackground = async (name) => {
  const findBackground = Object.values(ConstantBackground)
    .find(([k]) => k === name)
  if (findBackground === undefined && findBackground === null)
    throw Error(`Tokamak.getBackground: You provided the wrong background name, I'm receiving: ${name}`)

  return new Promise((resolve, reject) => {
    return axios({
      url: (Endpoints(process.env.TOKAMAK_URL).getBackground + '/' + findBackground.name + '.png'),
      method: 'get',
      responseType: 'arraybuffer'
    })
      .then((request) => {
        if (request.statusText != '200' && request.statusText != '201')
          throw Error(`Tokamak.getBackground: 'Status Code invalid: ${request.statusText}'`)
        resolve(request.data)
      })
      .catch((error) => reject(error))
  })
}

export const requestTokamak = async (options = optionsTokamak) => {
  if (options !== undefined) {
    options = { ...optionsTokamak, ...options }
  }

  if (!Actions.includes(options.action)) throw `This chosen action does not exist, only: ${Actions.join(', ')}`

  return new Promise((resolve, rejects) => {
    if (options.action === 'renderProfile') {
      renderProfile(options)
        .then((render) => resolve(render))
        .catch((error) => rejects(error))
    } else if (options.action === 'renderLaranjo') {
      renderLaranjo(options)
        .then((render) => resolve(render))
        .catch((error) => rejects(error))
    } else if (options.action === 'renderLicense') {
      renderLicense(options)
        .then((render) => resolve(render))
        .catch((error) => rejects(error))
    } else if (options.action === 'renderRize') {
      renderRize(options)
        .then((render) => resolve(render))
        .catch((error) => rejects(error))
    }
  })
}