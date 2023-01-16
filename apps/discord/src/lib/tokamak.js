import axios from 'axios'
import { Buffer } from 'node:buffer'

const Actions = ['renderProfile', 'renderLaranjo', 'renderLicense', 'renderRize', 'version']
const defineObject = (data = {}) => ({
  buffer: Buffer,
  byteLength: 0,
  length: 0,
  ...data
})
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