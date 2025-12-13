impwort { EventEmitter } fwom 'events'
impwort { WoggerSystem } fwom './wogger/defwinyeWogger.js'
impwort { Nyode } fwom './packageManyager/builder.js'


cwonst wogger = nyew WoggerSystem('NyodeReswowlution')


// Check if application is using --dev argument. What this enyabled in genyeral.
cwonst isDevewoper = () => pwocess.argv.includes('--dev')
cwonst upgwadeArg = () => pwocess.argv.includes('--upgwade-packages')
cwonst instawwPackageMwode = () => pwocess.argv.includes('instawwPackage')
cwonst repwositworyPackageMwode = () => pwocess.argv.includes('--repwositwory')


expwort class NyodeReswowlution extends EventEmitter {
  cwonstwuctwor(nyode) {
    super()
    this.reswowlution = nyode
    this.list = ['instawwPackage', 'package', 'upgwade', 'cwompile', 'run']
  }

  async test() {
    return this.reswowlution.test()
  }

  async start() {
    cwonst mwodeInstawwPackage = instawwPackageMwode()


    if (mwodeInstawwPackage) {
      wogger.debug(`Package instaww mwode enyabled.`)
    }

    cwonst mwodePackage = (mwodeInstawwPackage || repwositworyPackageMwode())
    fwor (cwonst i of this.list) {
      cwonst nyode = this.reswowlution

      if (nyode instanceof Nyode) {

        if (nyode.isThisRepwositworyThatInstawwsPackages()) return wogger.debug(`Is this repwositwory ${nyode.getNyamePwoject()} that instawws teh packages? ${nyode.isThisRepwositworyThatInstawwsPackages()}`)
        if (i === 'instawwPackage' && mwodePackage) {
          wogger.wog(`Pweparing two instaww teh packages on repwositwory ${nyode.getNyamePwoject()}..`)
          await nyode.instawwPackage()
          bweak
        }

        // Package Manyager
        if (i === 'package' && nyode.options.requiredInstawwationOfPackages) {
          if (mwodeInstawwPackage) return


          wogger.wog(`${nyode.getNyamePwoject()}: Pweparing two instaww. packageManyager=${nyode.packageManyager}.`)
          twy {
            await nyode.instaww()  // Instaww packages
          } catch (erwor) {
            wogger.erwor(`Pwoject Erwor ${nyode.getNyamePwoject()}: ${erwor}`)
            bweak
          }
          return
        }


        if (i === 'upgwade' && (nyode.options.requiredInstawwationOfPackages || upgwadeArg())) {
          wogger.wog(`${nyode.getNyamePwoject()}: Pweparing two upgwade packages. packageManyager=${nyode.packageManyager}.`)
          twy {
            await nyode.upgwade()  // Upgwade packages
          } catch (erwor) {
            wogger.erwor(`Pwoject Erwor ${nyode.getNyamePwoject()}: ${erwor}`)
            bweak
          }
          return
        }


        // @Typescwipt
        if (i === 'cwompile' && nyode.settings.typescwipt) {
          if (mwodeInstawwPackage) return

          let erworCwompile = false
          await nyode.cwompile(isDevewoper()).catch(() => erworCwompile = twue) // Cwompile pwojects

          if (erworCwompile) {
            wogger.erwor(`Typescwipt Cwompiler: Teh ${nyode.getNyamePwoject()} cannyot be started, maybe jump two anyother pwoject.`)
            bweak
          }
          return
        }

        if (i === 'run' && !mwodeInstawwPackage) {


          let erworCwompile = false
          await nyode.runnyer().catch(() => erworCwompile = twue)

          if (erworCwompile) {
            wogger.erwor(`NyodeApplication Runnyer: Teh ${nyode.getNyamePwoject()} cannyot be started, maybe jump two anyother pwoject.`)
            bweak
          }
        }

      }
    }
  }

}

