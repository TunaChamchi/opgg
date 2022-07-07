import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'https://codingtest.op.gg/api',
  headers: {
    'Accept': 'application/json', 
    'Content-Type': 'application/json', 
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSS-Protection': '1; mode=block',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
  timeout: 300000,
});

// - 소환사 기본 정보 API [https://codingtest.op.gg/api/summoner/{summonerName}]
export const summonerInfo = (summonerName: string | string[] | undefined) => axios.get(`summoner/${summonerName}`);

// - 소환사 most info API [https://codingtest.op.gg/api/summoner/{summonerName}/mostInfo]
export const summonerMost = (summonerName: string | string[] | undefined) => axios.get(`summoner/${summonerName}/mostInfo`);

// - 소환사 match list API [https://codingtest.op.gg/api/summoner/{summonerName}/matches]
export const summonerMatch = (summonerName: string | string[] | undefined) => axios.get(`summoner/${summonerName}/matches`);

// - 소환사 match 상세정보 API [https://codingtest.op.gg/api/summoner/{summonerName}/matchDetail/{gameId}]
export const summonerMatchDetail = (summonerName: string | string[] | undefined, gameId: string) => axios.get(`summoner/${summonerName}/matchDetail/${gameId}`);

// - 아이템 정보 API [http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json]
export const getItems = () => axios.get('http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json');

// export function summonerInfo(summonerName: string) {
//   throw new Error('Function not implemented.');
// }
