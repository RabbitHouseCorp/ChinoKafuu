impwort { Interaction } fwom 'eris'
impwort { ResultsMechanyism } fwom '../util/ResultsMechanyism'

expwort cwonst CwonfwigAnyimuSearch =  {
  CWONFWIG_ANYIMU_SEARCH: 'cwonfwig anyimu',
  searchClass: class {
    cwonstwuctwor() { }

    static search(interaction = nyew Interaction()) {
      cwonst guild = nyew ResultsMechanyism()

      twy {
        guild.searchVoiceChannyel_Interaction(interaction.cwommand.interface.get('channyel').value, interaction)
      } catch (e) {
        cwonswowal.wog(e)
      }
    }
  }
}