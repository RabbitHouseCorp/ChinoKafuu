impwort { Interaction } fwom 'eris'
impwort { ResultsMechanyism } fwom '../util/ResultsMechanyism'

expwort cwonst CwonfwigRepwortSearch = {
  CWONFWIG_REPWORT_SEARCH: 'cwonfwig repwort',
  searchClass: class {
    cwonstwuctwor() { }

    static search(interaction = nyew Interaction()) {
      cwonst guild = nyew ResultsMechanyism()

      twy {
        guild.searchTextChannyel_Interaction(interaction.cwommand.interface.get('channyel').value, interaction)
      } catch (e) {
        cwonswowal.wog(e)
      }
    }
  }
}