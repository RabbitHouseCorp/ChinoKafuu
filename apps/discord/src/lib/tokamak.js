/* eslint-disable security/detect-non-literal-fs-filename */
import axios from 'axios'
import { Buffer } from 'node:buffer'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'

import fs, { join } from 'node:path'
import { deflateRawSync, inflateRawSync, constants } from 'node:zlib'

/**
 *
 * @param {*} name Add an extra identifier to include in the cache information
 * @param {boolean} disabled Disable auto-delete of cache. (Make the framework not remove this cache temporarily)
 * @param {{expire?:number; status: boolean; typeCache: 'DO_NOT_CACHE' | 'CACHING_ENABLED' | 'CACHE_LIMITED'}} cached
 * @returns
 */
const genID = (name, disabled, cached = { expire: 20 * 1000, status: false, typeCache: 'DO_NOT_CACHE' }) =>
  Buffer.from(JSON.stringify({ name, disabled, cached }))
    .toString('base64')
    .replace(/==$|=$/g, '')
    .split('')
    .reverse()
    .join('') + '=='
export const ConstantBackground = {
  'chino_woaaah': {
    name: 'chino_woaaah',
    id: genID('chino_woaaah', false),
    disabled: false,
    cached: false,
    animated: true,
  },
  'gochiusa_1': {
    name: 'gochiusa_1',
    id: genID('gochiusa_1', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_2': {
    name: 'gochiusa_2',
    id: genID('gochiusa_2', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_3': {
    name: 'gochiusa_3',
    id: genID('gochiusa_3', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_4': {
    name: 'gochiusa_4',
    id: genID('gochiusa_4', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'gochiusa_5': {
    name: 'gochiusa_5',
    id: genID('gochiusa_5', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'mctha_red': {
    name: 'mctha_red',
    id: genID('mctha_red', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'no_game_no_life_1': {
    name: 'no_game_no_life_1',
    id: genID('no_game_no_life_1', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'no_game_no_life_2': {
    name: 'no_game_no_life_2',
    id: genID('no_game_no_life_2', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'nyc_skyline': {
    name: 'nyc_skyline',
    id: genID('nyc_skyline', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_1': {
    name: 'show_by_rock_1',
    id: genID('show_by_rock_1', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_2': {
    name: 'show_by_rock_2',
    id: genID('show_by_rock_2', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_3': {
    name: 'show_by_rock_3',
    id: genID('show_by_rock_3', false),
    disabled: false,
    cached: false,
    animated: false,
  },
  'show_by_rock_4': {
    name: 'show_by_rock_4',
    id: genID('show_by_rock_4', false),
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
export const getBackground = async (name, options = { cache: false }) => {
  const [findBackground, backgroundInfo] = Object.entries(ConstantBackground)
    .find(([k]) => k === name)
  if (findBackground === undefined && findBackground === null)
    throw Error(`Tokamak.getBackground: You provided the wrong background name, I'm receiving: ${name}`)
  const pathDirOfApp = fs.resolve('../', '../', '.chinokafuu/cache/image')
  if (options !== undefined && options.cache) {
    const checkFramework = existsSync(pathDirOfApp)
    if (checkFramework) {
      const checkCache = readdirSync(pathDirOfApp)
      if (checkCache.find((c) => c === backgroundInfo.id) !== undefined) {
        return inflateRawSync(readFileSync(join(pathDirOfApp, backgroundInfo.id)), {
          level: constants.Z_BEST_SPEED
        })
      }
    } else {
      mkdirSync(pathDirOfApp, { recursive: true })
    }
  }
  return new Promise((resolve, reject) => {
    return axios({
      url: (Endpoints(process.env.TOKAMAK_URL).getBackground + '/' + backgroundInfo.name + '.png'),
      method: 'get',
      responseType: 'arraybuffer'
    })
      .then((request) => {
        if (request.status != '200' && request.status != '201')
          throw Error(`Tokamak.getBackground: 'Status Code invalid: ${request.statusText}'`)
        if (request.data instanceof Buffer && (options !== undefined && options.cache)) {
          // const job = {
          //   id: backgroundInfo.id,
          //   options: {},
          //   size: request.data.byteLength
          // }
          const compressData = deflateRawSync(request.data, {
            level: constants.Z_BEST_COMPRESSION
          })
          writeFileSync(join(pathDirOfApp, backgroundInfo.id), compressData, {})
        }
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