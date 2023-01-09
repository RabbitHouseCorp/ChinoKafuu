
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { LoggerSystem } from './logger/defineLogger.js'
import { NodeLinkResolver } from './NodeLinkResolver.js'
import { resolveDir } from './utils/resolveDir.js'

// Clear chat :)
if (process.argv.includes('--auto-clear')) {
  process.stdout.write(`\x1Bc`)
}


const packageFramework = () => {
  const p = JSON.parse(readFileSync(resolve('package.json')))

  return p
}


const logger = new LoggerSystem('FrameworkRepository')




const startFramework = async () => {
  const t = packageFramework()
  logger.log(`The ${t.name} is working with version ${t.version}`)

  const dirs = await resolveDir()
  const link = NodeLinkResolver.new(dirs, true)
  let filtered = link.nodes

  if (process.argv.includes('--no-ts')) {
    filtered = link.nodes.filter((node) => node.settings.typescript == false)
  }


  for (const node of filtered) {
    await node.resolution.test()
  }
}


startFramework()

