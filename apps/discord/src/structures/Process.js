import { WebSocket } from 'ws';

export const APIProcess = () => {
  process.title = 'framework+@chinokafuu/discord'
  if (process.env.PRODUCTION === 'false') {
    const ws = new WebSocket('ws://127.0.0.1:24607')

    ws.on('open', () => {
      setInterval(() => {
        const memoryUsage = process.memoryUsage()
        const cpuUsage = process.cpuUsage()
        const resourceUsage = process.resourceUsage()

        ws.send(JSON.stringify({
          t: 'process',
          d: {
            projectName: '@chinokafuu/discord',
            time: Date.now(),
            memoryUsage: {
              arrayBuffers: memoryUsage.arrayBuffers,
              external: memoryUsage.external,
              heapTotal: memoryUsage.heapTotal,
              heapUsed: memoryUsage.heapUsed,
              rss: memoryUsage.rss
            },
            cpuUsage: {
              system: cpuUsage.system,
              user: cpuUsage.user
            },
            resourceUsage: {
              fsRead: resourceUsage.fsRead,
              fsWrite: resourceUsage.fsWrite,
              ipcSent: resourceUsage.ipcSent,
              maxRss: resourceUsage.maxRSS,
              unsharedDataSize: resourceUsage.unsharedDataSize,
              unsharedStackSize: resourceUsage.unsharedStackSize
            }
          }
        }))
      }, 600)
    })
  }
}