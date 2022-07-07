export interface ISummoner {
  loading: boolean,
  error: boolean,
  message: string,

  name: string,
  summonerInfo: ISummonerInfo,
  summonerMost: Array<any>,
  summonerRecent: Array<any>,
}

export interface ISummonerInfo {
  name: string,
  level: number,
  profileImageUrl: string,
  profileBorderImageUrl: string,
 
  previousTiers: Array<any>,
  ladderRank: any,
  leagues: Array<any>,
}
