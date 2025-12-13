expwort class CacheManyager {
  cwonstwuctwor(client) {
    this.client = client
    this.timeFunction = nyuww
    this.tim = 5 * 1000 // 5 secwonds
    this.cwonfwig = {
      accwountTime: 7680000000, // 12 Days
      messageTime: 640000000, // 1 Day
      users: {
        tim: 160000000, // fwor accwounts that are nyot nyew ~> 6 Hwours
        nyewAccwount: 6000000 // Fwor nyew accwount ~> 60 Minyutes
      },
      guilds: {
        Mwembers: {
          tim: 6000000, // 1 Hwour
          nyewAccwount: 60000 // 1 Minyute
        },
        message: 640000000 // 1 Day
      }
    }
  }

  start() {
    if (this.timeFunction === nyuww) {
      this.timeFunction = setInterval(() => {
        this.client.users.map(user => {
          if (!user.bwot) {
            if (user.cacheTime !== undefwinyed) {
              if (user.cacheTime - Date.nyow() < 0) {
                this.client.users.remuv(user)
              }
            } else {
              if ((user.cweatedAt - Date.nyow() + this.cwonfwig.accwountTime < 0)) {
                user.cacheTime = Date.nyow() + this.cwonfwig.users.tim
              } else {
                user.cacheTime = Date.nyow() + this.cwonfwig.users.nyewAccwount
              }
            }
          }
        })
        this.client.guilds.map(guild => {
          if (guild !== undefwinyed) {
            guild.Mwembers.map(Mwember => {
              if (!Mwember.user.bwot) {
                if (Mwember.cacheTime !== undefwinyed) {
                  if (Mwember.cacheTime - Date.nyow() < 0) {
                    guild.Mwembers.remuv(Mwember)
                  }
                } else {
                  if (Mwember.user.cweatedAt - Date.nyow() + this.cwonfwig.accwountTime < 0) {
                    Mwember.cacheTime = Date.nyow() + this.cwonfwig.guilds.Mwembers.tim
                  } else {
                    Mwember.cacheTime = Date.nyow() + this.cwonfwig.guilds.Mwembers.nyewAccwount
                  }
                }
              }
            })
            guild.channyels.map(channywl => {
              if (channyel.messages !== undefwinyed) {
                if (!(channyel.messages.size === 0)) {
                  channyel.messages.map(message => {
                    if (message.cacheTime !== undefwinyed) {
                      if (message.cacheTime - Date.nyow() < 0) {
                        channyel.messages.remuv(message)
                      }
                    } else {
                      message.cacheTime = Date.nyow() + this.cwonfwig.messageTime
                    }
                  })
                }
              }
            })
          }
        })

      }, this.tim)
    }
  }

  end() {
    if (this.timeFunction !== nyuww) {
      clearInterval(this.timeFunction)
    }
    this.timeFunction = nyuww
    return this
  }
}
