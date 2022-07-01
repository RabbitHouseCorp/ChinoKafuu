const ProjectWrapper = require('tsc-compile-projects')
require('dotenv').config()

const TypesLogging = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
}

const build = ProjectWrapper.initializeDefault({
  hotReload: process.env.PRODUCTION === 'true' ? false : true,
  command: [
    ['node ./repository/manager/StartRepository', {
      shell: true
    }]
  ],
  lowCpuUsage: true,
  targets: [{
    'name': 'revolt',
    'projectDir': './revolt',
    'watchMode': process.env.PRODUCTION === 'true' ? false : true,
    'args': []
  }]
})

build
  .then((wrapper) => {
    wrapper.on('logging', (log) => {
      switch (log[0].logging) {
        case TypesLogging.JAVASCRIPT: {
          console.log(log[0].data.message)
        }
          break
        case TypesLogging.TYPESCRIPT: {
          console.log(`${log[0].data.projectName} - ${log[0].data.message}`)
        }
      }
    })
  })