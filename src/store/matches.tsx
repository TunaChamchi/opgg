import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as api from 'lib/api';
import { IMatches } from 'store/interface/IMatches';

// Action Types
const name = "matches";

// Action Creators
export const getSummonerMatch = createAsyncThunk<IMatches, string | string[]>(
  `${name}/summonerMatch`,
  async (summonerName: string | string[]) => {
    const response = await api.summonerMatch(summonerName);
    return response.data
  }
)
export const getSummonerMatchDetail = createAsyncThunk<IMatches, {summonerName: string | string[] | undefined, gameId: string}>(
  `${name}/summonerMatchDetail`,
  async ({summonerName, gameId}) => {
    const response = await api.summonerMatchDetail(summonerName, gameId);
    return response.data
  }
)

// Initial
const initialState: IMatches = {
  loading: false,
  error: false,
  message: '',

  gameType: 0,

  games: [],
  teams: [],
  champions: [],
  positions: [],
  summary: {
    wins: 0,
    losses: 0,
    
    kills: 0,
    deaths: 0,
    assists: 0,
  },
};

// Reducer
const matchesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setGameType(state, action) {
      state.gameType = action.payload;
    }
  },
  extraReducers: {
    [getSummonerMatch.pending.type]: (state, action) => { // 호출 전
      // console.log(getMatchesInfo.pending.type, action);
      state.loading = true;
    },
    [getSummonerMatch.fulfilled.type]: (state, action) => { // 성공
      // console.log(getSummonerMatch.fulfilled.type, action);
      state.loading = false;

      _.reverse(_.sortBy(action.payload.champions, (c) => (c.games)));

      state.games = action.payload.games;
      state.champions = _.reverse(_.sortBy(action.payload.champions, (c) => (c.games)));
      state.positions = _.reverse(_.sortBy(action.payload.positions, (c) => (c.games)));
      state.summary = action.payload.summary;
    },
    [getSummonerMatch.rejected.type]: (state, action) => {  // 실패
      // console.log(getMatchesInfo.rejected.type, action);
      state.error = true;
      state.message = '';
      state.loading = false;
    },
    [getSummonerMatchDetail.pending.type]: (state, action) => { // 호출 전
      // console.log(getMatchesInfo.pending.type, action);
      state.loading = true;
    },
    [getSummonerMatchDetail.fulfilled.type]: (state, action) => { // 성공
      // console.log(getSummonerMatchDetail.fulfilled.type, action);
      state.loading = false;
      
      state.teams.push(action.payload);
    },
    [getSummonerMatchDetail.rejected.type]: (state, action) => {  // 실패
      // console.log(getMatchesInfo.rejected.type, action);
      state.error = true;
      state.message = '';
      state.loading = false;
    },
  }
});

export const { setGameType } = matchesSlice.actions;

export default matchesSlice.reducer;