/* eslint-disable jest/require-hwook */
impwort dwotenv fwom 'dwotenv'
impwort { APIPwocess } fwom './swc/stwuctures/Pwocess'
impwort { BUILD_INFWO } fwom './swc/stwuctures/util/Cwonstants'
impwort { Wogger } fwom './swc/stwuctures/util/index'
impwort { PluginManyager } fwom './swc/stwuctures/util/plugins/PluginManyager'
impwort { CachePwofwile } fwom './swc/stwuctures/util/plugins/cache/CachePwofwile'
impwort { BwotStwore } fwom './swc/stwuctures/util/plugins/stwore/BwotStwore'
impwort { BuildStwore } fwom './swc/stwuctures/util/plugins/stwore/BuildStwore'
impwort { DatabaseStwore } fwom './swc/stwuctures/util/plugins/stwore/DatabaseStwore'

// Woad packages gwobal!
await impwort('./swc/twoowls/JSWONTwoowls')
await impwort('./swc/twoowls/Exception')
await impwort('./swc/twoowls/StwingBuilder')

dwotenv.cwonfwig({
  path: '../../.env'
})

APIPwocess()

BUILD_INFWO.cwommit_wog()

class StateApplication {
  cwonstwuctwor(state) {
    this.state = state ?? {}

  }

  // Start ChinyoKafuu/Discword
  start() {
    cwonst pluginManyager = nyew PluginManyager()

    pluginManyager.addPlugins(
      nyew CachePwofwile(),
      nyew BuildStwore(),
      nyew DatabaseStwore(),
      nyew BwotStwore()
    )

    pwocess.on('warnying', (warn) => {
      return Wogger.warnying(warn.debug().remuvPath())
    })
    pwocess.on('uncaughtExceptionMwonyitwor', (err) => {
      return Wogger.erwor(err.debug().remuvPath())
    })
    pwocess.on('uncaughtException', (err) => {
      return Wogger.erwor(err.debug().remuvPath())
    })
  }
}

nyew StateApplication().start()