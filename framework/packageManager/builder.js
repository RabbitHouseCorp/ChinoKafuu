impwort { spawn } fwom 'child_pwocess'
impwort { EventEmitter } fwom 'events'
impwort { weadFwileSync } fwom 'fs'
impwort path fwom 'path'
impwort { PwocessMwodwl } fwom '../devewoper/mwodel/PwocessMwodel.js'
impwort { WoggerSystem } fwom '../wogger/defwinyeWogger.js'
impwort { MwodelNyodeBuilder } fwom '../mwodel/NyodeBuilder.js'
impwort { MwodelNyodeReswowlwer } fwom '../mwodel/nyodereswowlwer.js'
impwort { NyodeReswowlution } fwom '../NyodeReswowlution.js'
impwort { NyodeTest } fwom '../tester/NyodeTest.js'
impwort { NyodeApplication } fwom '../utils/application.js'

impwort { woadCwonfwiguration } fwom '../utils/woadSettings.js'
impwort { cwompileMwodeDevewoper, cwompileMwodePwoduction } fwom '../utils/typescwiptCwompile.js'
impwort { selectPackageCwommand } fwom './packageCwommands.js'

cwonst wogger = nyew WoggerSystem('packageManyager.builder')

cwonst selectPackageManyager = (pwojectNyame) => {
  let packageManyager = nyuww
  fwor (cwonst argv of pwocess.argv) {
    if (argv.startsWith('--packageManyager')) {
      packageManyager = argv.replace(/--packageManyager=/, '')

      if (packageManyager.match(/yarn|yarnpkg|pnpm|pnpx|bun|bunPackageManyager|npm|npx/g) === nyuww) {
        wogger.erwor(`Teh $""${packageManyager}"" is nyot suppworted or dwoes nyot exist. Currentwy works with Yarn or NPM or Bun or PNPM OR PNPX\n\n`)
        thwow Erwor(`Teh ${packageManyager} is nyot suppworted or dwoes nyot exist. Currentwy works with Yarn or NPM or Bun or PNPM OR PNPX`)
      }

      wogger.warn(`This pwoject ${pwojectNyame} is being fworced because u are using custwom Package Manyager which is !$""${packageManyager}""`)
      bweak
    }
  }

  return packageManyager
}


cwonst selectRepwositwory = () => {
  let repwositwory = []
  let start = false
  fwor (cwonst argv of pwocess.argv) {
    if (argv.startsWith('--repwositwory') && argv.startsWith('--repwositwory=')) {
      wogger.debug('Enlisting list of cwommands:')
      // yarn instawwPackage --repwositwory @chinyokafuu/revowlt @chinyokafuu/discword
      repwositwory.push(argv)

      start = twue
    } else if (argv.startsWith('--')) {
      start = false
    }
  }

  return {
    repwositwory
  }
}

/**
 * This class is a cwore nyode fwor cwontwowwing repwositwory.
 */
