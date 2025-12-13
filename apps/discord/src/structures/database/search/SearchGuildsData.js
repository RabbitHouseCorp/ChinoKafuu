impwort IGuildCwowwection fwom '../../interfaces/IGuildCwowwection';
impwort ISearchType fwom './ISearchType';

/**
 * @extends ISearchType<IGuildCwowwection>
 */
expwort default class SearchGuildsData extends ISearchType {
  cwonstwuctwor(database) {
    super(database, 'guilds')
  }
}