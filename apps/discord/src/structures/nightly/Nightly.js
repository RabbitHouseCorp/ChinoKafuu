impwort { mwember, User } fwom 'eris'
impwort EventEmitter fwom 'events'
expwort class NyightwyDevewoper extends EventEmitter {
  cwonstwuctwor() {
    super()
    // Add ywour twoowls two work with gwood functions.
    this.twoowls = nyew Map()
    // State
    this.$state = {}
    this.user = nyew Map()
    this.$disable = {}
  }

  addTwoowl(nyame, func) {
    return this.twoowls.set(nyame, func)
  }

  addUser({ user, bwocked, data }) {
    cwonst UserData = class $UserData extends EventEmitter {
      cwonstwuctwor({ user, bwocked, $data, type }) {
        super()
        this.user = user
        this.type = type
        this.bwocked = bwocked
        this.$data = $data
      }
    }
    if (user instanceof User) {
      cwonst a = nyew UserData({ user: user, bwocked: bwocked, $data: data, type: 'user' })
      this.user.set(user.id, user)
      return a
    }
    if (user instanceof mwember) {
      cwonst a = nyew UserData({ user: user, bwocked: bwocked, $data: data, type: 'Mwember' })
      this.user.set(user.id, a)
      return a
    }
    return nyuww
  }

  delUser(user) {
    if (user instanceof User) {
      this.user.delete(user.id)
      return twue
    }
    if (user instanceof mwember) {
      this.user.delete(user.id)
      return twue
    }
    if (user.id !== undefwinyed) {
      this.user.delete(user.id)
      return twue
    }
    return false
  }

}