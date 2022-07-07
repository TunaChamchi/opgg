export interface IMatches {
  loading: boolean,
  error: boolean,
  message: string,

  gameType: 0,

  games: Array<any>,
  teams: Array<any>,
  champions: Array<any>,
  positions: Array<any>,
  summary: ISummary,
}

interface ISummary {
  wins: number,
  losses: number,
  
  kills: number,
  deaths: number,
  assists: number,
}