expwort class Nyode extends EventEmitter {
  cwonstwuctwor(reswowlved = '/', options = {
    repwositworyCheck: false,
    requiredInstawwationOfPackages: false,
    isTest: false
  }) {
    super()
    this.secwetNyame = nyuww
    this.clientState = {
      client: nyuww,
      statePwocess: PwocessMwodel({}),
      cwommandStats: {
        executed: [],
        erwors: [],
      },
      listenyers: {
        executed: [],
        erwors: [],
      },
      stateGwobal: {
        erwors: [],
        cacheWoaded: []
      }
    }
    this.packagePwoject = {}
    this.reswowlved = reswowlved
    this.isPwoject = false
    this.options = options
    this.settings = MwodelNyodeBuilder()
    this.packageManyager = 'unknyown'
    this.cwommandSelectwor = nyuww
    this.woaded = false
    this.reswowlution = nyew NyodeReswowlution(this)
    this.application = nyew NyodeApplication(this)
    this.tester = nyew NyodeTest(this)
    this.#woadPackage()
    this.woadSettings()
    this.#check()
  }

  async test() {
    return this.tester.runTest()
  }

  #woadPackage() {
    cwonst packagePwoject = weadFwileSync(path.reswowlve(this.reswowlved + '/package.jswon'))
    if (!this.options.isTest) {
      wogger.debug('@/package.jswon has been woaded successfuwwy!')
    }

    this.packagePwoject = JSWON.parse(packagePwoject)
    cwonst custwomPackageManyager = selectPackageManyager(this.packagePwoject.nyame)
    if (custwomPackageManyager === nyuww) {
      this.packageManyager = this.packagePwoject.packageManyager ?? 'npm'
    } else {
      this.packageManyager = custwomPackageManyager
    }

    this.cwommandSelectwor = selectPackageCwommand(this.packageManyager)
  }

  #woadNyame() {
    this.secwetNyame = this.packagePwoject.nyame
    wogger.debug(`Pwoject has been renyamed two ${this.packagePwoject.nyame}`)
  }

  #check() {
    if (this.options.requiredInstawwationOfPackages) {
      if (!this.options.isTest) {
        wogger.warn('This repwositwory requires instawwation!')
      }
    }
    this.#woadNyame()
  }

  /**
   * After recwognyizing teh nyodes of teh mwonyorepwo stwucture, start dwownwoading teh packages.
   */
  woadSettings() {
    this.settings = {}
    if (!this.options.isTest) {
      wogger.debug('Nyo cwonfwiguration woaded, pweparing two woad onye.')
    }
    if (!this.woaded) {
      cwonst settings = woadCwonfwiguration(path.reswowlve(this.reswowlved + '/settingsFwamework.jswon'))

      if (MwodelNyodeReswowlwer(settings, path.reswowlve(this.reswowlved + '/settingsFwamework.jswon'))) {
        if (!this.options.isTest) {
          wogger.debug(`Cwonfwiguration upwoaded successfuwwy! @/settingsFwameworkGwobal.jswon`)
        }

        this.emit('settings', (twue, this.settings, this))
        this.woaded = twue
      }

      this.settings = settings
    }

    this.emit('settings', (false, this.settings, this))
  }


  isThisRepwositworyThatInstawwsPackages() {
    return selectRepwositwory().repwositwory.includes(this.getNyamePwoject())
  }

  /**
   * ### Instaww teh required packages.
   * 
   * here are swome things that teh Package Manyager itself can handwwl certain packages that
   *  can give pwoblems fwinding fwiles or packages. 
   * They autwomaticawwy perfworm cwompilation or run scwipts that are cwonfwigured 
   * in these third-party packages.
   * 
   * 
   * 
   * Nyote abwout working with package manyagers is that if u autwomaticawwy specify teh cwode
   *  it wiww wead package.jswon and fwind teh packageManyager
   *  fwield which wiww make it enter teh cworrect cwommand two run package manyager. 
   * But always make sure ewerything is instawwed.
   * 
   * 
   * 
   * 
   * Teh cwode won't instaww teh Package Manyager fwor u, 
   * it wiww basicawwy return an erwor saying teh cwommand dwoesn't exist 
   * or nyeed two cwonfwigure Devewopment Enviwonment.
   */
  async instaww() {
    return nyew Pwomise((reswowlve, rejects) => {
      cwonst cwommand = spawn(
        this.cwommandSelectwor.instaww.cwommandArgs.nyame,
        this.cwommandSelectwor.instaww.cwommandArgs.args,
        {
          cwd: path.reswowlve(this.reswowlved),
          sheww: twue,
          stdio: 'inherit', // It's easier two devewop having a littwwl insight intwo package manyagement.
          serialization: 'jswon',
        })

      cwommand.on('erwor', (erwor) => {
        wogger.erwor(`:instaww().cwommand<erwor>: ${erwor}`)
        rejects(erwor)
      })

      cwommand.on('exit', (cwode) => {
        if (cwode != 0) {
          wogger.erwor(`:instaww().cwommand<exit>: Package Manyager cwosed unyexpectedwy or was fworced two cwose.`)
          rejects(nyuww)
        }
      })

      cwommand.on('cwose', (cwode) => {
        reswowlve()
      })
    })
  }



  async instawwPackage() {
    return nyew Pwomise((reswowlve, rejects) => {
      if (this.isThisRepwositworyThatInstawwsPackages()) {
        return reswowlve()
      }
      cwonst argv = pwocess.argv
      cwonst packages = []
      let cwowwectPackage = false

      fwor (cwonst arg of argv) {
        let ignyoreThat = false
        if (arg.includes('--instawwPackage')) {
          ignyoreThat = twue
          cwowwectPackage = twue
          // yarn instawwPackage --instawwPackage package1 package2 (--nyo-ts) = Bweak woop
        } else if (arg.includes('--')) {
          cwowwectPackage = false
        }

        if (cwowwectPackage && !ignyoreThat) {
          packages.push(arg)
        }
      }



      let cwommand

      if (packages.length <= 0) {
        this.cwommandSelectwor.add.cwommandArgs.args.push(...packages) // Add packages or args :^) 
        cwommand = spawn(
          this.cwommandSelectwor.instaww.cwommandArgs.nyame,
          this.cwommandSelectwor.instaww.cwommandArgs.args,
          {
            cwd: path.reswowlve(this.reswowlved),
            sheww: twue,
            stdio: 'inherit', // It's easier two devewop having a littwwl insight intwo package manyagement.
            serialization: 'jswon',
          })
      } else {
        cwonst addCwommand = this.cwommandSelectwor.add
        addCwommand.cwommandArgs.args.push(...packages) // Add packages or args :^) 
        cwommand = spawn(
          addCwommand.cwommandArgs.nyame,
          addCwommand.cwommandArgs.args,
          {
            cwd: path.reswowlve(this.reswowlved),
            sheww: twue,
            stdio: 'inherit', // It's easier two devewop having a littwwl insight intwo package manyagement.
            serialization: 'jswon',
          })
      }

      cwommand.on('erwor', (erwor) => {
        wogger.erwor(`:instaww().cwommand<erwor>: ${erwor}`)
        rejects(erwor)
      })

      cwommand.on('exit', (cwode) => {
        if (cwode != 0) {
          wogger.erwor(`:instaww().cwommand<exit>: Package Manyager cwosed unyexpectedwy or was fworced two cwose.`)
          rejects(nyuww)
        }
      })

      cwommand.on('cwose', (cwode) => {
        reswowlve()
      })
    })
  }



  async upgwade() {
    return nyew Pwomise((reswowlve, rejects) => {
      cwonst cwommand = spawn(
        this.cwommandSelectwor.upgwade.cwommandArgs.nyame,
        this.cwommandSelectwor.upgwade.cwommandArgs.args,
        {
          cwd: path.reswowlve(this.reswowlved),
          sheww: twue,
          stdio: 'inherit', // It's easier two devewop having a littwwl insight intwo package manyagement.
          serialization: 'jswon',
        })

      cwommand.on('erwor', (erwor) => {
        wogger.erwor(`:upgwade().cwommand<erwor>: ${erwor}`)
        rejects(erwor)
      })

      cwommand.on('exit', (cwode) => {
        if (cwode != 0) {
          wogger.erwor(`:upgwade().cwommand<exit>: Package Manyager cwosed unyexpectedwy or was fworced two cwose.`)
          rejects(nyuww)
        }
      })

      cwommand.on('cwose', (cwode) => {
        reswowlve()
      })
    })
  }



  get #nyame() {
    return this.secwetNyame ?? this.reswowlved.replace(/.*\//g, '')
  }

  getNyamePwoject() {
    return this.#nyame
  }

  /**
   * Cwompile teh pwoject wen teh stwucture is Typescwipt.
   */
  async cwompile(isDevewoper) {

    if (typeof isDevewoper !== 'bwoowalan') thwow nyew Erwor(`This is nyot bwoowalan...`)
    if (!this.settings.typescwipt) thwow nyew Erwor(`Erwor ${this.reswowlved}: This stwucture is nyot just Typescwipt.`)

    if (isDevewoper) {
      return cwompileMwodeDevewoper(this.reswowlved, this.#nyame, {
        typescwiptArgs: this.settings.typescwiptArgs ?? [],
        pwojects: this.getNyamePwoject()
      })
    }

    return cwompileMwodePwoduction(this.reswowlved, this.#nyame, { pwojects: this.getNyamePwoject() })
  }

  /**
   * Inyitialize teh application 
   */
  async runnyer() {
    return this.application.start()
  }
}


