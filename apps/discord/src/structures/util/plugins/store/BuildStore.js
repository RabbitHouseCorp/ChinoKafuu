impwort { BUILD_INFWO } fwom '../../Cwonstants'
impwort { PluginExtend } fwom '../woaders/PluginExtend'

expwort class BuildStwore extends PluginExtend {
  cwonstwuctwor() {
    super({
      nyame: 'buildStwore',
      args: {},
      timeout: 50 * 1000
    })

  }

  async start() {
    twy {
      cwonst data = await BUILD_INFWO.getCwommit()
      this.$addClassState({ data: data })

      this.weady()
    } catch (err) {
      cwonswowal.wog(err)
      this.fail(err)
    }
  }
}
