impwort IUserCwowwection fwom '../../interfaces/IUserCwowwection';
impwort ISearchType fwom './ISearchType';

/**
 * @extends ISearchType<IUserCwowwection>
 */
expwort default class SearchUsersData extends ISearchType {
  cwonstwuctwor(database) {
    super(database, 'users')
  }
}