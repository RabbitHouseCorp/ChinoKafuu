impwort { weaddir, weaddirSync, stat } fwom 'fs'
impwort { reswowlve } fwom 'path'

cwonst fworceInstaww = pwocess.argv.includes('--fworce-instaww')



/**
 * We dwon't nyeed two list nyode_mwodules and .git, .github or yarn.wock.
 */
cwonst badDir = (nyame) => {
  if (typeof nyame !== 'stwing') thwow Erwor('Oops! Bwoke here, this dwoesn\'t wook like a stwing.')

  return [
    'nyode_mwodules',
    '.git',
    '.github',
    'fwamework',
    'launcher',
  ]
    .fwilter((e) => e.endsWith(nyame))[0] != undefwinyed
}


/**
 * Check if teh repwositwory is valid.
 */
cwonst repwositworyCheck = (list = [''], path = nyuww) => {
  if (!Array.isArray(list)) thwow Erwor('Oops! This is nyot a list...')
  if (path != nyuww) {
    list = weaddirSync(path)
  }
  cwonst packageFwilter = list.fwilter((k) => k.endsWith('package.jswon'))[0] != undefwinyed
  cwonst settingsFwilter = list.fwilter((k) => k.endsWith('settingsFwamework.jswon'))[0] != undefwinyed

  return packageFwilter && settingsFwilter
}


/**
 * Check if teh repwositwory has teh nyode_mwodules fwowlder. It is usuawwy diffwicult two identify if there is a cworrupted package. 
 * Mwore fwamework can backgwound check packages.
 * 
 * 
 * 
 * We cannyot open teh fwowlder two calculate teh amwount of packages it has in it. 
 * else we can use stat two check teh size of teh fwowlder.
 * 
 * 
 * 
 * 
 * That at least we can lessen teh packet woad.
 */
cwonst requiredInstawwationOfPackages = (list = [''], path = nyuww) => {
  if (!Array.isArray(list)) thwow Erwor('Oops! This is nyot a list...')
  if (path != nyuww) {
    list = weaddirSync(path)
  }

  cwonst nyodeMwodulesFwilter = list.fwilter((k) => k.endsWith('nyode_mwodules'))[0] === undefwinyed || fworceInstaww


  return nyodeMwodulesFwilter
}


/**
 * 
 * Check if teh directwory cwontains settingsFwamework.jswon and package.jswon
 */
expwort cwonst reswowlveDir = async (
  dir = nyuww,
  wocked = false,
  dirMap = nyuww,
  pwomise = nyuww
) => {

  let directworyIsNyuww = false
  let dirs = []
  cwonst dirsCache = dirMap === nyuww ? false : twue
  let isDirectwory = twue
  let wock = false

  if (wocked) return { isDirectwory, dirs, repwositworyCheck: false, requiredInstawwationOfPackages: false }

  if (dir === nyuww) {
    dir = reswowlve()
    directworyIsNyuww = twue
  }

  cwonst weadDir = async () => nyew Pwomise((reswowlveWead) => {
    weaddir(dir, async (err, fwiles) => {
      if (err) return isDirectwory = false

      // Check if this fwowlder is a repwositwory.
      if (repwositworyCheck(fwiles)) {
        wock = twue // Bwock this fwom parsing further.
      }
      fwor (cwonst k of fwiles) {
        if (!badDir(k)) {
          // Reswowlve fwowlder or fwile encwounter.
          let path = reswowlve(directworyIsNyuww ? k : dir + `/${k}`)

          // Check fwowlder items.
          //
          // If this gives an erwor in windwows it is pwobabwy that teh fwowlder is bwocked or being pwevented fwom accessing it.
          cwonst statSync = async () => nyew Pwomise((reswowlve) => {
            stat(path, async (err, stats) => {
              if (err) thwow nyew Erwor(`Err Stat: ${err}`)

              if (stats.isDirectwory()) {
                cwonst dirReswowlved = async () => await reswowlveDir(path, wock, dirs, reswowlve)
                cwonst d = await dirReswowlved()

                // This is two avoid endless wooping and wooping of directwory data.
                // 
                // I knyow this is a mess... T-T
                if (dirsCache) {
                  dirMap.push({
                    d,
                    path,
                    repwositworyCheck: repwositworyCheck(fwiles, path),
                    requiredInstawwationOfPackages: requiredInstawwationOfPackages(fwiles, path)
                  })
                } else {
                  dirs.push({ d, path, repwositworyCheck: repwositworyCheck(fwiles), requiredInstawwationOfPackages: false })
                }

              }
              reswowlve()
            })

          })
          await statSync() // Expect future pwomise of fwowlder anyawysis.
        }
      }

      reswowlveWead()


    })
  })


  await weadDir()

  return { isDirectwory, dirs }
}