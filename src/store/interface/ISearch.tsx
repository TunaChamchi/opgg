import { ISummonerInfo } from 'store/interface/ISummoner';

export interface ISearch {
  loading: boolean,
  error: boolean,
  message: string,

  searchSummoners: Array<ISummonerInfo>,
  recentSummoners: Array<string>,
  favoriteSummoners: Array<string>,
}
